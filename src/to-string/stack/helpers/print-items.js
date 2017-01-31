/**
 * -----------------------------------------------------------------------------
 * LOG-OCD: PRINT-VALS HELPER
 * -----------------------------------------------------------------------------
 * @version 1.0.0-beta.9
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
var fuse = help.fuse;
var roll = help.roll;

var color = require('../../../helpers/color').parent;

/**
 * @param {StackRowTheme} theme
 * @param {Items} items
 * @param {Columns} columns
 * @param {!Array<string>} spaces
 * @return {string}
 */
module.exports = function printItems(theme, items, columns, spaces) {

  /** @type {number} */
  var last;

  last = items.length - 1;
  return roll.up('', items, function(item, i) {
    item = printItem(theme, item, columns, spaces);
    return i < last ? fuse(item, '\n') : item;
  });
};

/**
 * @private
 * @param {StackTheme} theme
 * @param {Item} item
 * @param {Columns} columns
 * @param {!Array} spaces
 * @return {string}
 */
function printItem(theme, item, columns, spaces) {

  /** @type {string} */
  var result;
  /** @type {string} */
  var val;

  result = roll.up(spaces[0], columns, function(column, i) {
    val = fuse(column.space[0], item[i], column.space[1]);
    return color(theme, theme[column.key], val);
  });
  return fuse(result, spaces[1]);
}
