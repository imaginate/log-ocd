/**
 * -----------------------------------------------------------------------------
 * LOG-OCD: STYLE VALUES HELPERS - NEW-THEME-PROPS
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

var remap = require('../../../../helpers').remap;

var newThemeProp = require('./new-theme-prop');
var fromThemeProps = require('./from-theme-props');

/**
 * @typedef {!Object<string, ThemeProp>} ThemeProps
 */

/**
 * @param {Object} props
 * @return {ThemeProps}
 */
module.exports = function newThemeProps(props) {
  props = remap(props, function(val) {
    return newThemeProp(val);
  });
  return fromThemeProps(props);
};
