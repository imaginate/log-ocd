/**
 * -----------------------------------------------------------------------------
 * LOG-OCD: GET-SPACE HELPER
 * -----------------------------------------------------------------------------
 * @version 1.0.0-beta.8
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

var fill = require('../../helpers').fill;
var color = require('../../helpers/color');

/**
 * @param {number} space
 * @param {theme=} theme
 * @return {string}
 */
module.exports = function getSpace(space, theme) {
  space = fill(space, ' ');
  return theme ? space && color(theme, space) : space;
};
