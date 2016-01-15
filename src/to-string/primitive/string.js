/**
 * -----------------------------------------------------------------------------
 * LOG-OCD: STRING-TO-STRING
 * -----------------------------------------------------------------------------
 * @version 1.0.0
 * @see [log-ocd]{@link https://github.com/imaginate/log-ocd}
 *
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2016 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
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
var fuse  = help.fuse;
var has   = help.has;
var remap = help.remap;
var roll  = help.roll;
var slice = help.slice;

var colors = require('../../helpers/colors');

var getDelimiter = require('../helpers/get-delimiter');
var getStyleKey = require('../helpers/get-style-key');
var getBrackets = require('../helpers/get-brackets');
var stripStyle = require('../helpers/strip-style');
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
  /** @type {string} */
  var line;

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
  limit -= this.__keyLen;
  limit -= getBracketsLen(brackets);

  if (limit <= 0 || str.length <= limit) {
    str = colors[style](str);
    return fuse(brackets[0], str, brackets[1]);
  }

  limit -= 2; // for delimiter
  delimiter = getDelimiter(' +', style);
  indent = fill(this.__indent, ' ');
  result = getLine(str, limit, brackets, delimiter, style);
  str = slice(str, limit);

  if (this.__keyLen) {
    limit += this.__keyLen;
    limit -= 2; // for indent
    indent = fuse(indent, '  ');
  }

  while (str.length > limit) {
    line = getLine(str, limit, brackets, delimiter, style, indent);
    result = fuse(result, line);
    str = slice(str, limit);
  }
  line = fuse(indent, brackets[0], colors[style](str), brackets[1]);
  return fuse(result, line);
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
  return fuse(indent, brackets[0], str, brackets[1], delimiter, '\n');
}

/**
 * @private
 * @param {!Array} brackets
 * @return {number}
 */
function getBracketsLen(brackets) {
  brackets = remap(brackets, function(bracket) {
    return bracket && stripStyle(bracket);
  });
  return roll.up(0, brackets, function(bracket) {
    return bracket.length;
  });
}
