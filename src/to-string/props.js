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
var cut  = help.cut;
var each = help.each;
var fill = help.fill;
var fuse = help.fuse;
var has  = help.has;

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
  /** @type {function} */
  var exec;

  details = newPropDetails(this, method, type);

  if ( is.empty(obj) ) return emptyObj(details.identifier, details.brackets);

  if (details.indent > 0) this.__indent += details.indent;
  exec = is.arr(obj) ? objectPropsToString : arrayPropsToString;
  return exec.call(this, method, details, obj);
};

/**
 * @private
 * @param {string} identifier
 * @param {!Array} brackets
 * @return {string}
 */
function emptyObj(identifier, brackets) {
  return identifier + brackets[0] + brackets[1];
}

/**
 * @private
 * @this {!Settings}
 * @param {string} method
 * @param {!PropDetails} details
 * @param {!Object} obj
 * @return {string}
 */
function objectPropsToString(method, details, obj) {

  /** @type {string} */
  var result;
  /** @type {!Array<string>} */
  var vals;
  /** @type {!Array<string>} */
  var keys;
  /** @type {(number|string)} */
  var last;
  /** @type {(number|boolean)} */
  var len;

  vals = getObjVals.call(this, method, details, obj);

  // CONTINUE DEV HERE
  // MAX LEN & LIMIT
  /*len = len < vals.limit;
  last = len ? ' ' : '\n' + fill(vals.indent, ' ');
  result = result.join(last);
  result += len ? ' ' : '\n';
  return result + vals.brackets[1];
  if (details.indent > 0) this.__indent -= details.indent;*/
};

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
  last = lastIndex(keys);
  vals = remap(keys, function(key, i) {
    key = color(key + ':') + ' ' + toString.call(this, method, obj[key]);
    len = getLen(key, len);
    return i < last ? key + details.delimiter : key;
  }, this);
  vals = fuse([ intro ], vals);
  vals.len = len;
  return vals;
};

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
function lastIndex(arr) {
  return arr.length - 1;
}
