/**
 * -----------------------------------------------------------------------------
 * LOG-OCD: STYLE NEW-THEME
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

var help = require('../../helpers');
var amend = help.amend;
var each  = help.each;
var fuse  = help.fuse;
var seal  = help.seal;

var newEmptyObj = require('../../helpers/new-empty-obj');

var THEME_PROPS = require('./values/theme-props');

/**
 * @param {Object<string, (string|boolean)>=} props
 * @return {!Theme}
 */
module.exports = function newTheme(props) {

  /** @type {!Theme} */
  var theme;

  props = props || null;
  theme = newEmptyObj('Theme');
  each(THEME_PROPS, function(obj, key) {
    theme = amend(theme, key, obj.val, obj.type);
  });
  theme = seal(theme);
  return fuse(theme, props);
};
