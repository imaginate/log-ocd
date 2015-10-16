/**
 * -----------------------------------------------------------------------------
 * LOG-OCD
 * -----------------------------------------------------------------------------
 * @version 0.0.1
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
// METHODS
////////////////////////////////////////////////////////////////////////////////

/**
 * A shortcut for Object.prototype.hasOwnProperty that accepts null objects.
 * @private
 * @param {?(Object|function)} obj
 * @param {*} prop
 * @return {boolean}
 */
function has(obj, prop) {
  return is._obj(obj) && obj.hasOwnProperty(prop);
}

/**
 * A shortcut for Array.prototype.slice.call(obj, start).
 * @private
 * @param {Object} obj
 * @param {number=} start [default= 0]
 * @return {Array}
 */
function slice(obj, start) {

  /** @type {!Array} */
  var arr;
  /** @type {number} */
  var len;
  /** @type {number} */
  var i;

  if ( !is.obj(obj) || !has(obj, 'length') ) {
    return null;
  }

  len = obj.length;
  start = !start ? 0 : start < 0 ? len + start : start;

  arr = start < len ? new Array( (len - start) ) : [];
  i = start - 1;
  while (++i < len) {
    arr[i] = obj[i];
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
function map(obj, iteratee) {

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
 * Creates a new object with the properties of the given object.
 * @private
 * @param {!Object} obj
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
 * @param {(!Object|function)} dest
 * @param {(!Object|function)} source
 * @return {(!Object|function)}
 */
function merge(dest, source) {

  /** @type {string} */
  var prop;

  for (prop in source) {
    if ( has(source, prop) ) {
      dest[prop] = source[prop];
    }
  }
  return dest;
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
 * Fills an existing or new array with specified values.
 * @private
 * @param {(Array|number)} arr
 * @param {*} val
 * @return {Array}
 */
function fill(arr, val) {

  /** @type {number} */
  var i;

  arr = is.num(arr) ? new Array(arr) : arr;
  i = arr.length;
  while (i--) {
    arr[i] = val;
  }
  return arr;
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
  error: [ 'white', 'bold', 'bgRed'    ],
  warn:  [ 'white', 'bold', 'bgYellow' ],
  pass:  [ 'white', 'bold', 'bgGreen'  ],
  debug: [ 'white', 'bold', 'bgBlue'   ],
  plain: 'white',
  view:  'cyan',
  fail:  'red'
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
// DEFINE PRIVATE CONFIG
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
    exit: true
  },
  warn: {
    spaceBefore: 1,
    spaceAfter: 1,
    argMap: false,
    header: true
  },
  debug: {
    spaceBefore: 1,
    spaceAfter: 1,
    argMap: false,
    header: true
  },
  fail: {
    spaceBefore: 1,
    spaceAfter: 1,
    argMap: false
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
var CONFIG_PROPS = {
  spaceBefore: is.num,
  spaceAfter: is.num,
  argMap: is.bool,
  header: is.bool,
  style: function(val) { return is._str(val) && has(THEMES, val); },
  exit: is.bool
};

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
 * @return {boolean}
 */
function hasAccent(str) {
  return /`.+`/.test(str);
}

/**
 * @private
 * @param {string} style
 * @param {string} str
 * @return {string}
 */
function getAccentStr(style, str) {
  return hasAccent(str) ? map(str.split('`'),
    function(/** string */ part, /** number */ i) {
      return colors[ (i % 2 ? 'a' : '') + style ](part);
    }
  ).join('') : colors[style](str);
}

/**
 * @private
 * @param {*} val
 * @return {string}
 */
function makeLogStr(val) {
  return is.str(val) ?
    val || '""' : is.func(val) ?
      '[ Function ]: {' : is.arr(val) ?
        '[ '+ val.join(', ') +' ]' : is.args(val) ?
          '[ '+ slice(val).join(', ') +' ]' : is.regex(val) ?
            '/'+ val.source +'/'+ val.flags : is.obj(val) ?
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
 * @param {string} style
 * @param {!Array} args
 * @param {boolean=} argMap
 */
function logAny(style, args, argMap) {
  each(args, function(/** * */ val) {
    if ( is.func(val) || ( is.obj(val) && !is('regex|arr', val) ) ) {
      val.argMap || argMap ? logArgMap(val) : logObj(val, style);
    }
    else {
      log(is._str(val) ?
        getAccentStr(style, val) : colors[style]( makeLogStr(val) )
      );
    }
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
 * @param {string} style
 * @param {string} msg
 */
function logHeader(style, msg) {
  log(
    colors[style](' ') + getAccentStr(style, msg) + colors[style]('        ')
  );
}

/**
 * @private
 * @param {string} style
 * @param {string} msg
 */
function logDetails(style, msg) {
  log( colors[style]('  - ') + getAccentStr(style, msg) );
}

/**
 * @private
 * @param {!Object} obj
 */
function logArgMap(obj) {

  /** @type {string} */
  var str;

  each(obj, function(/** * */ val, /** string */ key) {
    if (key !== 'argMap') {
      str = makeLogStr(val);
      log( colors.plain(key + ': ') + colors.view(str) );
      if ( is.func(val) || str === '{' ) {
        logObj(val, 'view', -1);
      }
    }
  });
}

/**
 * @private
 * @param {!Object} obj
 * @param {string=} style
 * @param {number=} indent
 */
function logObj(obj, style, indent) {

  /** @type {string} */
  var spaces;
  /** @type {string} */
  var str;

  style = style || 'view';
  indent = indent || 0;

  indent || log(
    colors[style]( is.func(obj) ? '[ Function ]: {' : '{' )
  );
  indent = indent < 0 ? 0 : indent;

  spaces = indent ? fill(indent, '  ').join('') : '';

  each(obj, function(/** * */ val, /** string */ key) {
    str = makeLogStr(val);
    if ( is.func(val) || str === '{' ) {
      log( colors[style]('  ' + spaces + key + ': ' + str) );
      logObj(val, style, (indent + 1));
    }
    else {
      log( colors[style]('  ' + spaces + key + ': ' + str + ',') );
    }
  });
  log(
    colors[style]( spaces + '}' + (indent ? ',' : '') )
  );
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
  logAny(this._config.log.style, arguments, this._config.log.argMap);
  logSpaces(this._config.log.spaceAfter);

  return true;
}

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

    logHeader('pass', header);

    if (arguments.length > 1) {
      logSpaces(1);
      logAny('plain', slice(arguments, 1), this._config.pass.argMap);
    }
  }
  else {

    logHeader('pass', 'Pass');

    if (arguments.length) {
      logSpaces(1);
      logAny('plain', arguments, this._config.pass.argMap);
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

    logHeader('error', header);
    logDetails('plain', msg);

    if (arguments.length > 2) {
      logSpaces(1);
      logAny('view', slice(arguments, 2), this._config.error.argMap);
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

    logHeader('error', 'Error');
    logDetails('plain', msg);

    if (arguments.length > 1) {
      logSpaces(1);
      logAny('view', slice(arguments, 1), this._config.error.argMap);
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

    logHeader('warn', header);
    logDetails('plain', msg);

    if (arguments.length > 2) {
      logSpaces(1);
      logAny('view', slice(arguments, 2), this._config.warn.argMap);
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

    logHeader('warn', 'Warning');
    logDetails('plain', msg);

    if (arguments.length > 1) {
      logSpaces(1);
      logAny('view', slice(arguments, 1), this._config.warn.argMap);
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

    logHeader('debug', header);

    if (arguments.length > 1) {
      logSpaces(1);
      logAny('plain', slice(arguments, 1), this._config.debug.argMap);
    }
  }
  else {

    logHeader('debug', 'Debug');

    if (arguments.length) {
      logSpaces(1);
      logAny('plain', arguments, this._config.debug.argMap);
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

  if ( !is._str(msg) ) {
    this.error(
      'Invalid `log-ocd fail` Call',
      'invalid type for `msg` param (a failure message is required)',
      { argMap: true, msg: msg }
    );
    return false;
  }

  logSpaces(this._config.fail.spaceBefore);
  logAny('fail', msg);
  arguments.length > 1 && logAny(
    'view', slice(arguments, 1), this._config.fail.argMap
  );
  logSpaces(this._config.fail.spaceAfter);

  return true;
};


////////////////////////////////////////////////////////////////////////////////
// CONFIG METHODS
////////////////////////////////////////////////////////////////////////////////

/**
 * All Methods & Their Config Properties
 * -----------------------------------------------------------------
 * | Method | Props                                                |
 * | :----- | :--------------------------------------------------- |
 * | all    | spaceBefore, spaceAfter, argMap, header, style, exit |
 * | log    | spaceBefore, spaceAfter, argMap, style               |
 * | pass   | spaceBefore, spaceAfter, argMap, header              |
 * | error  | spaceBefore, spaceAfter, argMap, header, exit        |
 * | warn   | spaceBefore, spaceAfter, argMap, header              |
 * | debug  | spaceBefore, spaceAfter, argMap, header              |
 * | fail   | spaceBefore, spaceAfter, argMap                      |
 * -----------------------------------------------------------------
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
 * @param {string=} method - if left undefined all methods get reset
 */
logOCD.resetConfig = function(method) {
  if ( is._str(method) && has(CONFIG, method) ) {
    this._config[method] = clone( CONFIG[method] );
  }
  else {
    this._config = clone(CONFIG, true);
  }
  return true;
};