/**
 * -----------------------------------------------------------------------------
 * LOG-OCD: FORMAT VALUES HELPER - NEW-NATURAL-NUM
 * -----------------------------------------------------------------------------
 * @version 1.0.0-beta.10
 * @see [log-ocd]{@link https://github.com/imaginate/log-ocd}
 *
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2022 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
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

var round = Math.round;

/**
 * @param {number=} val
 * @return {number}
 */
function newNaturalNum(val) {
  return val && val > 0 ? round(val) : 0;
}

/**
 * @param {number} base
 * @return {function(number=): number}
 */
newNaturalNum.build = function buildNewNaturalNum(base) {
  base = round(base);
  return function newNaturalNum(val) {
    val = val || 0;
    return val < base ? base : round(val);
  };
};

/**
 * @param {number=} val
 * @return {number}
 */
module.exports = newNaturalNum;
