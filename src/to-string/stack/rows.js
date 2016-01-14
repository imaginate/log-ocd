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
 * @typedef {!{
 *   odd:  !Array<string>,
 *   even: !Array<string>
 * }} AltSpaces
 */

/**
 * @param {Settings} settings
 * @param {Stack} stack
 * @param {Columns} columns
 * @param {string} style
 * @return {string}
 */
module.exports = function rowsToString(settings, stack, columns, style) {

  /** @type {StackFormat} */
  var format;
  /** @type {AltSpaces} */
  var spaces;
  /** @type {string} */
  var space;
  /** @type {number} */
  var last;
  /** @type {string} */
  var nth;

  format = settings.trace.format.row;
  style = fuse(style, '.row.');
  spaces = newAltSpaces(format, style);
  last = stack.length - 1;
  return roll.up('', stack, function(trace, i) {
    nth = is.odd(i) ? 'odd' : 'even';
    space = spaces[nth];
    nth = fuse(style, nth);
    trace = rowToString(trace, columns, space, nth);
    return i < last ? fuse(trace, '\n') : trace;
  });
};

/**
 * @private
 * @param {StackFormat} format
 * @param {string} style
 * @return {AltSpaces}
 */
function newAltSpaces(format, style) {
  return {
    even: newAltSpace(format, style, 'even'),
    odd:  newAltSpace(format, style, 'odd')
  };
}

/**
 * @private
 * @param {StackFormat} format
 * @param {string} style
 * @param {string} nth
 * @return {!Array<string>}
 */
function newAltSpace(format, style, nth) {
  style = fuse(style, nth);
  return getSpaces(format.spaceBefore, format.spaceAfter, style);
}
