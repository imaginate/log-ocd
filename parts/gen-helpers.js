/**
 * -----------------------------------------------------------------------------
 * LOG-OCD GENERAL HELPERS
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
// SECTION: GENERAL HELPERS
// *****************************************************************************


////////////////////////////////////////////////////////////////////////////////
// LIBRARIES
////////////////////////////////////////////////////////////////////////////////

/**
 * @private
 * @type {Function<string, function>}
 */
var is = require('node-are').is;
/**
 * @private
 * @type {Function<string, function>}
 */
var are = require('node-are').are;
/**
 * @private
 * @type {!Object}
 */
var colors = require('colors/safe');


////////////////////////////////////////////////////////////////////////////////
// CONSTRUCTORS
///////////////////////////////////////////////////////////////////////////////

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

/** @type {!RegExp} */
var traceRegex = /^([^\(]+\()?(.*\/)?([^\/]+\.[a-z]+):([0-9]+):([0-9]+)\)?$/i;
/** @type {!RegExp} */
var nodeModRegex = /\/node_modules\/([^\/]+)\//;

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

  arr = traceRegex.exec(str);
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

  arr = base && trace.dir && !has(trace.dir, nodeModRegex);
  arr = arr && trace.dir.split('/');

  if (arr) {
    len = base.length - arr.length;
    trace.module = fillStr(len, '../') || './' + (
      len ? slice(arr, len).join('/') : ''
    );
    trace.module += trace.file;
  }
  else {
    trace.module = trace.dir ? nodeModRegex.exec(trace.dir)[1] : '(core)';
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
    dir = traceRegex.exec(str)[2];
    if ( !dir || has(dir, nodeModRegex) ) {
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


////////////////////////////////////////////////////////////////////////////////
// METHODS
////////////////////////////////////////////////////////////////////////////////

/**
 * A shortcut for Object.prototype.hasOwnProperty that accepts null objects or a
 *   shortcut for String.prototype.includes and RegExp.prototype.test.
 * @private
 * @param {?(Object|function|string)} source
 * @param {*} prop
 * @return {boolean}
 */
function has(source, prop) {
  return !source ? false : is.str(source) ?
    ( is.str(prop) ? source.includes(prop) : prop.test(source) ) : (
      'hasOwnProperty' in source ? source.hasOwnProperty(prop) : prop in source
    );
}

/**
 * A shortcut for Array.prototype.slice.call(obj, start).
 * @private
 * @param {Object} obj
 * @param {number=} start - [default= 0]
 * @return {Array}
 */
function slice(obj, start) {

  /** @type {!Array} */
  var arr;
  /** @type {number} */
  var len;
  /** @type {number} */
  var ii;
  /** @type {number} */
  var i;

  if ( !is.obj(obj) || !has(obj, 'length') ) {
    return null;
  }

  start = start || 0;
  start = start < 0 ? start + obj.length : start;
  len = obj.length - start;

  arr = len ? new Array(len) : [];
  ii = start;
  i = -1;
  while (++i < len) {
    arr[i] = obj[ii++];
  }

  return arr;
}

/**
 * A shortcut for Array.prototype.map(obj, iteratee).
 * @private
 * @param {Object} obj
 * @param {function(*, number): *} iteratee
 * @return {Array}
 */
function mapArr(obj, iteratee) {

  /** @type {!Array} */
  var arr;
  /** @type {number} */
  var i;

  if ( !is.obj(obj) || !has(obj, 'length') ) {
    return null;
  }

  i = obj.length;
  arr = i ? new Array(i) : [];
  while (i--) {
    arr[i] = iteratee(obj[i], i);
  }
  return arr;
}

/**
 * Gets an object's property keys.
 * @private
 * @param {?(Object|function)} obj
 * @return {Array<string>}
 */
function objKeys(obj) {

  /** @type {string} */
  var prop;
  /** @type {!Array<string>} */
  var arr;

  if (!obj) {
    return null;
  }

  arr = [];
  for (prop in obj) {
    if ( has(obj, prop) ) {
      arr.push(prop);
    }
  }
  return arr;
}

/**
 * Creates a new object with the properties of the given object.
 * @private
 * @param {Object} obj
 * @param {boolean=} deep
 * @return {!Object}
 */
function clone(obj, deep) {

  /** @type {!Object} */
  var newObj;
  /** @type {string} */
  var prop;

  if ( !is.obj(obj) ) {
    return null;
  }

  newObj = {};
  for (prop in obj) {
    if ( has(obj, prop) ) {
      newObj[prop] = deep && is.obj( obj[prop] ) ?
        clone(obj[prop], true) : obj[prop];
    }
  }
  return newObj;
}

/**
 * Appends an object's properties to an existing object.
 * @private
 * @param {!(Object|function)} dest
 * @param {?(Object|function)} source
 * @return {?(Object|function)}
 */
function merge(dest, source) {

  /** @type {string} */
  var prop;

  if (!source) {
    return dest;
  }

  for (prop in source) {
    if ( has(source, prop) ) {
      dest[prop] = source[prop];
    }
  }
  return dest;
}

/**
 * Seals an object.
 * @private
 * @param {Object} obj
 * @param {boolean=} deep
 * @return {!Object}
 */
function seal(obj, deep) {

  /** @type {string} */
  var prop;

  if ( !is._obj(obj) ) {
    return obj;
  }

  if (deep) {
    for (prop in obj) {
      if ( has(obj, prop) ) {
        obj[prop] = seal(obj[prop], true);
      }
    }
  }

  return Object.seal(obj);
}

/**
 * Freezes an object.
 * @private
 * @param {!Object} obj
 * @param {boolean=} deep
 * @return {!Object}
 */
function freeze(obj, deep) {

  /** @type {string} */
  var prop;

  if ( !is._obj(obj) ) {
    return obj;
  }

  if (deep) {
    for (prop in obj) {
      if ( has(obj, prop) ) {
        obj[prop] = freeze(obj[prop], true);
      }
    }
  }

  return Object.freeze(obj);
}

/**
 * A shortcut for iterating over object maps and arrays or invoking an action a
 *   set number of times.
 * @private
 * @param {!(Object|function|Array|number)} val
 * @param {function(*, (string|number)=, (Object|function|Array)=)} iteratee
 * @return {(Object|function|Array)}
 */
function each(val, iteratee) {

  /** @type {(string|number)} */
  var prop;
  /** @type {number} */
  var len;

  if ( is._obj(val) ) {
    if ( is._arr(val) ) {

      // iterate over an array or arguments obj
      val = slice(val);
      len = val.length;
      prop = -1;
      while (++prop < len) {
        iteratee(val[prop], prop, val);
      }
      return val;
    }
    else {

      // iterate over an object's own props
      val = clone(val) || val;
      for (prop in val) {
        if ( has(val, prop) ) {
          iteratee(val[prop], prop, val);
        }
      }
      return val;
    }
  }
  else if ( is.num(val) ) {

    // iterate specified number of times
    while(cycles--) {
      iteratee();
    }
  }
  return null;
}

/**
 * Fills a string with specified values.
 * @private
 * @param {number} count
 * @param {string} val
 * @return {string}
 */
function fillStr(count, val) {

  /** @type {string} */
  var str;
  /** @type {number} */
  var i;

  count = count < 0 ? 0 : count;
  str = '';
  while (count--) {
    str += val;
  }
  return str;
}

/**
 * Deletes a property from an object.
 * @private
 * @param {!Object} obj
 * @param {string} prop
 * @return {!Object}
 */
function removeProp(obj, prop) {

  /** @type {!Object} */
  var newObj;
  /** @type {string} */
  var key;

  if ( !is.obj(obj) ) {
    return null;
  }

  newObj = {};
  for (key in obj) {
    if ( has(obj, key) && key !== prop ) {
      newObj[key] = obj[key];
    }
  }
  return newObj;
}
