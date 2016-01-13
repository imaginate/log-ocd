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
var fuse  = help.fuse;
var roll  = help.roll;
var slice = help.slice;

var newStack = require('../helpers/new-stack');

var setupSettings = require('./helpers/setup-settings');
var getErrorType = require('./helpers/get-error-type');
var typeError = require('./helpers/type-error');
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

  setupSettings(this);
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

  if ( !is.str(header) ) return typeError(this, method, 'header', header);
  if ( !is.str(msg)    ) return typeError(this, method, 'msg',    msg);

  if ( !error && is.error( vals[0] ) ) error = vals.shift();
  if ( !error && config['throw'] ) {
    header = header ? fuse(header, ': ') : '';
    msg   = msg || '';
    error = fuse(header, msg);
    error = new Error(error);
  }
  stack = config.stack ? newStack(error) : null;

  execLog.call(this, method, header, msg, vals, stack);

  if ( config['throw'] ) throw error;
  if ( config['exit'] ) process.exit(1);

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
  /** @type {string} */
  var lines;
  /** @type {number} */
  var last;

  config = this[method].config;
  format = this[method].format;

  last = vals.length - 1;
  vals = roll.up('', vals, function(val, i) {
    val = toString.call(this, method, val);
    return i < last ? fuse(val, '\n') : val;
  }, this);

  header = config.header ? headerToString.call(this, method, header) : '';
  stack  = stack         ? stackToString.call(this, method, stack)   : '';
  msg    = config.msg    ? msgToString.call(this, method, msg)       : '';

  if (header) header = fuse(header, '\n');
  if ( msg && (vals || stack) ) msg = fuse(msg, '\n\n');
  if ( header && !msg && (vals || stack) ) header = fuse(header, '\n');
  if (vals && stack) vals = fuse(vals, '\n\n');

  lines  = getLines(format.linesBefore);
  result = fuse(lines, header, msg, vals, stack);
  lines  = getLines(format.linesAfter);
  result = fuse(result, lines);
  config.logger(result);
}
