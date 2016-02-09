/**
 * -----------------------------------------------------------------------------
 * LOG-OCD: GET-PROP-VALS
 * -----------------------------------------------------------------------------
 * @version 1.0.0-beta.6
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

var help = require('../../../helpers');
var is    = help.is;
var fuse  = help.fuse;
var has   = help.has;
var remap = help.remap;

var color = require('../../../helpers/color');

var getKeys = require('../../helpers/get-keys');
var stripStyle = require('../../helpers/strip-style');

var toString = require('../../index');

/**
 * @param {Settings} settings
 * @param {string} method
 * @param {PropDetails} details
 * @param {!Object} obj
 * @return {!Array<string>}
 */
module.exports = function getPropVals(settings, method, details, obj) {

  /** @type {string} */
  var intro;

  intro = fuse(details.identifier, details.brackets[0]);
  return is.arr(obj)
    ? getArrVals(settings, method, details, obj, intro)
    : getObjVals(settings, method, details, obj, intro);
};

/**
 * @private
 * @param {Settings} settings
 * @param {string} method
 * @param {PropDetails} details
 * @param {!Object} obj
 * @param {string} intro
 * @return {!Array<string>}
 */
function getObjVals(settings, method, details, obj, intro) {

  /** @type {!Array<string>} */
  var vals;
  /** @type {!Array<string>} */
  var keys;
  /** @type {number} */
  var last;
  /** @type {number} */
  var len;
  /** @type {string} */
  var val;

  len  = getLen(intro);
  keys = getKeys(obj);
  last = getLastIndex(keys);
  vals = remap(keys, function(key, i) {
    settings.__keyLen = key.length + 2;
    val = toString.call(settings, method, obj[key]);
    key = fuse(key, ':');
    key = color(details.theme, key);
    val = fuse(key, ' ', val);
    if (i < last) val = fuse(val, details.delimiter);
    len = getLen(val, len);
    return val;
  });
  vals = fuse.val.top(vals, intro);
  vals.len = len < 0 ? len : getLen(details.brackets[1], len) + keys.length;
  return vals;
}

/**
 * @private
 * @param {Settings} settings
 * @param {string} method
 * @param {PropDetails} details
 * @param {!Array} arr
 * @param {string} intro
 * @return {!Array<string>}
 */
function getArrVals(settings, method, details, arr, intro) {

  /** @type {!Array<string>} */
  var vals;
  /** @type {number} */
  var last;
  /** @type {number} */
  var len;

  len  = getLen(intro);
  last = getLastIndex(arr);
  vals = remap(arr, function(val, i) {
    val = toString.call(settings, method, val);
    if (i < last) val = fuse(val, details.delimiter);
    len = getLen(val, len);
    return val;
  });
  vals = fuse.val.top(vals, intro);
  vals.len = len < 0 ? len : getLen(details.brackets[1], len) + arr.length;
  return vals;
}

/**
 * @private
 * @param {string} str
 * @param {number=} len
 * @return {number}
 */
function getLen(str, len) {
  if ( is.same(len, -1) ) return -1;
  len = len || 0;
  str = stripStyle(str);
  return has(str, '\n') ? -1 : len + str.length;
}

/**
 * @private
 * @param {!Array} arr
 * @return {number}
 */
function getLastIndex(arr) {
  return arr.length - 1;
}
