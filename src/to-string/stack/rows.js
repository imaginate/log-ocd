/**
 * -----------------------------------------------------------------------------
 * LOG-OCD: ROWS-TO-STRING
 * -----------------------------------------------------------------------------
 * @version 1.0.0
 * @see [log-ocd]{@link https://github.com/imaginate/log-ocd}
 *
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2016 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Supporting Libraries:
 * @see [are]{@link https://github.com/imaginate/are}
 * @see [chalk]{@link https://github.com/chalk/chalk}
 * @see [vitals]{@link https://github.com/imaginate/vitals}
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
 * @param {Settings} settings
 * @param {Stack} stack
 * @param {Columns} columns
 * @return {string}
 */
module.exports = function rowsToString(settings, stack, columns) {

  /** @type {StackFormat} */
  var format;
  /** @type {!Array<string>} */
  var spaces;
  /** @type {StackRowTheme} */
  var theme;
  /** @type {number} */
  var last;

  theme  = settings.trace.style.row;
  format = settings.trace.format.row;
  spaces = getSpaces(format.spaceBefore, format.spaceAfter, theme);
  spaces.alt = getSpaces(format.spaceBefore, format.spaceAfter, theme.alternate);

  last = stack.length - 1;
  return roll.up('', stack, function(trace, i) {
    trace = is.odd(i)
      ? rowToString(theme, trace, columns, spaces)
      : rowToString(theme.alternate, trace, columns, spaces.alt);
    return i < last ? fuse(trace, '\n') : trace;
  });
};
