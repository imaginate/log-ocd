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
var cut   = help.cut;
var fill  = help.fill;
var has   = help.has;
var remap = help.remap;
var slice = help.slice;

var colors = require('../../helpers/colors');

var getDelimiter = require('../helpers/get-delimiter');
var getBrackets = require('../helpers/get-brackets');
var getStyleKey = require('../helpers/get-style-key');
var getLimit = require('../helpers/get-limit');

/**
 * Checks whether a string is a type filler instead of a string (e.g. <type>).
 * @private
 * @type {!RegExp}
 * @const
 */
var FILLER = /^<[\s\S]+>$/;

/**
 * @this {!Settings}
 * @param {string} method
 * @param {string} str
 * @return {string}
 */
module.exports = function stringToString(method, str) {

  /** @type {string} */
  var delimiter;
  /** @type {!Array} */
  var brackets;
  /** @type {!StringFormat} */
  var format;
  /** @type {string} */
  var result;
  /** @type {string} */
  var indent;
  /** @type {string} */
  var style;
  /** @type {number} */
  var limit;

  style = getStyleKey(this, method, 'string');
  str = remap(str, /\n/g, '\\n');

  if ( has(str, FILLER) ) {
    str = cut(str, /^<<|>>$/g);
    return colors[style](str);
  }

  format = this[method].format.string;
  brackets = getBrackets(format.brackets, style);

  limit = getLimit(this[method].format.lineLimit, this.__maxLen);
  limit -= this.__indent;
  limit -= 6;

  if (limit <= 0 || str.length <= limit) {
    return brackets[0] + colors[style](str) + brackets[1];
  }

  delimiter = getDelimiter(' +', style);
  indent = fill(this.__indent + 2, ' ');
  result = brackets[0] + brackets[1] + delimiter + '\n';
  while (str.length > limit) {
    result += getLine(str, limit, brackets, delimiter, style, indent);
    str = slice(str, limit);
  }
  return result + indent + brackets[0] + colors[style](str) + brackets[1];
};

/**
 * @private
 * @param {string} str
 * @param {number} end
 * @param {!Array} brackets
 * @param {string} delimiter
 * @param {string} style
 * @param {string=} indent
 * @return {string}
 */
function getLine(str, end, brackets, delimiter, style, indent) {
  str = slice(str, 0, end);
  str = colors[style](str);
  indent = indent || '';
  return indent + brackets[0] + str + brackets[1] + delimiter + '\n';
}
