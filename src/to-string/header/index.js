/**
 * -----------------------------------------------------------------------------
 * LOG-OCD: HEADER-TO-STRING
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
var each  = help.each;
var remap = help.remap;

var colors = require('../../helpers/colors');

var parseAccents = require('../helpers/parse-accents');
var getStyleKey = require('../helpers/get-style-key');
var getAccent = require('../helpers/get-accent');
var getSpaces = require('../helpers/get-spaces');
var getLimit = require('../helpers/get-limit');

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
  var style;
  /** @type {number} */
  var limit;

  style  = getStyleKey(this, method, 'header');
  format = this[method].format.header;
  accent = getAccent(format.accentMark);
  spaces = getSpaces(format.spaceBefore, format.spaceAfter, style);
  limit  = getLimit(format.lineLimit, this.__maxLen);
  limit -= limit && format.spaceBefore;
  limit -= limit && format.spaceAfter;
  header = parseAccents(header, accent);

  if ( limit && getLen(header) > limit ) {
    return linesToString(header, ++limit, spaces, style);
  }

  header = remap(header, function(part, i) {
    return colors[ i % 2 ? style + '.accent' : style ](part);
  });
  return spaces[0] + header.join('') + spaces[1];
};

/**
 * @private
 * @param {!Array<string>} header
 * @return {number}
 */
function getLen(header) {

  /** @type {number} */
  var len;

  len = 0;
  each(header, function(part) {
    len += part.length;
  });
  return len;
}
