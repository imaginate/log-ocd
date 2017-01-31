/**
 * -----------------------------------------------------------------------------
 * LOG-OCD: BUILD-VALS HELPER
 * -----------------------------------------------------------------------------
 * @version 1.0.0-beta.10
 * @see [log-ocd]{@link https://github.com/imaginate/log-ocd}
 *
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2017 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
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
var remap = help.remap;
var same  = help.same;

/**
 * @param {Columns} columns
 * @param {Trace=} trace
 * @return {!Array<string>}
 */
module.exports = function buildVals(columns, trace) {

  if (!trace) return buildTitleVals(columns);

  return remap(columns, function(column) {
    return same(column.key, 'file')
      ? column.dirs[trace.index]
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
