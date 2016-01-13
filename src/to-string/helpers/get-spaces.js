/**
 * -----------------------------------------------------------------------------
 * LOG-OCD: GET-SPACES HELPER
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

var getSpace = require('./get-space');

/**
 * @param {number} spaceBefore
 * @param {number} spaceAfter
 * @param {string=} style
 * @return {!Array<string>}
 */
module.exports = function getSpaces(spaceBefore, spaceAfter, style) {
  return [
    getSpace(spaceBefore, style),
    getSpace(spaceAfter,  style)
  ];
};
