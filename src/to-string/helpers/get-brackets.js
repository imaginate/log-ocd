/**
 * -----------------------------------------------------------------------------
 * LOG-OCD: GET-BRACKETS HELPER
 * -----------------------------------------------------------------------------
 * @version 1.0.0-beta.11
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

var fuse = require('../../helpers').fuse;

var color = require('../../helpers/color');

/**
 * @param {MainTheme} theme
 * @param {string} brackets
 * @return {!Array}
 */
module.exports = function getBrackets(theme, brackets) {
  if (!brackets) return [ '', '' ];
  brackets = fuse(brackets[0], brackets[1] || brackets);
  theme = theme.brackets;
  return [
    color(theme, brackets[0]),
    color(theme, brackets[1])
  ];
};
