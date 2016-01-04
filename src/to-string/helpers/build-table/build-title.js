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
var fuse  = help.fuse;
var remap = help.remap;
var slice = help.slice;
var until = help.until;

var colors = require('../../../helpers/colors');

var getSpace = require('../get-space');

/**
 * @this {!Settings}
 * @param {!Columns} columns
 * @param {string} style
 * @return {string}
 */
module.exports = function buildTitle(columns, style) {

  /** @type {!TitleFormat} */
  var format;
  /** @type {!Array<string>} */
  var space;
  /** @type {!Array<string>} */
  var rows;
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

  rows = getTitleRows(columns);
  return printTitleRows(columns, rows, space, style);
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
 * @typedef {!Array<string>} TitleRow
 * @typedef {!Array<TitleRow>} TitleRows
 * @typedef {!{ title: string, done: boolean }} TitleItem
 * @typedef {!Array<TitleItem>} RowManager
 */

/**
 * @private
 * @param {Columns} columns
 * @return {TitleRows}
 */
function getTitleRows(columns) {

  /** @type {RowManager} */
  var manager;
  /** @type {TitleRows} */
  var rows;

  manager = getRowManager(columns);
  manager.rows = [];
  until(0, 100, function() {
    manager = addTitleRow(columns, manager);
    return manager.leftover;
  });
  return manager.rows;
}

/**
 * @private
 * @param {Columns} columns
 * @return {RowManager}
 */
function getRowManager(columns) {

  /** @type {number} */
  var leftover;
  /** @type {RowManager} */
  var manager;
  /** @type {TitleItem} */
  var item;

  leftover = 0;
  manager = remap(columns, function(column) {
    item = {};
    item.done = !column.title.length;
    item.title = item.done ? fill(column.len, ' ') : column.title;
    if (!item.done) ++leftover;
    return item;
  });
  manager.leftover = leftover;
  return manager;
}

/**
 * @private
 * @param {Columns} columns
 * @param {RowManager} manager
 * @return {RowManager}
 */
function addTitleRow(columns, manager) {

  /** @type {Column} */
  var column;
  /** @type {string} */
  var title;
  /** @type {string} */
  var space;
  /** @type {TitleRow} */
  var row;

  row = remap(manager, function(item, i) {
    column = columns[i];
    title = item.title;

    if (title.length > column.len) {
      i = column.len + 1;
      item.title = slice(title, i);
      return slice(title, 0, i);
    }

    if (item.done) return title;

    --manager.leftover;
    item.done = true;
    item.title = fill(column.len, ' ');
    space = fill(column.len - title.length, ' ');
    return column.align === 'left' ? title + space : space + title;
  });
  manager.rows.push(row);
  return manager;
}

/**
 * @private
 * @param {Columns} columns
 * @param {TitleRows} rows
 * @param {!Array} space
 * @param {string} style
 * @return {string}
 */
function printTitleRows(columns, rows, space, style) {

  /** @type {string} */
  var result;

  style += '.';
  result = '';
  each(rows, function(row) {
    result += printTitleRow(columns, row, space, style);
  });
  return result;
}

/**
 * @private
 * @param {Columns} columns
 * @param {TitleRow} row
 * @param {!Array} space
 * @param {string} style
 * @return {string}
 */
function printTitleRow(columns, row, space, style) {

  /** @type {string} */
  var result;
  /** @type {string} */
  var title;

  result = space[0];
  each(columns, function(column, i) {
    title = row[i];
    title = column.space[0] + title + column.space[1];
    result += colors[style + column.key](title);
  });
  return result + space[1] + '\n';
}
