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

var help = require('../../helpers');
var is   = help.is;
var fuse = help.fuse;
var roll = help.roll;

var getSpaces = require('../helpers/get-spaces');

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
  /** @type {!{ odd: !Array<string>, even: !Array<string> }} */
  var spaces;
  /** @type {number} */
  var last;
  /** @type {string} */
  var nth;

  format = this.trace.format.row;
  style = fuse(style, '.row.');
  spaces = {
    even: getSpaces(format.spaceBefore, format.spaceAfter, fuse(style, 'even')),
    odd:  getSpaces(format.spaceBefore, format.spaceAfter, fuse(style, 'odd'))
  };
  last = stack.length - 1;
  return roll.up('', stack, function(trace, i) {
    nth = is.odd(i) ? 'odd' : 'even';
    trace = rowToString(trace, columns, spaces[nth], fuse(style, nth));
    return i < last ? fuse(trace, '\n') : trace;
  });
};
