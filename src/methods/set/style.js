/**
 * -----------------------------------------------------------------------------
 * LOG-OCD: SET-STYLE
 * -----------------------------------------------------------------------------
 * @version 1.0.0-beta.9
 * @see [log-ocd]{@link https://github.com/imaginate/log-ocd}
 *
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2017 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
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
var is    = help.is;
var cut   = help.cut;
var fuse  = help.fuse;
var get   = help.get;
var has   = help.has;
var until = help.until;

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

  /** @type {Theme} */
  var theme;
  /** @type {Style} */
  var style;
  /** @type {MainTheme} */
  var main;

  return !until(true, settings, function(setting, method) {
    style = setting.style;
    return until(false, props, function(val, key) {
      if ( !has(style, key) ) return true;
      if ( !is.obj(val) ) return setProp(settings, style, key, val);
      main = style[key];
      if ( !is.obj(main) ) return propTypeError(settings, METHOD, key, val);
      return !until(false, val, function(mainval, mainkey) {
        if ( !has(main, mainkey) ) return true;
        if ( !is.obj(mainval) ) {
          return setProp(settings, main, key, mainkey, mainval);
        }
        theme = main[mainkey];
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
};

/**
 * @param {Settings} settings
 * @param {string} method
 * @param {!Object} props
 * @return {boolean}
 */
exports.one = function setOneStyle(settings, method, props) {

  /** @type {Style} */
  var style;
  /** @type {Theme} */
  var theme;
  /** @type {MainTheme} */
  var main;

  style = settings[method].style;
  return !until(false, props, function(val, key) {
    if ( !has(style, key) ) return propRangeError(settings, METHOD, key);
    if ( !is.obj(val) ) return setProp(settings, style, key, val);
    main = style[key];
    if ( !is.obj(main) ) return propTypeError(settings, METHOD, key, val);
    return !until(false, val, function(mainval, mainkey) {
      if ( !has(main, mainkey) ) {
        mainkey = fuse(key, '.', mainkey);
        return propRangeError(settings, METHOD, mainkey);
      }
      if ( !is.obj(mainval) ) {
        return setProp(settings, main, key, mainkey, mainval);
      }
      theme = main[mainkey];
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
