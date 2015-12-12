/**
 * -----------------------------------------------------------------------------
 * LOG-OCD: GET-STACK HELPER
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

var help = require('../index');
var cut   = help.cut;
var has   = help.has;
var remap = help.remap;

/**
 * @param {!Error=} error
 * @return {!Array<string>}
 */
module.exports = function getStack(error) {

  /** @type {boolean} */
  var hasError;
  /** @type {!Array<string>} */
  var stack;

  hasError = !!error;
  error = error || new Error();
  stack = cleanStack(error.stack);
  return hasError ? stack : stripTraces(stack);
};

/**
 * @private
 * @param {string} stack
 * @return {!Array}
 */
function cleanStack(stack) {
  stack = remap(stack, /\r\n?/g, '\n'); // normalize line breaks
  stack = remap(stack, /\\/g, '/');     // normalize slashes
  stack = cut(stack, /^.*\n\s+at /);    // remove message
  return stack.split(/\n\s+at /);
}

/**
 * @private
 * @param {!Array} stack
 * @return {!Array}
 */
function stripTraces(stack) {
  return cut(stack, function(trace) {
    return !has(trace, 'log-ocd.js');
  });
}
