/**
 * -----------------------------------------------------------------------------
 * LOG-OCD: ROW-TO-STRING
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

var buildVals = require('./helpers/build-vals');
var printVals = require('./helpers/print-vals');
var buildItems = require('./helpers/build-items');
var printItems = require('./helpers/print-items');

/**
 * @param {Trace} trace
 * @param {Columns} columns
 * @param {!Array<string>} space
 * @param {string} style
 * @return {string}
 */
module.exports = function rowToString(trace, columns, space, style) {

  /** @type {Items} */
  var items;
  /** @type {!Array<string>} */
  var vals;
  /** @type {boolean} */
  var over;

  style = fuse(style, '.');
  vals = buildVals(columns, trace);
  over = until(true, columns, function(column, i) {
    if ( !column.over && !is.same(column.key, 'file') ) return false;
    return vals[i].length > column.len;
  });

  if (!over) return printVals(vals, columns, space, style);

  items = buildItems(columns, vals);
  return printItems(items, columns, space, style);
};
