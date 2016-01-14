/**
 * -----------------------------------------------------------------------------
 * LOG-OCD: PRINT-VALS HELPER
 * -----------------------------------------------------------------------------
 * @version 1.0.0
 * @see [log-ocd]{@link https://github.com/imaginate/log-ocd}
 *
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2016 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
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
var is   = help.is;
var fill = help.fill;
var fuse = help.fuse;
var roll = help.roll;

var colors = require('../../../helpers/colors');

/**
 * @param {!Array<string>} vals
 * @param {Columns} columns
 * @param {!Array<string>} space
 * @param {string} style
 * @return {string}
 */
module.exports = function printVals(vals, columns, space, style) {

  /** @type {string} */
  var result;
  /** @type {string} */
  var key;
  /** @type {string} */
  var val;

  result = roll.up(space[0], columns, function(column, i) {
    val = prepVal(column, vals[i]);
    key = fuse(style, column.key);
    return colors[key](val);
  });
  return fuse(result, space[1]);
};

/**
 * @private
 * @param {Column} column
 * @param {string} val
 * @return {string}
 */
function prepVal(column, val) {

  /** @type {string} */
  var space;

  space = fill(column.len - val.length, ' ');
  val = is.same(column.align, 'left')
    ? fuse(val, space)
    : fuse(space, val);
  return fuse(column.space[0], val, column.space[1]);
}
