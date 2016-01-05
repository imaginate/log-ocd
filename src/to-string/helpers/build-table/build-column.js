/**
 * -----------------------------------------------------------------------------
 * LOG-OCD: BUILD-COLUMN HELPER
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

var fill = require('../../../helpers').fill;

/**
 * @typedef {!{
 *   key:    string,
 *   len:    number,
 *   dirs:   (number|undefined),
 *   over:   boolean,
 *   title:  string,
 *   align:  string,
 *   space:  !Array,
 *   spread: number
 * }} Column
 */

/**
 * @this {!Settings}
 * @param {!Stack} stack
 * @param {string} key
 * @param {string} title
 * @return {!Column}
 */
module.exports = function buildColumn(stack, key, title) {

  /** @type {!Column} */
  var column;
  /** @type {!StackFormat} */
  var format;
  /** @type {number} */
  var limit;

  format = this.trace.format[key];
  column = {
    key:   key,
    len:   stack[key],
    over:  false,
    title: title,
    align: key === 'line' || key === 'column' ? 'right' : 'left',
    space: [
      fill(format.spaceBefore, ' '),
      fill(format.spaceAfter,  ' ')
    ]
  };
  if (title.length > column.len) column.len = title.length;
  limit = format.lineLimit;
  if (limit && column.len > limit) {
    column.len = limit;
    column.over = true;
  }
  column.spread = column.len + column.space[0].length + column.space[1].length;
  return column;
};
