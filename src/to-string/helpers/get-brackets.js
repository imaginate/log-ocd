/**
 * -----------------------------------------------------------------------------
 * LOG-OCD: GET-BRACKETS HELPER
 * -----------------------------------------------------------------------------
 * @version 1.0.0
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

var color = require('../../helpers/color');

/**
 * @param {MainTheme} theme
 * @param {string} brackets
 * @return {!Array}
 */
module.exports = function getBrackets(theme, brackets) {
  if (!brackets) return [ '', '' ];
  brackets += brackets.length > 1 ? '' : brackets;
  theme = theme.brackets;
  return [
    color(theme, brackets[0]),
    color(theme, brackets[1])
  ];
};
