/**
 * -----------------------------------------------------------------------------
 * LOG-OCD: LOG TRACE
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

var is = require('../helpers').is;
var newStack = require('../helpers/new-stack');
var getLines = require('./helpers/get-lines');
var execError = require('./helpers/exec-error');
var stackToString = require('../to-string/stack');

/**
 * @this {!Settings}
 * @param {string} method
 * @param {?Error=} error
 * @return {boolean}
 */
module.exports = function logTrace(method, error) {

  /** @type {!Config} */
  var config;
  /** @type {!Format} */
  var format;
  /** @type {!Stack} */
  var stack;
  /** @type {string} */
  var result;

  if ( !is('obj=', error) ) return execError.call(this, method, 'error', error);

  config = this[method].config;
  format = this[method].format;

  stack = newStack(error);
  result = getLines(format.linesBefore);
  result += stackToString.call(this, method, stack);
  result += getLines(format.linesAfter);
  config.logger(result);

  if (config['throw']) throw error;
  if (config.exit) process.exit(1);

  return true;
};
