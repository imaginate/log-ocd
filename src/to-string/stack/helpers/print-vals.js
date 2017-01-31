/**
 * -----------------------------------------------------------------------------
 * LOG-OCD: PRINT-VALS HELPER
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

var help = require('../../../helpers');
var fill = help.fill;
var fuse = help.fuse;
var roll = help.roll;
var same  = help.same;

var color = require('../../../helpers/color').parent;

/**
 * @param {StackRowTheme} theme
 * @param {!Array<string>} vals
 * @param {Columns} columns
 * @param {!Array<string>} spaces
 * @return {string}
 */
module.exports = function printVals(theme, vals, columns, spaces) {

  /** @type {string} */
  var result;
  /** @type {string} */
  var key;
  /** @type {string} */
  var val;

  result = roll.up(spaces[0], columns, function(column, i) {
    val = prepVal(column, vals[i]);
    return color(theme, theme[column.key], val);
  });
  return fuse(result, spaces[1]);
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
  val = same(column.align, 'left')
    ? fuse(val, space)
    : fuse(space, val);
  return fuse(column.space[0], val, column.space[1]);
}
