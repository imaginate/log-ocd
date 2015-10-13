/**
 * -----------------------------------------------------------------------------
 * LOG LIBRARY
 * -----------------------------------------------------------------------------
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2015 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Supporting Libraries:
 * @see [Lodash]{@link https://github.com/lodash/lodash}
 * @see [Colors]{@link https://www.npmjs.com/package/colors}
 *
 * Annotations:
 * @see [JSDoc3]{@link http://usejsdoc.org/}
 * @see [Closure Compiler specific JSDoc]{@link https://developers.google.com/closure/compiler/docs/js-for-compiler}
 */

'use strict';

/** @type {Function<string, function>} */
var is = require('node-are').is;
/** @type {Function<string, function>} */
var are = require('node-are').are;
/** @type {!Object} */
var colors = require('colors/safe');
/** @type {function} */
var fill = require('lodash/array/fill');
/** @type {function} */
var merge = require('lodash/object/merge');
/** @type {function} */
var clone = require('lodash/lang/cloneDeep');
/** @type {function} */
var forOwn = require('lodash/object/forOwn');
/** @type {function} */
var sliceArr = require('lodash/array/slice');


////////////////////////////////////////////////////////////////////////////////
// SET THEMES
////////////////////////////////////////////////////////////////////////////////

/**
 * @type {!{
 *   error: (string|!Array<string>),
 *   warn:  (string|!Array<string>),
 *   pass:  (string|!Array<string>),
 *   debug: (string|!Array<string>),
 *   plain: (string|!Array<string>),
 *   view:  (string|!Array<string>),
 *   fail:  (string|!Array<string>)
 * }}
 */
var themes = {
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
  merge(themes, {
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

/** @type {!Object} */
var CONFIG = {
  log: {
    style: 'plain',
    spaceBefore: 1,
    spaceAfter: 1
  },
  pass: {
    spaceBefore: 1,
    spaceAfter: 1
  },
  error: {
    spaceBefore: 1,
    spaceAfter: 1,
    exit: true
  },
  warn: {
    spaceBefore: 1,
    spaceAfter: 1
  },
  debug: {
    spaceBefore: 1,
    spaceAfter: 1
  },
  fail: {
    spaceBefore: 1,
    spaceAfter: 1
  }
};
/** @type {!Object} */
var config = clone(CONFIG);


////////////////////////////////////////////////////////////////////////////////
// DEFINE LOG METHODS
////////////////////////////////////////////////////////////////////////////////

/**
 * @param {*...} args
 * @return {boolean}
 */
function Log() {

  if (!arguments.length) {
    Log.error('Invalid `Log` Call', 'no arguments given');
    return false;
  }

  logSpace(config.log.spaceBefore);
  log(config.log.style, sliceArr(arguments));
  logSpace(config.log.spaceAfter);
  return true;
}

/**
 * @param {string} header
 * @param {*...=} args
 * @return {boolean}
 */
Log.pass = function(header) {

  if ( !is._str(header) ) {
    Log.error(
      'Invalid `Log.pass` Call',
      'invalid type for `header` param',
      { argMap: true, header: header }
    );
    return false;
  }

  logSpace(config.pass.spaceBefore);
  logHeader('pass', header);
  arguments.length > 1 && logSpace(1) && log('view', sliceArr(arguments, 1));
  logSpace(config.pass.spaceAfter);
  return true;
};

/**
 * @param {string} header
 * @param {string} msg
 * @param {*...=} args
 * @return {boolean}
 */
Log.error = function(header, msg) {

  if ( !are._str(header, msg) ) {
    Log.error(
      'Invalid `Log.error` Call',
      'invalid type for `header` or `msg` param',
      { argMap: true, header: header, msg: msg }
    );
    return false;
  }

  logSpace(config.error.spaceBefore);
  logHeader('error', header);
  logDetails('plain', msg);
  arguments.length > 2 && logSpace(1) && log('view', sliceArr(arguments, 2));
  logSpace(config.error.spaceAfter);
  config.error.exit && process.exit(1);
  return true;
};

/**
 * @param {string} header
 * @param {string} msg
 * @param {*...=} args
 * @return {boolean}
 */
Log.warn = function(header, msg) {

  if ( !are._str(header, msg) ) {
    Log.error(
      'Invalid `Log.warn` Call',
      'invalid type for `header` or `msg` param',
      { argMap: true, header: header, msg: msg }
    );
    return false;
  }

  logSpace(config.warn.spaceBefore);
  logHeader('warn', header);
  logDetails('plain', msg);
  arguments.length > 2 && logSpace(1) && log('view', sliceArr(arguments, 2));
  logSpace(config.warn.spaceAfter);
  return true;
};

/**
 * @param {string} header
 * @param {*...=} args
 * @return {boolean}
 */
Log.debug = function(header) {

  if ( !is._str(header) ) {
    Log.error(
      'Invalid `Log.debug` Call',
      'invalid type for `header` param',
      { argMap: true, header: header }
    );
    return false;
  }

  logSpace(config.debug.spaceBefore);
  logHeader('debug', header);
  arguments.length > 1 && logSpace(1) && log('view', sliceArr(arguments, 1));
  logSpace(config.debug.spaceAfter);
  return true;
};

/**
 * @param {string} msg
 * @param {*...=} args
 * @return {boolean}
 */
Log.fail = function(msg) {

  if ( !is._str(msg) ) {
    Log.error(
      'Invalid `Log.fail` Call',
      'invalid type for `msg` param',
      { argMap: true, msg: msg }
    );
    return false;
  }

  logSpace(config.fail.spaceBefore);
  logHeader('fail', msg);
  arguments.length > 1 && log('fail', sliceArr(arguments, 1));
  logSpace(config.fail.spaceAfter);
  return true;
};


////////////////////////////////////////////////////////////////////////////////
// DEFINE CONFIG METHODS
////////////////////////////////////////////////////////////////////////////////

/**
 * @param {string} prop - <method>.<prop> (ex. "warn.spaceAfter") all options:
 *   methods= all, log, pass, error, warn, debug, fail
 *   props= all.spaceBefore, all.spaceAfter, log.style, error.exit
 * @param {(number|string|boolean)} val
 * @return {boolean}
 */
Log.setConfig = function(prop, val) {

  /** @type {string} */
  var method;

  prop = is._str(prop) ? prop.split('.') : [];
  method = prop.length === 2 ? prop.shift() : '';
  method = has(config, method) || method === 'all' ? method : '';
  prop = prop[0];

  if (!method || !prop || !checkConfigVal(prop, val)) {
    return false;
  }

  if (method === 'all') {
    forOwn(config, function(/** !Object */ obj) {
      if ( has(obj, prop) ) {
        obj[prop] = val;
      }
    });
  }
  else if ( has(config[method], prop) ) {
    config[method][prop] = val;
  }
  return true;
};

/**
 * @param {string=} method
 */
Log.resetConfig = function(method) {
  if ( is._str(method) && has(config, method) ) {
    config[method] = clone( CONFIG[method] );
  }
  else {
    config = clone(CONFIG);
  }
  return true;
};



////////////////////////////////////////////////////////////////////////////////
// DEFINE GENERAL HELPERS
////////////////////////////////////////////////////////////////////////////////

/**
 * @param {string} func
 * @param {string} arg
 * @param {*} val
 */
function helperError(func, arg, val) {
  console.log('');
  console.log('Invalid '.error + func.aerror + ' Call in '.error +
              'Log'.aerror + ' Library          '.error);
  console.log('  - invalid '.plain + arg.aplain + ' param'.plain);
  console.log('');
  console.log(arg.plain + ': '.plain + String(val).view);
  process.exit(1);
}

/**
 * @param {*} val
 * @return {string}
 */
function makeStr(val) {
  return ( is.str(val) ?
    val || '""' : is.func(val) ?
      'function() { ... } props => {' : is.arr(val) ?
        '[ '+ val.join(', ') +' ]' : is.regex(val) ?
          '/'+ val.source +'/'+ val.flags : is.obj(val) ?
            '{' : String(val)
  );
}

/**
 * @param {string} str
 * @return {boolean}
 */
function hasAccent(str) {
  is._str(str) || helperError('hasAccent', 'str', str);
  return /`.+`/.test(str);
}

/**
 * @param {Object} obj
 * @param {string} prop
 * @return {boolean}
 */
function has(obj, prop) {
  if ( !is._obj(obj) ) {
    return false;
  }
  return obj.hasOwnProperty(prop);
}

/** @type {!Object<string, function(*): boolean>} */
var configProps = {
  spaceBefore: function(val) { return is.num(val); },
  spaceAfter: function(val) { return is.num(val); },
  style: function(val) { return is._str(val) && has(themes, val); },
  exit: is.bool
};

/**
 * @param {string} prop
 * @param {string} val
 * @return {boolean}
 */
function checkConfigVal(prop, val) {
  return is._str(prop) && has(configProps, prop) && configProps[prop](val);
}


////////////////////////////////////////////////////////////////////////////////
// DEFINE LOG HELPERS
////////////////////////////////////////////////////////////////////////////////

/**
 * @param {string} style
 * @param {!Array} args
 */
function log(style, args) {

  is._str(style) || helperError('log', 'style', style);
  has(themes, style) || helperError('log', 'style', style);
  is.arr(args) || helperError('log', 'args', args);

  args.forEach(function(/** * */ val) {
    if ( is.func(val) || ( is.obj(val) && !is('regex|arr', val) ) ) {
      val.argMap ? logArgs(val) : logObj(val, style);
    }
    else {
      console.log(is._str(val) && hasAccent(val) ?
        val.split('`').map(function(/** string */ part, /** number */ i) {
          return colors[ (i % 2 ? 'a' : '') + style ](part);
        }).join('')
        : colors[style]( makeStr(val) )
      );
    }
  });
}

/**
 * @param {number} spaces
 * @return {boolean}
 */
function logSpace(spaces) {

  is.num(spaces) || helperError('logSpace', 'spaces', spaces);

  while (spaces--) {
    console.log('');
  }
  return true;
}

/**
 * @param {string} style
 * @param {string} msg
 */
function logHeader(style, msg) {

  is._str(style) || helperError('logHeader', 'style', style);
  has(themes, style) || helperError('logHeader', 'style', style);
  is._str(msg) || helperError('logHeader', 'msg', msg);

  msg = hasAccent(msg) ? msg.split('`').map(
    function(/** string */ part, /** number */ i) {
      return colors[ (i % 2 ? 'a' : '') + style ](part);
    }
  ).join('') : colors[style](msg);
  console.log( colors[style](' ') + msg + colors[style]('        ') );
}

/**
 * @param {string} style
 * @param {string} msg
 */
function logDetails(style, msg) {

  is._str(style) || helperError('logDetails', 'style', style);
  has(themes, style) || helperError('logDetails', 'style', style);
  is._str(msg) || helperError('logDetails', 'msg', msg);

  msg = hasAccent(msg) ? msg.split('`').map(
    function(/** string */ part, /** number */ i) {
      return colors[ (i % 2 ? 'a' : '') + style ](part);
    }
  ).join('') : colors[style](msg);
  console.log( colors[style]('  - ') + msg );
}

/**
 * @param {!Object} obj
 */
function logArgs(obj) {

  /** @type {string} */
  var str;

  is._obj(obj) || helperError('logArgs', 'obj', obj);

  forOwn(obj, function(/** * */ val, /** string */ key) {
    if (key !== 'argMap') {
      str = makeStr(val);
      console.log( colors.plain(key + ': ') + colors.view(str) );
      if ( is.func(val) || str === '{' ) {
        logObj(val, 'view', -1);
      }
    }
  });
}

/**
 * @param {!Object} obj
 * @param {string=} style
 * @param {number=} indent
 */
function logObj(obj, style, indent) {

  /** @type {string} */
  var spaces;
  /** @type {string} */
  var str;

  is._obj(obj) || helperError('logObj', 'obj', obj);

  style = is._str(style) && has(themes, style) ? style : 'view';

  indent = is._num(indent) ? indent : 0;
  indent || console.log(
    colors[style]( is.func(obj) ? 'function() { ... } props => {' : '{' )
  );
  indent = indent < 0 ? 0 : indent;

  spaces = indent ? fill(Array(indent), '  ').join('') : '';

  forOwn(obj, function(/** * */ val, /** string */ key) {
    str = makeStr(val);
    if ( is.func(val) || str === '{' ) {
      console.log( colors[style]('  ' + spaces + key + ': ' + str) );
      logObj(val, style, (indent + 1));
    }
    else {
      console.log( colors[style]('  ' + spaces + key + ': ' + str + ',') );
    }
  });
  console.log(
    colors[style]( spaces + '}' + (indent ? ',' : '') )
  );
}


////////////////////////////////////////////////////////////////////////////////
// EXPORT LIBRARY
////////////////////////////////////////////////////////////////////////////////

module.exports = Log;
