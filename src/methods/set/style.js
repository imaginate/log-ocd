/**
 * -----------------------------------------------------------------------------
 * LOG-OCD: SET-STYLE
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
var is    = help.is;
var fuse  = help.fuse;
var has   = help.has;
var until = help.until;

var typeError = require('../helpers/type-error');
var rangeError = require('../helpers/range-error');
var propTypeError = require('../helpers/prop-type-error');
var propRangeError = require('../helpers/prop-range-error');

/**
 * @type {string}
 * @const
 */
var METHOD = 'setStyle';


/**
 * @this {Settings}
 * @param {string=} method - [default= "all"]
 * @param {!Object} props
 * @return {boolean}
 */
module.exports = function setStyle(method, props) {

  if (arguments.length < 2) {
    props = method;
    method = 'all';
  }

  if ( !is.str(method) ) return typeError(this, METHOD, 'method', method);
  if ( !is.obj(props)  ) return typeError(this, METHOD, 'props', props);

  if ( is.same(method, 'all') ) return setAll(this, props);

  if ( !has(this, method) ) return rangeError(this, METHOD, 'method', method);

  return setOne(this, method, props);
};

/**
 * @private
 * @param {Settings} settings
 * @param {!Object} props
 * @return {boolean}
 */
function setAll(settings, props) {

  /** @type {!MainTheme} */
  var maintheme;
  /** @type {!Theme} */
  var theme;
  /** @type {!Style} */
  var style;

  return !until(true, settings, function(setting, method) {
    style = setting.style;
    return until(false, props, function(val, key) {
      if ( !has(style, key) ) return true;
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
  });
}

/**
 * @private
 * @param {Settings} settings
 * @param {string} method
 * @param {!Object} props
 * @return {boolean}
 */
function setOne(settings, method, props) {

  /** @type {!MainTheme} */
  var maintheme;
  /** @type {!Theme} */
  var theme;
  /** @type {!Style} */
  var style;

  style = settings[method].style;
  return !until(false, props, function(val, key) {
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
}

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
