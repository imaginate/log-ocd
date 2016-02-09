/**
 * -----------------------------------------------------------------------------
 * LOG-OCD: HEADER-TO-STRING
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

var help = require('../../helpers');
var is   = help.is;
var fuse = help.fuse;
var roll = help.roll;

var color = require('../../helpers/color');

var parseAccents = require('../helpers/parse-accents');
var stripStyle = require('../helpers/strip-style');
var getAccent = require('../helpers/get-accent');
var getSpaces = require('../helpers/get-spaces');
var getLimit = require('../helpers/get-limit');
var noStyle = require('../helpers/no-style');

var linesToString = require('./lines');

/**
 * @this {!Settings}
 * @param {string} method
 * @param {string} header
 * @return {string}
 */
module.exports = function headerToString(method, header) {

  /** @type {?Object} */
  var accent;
  /** @type {Format} */
  var format;
  /** @type {!Array<string>} */
  var spaces;
  /** @type {string} */
  var result;
  /** @type {HeaderTheme} */
  var theme;
  /** @type {number} */
  var limit;
  /** @type {string} */
  var key;

  theme  = this[method].style.header;
  format = this[method].format.header;
  accent = getAccent(format.accentMark);
  spaces = getSpaces(format.spaceBefore, format.spaceAfter, theme);
  limit  = getLimit(format.lineLimit, this.__maxLen);
  limit -= limit && format.spaceBefore;
  limit -= limit && format.spaceAfter;
  header = parseAccents(header, accent);

  if ( limit && getLen(header) > limit ) {
    return linesToString(theme, header, ++limit, spaces);
  }

  header = roll.up('', header, function(part, i) {
    return is.odd(i) ? color(theme.accent, part) : color(theme, part);
  });
  result = fuse(spaces[0], header, spaces[1]);
  return noStyle(this[method].config) ? stripStyle(result) : result;
};

/**
 * @private
 * @param {!Array<string>} header
 * @return {number}
 */
function getLen(header) {
  return roll.up(0, header, function(part) {
    return part.length;
  });
}
