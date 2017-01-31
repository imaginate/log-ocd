/**
 * -----------------------------------------------------------------------------
 * LOG-OCD: SET-FORMAT
 * -----------------------------------------------------------------------------
 * @version 1.0.0-beta.10
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
var fuse  = help.fuse;
var has   = help.has;
var until = help.until;

var propTypeError = require('../helpers/prop-type-error');
var propRangeError = require('../helpers/prop-range-error');

/**
 * @type {string}
 * @const
 */
var METHOD = 'setFormat';

/**
 * @param {Settings} settings
 * @param {!Object} props
 * @return {boolean}
 */
exports.all = function setAllFormat(settings, props) {

  /** @type {SubFormat} */
  var subformat;
  /** @type {Format} */
  var format;

  return !until(true, settings, function(setting, method) {
    format = setting.format;
    return until(false, props, function(val, key) {
      if ( !has(format, key) ) return true;
      if ( !is.obj(val) ) return setProp(settings, format, key, val);
      subformat = format[key];
      if ( !is.obj(subformat) ) return propTypeError(settings, METHOD, key, val);
      return !until(false, val, function(subval, subkey) {
        if ( !has(subformat, subkey) ) return true;
        return setProp(settings, subformat, key, subkey, subval);
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
exports.one = function setOneFormat(settings, method, props) {

  /** @type {SubFormat} */
  var subformat;
  /** @type {Format} */
  var format;

  format = settings[method].format;
  return !until(false, props, function(val, key) {
    if ( !has(format, key) ) return propRangeError(settings, METHOD, key);
    if ( !is.obj(val) ) return setProp(settings, format, key, val);
    subformat = format[key];
    if ( !is.obj(subformat) ) return propTypeError(settings, METHOD, key, val);
    return !until(false, val, function(subval, subkey) {
      if ( !has(subformat, subkey) ) {
        subkey = fuse(key, '.', subkey);
        return propRangeError(settings, METHOD, subkey);
      }
      return setProp(settings, subformat, key, subkey, subval);
    });
  });
};

/**
 * @private
 * @param {Settings} settings
 * @param {(Format|SubFormat)} format
 * @param {string=} parent
 * @param {string} key
 * @param {*} val
 * @return {boolean}
 */
function setProp(settings, format, parent, key, val) {

  if (arguments.length < 5) {
    val = key;
    key = parent;
    parent = '';
  }

  try {
    format[key] = val;
  }
  catch (error) {
    if (!error.__setter || !error.__type) throw error;
    if (parent) key = fuse(parent, '.', key);
    return propTypeError(settings, METHOD, key, val);
  }

  return true;
}
