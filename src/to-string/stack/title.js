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

var until = require('../../helpers').until;

var colors = require('../../helpers/colors');

var getSpaces = require('../helpers/get-spaces');

var buildVals = require('./helpers/build-vals');
var printVals = require('./helpers/print-vals');
var buildItems = require('./helpers/build-items');
var printItems = require('./helpers/print-items');

/**
 * @this {!Settings}
 * @param {!Columns} columns
 * @param {string} style
 * @return {string}
 */
module.exports = function titleToString(columns, style) {

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

  if (!this.trace.config.title) return '';

  style += '.title';
  format = this.trace.format.row;
  spaces = getSpaces(format.spaceBefore, format.spaceAfter, style);

  style += '.';
  vals = buildVals(columns);
  over = columns.over && until(true, columns, function(column, i) {
    return val[i].length > column.len;
  });

  if (!over) return printVals(vals, columns, spaces, style);

  items = buildItems(columns, vals);
  return printItems(items, columns, spaces, style);
};
