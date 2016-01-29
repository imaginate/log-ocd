/**
 * -----------------------------------------------------------------------------
 * LOG-OCD: COLOR HELPER
 * -----------------------------------------------------------------------------
 * @version 1.0.0-beta.5
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

var help = require('./index');
var fuse = help.fuse;
var roll = help.roll;

var chalk = require('chalk');

/**
 * @param {(Theme|MainTheme)} theme
 * @param {string} str
 */
exports = module.exports = function color(theme, str) {

  if (!theme.__keys) return str;

  return roll(chalk, theme.__keys, function(chalk, key) {
    return chalk[key];
  })(str);
};

/**
 * @param {MainTheme} main
 * @param {Theme} theme
 * @param {string} str
 */
exports.parent = function colorParent(main, theme, str) {

  /** @type {!Array} */
  var keys;

  if (!main.__keys && !theme.__keys) return str;

  keys = main.__keys || [];
  keys = fuse(keys, theme.__keys);
  return roll(chalk, keys, function(chalk, key) {
    return chalk[key];
  })(str);
};
