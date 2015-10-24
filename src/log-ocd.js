/**
 * -----------------------------------------------------------------------------
 * LOG-OCD
 * -----------------------------------------------------------------------------
 * @version 0.0.2
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

'use strict';


////////////////////////////////////////////////////////////////////////////////
// EXPORT LOG-OCD FACTORY
////////////////////////////////////////////////////////////////////////////////

/**
 * @public
 * @param {!Object=} options
 * @param {!Object=} options.all
 * @param {!Object=} options.log
 * @param {!Object=} options.pass
 * @param {!Object=} options.error
 * @param {!Object=} options.warn
 * @param {!Object=} options.debug
 * @param {!Object=} options.fail
 * @param {number=} options.all.spaceBefore
 * @param {number=} options.all.spaceAfter
 * @param {boolean=} options.all.argMap
 * @param {boolean=} options.all.header
 * @param {boolean=} options.all.exit
 * @param {string=} options.all.style
 * @param {number=} options.log.spaceBefore
 * @param {number=} options.log.spaceAfter
 * @param {boolean=} options.log.argMap
 * @param {string=} options.log.style
 * @param {number=} options.pass.spaceBefore
 * @param {number=} options.pass.spaceAfter
 * @param {boolean=} options.pass.argMap
 * @param {boolean=} options.pass.header
 * @param {number=} options.error.spaceBefore
 * @param {number=} options.error.spaceAfter
 * @param {boolean=} options.error.argMap
 * @param {boolean=} options.error.header
 * @param {boolean=} options.error.exit
 * @param {number=} options.warn.spaceBefore
 * @param {number=} options.warn.spaceAfter
 * @param {boolean=} options.warn.argMap
 * @param {boolean=} options.warn.header
 * @param {number=} options.debug.spaceBefore
 * @param {number=} options.debug.spaceAfter
 * @param {boolean=} options.debug.argMap
 * @param {boolean=} options.debug.header
 * @param {number=} options.fail.spaceBefore
 * @param {number=} options.fail.spaceAfter
 * @param {boolean=} options.fail.argMap
 * @return {!LogOCD}
 */
module.exports = function newLogOCD(options) {

  /** @type {!Object} */
  var instance = {};
  /** @type {!LogOCD} */
  var LogOCD = logOCD.bind(instance);

  each(logOCD, function(/** function */ method, /** string */ key) {
    LogOCD[key] = method.bind(instance);
  });
  instance._config = clone(CONFIG, true);
  is.obj(options) && setOptions(options, instance);

  return LogOCD;
};

/**
 * @private
 * @param {!Object} options
 * @param {!LogOCD} instance
 */
function setOptions(options, instance) {

  each(options, function(/** !Object */ obj, /** string */ method) {

    if ( !is.obj(obj) ) {
      return;
    }

    if (method === 'all') {
      each(obj, function(/** * */ val, /** string */ prop) {
        if ( has(CONFIG_PROPS, prop) && isConfigProp(prop, val) ) {
          // set each of the instance's config methods
          each(instance._config,
            function(/** !Object */ _obj, /** string */ _method) {
              if ( has(CONFIG[_method], prop) ) {
                _obj[prop] = val;
              }
            }
          );
        }
      });
    }
    else {
      if ( !has(CONFIG, method) ) {
        return;
      }      
      each(obj, function(/** * */ val, /** string */ prop) {
        // set a specific config method for the instance
        if ( has(CONFIG[method], prop) && isConfigProp(prop, val) ) {
          instance._config[method][prop] = val;
        }
      });
    }
  });
}


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
 * @typedef {!{
 *   pos:    string,
 *   event:  string,
 *   dir:    string,
 *   file:   string,
 *   line:   string,
 *   column: string
 * }} Trace
 */

/**
 * @typedef {!Array<!Trace>} Stack
 */

/**
 * @private
 * @return {!Stack}
 */
function newStack() {

  /** @type {!Stack} */
  var stack;
  /** @type {!Trace} */
  var trace;
  /** @type {!RegExp} */
  var regex;
  /** @type {!Array<string>} */
  var arr;

  regex = /^([^\(]+\()?(.*\/)?([^\/]+\.[a-z]+):([0-9]+):([0-9]+)\)?$/i;
  stack = new Error().stack
    .replace(/\r\n?/g, '\n') // normalize line breaks
    .replace(/\\/g, '/')     // normalize slashes
    .replace(/^.*\n.*\n.*\n\s+at /, '') // remove message and log-ocd traces
    .split(/\n\s+at /)
    .map( (str, i) => {
      arr = slice(regex.exec(str), 1);
      arr[0] = arr[0] && arr[0].slice(0, -2);
      trace = newMap('Trace');
      trace = newProps(trace, {
        pos:    ( ++i < 10 ? ' ' : '' ) + i,
        event:  arr.shift() || '(none)',
        dir:    arr.shift() || '',
        file:   arr.shift(),
        line:   arr.shift(),
        column: arr.shift()
      });
      return freeze(trace);
    });

  stack = newProps(
    stack, 'event, file, line, column', 0, (newVal, nowVal) => newVal > nowVal
  );
  each(stack, trace => {
    stack.event  = trace.event.length;
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
 * @param {number=} start - negative numbers not allowed [default= 0]
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


// *****************************************************************************
// SECTION: CONFIG
// *****************************************************************************


////////////////////////////////////////////////////////////////////////////////
// SET THEMES
////////////////////////////////////////////////////////////////////////////////

/**
 * @private
 * @type {!{
 *   error: (string|!Array<string>),
 *   warn:  (string|!Array<string>),
 *   pass:  (string|!Array<string>),
 *   debug: (string|!Array<string>),
 *   plain: (string|!Array<string>),
 *   view:  (string|!Array<string>),
 *   fail:  (string|!Array<string>)
 * }}
 * @const
 */
var THEMES = {
  error:  [ 'white', 'bold', 'bgRed'    ],
  warn:   [ 'white', 'bold', 'bgYellow' ],
  pass:   [ 'white', 'bold', 'bgGreen'  ],
  debug:  [ 'white', 'bold', 'bgBlue'   ],
  plain:    'white',
  view:     'cyan',
  fail:     'red',
  ostack:   'white',
  estack: [ 'white', 'bgBlue' ]
};

// accent settings for each theme
colors.setTheme(
  merge(clone(THEMES), {
    aerror: [ 'yellow',  'bold', 'bgRed'    ],
    awarn:  [ 'blue',    'bold', 'bgYellow' ],
    apass:  [ 'yellow',  'bold', 'bgGreen'  ],
    adebug: [ 'magenta', 'bold', 'bgBlue'   ],
    aplain: 'magenta',
    aview:  'magenta',
    afail:  'yellow'
  })
);


////////////////////////////////////////////////////////////////////////////////
// DEFAULT CONFIG
////////////////////////////////////////////////////////////////////////////////

/**
 * @private
 * @type {!Object}
 * @const
 */
var CONFIG = {
  log: {
    style: 'plain',
    spaceBefore: 1,
    spaceAfter: 1,
    argMap: false
  },
  pass: {
    spaceBefore: 1,
    spaceAfter: 1,
    argMap: false,
    header: true
  },
  error: {
    spaceBefore: 1,
    spaceAfter: 1,
    argMap: false,
    header: true,
    stack: true,
    exit: true
  },
  warn: {
    spaceBefore: 1,
    spaceAfter: 1,
    argMap: false,
    header: true,
    stack: false
  },
  debug: {
    spaceBefore: 1,
    spaceAfter: 1,
    argMap: false,
    header: true,
    stack: false
  },
  fail: {
    spaceBefore: 1,
    spaceAfter: 1,
    argMap: false,
    stack: false
  }
};


// *****************************************************************************
// SECTION: LOG HELPERS
// *****************************************************************************


////////////////////////////////////////////////////////////////////////////////
// CONFIG METHODS
////////////////////////////////////////////////////////////////////////////////

/**
 * @private
 * @type {!Object<string, function(*): boolean>}
 * @const
 */
var CONFIG_PROPS = freeze({
  spaceBefore: is.num,
  spaceAfter: is.num,
  argMap: is.bool,
  header: is.bool,
  style(val) { return is._str(val) && has(THEMES, val); },
  stack: is.bool,
  exit: is.bool
});

/**
 * @private
 * @param {string} prop
 * @param {string} val
 * @return {boolean}
 */
function isConfigProp(prop, val) {
  return is._str(prop) && has(CONFIG_PROPS, prop) && CONFIG_PROPS[prop](val);
}


////////////////////////////////////////////////////////////////////////////////
// FORMATTING METHODS
////////////////////////////////////////////////////////////////////////////////

/**
 * @private
 * @param {string} str
 * @param {string} theme
 * @return {string}
 */
function color(str, theme) {
  return colors[theme](str);
}

/**
 * @private
 * @param {string} str
 * @param {string} theme
 * @return {string}
 */
function getAccentStr(str, theme) {
  return has(str, /`[^`]+`/) ? mapArr(str.split(/`+/), (section, i) => {
      return color(section, ( i % 2 ? 'a' : '' ) + theme);
    }).join('') : color(str, theme);
}

/**
 * @private
 * @param {*} val
 * @return {string}
 */
function makeLogStr(val) {
  return is.str(val) ?
    `"${val}"` : is.func(val) ?
      '[Function] {' : is.arr(val) ?
        `[ ${val.join(', ')} ]` : is.args(val) ?
          `[ ${slice(val).join(', ')} ]` : is.regex(val) ?
            val.toString() : is.obj(val) ?
              '{' : String(val);
}


////////////////////////////////////////////////////////////////////////////////
// LOGGING METHODS
////////////////////////////////////////////////////////////////////////////////

/**
 * @private
 * @param {*...} vals
 */
var log = has(global, 'logOCDLogger') ? logOCDLogger : console.log;

/**
 * @private
 * @param {!Array} args
 * @param {string} theme
 * @param {boolean=} argMap
 */
function logAny(args, theme, argMap) {

  each(args, val => {

    if ( is._obj(val) && !is('regex|arr', val) ) {

      if (argMap || val.argMap) {
        logArgMap(val)
        return;
      }

      logObj(val, theme);
      return;
    }

    val = makeLogStr(val);
    val = color(val, theme);
    log(val);
  });
}

/**
 * @private
 * @param {number} spaces
 */
function logSpaces(spaces) {
  while (spaces--) {
    log('');
  }
}

/**
 * @private
 * @param {string} msg
 * @param {string} theme
 */
function logHeader(msg, theme) {
  msg = getAccentStr(msg, theme);
  msg = color(' ', theme) + msg + color('        ', theme);
  log(msg);
}

/**
 * @private
 * @param {string} msg
 * @param {string} theme
 */
function logDetails(msg, theme) {
  msg = getAccentStr(msg, theme);
  msg = color('  - ', theme) + msg;
  log(msg);
}

/**
 * @private
 * @param {!Stack} stack
 */
function logStack(stack) {

  /** @type {function} */
  var getSpace;
  /** @type {string} */
  var theme;
  /** @type {string} */
  var str;

  getSpace = (prop, minus) => fillStr(stack[prop] - (minus || 0), ' ');
  str = `${getSpace('event', 10)}  file${getSpace('file', 4)}` +
        `${getSpace('line')}line${getSpace('column')}column `;
  str = color(' Stacktrace', 'error') + color(str, 'bgRed');
  log(str);

  each(stack, (trace, i) => {
    getSpace = prop => fillStr(stack[prop] - trace[prop].length, ' ');
    str = ` ${trace.event}${getSpace('event')} `   +
          ` ${trace.file}${getSpace('file')}   `   +
          ` ${getSpace('line')}${trace.line}     ` +
          ` ${getSpace('column')}${trace.column} `;
    theme = i % 2 ? 'estack' : 'ostack';
    str = color(str, theme);
    log(str);
  });
}

/**
 * @private
 * @param {!Object} obj
 */
function logArgMap(obj) {

  /** @type {!Array<string>} */
  var keys;
  /** @type {string} */
  var str;
  /** @type {*} */
  var val;

  obj = removeProp(obj, 'argMap');
  keys = objKeys(obj).sort( (a, b) => b.length - a.length );
  each(keys, key => {

    val = obj[key];
    str = makeLogStr(val);
    key = color(`${key}: `, 'view') + color(str, 'plain');
    log(key);

    if ( is.func(val) || str === '{' ) {
      logObj(val, 'plain', -1);
    }
  });
}

/**
 * @private
 * @param {!Object} obj
 * @param {string=} theme
 * @param {number=} indent
 */
function logObj(obj, theme, indent) {

  /** @type {string} */
  var spaces;
  /** @type {!Array<string>} */
  var keys;
  /** @type {number} */
  var last;
  /** @type {string} */
  var str;
  /** * */
  var val;

  theme = theme || 'plain';
  indent = indent || 0;

  str = indent ? '' : color(is.func(obj) ? '[Function] {' : '{', theme);
  str && log(str);

  indent = indent < 0 ? 0 : indent;
  spaces = fillStr(indent, '  ');
  keys = objKeys(obj).sort( (a, b) => b.length - a.length );
  last = keys.length - 1;

  each(keys, (key, i) => {
    val = obj[key];
    str = makeLogStr(val);
    if ( is.func(val) || str === '{' ) {
      str = `  ${spaces}${key}: ${str}`;
      str = color(str, theme);
      log(str);
      logObj(val, theme, (indent + 1));
    }
    else {
      str = `  ${spaces}${key}: ${str}` + ( i !== last ? ',' : '' );
      str = color(str, theme);
      log(str);
    }
  });

  str = spaces + '}' + ( indent ? ',' : '' );
  str = color(str, theme);
  log(str);
}


// *****************************************************************************
// SECTION: PUBLIC METHODS
// *****************************************************************************


////////////////////////////////////////////////////////////////////////////////
// LOG METHODS
////////////////////////////////////////////////////////////////////////////////

/**
 * @public
 * @this {!LogOCD}
 * @param {*...} args
 * @return {boolean}
 */
function logOCD() {

  if (!arguments.length) {
    this.error('Invalid `log-ocd` Call', 'no arguments given');
    return false;
  }

  logSpaces(this._config.log.spaceBefore);
  logAny(arguments, this._config.log.style, this._config.log.argMap);
  logSpaces(this._config.log.spaceAfter);

  return true;
}

/**
 * @public
 * @this {!LogOCD}
 * @param {*...} args
 * @return {boolean}
 */
logOCD.log = logOCD;

/**
 * @public
 * @this {!LogOCD}
 * @param {string=} header - Only optional if the header config is disabled.
 * @param {*...=} args
 * @return {boolean}
 */
logOCD.pass = function(header) {

  logSpaces(this._config.pass.spaceBefore);

  if (this._config.pass.header) {

    if ( !is._str(header) ) {
      this.error(
        'Invalid `log-ocd pass` Call',
        'invalid type for `header` param (to disable headers use `setConfig`)',
        { argMap: true, header: header }
      );
      return false;
    }

    logHeader(header, 'pass');

    if (arguments.length > 1) {
      logSpaces(1);
      logAny(slice(arguments, 1), 'plain', this._config.pass.argMap);
    }
  }
  else {

    logHeader('Pass', 'pass');

    if (arguments.length) {
      logSpaces(1);
      logAny(arguments, 'plain', this._config.pass.argMap);
    }
  }

  logSpaces(this._config.pass.spaceAfter);

  return true;
};

/**
 * @public
 * @this {!LogOCD}
 * @param {string=} header - Only optional if the header config is disabled.
 * @param {string} msg
 * @param {*...=} args
 * @return {boolean}
 */
logOCD.error = function(header, msg) {

  /** @type {?Stack} */
  var stack;

  stack = this._config.error.stack ? newStack() : null;

  logSpaces(this._config.error.spaceBefore);

  if (this._config.error.header) {

    if ( !are._str(header, msg) ) {
      this.error(
        'Invalid `log-ocd error` Call',
        'invalid type for `header` or `msg` param',
        { argMap: true, header: header, msg: msg }
      );
      return false;
    }

    logHeader(header, 'error');
    logDetails(msg, 'plain');
    stack && logSpaces(1);
    stack && logStack(stack);

    if (arguments.length > 2) {
      logSpaces(1);
      logAny(slice(arguments, 2), 'view', this._config.error.argMap);
    }
  }
  else {

    msg = header;

    if ( !is._str(msg) ) {
      this.error(
        'Invalid `log-ocd error` Call',
        'invalid type for `msg` param (an error message is required)',
        { argMap: true, msg: msg }
      );
      return false;
    }

    logHeader('Error', 'error');
    logDetails(msg, 'plain');
    stack && logSpaces(1);
    stack && logStack(stack);

    if (arguments.length > 1) {
      logSpaces(1);
      logAny(slice(arguments, 1), 'view', this._config.error.argMap);
    }
  }

  logSpaces(this._config.error.spaceAfter);
  this._config.error.exit && process.exit(1);

  return true;
};

/**
 * @public
 * @this {!LogOCD}
 * @param {string=} header - Only optional if the header config is disabled.
 * @param {string} msg
 * @param {*...=} args
 * @return {boolean}
 */
logOCD.warn = function(header, msg) {

  /** @type {?Stack} */
  var stack;

  stack = this._config.warn.stack ? newStack() : null;

  logSpaces(this._config.warn.spaceBefore);

  if (this._config.warn.header) {

    if ( !are._str(header, msg) ) {
      this.error(
        'Invalid `log-ocd warn` Call',
        'invalid type for `header` or `msg` param',
        { argMap: true, header: header, msg: msg }
      );
      return false;
    }

    logHeader(header, 'warn');
    logDetails(msg, 'plain');
    stack && logSpaces(1);
    stack && logStack(stack);

    if (arguments.length > 2) {
      logSpaces(1);
      logAny(slice(arguments, 2), 'view', this._config.warn.argMap);
    }
  }
  else {

    msg = header;

    if ( !is._str(msg) ) {
      this.error(
        'Invalid `log-ocd warn` Call',
        'invalid type for `msg` param (a warning message is required)',
        { argMap: true, msg: msg }
      );
      return false;
    }

    logHeader('Warning', 'warn');
    logDetails(msg, 'plain');
    stack && logSpaces(1);
    stack && logStack(stack);

    if (arguments.length > 1) {
      logSpaces(1);
      logAny(slice(arguments, 1), 'view', this._config.warn.argMap);
    }
  }

  logSpaces(this._config.warn.spaceAfter);

  return true;
};

/**
 * @public
 * @this {!LogOCD}
 * @param {string=} header - Only optional if the header config is disabled.
 * @param {*...=} args
 * @return {boolean}
 */
logOCD.debug = function(header) {

  /** @type {?Stack} */
  var stack;

  stack = this._config.debug.stack ? newStack() : null;

  logSpaces(this._config.debug.spaceBefore);

  if (this._config.debug.header) {

    if ( !is._str(header) ) {
      this.error(
        'Invalid `log-ocd debug` Call',
        'invalid type for `header` param (to disable headers use `setConfig`)',
        { argMap: true, header: header }
      );
      return false;
    }

    logHeader(header, 'debug');
    stack && logSpaces(1);
    stack && logStack(stack);

    if (arguments.length > 1) {
      logSpaces(1);
      logAny(slice(arguments, 1), 'plain', this._config.debug.argMap);
    }
  }
  else {

    logHeader('Debug', 'debug');
    stack && logSpaces(1);
    stack && logStack(stack);

    if (arguments.length) {
      logSpaces(1);
      logAny(arguments, 'plain', this._config.debug.argMap);
    }
  }

  logSpaces(this._config.debug.spaceAfter);

  return true;
};

/**
 * @public
 * @this {!LogOCD}
 * @param {string} msg
 * @param {*...=} args
 * @return {boolean}
 */
logOCD.fail = function(msg) {

  /** @type {?Stack} */
  var stack;

  stack = this._config.fail.stack ? newStack() : null;

  if ( !is._str(msg) ) {
    this.error(
      'Invalid `log-ocd fail` Call',
      'invalid type for `msg` param (a failure message is required)',
      { argMap: true, msg: msg }
    );
    return false;
  }

  logSpaces(this._config.fail.spaceBefore);
  logAny([ msg ], 'fail');
  stack && logSpaces(1);
  stack && logStack(stack);

  if (arguments.length > 1) {
    logAny(slice(arguments, 1), 'view', this._config.fail.argMap);
  }

  logSpaces(this._config.fail.spaceAfter);

  return true;
};


////////////////////////////////////////////////////////////////////////////////
// CONFIG METHODS
////////////////////////////////////////////////////////////////////////////////

/**
 * All Methods & Their Config Properties
 * ------------------------------------------------------------------------
 * | Method | Props                                                       |
 * | :----- | :---------------------------------------------------------- |
 * | all    | spaceBefore, spaceAfter, argMap, header, style, stack, exit |
 * | log    | spaceBefore, spaceAfter, argMap, style                      |
 * | pass   | spaceBefore, spaceAfter, argMap, header                     |
 * | error  | spaceBefore, spaceAfter, argMap, header, stack, exit        |
 * | warn   | spaceBefore, spaceAfter, argMap, header, stack              |
 * | debug  | spaceBefore, spaceAfter, argMap, header, stack              |
 * | fail   | spaceBefore, spaceAfter, argMap, stack                      |
 * ------------------------------------------------------------------------
 *
 * @example [logOCDInstance].setConfig("all.argMap", true);
 *
 * @public
 * @this {!LogOCD}
 * @param {string} prop - <method>.<prop> the method, "all", sets all methods
 * @param {(number|string|boolean)} val
 * @return {boolean}
 */
logOCD.setConfig = function(prop, val) {

  /** @type {string} */
  var method;

  if ( !is._str(prop) || !/\./.test(prop) ) {
    return false;
  }

  method = prop.replace(/^([a-z]+)\..*$/, '$1');
  method = has(CONFIG, method) || method === 'all' ? method : '';
  prop = prop.replace(/^[a-z]+\.(.*)$/, '$1');

  if ( !method || !prop || !isConfigProp(prop, val) ) {
    return false;
  }

  if (method === 'all') {
    if ( !has(CONFIG_PROPS, prop) ) {
      return false;
    }
    each(this._config, function(/** !Object */ obj) {
      if ( has(obj, prop) ) {
        obj[prop] = val;
      }
    });
  }
  else {
    if ( !has(CONFIG[method], prop) ) {
      return false;
    }
    this._config[method][prop] = val;
  }

  return true;
};

/**
 * @public
 * @this {!LogOCD}
 * @param {string...=} methods - if left undefined all methods get reset
 */
logOCD.resetConfig = function() {

  /** @type {string} */
  var method;
  /** @type {number} */
  var i;

  if (arguments.length) {
    i = arguments.length;
    while (i--) {
      method = arguments[i];
      if ( is._str(method) && has(CONFIG, method) ) {
        this._config[method] = clone( CONFIG[method] );
      }
      else {
        return false;
      }
    }
  }
  else {
    this._config = clone(CONFIG, true);
  }
  return true;
};
