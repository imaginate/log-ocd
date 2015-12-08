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

var help = require('../helpers');
var cut    = help.cut;
var freeze = help.freeze;
var has    = help.has;
var remap  = help.remap;

var colors = require('../helpers/colors');

var getDelimiter = require('./helpers/get-delimiter');
var getBrackets = require('./helpers/get-brackets');
var divideString = require('./helpers/divide-string');

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
  /** @type {!TypeFormat} */
  var format;
  /** @type {string} */
  var style;

  style = 'ocd' + this[method].__INST + method + 'string';
  format = this[method].format;

  if ( has(val, FILLER) ) {
    val = cut(val, /^<<|>>$/g);
    return colors[style](val);
  }

  val = divideString(format.lineLimit, val);
  format = format.string;
  brackets = getBrackets(format.brackets, style);

  if ( !has(val, '\n') ) return brackets[0] + colors[style](val) + brackets[1];

  delimiter = getDelimiter(' +', style);
  return remap(val, /(.+)(\n)?/g, function(match, line, eol) {
    eol = eol ? delimiter + eol : '';
    return brackets[0] + colors[style](line) + brackets[1] + eol;
  });
};
