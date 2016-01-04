/**
 * -----------------------------------------------------------------------------
 * LOG-OCD: BUILD-COLUMNS HELPER
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
var cut   = help.cut;
var each  = help.each;
var fuse  = help.fuse;
var slice = help.slice;
var until = help.until;

var floor = Math.floor;

var buildColumn = require('./build-column');

/**
 * @typedef {!Array<Column>} Columns
 */

/**
 * @this {!Settings}
 * @param {!Stack} stack
 * @return {!Columns}
 */
module.exports = function buildColumns(stack) {

  /** @type {!Columns} */
  var columns;
  /** @type {!Column} */
  var column;
  /** @type {!Config} */
  var config;
  /** @type {!Format} */
  var format;
  /** @type {number} */
  var maxLen;
  /** @type {string} */
  var title;

  config = this.trace.config;
  format = this.trace.format;
  columns = [];
  each('event, file, module, line, column', function(key) {
    if ( !config[key] ) return;
    title = config.title ? format[key].title : '';
    column = buildColumn.call(this, stack, key, title);
    columns = fuse(columns, column);
  }, this);

  format = format.row;
  maxLen = this.__maxLen - format.spaceBefore - format.spaceAfter;
  if (maxLen < 0) maxLen = 0;
  return fixColumnsLen(columns, maxLen);
};

/**
 * @private
 * @param {!Columns} columns
 * @param {number} maxLen
 * @return {!Columns}
 */
function fixColumnsLen(columns, maxLen) {

  /** @type {!Columns} */
  var dist;
  /** @type {number} */
  var len;

  len = getColumnsLen(columns);

  if (maxLen && len <= maxLen) return columns;

  dist = slice(columns);
  dist.max = maxLen;
  while (dist) dist = distColumns(dist);
  return columns;
};

/**
 * @private
 * @param {!Columns} columns
 * @return {number}
 */
function getColumnsLen(columns) {

  /** @type {number} */
  var len;

  len = 0;
  each(columns, function(column) {
    len += column.spread;
  });
  return len;
};

/**
 * @private
 * @param {!Columns} columns
 * @return {?Columns}
 */
function distColumns(columns) {

  /** @type {boolean} */
  var under;
  /** @type {boolean} */
  var over;
  /** @type {number} */
  var diff;
  /** @type {number} */
  var per;

  per = columns.max / columns.length;
  per = floor(per);

  under = until(false, columns, function(column) {
    return column.spread > per;
  });

  if (under) {
    return cut(columns, function(column) {
      over = column.spread > per;
      if (!over) columns.max -= column.spread;
      return over;
    };
  }

  each(columns, function(column) {
    diff = column.spread - column.len;
    column.spread = per;
    column.len = per - diff;
  });
  return null;
};
