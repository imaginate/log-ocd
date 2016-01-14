/**
 * -----------------------------------------------------------------------------
 * LOG-OCD: BUILD-VALS HELPER
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
var is    = help.is;
var fuse  = help.fuse;
var remap = help.remap;
var slice = help.slice;

/**
 * @param {Columns} columns
 * @param {Trace=} trace
 * @return {!Array<string>}
 */
module.exports = function buildVals(columns, trace) {

  if (!trace) return buildTitleVals(columns);

  return remap(columns, function(column) {
    return is.same(column.key, 'file') && column.dirs
      ? buildFileVal(column.dirs, trace.dir, trace.file)
      : trace[column.key];
  });
};

/**
 * @private
 * @param {Columns} columns
 * @return {!Array<string>}
 */
function buildTitleVals(columns) {
  return remap(columns, function(column) {
    return column.title;
  });
}

/**
 * @private
 * @param {number} len
 * @param {!Array<string>} dirpath
 * @param {string} file
 * @return {string}
 */
function buildFileVal(len, dirpath, file) {

  /** @type {string} */
  var result;

  if (len > -1) {
    len = 0 - len;
    dirpath = slice(dirpath, len);
  }
  result = dirpath.join('/');
  return fuse(result, '/', file);
}
