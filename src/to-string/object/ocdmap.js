/**
 * -----------------------------------------------------------------------------
 * LOG-OCD: OCDMAP-TO-STRING
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
var cut   = help.cut;
var fuse  = help.fuse;
var has   = help.has;
var remap = help.remap;
var roll  = help.roll;

var color = require('../../helpers/color');

var getDelimiter = require('../helpers/get-delimiter');
var stripStyle = require('../helpers/strip-style');
var getSpaces = require('../helpers/get-spaces');
var getKeys = require('../helpers/get-keys');

var toString = require('../index');

var OCDMAP = /^_*ocdmap$/i;

/**
 * @this {Settings}
 * @param {string} method
 * @param {!Object} obj
 * @return {string}
 */
module.exports = function ocdmapToString(method, obj) {

  /** @type {string} */
  var delimiter;
  /** @type {OcdMapFormat} */
  var format;
  /** @type {!Array<string>} */
  var spaces;
  /** @type {OcdMapTheme} */
  var theme;
  /** @type {!Array<string>} */
  var keys;
  /** @type {number} */
  var last;
  /** @type {number} */
  var len;
  /** @type {string} */
  var val;

  keys = getKeys(obj);
  keys = cut(keys, function(key) {
    return !has(key, OCDMAP);
  });

  if (!keys.length) return '';

  theme = this[method].style.ocdmap;
  format = this[method].format.ocdmap;
  spaces = getSpaces(format.spaceBefore, format.spaceAfter, theme);
  delimiter = getDelimiter(theme, format.delimiter);
  delimiter = fuse(delimiter, ' ');
  len = getExtraLen(spaces, delimiter);
  last = keys.length - 1;
  val = roll.up('', keys, function(key, i) {
    this.__keyLen = key.length + len;
    val = toString.call(this, method, obj[key]);
    val = i < last ? fuse(val, '\n') : val;
    key = color(theme, key);
    return fuse(spaces[0], key, spaces[1], delimiter, val);
  }, this);
  this.__keyLen = 0;
  return val;
};

/**
 * @private
 * @param {!Array} spaces
 * @param {string} delimiter
 * @return {number}
 */
function getExtraLen(spaces, delimiter) {
  spaces = remap(spaces, function(space) {
    return space && stripStyle(space);
  });
  delimiter = stripStyle(delimiter);
  return roll.up(delimiter.length, spaces, function(space) {
    return space.length;
  });
}
