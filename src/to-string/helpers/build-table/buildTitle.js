/**
 * -----------------------------------------------------------------------------
 * LOG-OCD: BUILD-TITLE HELPER
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
var each = help.each;
var fuse = help.fuse;

var colors = require('../../../helpers/colors');

var getSpace = require('../get-space');

/**
 * @this {!Settings}
 * @param {!Stack} stack
 * @param {!Columns} columns
 * @param {string} style
 * @return {string}
 */
module.exports = function buildTitle(stack, columns, style) {

  /** @type {!TitleFormat} */
  var format;
  /** @type {string} */
  var result;
  /** @type {string} */
  var title;
  /** @type {!Array<string>} */
  var space;

  if (!this.trace.config.title) return '';

  style += '.title';
  format = this.trace.format.title;
  space = getSpace(format.spaceBefore, format.spaceAfter, style);
  result = space[0];
  each(columns, function(column) {
    title = column.space[0] + column.title + column.space[1];
    // CALC LEN HERE
    title = colors[style + '.' + column.key](title);
    // HANDLE EXTRA SPACE OR LINE DIVISION
  });
  return result + '\n';
};
