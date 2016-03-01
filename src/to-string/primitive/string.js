/**
 * -----------------------------------------------------------------------------
 * LOG-OCD: STRING-TO-STRING
 * -----------------------------------------------------------------------------
 * @version 1.0.0-beta.6
 * @see [log-ocd]{@link https://github.com/imaginate/log-ocd}
 *
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2016 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
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
var fill  = help.fill;
var fuse  = help.fuse;
var has   = help.has;
var remap = help.remap;
var roll  = help.roll;
var slice = help.slice;
var until = help.until;

var color = require('../../helpers/color');

var getDelimiter = require('../helpers/get-delimiter');
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
 * @this {Settings}
 * @param {string} method
 * @param {string} str
 * @return {string}
 */
module.exports = function stringToString(method, str) {

  /** @type {string} */
  var delimiter;
  /** @type {!Array} */
  var brackets;
  /** @type {StringFormat} */
  var format;
  /** @type {string} */
  var result;
  /** @type {string} */
  var indent;
  /** @type {StringTheme} */
  var theme;
  /** @type {number} */
  var limit;
  /** @type {string} */
  var line;

  theme = this[method].style.string;
  str = remap(str, /\n/g, '\\n');

  if ( has(str, FILLER) ) {
    str = cut(str, /^<<|>>$/g);
    return color(theme, str);
  }

  format = this[method].format.string;
  brackets = getBrackets(theme, format.brackets);

  limit = getLimit(this[method].format.lineLimit, this.__maxLen);
  limit -= this.__indent;
  limit -= this.__keyLen;
  limit -= getBracketsLen(brackets);

  if (limit <= 0 || str.length <= limit) {
    str = color(theme, str);
    return fuse(brackets[0], str, brackets[1]);
  }

  limit -= 2; // for delimiter
  delimiter = getDelimiter(theme, ' +');
  indent = fill(this.__indent, ' ');
  result = getLine(theme, str, limit, brackets, delimiter);
  str = slice(str, limit);

  if (this.__keyLen) {
    limit += this.__keyLen;
    limit -= 2; // for indent
    indent = fuse(indent, '  ');
  }

  until(0, function() {
    line = getLine(theme, str, limit, brackets, delimiter, indent);
    result = fuse(result, line);
    str = slice(str, limit);
    return str.length;
  });
  return result;
};

/**
 * @private
 * @param {StringTheme} theme
 * @param {string} str
 * @param {number} end
 * @param {!Array} brackets
 * @param {string} delimiter
 * @param {string=} indent
 * @return {string}
 */
function getLine(theme, str, end, brackets, delimiter, indent) {
  delimiter = str.length > end ? fuse(delimiter, '\n') : '';
  str = slice(str, 0, end);
  str = color(theme, str);
  indent = indent || '';
  return fuse(indent, brackets[0], str, brackets[1], delimiter);
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
