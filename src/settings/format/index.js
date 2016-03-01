/**
 * -----------------------------------------------------------------------------
 * LOG-OCD: FORMAT
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

var METHODS = require('./values/methods');

var newFormat = require('./new-format');

/**
 * @param {string} method
 * @return {!Format}
 */
module.exports = function getDefaultFormat(method) {

  /** @type {Object} */
  var props;

  method = METHODS[method];
  props = method.makeProps && method.makeProps();
  return newFormat(method.category, props);
};
