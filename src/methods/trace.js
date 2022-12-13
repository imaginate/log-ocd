/**
 * -----------------------------------------------------------------------------
 * LOG-OCD: LOG TRACE
 * -----------------------------------------------------------------------------
 * @version 1.0.0-beta.10
 * @see [log-ocd]{@link https://github.com/imaginate/log-ocd}
 *
 * @author Adam Smith <imagineadamsmith@gmail.com> (https://github.com/imaginate)
 * @copyright 2022 Adam A Smith <imagineadamsmith@gmail.com> (https://github.com/imaginate)
 *
 * Supporting Libraries:
 * @see [chalk]{@link https://github.com/chalk/chalk}
 * @see [vitals]{@link https://github.com/imaginate/vitals}
 *
 * Annotations:
 * @see [JSDoc3]{@link http://usejsdoc.org/}
 * @see [Closure Compiler specific JSDoc]{@link https://developers.google.com/closure/compiler/docs/js-for-compiler}
 */

'use strict';

var help = require('../helpers');
var is   = help.is;
var fuse = help.fuse;

var newStack = require('../helpers/new-stack');

var setupSettings = require('./helpers/setup-settings');
var typeError = require('./helpers/type-error');
var getLines = require('./helpers/get-lines');

var stackToString = require('../to-string/stack');
var stackToStringFallback = require('../to-string/stack/fallback');

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
  /** @type {string} */
  var lines;

  if ( !is('error=', error) ) return typeError(this, 'trace', 'error', error);

  setupSettings(this);
  config = this.trace.config;
  format = this.trace.format;

  try {
    stack = newStack(error);
    result = stackToString.call(this, 'trace', stack);
  } catch (err) {
    result = stackToStringFallback(error);
  }
  lines  = getLines(format.linesBefore);
  result = fuse(lines, result);
  lines  = getLines(format.linesAfter);
  result = fuse(result, lines);
  config.logger(result);

  if ( config['throw'] ) throw error;
  if ( config['exit'] ) process.exit(1);

  return true;
};
