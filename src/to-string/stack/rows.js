/**
 * -----------------------------------------------------------------------------
 * LOG-OCD: ROWS-TO-STRING
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

var each = require('../../helpers').each;

var getSpace = require('../helpers/get-space');

var rowToString = require('./row');

/**
 * @this {!Settings}
 * @param {!Stack} stack
 * @param {!Columns} columns
 * @param {string} style
 * @return {string}
 */
module.exports = function rowsToString(stack, columns, style) {

  /** @type {!StackFormat} */
  var format;
  /** @type {string} */
  var result;
  /** @type {!{ odd: !Array<string>, even: !Array<string> }} */
  var space;
  /** @type {string} */
  var nth;

  format = this.trace.format.row;
  style += '.row.';
  space = {
    even: getSpace(format.spaceBefore, format.spaceAfter, style + 'even'),
    odd:  getSpace(format.spaceBefore, format.spaceAfter, style + 'odd')
  };
  result = '';
  each(stack, function(trace, i) {
    nth = i % 2 ? 'odd' : 'even';
    result += rowToString(trace, columns, space[nth], style + nth);
  });
  return result;
};
