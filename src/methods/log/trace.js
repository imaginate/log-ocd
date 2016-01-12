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

var is = require('../../helpers').is;
var newStack = require('../../helpers/new-stack');

var setupSettings = require('./helpers/setup-settings');
var execError = require('./helpers/exec-error');
var getLines = require('./helpers/get-lines');

var stackToString = require('../../to-string/stack');

/**
 * @this {!Settings}
 * @param {?Error=} error
 * @return {boolean}
 */
module.exports = function logTrace(error) {

  /** @type {!Config} */
  var config;
  /** @type {!Format} */
  var format;
  /** @type {!Stack} */
  var stack;
  /** @type {string} */
  var result;

  if ( !is('error=', error) ) {
    return execError.call(this, 'trace', 'error', error);
  }

  this = setupSettings(this);
  config = this.trace.config;
  format = this.trace.format;

  stack = newStack(error);
  result = getLines(format.linesBefore);
  result += stackToString.call(this, 'trace', stack);
  result += getLines(format.linesAfter);
  config.logger(result);

  if (config['throw']) throw error;
  if (config.exit) process.exit(1);

  return true;
};
