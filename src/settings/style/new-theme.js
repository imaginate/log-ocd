/**
 * -----------------------------------------------------------------------------
 * LOG-OCD: STYLE NEW-THEME
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

var help = require('../../helpers');
var amend = help.amend;
var each  = help.each;
var fuse  = help.fuse;
var seal  = help.seal;

var newEmptyObj = require('../../helpers/new-empty-obj');

var THEME_PROPS = require('./values/theme-props');
var SETTERS = require('./values/setters');

var DESC = {
  configurable: false,
  enumerable:   false
};

/**
 * @param {Object<string, (string|boolean)>=} props
 * @return {Theme}
 */
module.exports = function newTheme(props) {

  /** @type {function} */
  var setter;
  /** @type {Theme} */
  var theme;

  props = props || null;
  theme = newEmptyObj('Theme');
  theme = amend(theme, '__keys', null, DESC, 'strings');
  each(THEME_PROPS, function(obj, key) {
    setter = SETTERS[key].bind(theme);
    theme = amend(theme, key, obj.val, obj.type, setter);
  });
  theme = seal(theme);
  return fuse(theme, props);
};
