/**
 * -----------------------------------------------------------------------------
 * LOG-OCD: SET-FORMAT
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

var help = require('../helpers');
var is    = help.is;
var fuse  = help.fuse;
var has   = help.has;
var until = help.until;

var execTypeError = require('./helpers/exec-type-error');
var execRangeError = require('./helpers/exec-range-error');
var execPropTypeError = require('./helpers/exec-prop-type-error');
var execPropRangeError = require('./helpers/exec-prop-range-error');

/**
 * @this {!Settings}
 * @param {string=} method - [default= "all"]
 * @param {!Object} props
 * @return {boolean}
 */
module.exports = function setFormat(method, props) {

  if (arguments.length === 1) {
    props = method;
    method = 'all';
  }

  if ( !is.str(method) ) {
    return execTypeError.call(this, 'setFormat', 'method', method);
  }
  if ( !is.obj(props) ) {
    return execTypeError.call(this, 'setFormat', 'props', props);
  }

  if (method === 'all') return setAll(this, props);

  if ( !has(this, method) ) {
    return execRangeError.call(this, 'setFormat', 'method', method);
  }

  return setOne(this, method, props);
};

/**
 * @private
 * @param {!Settings} settings
 * @param {!Object} props
 * @return {boolean}
 */
function setAll(settings, props) {

  /** @type {!SubFormat} */
  var subformat;
  /** @type {!Format} */
  var format;

  return !until(true, settings, function(setting, method) {
    format = setting.format;
    return until(false, props, function(val, key) {
      if ( !has(format, key) ) return true;
      if ( !is.obj(val) ) return setProp(settings, format, key, val);
      subformat = format[key];
      if ( !is.obj(subformat) ) {
        return execPropTypeError.call(settings, 'setFormat', key, val);
      }
      return !until(false, val, function(subval, subkey) {
        if ( !has(subformat, subkey) ) return true;
        return setProp(settings, subformat, key, subkey, subval);
      });
    });
  });
}

/**
 * @private
 * @param {!Settings} settings
 * @param {string} method
 * @param {!Object} props
 * @return {boolean}
 */
function setOne(settings, method, props) {

  /** @type {!SubFormat} */
  var subformat;
  /** @type {!Format} */
  var format;

  format = settings[method].format;
  return !until(false, props, function(val, key) {
    if ( !has(format, key) ) {
      return execPropRangeError.call(settings, 'setFormat', key);
    }
    if ( !is.obj(val) ) return setProp(settings, format, key, val);
    subformat = format[key];
    if ( !is.obj(subformat) ) {
      return execPropTypeError.call(settings, 'setFormat', key, val);
    }
    return !until(false, val, function(subval, subkey) {
      if ( !has(subformat, subkey) ) {
        subkey = fuse(key, '.', subkey);
        return execPropRangeError.call(settings, 'setFormat', subkey);
      }
      return setProp(settings, subformat, key, subkey, subval);
    });
  });
}

/**
 * @private
 * @param {!Settings} settings
 * @param {!(Format|SubFormat)} format
 * @param {string=} parent
 * @param {string} key
 * @param {*} val
 * @return {boolean}
 */
function setProp(settings, format, parent, key, val) {
  if (arguments.length === 4) {
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
    return execPropTypeError.call(settings, 'setFormat', key, val);
  }
  return true;
}
