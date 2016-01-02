/**
 * -----------------------------------------------------------------------------
 * LOG-OCD: PROPS-TO-STRING
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
var fill  = help.fill;
var fuse  = help.fuse;
var has   = help.has;
var remap = help.remap;

var colors = require('../helpers/colors');

var getKeys = require('./helpers/get-keys');
var stripStyle = require('./helpers/strip-style');
var newPropDetails = require('./helpers/new-prop-details');

var toString = require('./index');

/**
 * @this {!Settings}
 * @param {string} method
 * @param {string} type
 * @param {!Object} obj
 * @return {string}
 */
module.exports = function propsToString(method, type, obj) {

  /** @type {!PropDetails} */
  var details;
  /** @type {!Array<string>} */
  var vals;

  details = newPropDetails(this, method, type);

  if ( is.empty(obj) ) return printVals(details);

  this.__indent += details.indent;
  vals = is.arr(obj)
    ? getArrVals.call(this, method, details, obj)
    : getObjVals.call(this, method, details, obj);
  this.__indent -= details.indent;
  return printVals(details, vals);
};

/**
 * @private
 * @param {!PropDetails} details
 * @param {!Array<string>=} vals
 * @return {string}
 */
function printVals(details, vals) {

  /** @type {string} */
  var result;
  /** @type {string} */
  var indent;

  if (!vals) {
    return details.identifier + details.brackets[0] + details.brackets[1];
  }

  if ( !details.limit || (vals.len > 0 && vals.len <= details.limit) ) {
    return vals.join(' ') + ' ' + details.brackets[1];
  }

  indent = fill(details.indent + this.__indent, ' ');
  result = vals.join('\n' + indent);
  indent = fill(this.__indent, ' ');
  return result + '\n' + indent + vals.brackets[1];
}

/**
 * @private
 * @this {!Settings}
 * @param {string} method
 * @param {!PropDetails} details
 * @param {!Object} obj
 * @return {!Array<string>}
 */
function getObjVals(method, details, obj) {

  /** @type {string} */
  var intro;
  /** @type {function} */
  var color;
  /** @type {!Array<string>} */
  var vals;
  /** @type {!Array<string>} */
  var keys;
  /** @type {number} */
  var last;
  /** @type {number} */
  var len;

  color = colors[details.style];
  intro = getIntro(details);
  len  = getLen(intro);
  keys = getKeys(obj);
  last = getLastIndex(keys);
  vals = remap(keys, function(key, i) {
    key = color(key + ':') + ' ' + toString.call(this, method, obj[key]);
    if (i < last) key += details.delimiter;
    len = getLen(key, len);
    return key;
  }, this);
  vals = fuse([ intro ], vals);
  vals.len = len === -1 ? len : getLen(details.brackets[1], len) + keys.length;
  return vals;
}

/**
 * @private
 * @this {!Settings}
 * @param {string} method
 * @param {!PropDetails} details
 * @param {!Array} arr
 * @return {!Array<string>}
 */
function getArrVals(method, details, arr) {

  /** @type {string} */
  var intro;
  /** @type {function} */
  var color;
  /** @type {!Array<string>} */
  var vals;
  /** @type {number} */
  var last;
  /** @type {number} */
  var len;

  color = colors[details.style];
  intro = getIntro(details);
  len  = getLen(intro);
  last = getLastIndex(arr);
  vals = remap(arr, function(val, i) {
    val = toString.call(this, method, val);
    if (i < last) val += details.delimiter;
    len = getLen(val, len);
    return val;
  }, this);
  vals = fuse([ intro ], vals);
  vals.len = len === -1 ? len : getLen(details.brackets[1], len) + arr.length;
  return vals;
}

/**
 * @private
 * @param {!PropDetails} details
 * @return {string}
 */
function getIntro(details) {
  return details.identifier + details.brackets[0];
}

/**
 * @private
 * @param {string} str
 * @param {number=} len
 * @return {number}
 */
function getLen(str, len) {
  if (len === -1) return -1;
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
