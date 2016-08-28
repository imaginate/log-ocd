/**
 * -----------------------------------------------------------------------------
 * LOG-OCD: STYLE VALUES HELPERS - FROM-THEME-PROPS
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

var help = require('../../../../helpers');
var copy   = help.copy;
var freeze = help.freeze;
var fuse   = help.fuse;

var THEME_PROPS = require('../theme-props');

/**
 * @private
 * @param {!ThemeProps=} props
 * @return {!ThemeProps}
 */
module.exports = function fromThemeProps(props) {

  /** @type {!Object} */
  var base;

  props = props || null;
  base = copy(THEME_PROPS);
  base = fuse(base, props);
  return freeze(base, true);
};
