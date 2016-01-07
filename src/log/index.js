/**
 * -----------------------------------------------------------------------------
 * LOG-OCD: LOG
 * -----------------------------------------------------------------------------
 * @version 1.0.0
 * @see [log-ocd]{@link https://github.com/imaginate/log-ocd}
 *
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2015 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Supporting Libraries:
 * @see [are]{@link https://github.com/imaginate/are}
 * @see [vitals]{@link https://github.com/imaginate/vitals}
 * @see [Colors]{@link https://github.com/Marak/colors.js}
 *
 * Annotations:
 * @see [JSDoc3]{@link http://usejsdoc.org/}
 * @see [Closure Compiler specific JSDoc]{@link https://developers.google.com/closure/compiler/docs/js-for-compiler}
 */

'use strict';

var help = require('../helpers');
var is    = help.is;
var remap = help.remap;
var slice = help.slice;

var newStack = require('../helpers/new-stack');

var setupSettings = require('./helpers/setup-settings');
var getErrorType = require('./helpers/get-error-type');
var execError = require('./helpers/exec-error');
var getLines = require('./helpers/get-lines');

var headerToString = require('../to-string/header');
var stackToString = require('../to-string/stack');
var msgToString = require('../to-string/msg');
var toString = require('../to-string');

/**
 * @this {!Settings}
 * @param {string} method
 * @param {...*} vals
 * @return {boolean}
 */
module.exports = function log(method, vals) {

  /** @type {!Config} */
  var config;
  /** @type {string} */
  var header;
  /** @type {?Error} */
  var error;
  /** @type {?Stack} */
  var stack;
  /** @type {string} */
  var msg;

  this = setupSettings(this);
  vals = slice(arguments, 1);

  config = this[method].config;
  header = config.header ? vals.shift() : '';
  msg    = config.msg    ? vals.shift() : '';

  if ( is.error(header) ) {
    error = header;
    header = getErrorType(error);
  }
  else if ( is.error(msg) ) {
    error = msg;
    msg = getErrorType(error);
  }

  if ( !is.str(header) ) return execError.call(this, method, 'header', header);
  if ( !is.str(msg)    ) return execError.call(this, method, 'msg',    msg);

  error = !error && is.error(vals[0]) ? vals.shift() : error;
  if (!error && config['throw']) {
    error = header ? header + ': ' : '';
    error += msg || '';
    error = new Error(error);
  }
  stack = config.stack ? newStack(error) : null;

  execLog.call(this, method, header, msg, vals, stack);

  if (config['throw']) throw error;
  if (config.exit) process.exit(1);

  return true;
};

/**
 * @private
 * @this {!Settings}
 * @param {string} method
 * @param {string} header
 * @param {string} msg
 * @param {!Array} vals
 * @param {?Stack} stack
 */
function execLog(method, header, msg, vals, stack) {

  /** @type {!Config} */
  var config;
  /** @type {!Format} */
  var format;
  /** @type {string} */
  var result;

  config = this[method].config;
  format = this[method].format;

  vals = remap(vals, function(val) {
    return toString.call(this, method, val);
  }, this);
  vals = vals.join('');

  header = config.header ? headerToString.call(this, method, header)  : '';
  stack  = stack         ? stackToString.call(this, method, stack)    : '';
  msg    = config.msg    ? msgToString.call(this, method, msg) + '\n' : '';

  if (header && !msg) header += '\n';
  if (vals && stack) vals += '\n';

  result = getLines(format.linesBefore);
  result += header + msg + vals + stack;
  result += getLines(format.linesAfter);
  config.logger(result);
}
