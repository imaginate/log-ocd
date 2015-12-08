/**
 * -----------------------------------------------------------------------------
 * LOG-OCD: BOOLEAN-TO-STRING HELPER
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

var colors = require('../helpers/colors');

////////////////////////////////////////////////////////////////////////////////
// MAIN METHOD
////////////////////////////////////////////////////////////////////////////////

/**
 * @this {!Settings}
 * @param {string} method
 * @param {boolean} val
 * @return {string}
 */
module.exports = function booleanToString(method, val) {

  /** @type {string} */
  var style;

  style = 'ocd' + this[method].__INST + method + 'boolean';
  val = String(val);
  return colors[style](val);
};
