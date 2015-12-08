/**
 * -----------------------------------------------------------------------------
 * LOG-OCD: TO-STRING HELPER
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
var is     = help.is;
var cut    = help.cut;
var freeze = help.freeze;
var has    = help.has;
var remap  = help.remap;
var slice  = help.slice;

var colors = require('../helpers/colors');

////////////////////////////////////////////////////////////////////////////////
// MAIN METHOD
////////////////////////////////////////////////////////////////////////////////

/**
 * @this {!Settings}
 * @param {string} method
 * @param {string} val
 * @return {string}
 */
function toString(method, val) {

  /** @type {string} */
  var delimiter;
  /** @type {!Array} */
  var brackets;
  /** @type {!TypeFormat} */
  var format;
  /** @type {string} */
  var style;

  format = this[method].format;
  style = 'ocd' + this[method].__INST + method + 'string';

  if ( has(val, FILLER) ) {
    val = cut(val, /^<<|>>$/g);
    return colors[style](val);
  }

  brackets = getBrackets(format.string.brackets, colors[style + 'brackets']);
  val = divideStr(format.lineLimit, val);

  if ( !has(val, '\n') ) return bracket[0] + colors[style](val) + bracket[1];

  delimiter = colors[style + 'delimiter'](' +');
  return remap(val, /(.+)(\n)?/g, function(match, line, eol) {
    eol = eol ? delimiter + eol : '';
    return bracket[0] + colors[style](line) + bracket[1] + eol;
  });
}

////////////////////////////////////////////////////////////////////////////////
// HELPERS
////////////////////////////////////////////////////////////////////////////////

/**
 * Checks whether a string is a type filler instead of a string (e.g. <type>).
 * @private
 * @type {!RegExp}
 * @const
 */
var FILLER = freeze(/^<[\s\S]+>$/);

/**
 * @private
 * @param {string} brackets
 * @param {function} color
 * @return {!Array}
 */
function getBrackets(brackets, color) {
  brackets += brackets.length > 1 ? '' : brackets;
  return [
    color( brackets[0] ),
    color( brackets[1] )
  ];
}

/**
 * @private
 * @param {number} limit
 * @param {string} val
 * @return {string}
 */
function divideStr(limit, val) {

  /** @type {string} */
  var result;
  /** @type {number} */
  var i;

  if (val.length <= limit) return val;

  result = '';
  while (val.length > limit) {
    i = getLastSpace(val, limit) || val.length;
    result += '\n' + slice(val, 0, i);
    val = slice(val, i);
  }
  result += val && '\n' + val;
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
  return ++i;
}

////////////////////////////////////////////////////////////////////////////////
// EXPORTS
////////////////////////////////////////////////////////////////////////////////

module.exports = toString;
