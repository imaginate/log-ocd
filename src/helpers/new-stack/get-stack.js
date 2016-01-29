/**
 * -----------------------------------------------------------------------------
 * LOG-OCD: GET-STACK HELPER
 * -----------------------------------------------------------------------------
 * @version 1.0.0-beta.5
 * @see [log-ocd]{@link https://github.com/imaginate/log-ocd}
 *
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2016 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Supporting Libraries:
 * @see [are]{@link https://github.com/imaginate/are}
 * @see [chalk]{@link https://github.com/chalk/chalk}
 * @see [vitals]{@link https://github.com/imaginate/vitals}
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
var slice = help.slice;
var until = help.until;

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
  if (!error.stack) {
    hasError = false;
    error = new Error();
  }
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

  /** @type {number} */
  var index;

  until(false, stack, function(trace, i) {
    index = i;
    return has(trace, 'log-ocd/src');
  });
  return index ? slice(stack, index) : stack;
}
