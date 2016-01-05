/**
 * -----------------------------------------------------------------------------
 * LOG-OCD: STRING-TO-STRING
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
var cut    = help.cut;
var freeze = help.freeze;
var has    = help.has;
var remap  = help.remap;
var slice  = help.slice;

var colors = require('../../helpers/colors');

var getDelimiter = require('../helpers/get-delimiter');
var getBrackets = require('../helpers/get-brackets');
var getStyleKey = require('../helpers/get-style-key');

/**
 * Checks whether a string is a type filler instead of a string (e.g. <type>).
 * @private
 * @type {!RegExp}
 * @const
 */
var FILLER = freeze(/^<[\s\S]+>$/);

/**
 * @this {!Settings}
 * @param {string} method
 * @param {string} val
 * @return {string}
 */
module.exports = function stringToString(method, val) {

  /** @type {string} */
  var delimiter;
  /** @type {!Array} */
  var brackets;
  /** @type {!StringFormat} */
  var format;
  /** @type {string} */
  var style;

  style = getStyleKey.call(this, method, 'string');
  val = remap(val, /\n/g, '\\n');

  if ( has(val, FILLER) ) {
    val = cut(val, /^<<|>>$/g);
    return colors[style](val);
  }

  val = divideString(this[method].format.lineLimit, val);
  format = this[method].format.string;
  brackets = getBrackets(format.brackets, style);

  if ( !has(val, '\n') ) return brackets[0] + colors[style](val) + brackets[1];

  delimiter = getDelimiter(' +', style);
  return remap(val, /(.+)(\n)?/g, function(match, line, eol) {
    eol = eol ? delimiter + eol : '';
    return brackets[0] + colors[style](line) + brackets[1] + eol;
  });
};

/**
 * @private
 * @param {number} limit
 * @param {string} str
 * @return {string}
 */
function divideString(limit, str) {

  /** @type {string} */
  var result;
  /** @type {number} */
  var i;

  if (limit < 0 || str.length <= limit) return str;

  i = getLastSpace(str, limit);
  result = slice(str, 0, i);
  str = slice(str, i);
  while (str.length > limit) {
    i = getLastSpace(str, limit);
    result += '\n' + slice(str, 0, i);
    str = slice(str, i);
  }
  result += str && '\n' + str;
  return result;
}

/**
 * @private
 * @param {string} str
 * @param {number=} limit
 * @return {number}
 */
function getLastSpace(str, limit) {

  /** @type {string} */
  var temp;
  /** @type {number} */
  var i;

  temp = limit ? slice(str, 0, limit) : str;
  i = temp.lastIndexOf(' ') || str.indexOf(' ');
  return ++i || str.length;
}
