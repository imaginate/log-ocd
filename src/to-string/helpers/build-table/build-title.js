/**
 * -----------------------------------------------------------------------------
 * LOG-OCD: BUILD-TITLE HELPER
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

var help = require('../../../helpers');
var each  = help.each;
var fill  = help.fill;
var until = help.until;

var colors = require('../../../helpers/colors');

var getSpace = require('../get-space');

var buildItems = require('./build-items');

/**
 * @this {!Settings}
 * @param {!Columns} columns
 * @param {string} style
 * @return {string}
 */
module.exports = function buildTitle(columns, style) {

  /** @type {TitleFormat} */
  var format;
  /** @type {!Array<string>} */
  var space;
  /** @type {Items} */
  var items;
  /** @type {boolean} */
  var over;

  if (!this.trace.config.title) return '';

  style += '.title';
  format = this.trace.format.row;
  space = getSpace(format.spaceBefore, format.spaceAfter, style);
  over = columns.over && until(true, columns, function(column) {
    return column.title.length > column.len;
  });

  if (!over) return printTitle(columns, space, style);

  items = buildItems(columns);
  return printTitleItems(columns, items, space, style);
};

/**
 * @private
 * @param {!Columns} columns
 * @param {!Array} mainSpace
 * @param {string} style
 * @return {string}
 */
function printTitle(columns, mainSpace, style) {

  /** @type {string} */
  var result;
  /** @type {string} */
  var title;
  /** @type {string} */
  var space;

  style += '.';
  result = mainSpace[0];
  each(columns, function(column) {
    title = column.title;
    space = fill(column.len - title.length, ' ');
    title = column.align === 'left' ? title + space : space + title;
    title = column.space[0] + title + column.space[1];
    result += colors[style + column.key](title);
  });
  return result + mainSpace[1] + '\n';
}

/**
 * @private
 * @param {Columns} columns
 * @param {Items} items
 * @param {!Array} space
 * @param {string} style
 * @return {string}
 */
function printItems(columns, items, space, style) {

  /** @type {string} */
  var result;

  style += '.';
  result = '';
  each(items, function(item) {
    result += printItem(columns, item, space, style);
  });
  return result;
}

/**
 * @private
 * @param {Columns} columns
 * @param {Item} item
 * @param {!Array} space
 * @param {string} style
 * @return {string}
 */
function printItem(columns, item, space, style) {

  /** @type {string} */
  var result;
  /** @type {string} */
  var title;

  result = space[0];
  each(columns, function(column, i) {
    title = item[i];
    title = column.space[0] + title + column.space[1];
    result += colors[style + column.key](title);
  });
  return result + space[1] + '\n';
}
