/**
 * -----------------------------------------------------------------------------
 * LOG-OCD: GET-BRACKETS HELPER
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

var colors = require('../../helpers/colors');

/**
 * @param {string} brackets
 * @param {string} style
 * @return {!Array}
 */
module.exports = function getBrackets(brackets, style) {
  if (!brackets) return [ '','' ];
  brackets += brackets.length > 1 ? '' : brackets;
  style += 'brackets';
  return [
    colors[style]( brackets[0] ),
    colors[style]( brackets[1] )
  ];
};
