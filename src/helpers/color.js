/**
 * -----------------------------------------------------------------------------
 * LOG-OCD: COLOR HELPER
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

var roll = require('./index').roll;

var chalk = require('chalk');

/**
 * @param {(Theme|MainTheme)} theme
 * @param {string} str
 */
module.exports = function color(theme, str) {

  if (!theme.__keys) return str;

  return roll(chalk, theme.__keys, function(chalk, key) {
    return chalk[key];
  })(str);
}