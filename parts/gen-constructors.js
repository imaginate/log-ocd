/**
 * -----------------------------------------------------------------------------
 * LOG-OCD GENERAL CONSTRUCTORS
 * -----------------------------------------------------------------------------
 * @version 0.1.0
 * @see [log-ocd]{@link https://github.com/imaginate/log-ocd}
 *
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2015 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Supporting Libraries:
 * @see [are]{@link https://github.com/imaginate/are}
 * @see [Colors]{@link https://www.npmjs.com/package/colors}
 *
 * Annotations:
 * @see [JSDoc3]{@link http://usejsdoc.org/}
 * @see [Closure Compiler specific JSDoc]{@link https://developers.google.com/closure/compiler/docs/js-for-compiler}
 */


// *****************************************************************************
// SECTION: GENERAL CONSTRUCTORS
// *****************************************************************************


////////////////////////////////////////////////////////////////////////////////
// CONSTRUCTORS
////////////////////////////////////////////////////////////////////////////////

/**
 * @private
 * @param {string} mapType
 * @return {!Object}
 */
function newMap(mapType) {
  return Object.create(null, {
    _TYPE: {
      __proto__: null,
      value: mapType,
      writable: false,
      enumerable: false,
      configurable: false
    }
  });
}

/**
 * @private
 * @param {!Object} map
 * @param {string} key
 * @param {*} val
 * @param {(string|function(*, *): boolean)=} staticType - [default= "*"] If
 *   staticType is a string newProps uses the [is main function]{@link https://github.com/imaginate/are/blob/master/docs/is-main-func.md}
 *   from the [are library]{@link https://github.com/imaginate/are} to check all
 *   new values (e.g. is(staticType, newVal)). If staticType is a function it
 *   will be given two params, newValue and currentValue, and expected to return
 *   true if the currentValue should be set to the newValue (note: an error is
 *   not thrown if it returns false).
 * @return {!Object}
 */
function newProp(map, key, val, staticType) {

  if ( is.str(staticType) ) {
    staticType = val => is(staticType, val);
  }

  return Object.defineProperty(map, key, staticType ? {
      __proto__: null,
      get() { return val; },
      set(value) { val = staticType(value, val) ? value : val; },
      enumerable: true,
      configurable: false
    } : {
      __proto__: null,
      value: val,
      writable: true,
      enumerable: true,
      configurable: false
    }
  );
}

/**
 * @private
 * @param {!Object} map
 * @param {!(Object<string, *>|Array<string>|string)} props - If props is a
 *   string newProps uses one of the chars in the following list as the
 *   separator (chars listed in order of use):  ", "  ","  "|"  " "
 * @param {*=} propVal - [default= null] The value for all props if an array or
 *   string is used for the props param.
 * @param {(string|function(*, *): boolean)=} staticType - [default= "*"] If
 *   staticType is a string newProps uses the [is main function]{@link https://github.com/imaginate/are/blob/master/docs/is-main-func.md}
 *   from the [are library]{@link https://github.com/imaginate/are} to check all
 *   new values (e.g. is(staticType, newVal)). If staticType is a function it
 *   will be given two params, newValue and currentValue, and expected to return
 *   true if the currentValue should be set to the newValue (note: an error is
 *   not thrown if it returns false).
 * @return {!Object}
 */
function newProps(map, props, propVal, staticType) {

  /** @type {!Array<string>} */
  var keys;
  /** @type {!Object} */
  var obj;

  if ( is('str|arr!', props) ) {
    keys = is.str(props) ? props.split(
        [ ', ', ',', '|' ].filter( str => has(props, str) )[0] || ' '
      ) : props;
    props = {};
    each(keys, key => {
      props[key] = propVal;
    });
  }
  else {
    staticType = propVal;
  }

  if ( is.str(staticType) ) {
    staticType = val => is(staticType, val);
  }

  obj = {};
  each(props, (val, key) => {
    obj[key] = staticType ? {
        __proto__: null,
        get() { return val; },
        set(value) { val = staticType(value, val) ? value : val; },
        enumerable: true,
        configurable: false
      } : {
        __proto__: null,
        value: val,
        writable: true,
        enumerable: true,
        configurable: false
      };
  });

  return Object.defineProperties(map, obj);
}

/** @type {number} */
Error.stackTraceLimit = 12;

/**
 * @private
 * @param {(!Error|string)=} stack
 * @constructor
 */
function StackTrace(stack) {
  this.stack = is._str(stack) ? stack : is.obj(stack) ? stack.stack : undefined;
  is._str(this.stack) || Error.captureStackTrace(this, StackTrace);
  stack = this.stack.replace(/\r\n?/g, '\n') // normalize line breaks
    .replace(/\\/g, '/')        // normalize slashes
    .replace(/^.*\n\s+at /, '') // remove message
    .split(/\n\s+at /);
  this.stack = has(stack[0], 'log-ocd.js') ? slice(stack,
    has(stack[1], 'log-ocd.js') ? 2 : 1
  ) : stack;
}

/**
 * For newTrace & newStack use only.
 * @private
 * @type {!RegExp}
 * @const
 */
const TRACE = /^([^\(]+\()?(.*\/)?([^\/]+\.[a-z]+):([0-9]+):([0-9]+)\)?$/i;
freeze(TRACE);

/**
 * For newTrace & newStack use only.
 * @private
 * @type {!RegExp}
 * @const
 */
const NODE_MODULE = freeze( /\/node_modules\/([^\/]+)\// );

/**
 * @typedef {!{
 *   pos:    string,
 *   event:  string,
 *   dir:    string,
 *   file:   string,
 *   line:   string,
 *   column: string,
 *   module: string
 * }} Trace
 */

/**
 * @private
 * @param {string} str
 * @param {number} i
 * @param {!Array<string>=} base
 * @return {!Trace}
 */
function newTrace(str, i, base) {

  /** @type {!Trace} */
  var trace;
  /** @type {!Array<string>} */
  var arr;
  /** @type {number} */
  var len;

  arr = TRACE.exec(str);
  arr = slice(arr, 1);
  arr[0] = arr[0] && arr[0].slice(0, -2);

  trace = newMap('Trace');
  trace = newProps(trace, {
    pos:    ( ++i < 10 ? ' ' : '' ) + i,
    event:  arr.shift() || '(none)',
    dir:    arr.shift() || '',
    file:   arr.shift(),
    line:   arr.shift(),
    column: arr.shift(),
    module: ''
  });

  arr = base && trace.dir && !has(trace.dir, NODE_MODULE);
  arr = arr && trace.dir.split('/');

  if (arr) {
    len = base.length - arr.length;
    trace.module = fillStr(len, '../') || './' + (
      len ? slice(arr, len).join('/') : ''
    );
    trace.module += trace.file;
  }
  else {
    trace.module = trace.dir ? NODE_MODULE.exec(trace.dir)[1] : '(core)';
  }

  return freeze(trace);
}

/**
 * @typedef {!Array<!Trace>} Stack
 */

/**
 * @private
 * @param {(!Error|string)=} stack
 * @return {!Stack}
 */
function newStack(stack) {

  /** @type {!Array<string>} */
  var base;
  /** @type {string} */
  var dir;

  // get the stack array
  stack = new StackTrace(stack).stack;

  // set the base path
  stack.some( str => {
    dir = TRACE.exec(str)[2];
    if ( !dir || has(dir, NODE_MODULE) ) {
      return false;
    }
    base = dir.split('/');
    return true;
  });

  // setup the stack object
  stack = mapArr(stack, (str, i) => {
    return newTrace(str, i, base);
  });
  stack.base = base.join('/');
  stack = newProps(stack, 'event, module, file, line, column', 0,
    (newVal, nowVal) => newVal > nowVal
  );
  each(stack, trace => {
    stack.event  = trace.event.length;
    stack.module = trace.module.length;
    stack.file   = trace.file.length;
    stack.line   = trace.line.length;
    stack.column = trace.column.length;
  });

  return freeze(stack);
}
