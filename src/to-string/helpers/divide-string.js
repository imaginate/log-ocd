/**
 * -----------------------------------------------------------------------------
 * LOG-OCD: DIVIDE-STRING HELPER
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

var slice = require('../../helpers').slice;

/**
 * @param {number} limit
 * @param {string} val
 * @return {string}
 */
module.exports = function divideString(limit, val) {

  /** @type {string} */
  var result;
  /** @type {number} */
  var i;

  if (val.length <= limit) return val;

  result = '';
  while (val.length > limit) {
    i = getLastSpace(val, limit) || val.length;
    result += '\n' + slice(val, 0, i);
    val = slice(val, i);
  }
  result += val && '\n' + val;
  return result;
};

/**
 * @private
 * @param {string} str
 * @param {number=} limit
 * @return {number}
 */
function getLastSpace(str, limit) {

  /** @type {string} */
  var temp;
  /** @type {number} */
  var i;

  temp = limit ? slice(str, 0, limit) : str;
  i = temp.lastIndexOf(' ') || str.indexOf(' ');
  return ++i;
}
