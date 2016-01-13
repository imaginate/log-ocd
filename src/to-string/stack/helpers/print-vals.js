/**
 * -----------------------------------------------------------------------------
 * LOG-OCD: PRINT-VALS HELPER
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
  var val;

  result = roll.up(space[0], columns, function(column, i) {
    val = fuse(column.space[0], vals[i], column.space[1]);
    i = fuse(style, column.key);
    return colors[i](val);
  });
  return fuse(result, space[1]);
};
