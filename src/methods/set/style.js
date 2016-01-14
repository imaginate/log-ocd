/**
 * -----------------------------------------------------------------------------
 * LOG-OCD: SET-STYLE
 * -----------------------------------------------------------------------------
 * @version 1.0.0
 * @see [log-ocd]{@link https://github.com/imaginate/log-ocd}
 *
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2016 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
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
var is    = help.is;
var cut   = help.cut;
var fuse  = help.fuse;
var get   = help.get;
var has   = help.has;
var until = help.until;

var setColors = require('../../helpers/colors').setThemes;

var propTypeError = require('../helpers/prop-type-error');
var propRangeError = require('../helpers/prop-range-error');

/**
 * @type {string}
 * @const
 */
var METHOD = 'setStyle';

/**
 * @param {Settings} settings
 * @param {!Object} props
 * @return {boolean}
 */
exports.all = function setAllStyle(settings, props) {

  /** @type {MainTheme} */
  var maintheme;
  /** @type {boolean} */
  var result;
  /** @type {Theme} */
  var theme;
  /** @type {Style} */
  var style;
  /** @type {!Array} */
  var keys;
  /** @type {*} */
  var val;

  return !until(true, settings, function(setting, method) {
    style = setting.style;
    keys = get.keys(props);
    keys = cut(keys, function(key) {
      return has(style, key);
    });
    result = until(false, keys, function(key) {
      val = props[key];
      if ( !is.obj(val) ) return setProp(settings, style, key, val);
      maintheme = style[key];
      if ( !is.obj(maintheme) ) return propTypeError(settings, METHOD, key, val);
      return !until(false, val, function(mainval, mainkey) {
        if ( !has(maintheme, mainkey) ) return true;
        if ( !is.obj(mainval) ) {
          return setProp(settings, maintheme, key, mainkey, mainval);
        }
        theme = maintheme[mainkey];
        mainkey = fuse(key, '.', mainkey);
        if ( !is.obj(theme) ) {
          return propTypeError(settings, METHOD, mainkey, mainval);
        }
        return !until(false, mainval, function(val, key) {
          if ( !has(theme, key) ) {
            key = fuse(mainkey, '.', key);
            return propRangeError(settings, METHOD, key);
          }
          return setProp(settings, theme, mainkey, key, val);
        });
      });
    });
    setColors(settings.__INST, style, method, keys);
    return result;
  });
};

/**
 * @param {Settings} settings
 * @param {string} method
 * @param {!Object} props
 * @return {boolean}
 */
exports.one = function setOneStyle(settings, method, props) {

  /** @type {!MainTheme} */
  var maintheme;
  /** @type {boolean} */
  var result;
  /** @type {Theme} */
  var theme;
  /** @type {!Style} */
  var style;
  /** @type {!Array} */
  var keys;

  style = settings[method].style;
  result = !until(false, props, function(val, key) {
    if ( !has(style, key) ) return propRangeError(settings, METHOD, key);
    if ( !is.obj(val) ) return setProp(settings, style, key, val);
    maintheme = style[key];
    if ( !is.obj(maintheme) ) return propTypeError(settings, METHOD, key, val);
    return !until(false, val, function(mainval, mainkey) {
      if ( !has(maintheme, mainkey) ) {
        mainkey = fuse(key, '.', mainkey);
        return propRangeError(settings, METHOD, mainkey);
      }
      if ( !is.obj(mainval) ) {
        return setProp(settings, maintheme, key, mainkey, mainval);
      }
      theme = maintheme[mainkey];
      mainkey = fuse(key, '.', mainkey);
      if ( !is.obj(theme) ) {
        return propTypeError(settings, METHOD, mainkey, mainval);
      }
      return !until(false, mainval, function(val, key) {
        if ( !has(theme, key) ) {
          key = fuse(mainkey, '.', key);
          return propRangeError(settings, METHOD, key);
        }
        return setProp(settings, theme, mainkey, key, val);
      });
    });
  });
  keys = get.keys(props);
  if (!result) {
    keys = cut(keys, function(key) {
      return has(style, key);
    });
  }
  setColors(settings.__INST, style, method, keys);
  return result;
};

/**
 * @private
 * @param {Settings} settings
 * @param {(Style|MainTheme)} style
 * @param {string=} parent
 * @param {string} key
 * @param {*} val
 * @return {boolean}
 */
function setProp(settings, style, parent, key, val) {

  if (arguments.length < 5) {
    val = key;
    key = parent;
    parent = '';
  }

  try {
    style[key] = val;
  }
  catch (error) {
    if (!error.__setter || !error.__type) throw error;
    if (parent) key = fuse(parent, '.', key);
    return propTypeError(settings, METHOD, key, val);
  }

  return true;
}
