/**
 * -----------------------------------------------------------------------------
 * LOG-OCD: BUILD-COLUMN HELPER
 * -----------------------------------------------------------------------------
 * @version 1.0.0-beta.11
 * @see [log-ocd]{@link https://github.com/imaginate/log-ocd}
 *
 * @author Adam Smith <imagineadamsmith@gmail.com> (https://github.com/imaginate)
 * @copyright 2022 Adam A Smith <imagineadamsmith@gmail.com> (https://github.com/imaginate)
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

var help = require('../../../helpers');
var fill  = help.fill;
var fuse  = help.fuse;
var remap = help.remap;
var roll  = help.roll;
var same  = help.same;
var slice = help.slice;
var to    = help.to;

/**
 * @typedef {!{
 *   key:    string,
 *   len:    number,
 *   dirs:   Array<string>,
 *   over:   boolean,
 *   title:  string,
 *   align:  string,
 *   space:  !Array,
 *   spread: number
 * }} Column
 */

/**
 * @param {Settings} settings
 * @param {Stack} stack
 * @param {string} key
 * @param {string} title
 * @return {Column}
 */
module.exports = function buildColumn(settings, stack, key, title) {

  /** @type {Column} */
  var column;
  /** @type {StackFormat} */
  var format;
  /** @type {number} */
  var limit;

  format = settings.trace.format[key];
  column = {
    key:   key,
    len:   stack[key],
    dirs:  null,
    over:  false,
    title: title,
    align: format.align,
    space: [
      fill(format.spaceBefore, ' '),
      fill(format.spaceAfter,  ' ')
    ]
  };
  if ( same(key, 'file') ) {
    column.dirs = getDirs(format.dirDepth, stack);
    column.len = getLen(column.len, column.dirs);
  }
  if (title.length > column.len) column.len = title.length;
  limit = format.lineLimit;
  if (limit && column.len > limit) {
    column.len = limit;
    column.over = true;
  }
  column.spread = column.len + column.space[0].length + column.space[1].length;
  return column;
};

/**
 * @private
 * @param {number} dirDepth
 * @param {Stack} stack
 * @return {!Array<string>}
 */
function getDirs(dirDepth, stack) {
  return remap(stack, function(trace) {
    return getDir(dirDepth, trace.dir, trace.file);
  });
}

/**
 * @private
 * @param {number} dirDepth
 * @param {!Array<string>} dirpath
 * @param {string} file
 * @return {string}
 */
function getDir(dirDepth, dirpath, file) {

  /** @type {number} */
  var index;

  if (!dirDepth || !dirpath.length) return file;

  if (dirDepth > -1) {
    index = 0 - dirDepth;
    dirpath = slice(dirpath, index);
  }
  dirpath = to.string(dirpath, '');
  return fuse(dirpath, '/', file);
}

/**
 * @private
 * @param {number} len
 * @param {!Array<string>} dirs
 * @return {number}
 */
function getLen(len, dirs) {
  return roll(len, dirs, function(len, dir) {
    return dir.length > len ? dir.length : len;
  });
}
