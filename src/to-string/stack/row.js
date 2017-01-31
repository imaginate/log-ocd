/**
 * -----------------------------------------------------------------------------
 * LOG-OCD: ROW-TO-STRING
 * -----------------------------------------------------------------------------
 * @version 1.0.0-beta.8
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

var help = require('../../helpers');
var fuse  = help.fuse;
var same  = help.same;
var until = help.until;

var buildVals = require('./helpers/build-vals');
var printVals = require('./helpers/print-vals');
var buildItems = require('./helpers/build-items');
var printItems = require('./helpers/print-items');

/**
 * @param {StackRowTheme} theme
 * @param {Trace} trace
 * @param {Columns} columns
 * @param {!Array<string>} spaces
 * @return {string}
 */
module.exports = function rowToString(theme, trace, columns, spaces) {

  /** @type {Items} */
  var items;
  /** @type {!Array<string>} */
  var vals;
  /** @type {boolean} */
  var over;

  vals = buildVals(columns, trace);
  over = until(true, columns, function(column, i) {
    if ( !column.over && !same(column.key, 'file') ) return false;
    return vals[i].length > column.len;
  });

  if (!over) return printVals(theme, vals, columns, spaces);

  items = buildItems(columns, vals);
  return printItems(theme, items, columns, spaces);
};
