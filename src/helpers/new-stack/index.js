/**
 * -----------------------------------------------------------------------------
 * LOG-OCD: NEW-STACK HELPER
 * -----------------------------------------------------------------------------
 * @version 1.0.0-beta.6
 * @see [log-ocd]{@link https://github.com/imaginate/log-ocd}
 *
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2016 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
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

var help = require('../index');
var each   = help.each;
var freeze = help.freeze;
var remap  = help.remap;
var until  = help.until;

var newTrace = require('./new-trace');
var getStack = require('./get-stack');
var isExtern = require('./is-extern');
var isNative = require('./is-native');
var getDirpath = require('./get-dirpath');

// Increase the number of stack traces
Error.stackTraceLimit += 2;

/**
 * @private
 * @type {!Array}
 * @const
 */
var LENGTH_KEYS = freeze([ 'event', 'module', 'file', 'line', 'column' ]);

/**
 * @typedef {!Array<!Trace>} Stack
 */

/**
 * @param {!Error=} error
 * @return {!Stack}
 */
module.exports = function newStack(error) {

  /** @type {!(Array|Stack)} */
  var stack;
  /** @type {!Array<string>} */
  var base;
  /** @type {!Array<string>} */
  var dir;

  stack = getStack(error);

  // get the base path
  until(true, stack, function(trace) {
    if ( isExtern(trace) || isNative(trace) ) return false;
    dir = getDirpath(trace);
    if (dir.length) base = dir;
    return !!base;
  });

  stack = remap(stack, function(trace, i) {
    return newTrace(i, trace, base);
  });
  stack.base = base;

  // calculate max length of all trace vals
  each(LENGTH_KEYS, function(key) {
    stack[key] = 0;
  });
  each(stack, function(trace) {
    each(LENGTH_KEYS, function(key) {
      if (trace[key].length > stack[key]) stack[key] = trace[key].length;
    });
  });

  return freeze(stack);
};
