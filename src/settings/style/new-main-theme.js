/**
 * -----------------------------------------------------------------------------
 * LOG-OCD: STYLE NEW-MAIN-THEME
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

var help = require('../../helpers');
var amend = help.amend;
var each  = help.each;
var fuse  = help.fuse;
var has   = help.has;
var seal  = help.seal;

var newEmptyObj = require('../../helpers/new-empty-obj');

var SECTION_PROPS = require('./values/section-props');
var SETTERS = require('./values/setters');

var DESC = {
  configurable: false,
  enumerable:   false
};

var newTheme = require('./new-theme');

/**
 * @param {string} section
 * @param {string} type
 * @param {Object<string, (string|boolean|Theme)>=} props
 * @return {MainTheme}
 */
module.exports = function newMainTheme(section, type, props) {

  /** @type {function} */
  var setter;
  /** @type {MainTheme} */
  var theme;
  /** @type {*} */
  var val;

  props = props || null;
  theme = newEmptyObj(type + 'Theme');
  theme = amend(theme, '__keys', null, DESC, 'strings');
  each(SECTION_PROPS[section][type], function(obj, key) {
    val = obj.make ? newTheme(obj.props) : obj.val;
    setter = has(SETTERS, key) && SETTERS[key].bind(theme);
    theme = setter
      ? amend(theme, key, val, obj.type, setter)
      : amend(theme, key, val, obj.type);
    if (setter && val) theme[key] = val;
  });
  theme = seal(theme);
  return fuse(theme, props);
};
