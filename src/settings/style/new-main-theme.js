/**
 * -----------------------------------------------------------------------------
 * LOG-OCD: STYLE NEW-MAIN-THEME
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

var SECTION_PROPS = require('./values/section-props');

var newTheme = require('./new-theme');

/**
 * @param {string} section
 * @param {string} type
 * @param {Object<string, (string|boolean|Theme)>=} props
 * @return {!MainTheme}
 */
module.exports = function newMainTheme(section, type, props) {

  /** @type {!MainTheme} */
  var theme;
  /** @type {*} */
  var val;

  props = props || null;
  theme = newEmptyObj(type + 'Theme');
  each(SECTION_PROPS[section][type], function(obj, key) {
    val = obj.make ? newTheme(obj.props) : obj.val;
    theme = amend(theme, key, val, obj.type);
  });
  theme = seal(theme);
  return fuse(theme, props);
};
