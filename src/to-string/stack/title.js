/**
 * -----------------------------------------------------------------------------
 * LOG-OCD: TITLE-TO-STRING
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
var is    = help.is;
var fuse  = help.fuse;
var until = help.until;

var colors = require('../../helpers/colors');

var getSpaces = require('../helpers/get-spaces');

var buildVals = require('./helpers/build-vals');
var printVals = require('./helpers/print-vals');
var buildItems = require('./helpers/build-items');
var printItems = require('./helpers/print-items');

/**
 * @param {Settings} settings
 * @param {Columns} columns
 * @param {string} style
 * @return {string}
 */
module.exports = function titleToString(settings, columns, style) {

  /** @type {string} */
  var result;
  /** @type {TitleFormat} */
  var format;
  /** @type {!Array<string>} */
  var spaces;
  /** @type {Items} */
  var items;
  /** @type {!Array<string>} */
  var vals;
  /** @type {boolean} */
  var over;

  if (!settings.trace.config.title) return '';

  style = fuse(style, '.title');
  format = settings.trace.format.row;
  spaces = getSpaces(format.spaceBefore, format.spaceAfter, style);

  style = fuse(style, '.');
  vals = buildVals(columns);
  over = columns.over && until(true, columns, function(column, i) {
    return val[i].length > column.len;
  });

  if (over) items = buildItems(columns, vals);
  result = over
    ? printItems(items, columns, spaces, style)
    : printVals(vals, columns, spaces, style);
  return fuse(result, '\n');
};
