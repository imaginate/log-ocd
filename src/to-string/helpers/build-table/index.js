/**
 * -----------------------------------------------------------------------------
 * LOG-OCD: BUILD-TABLE HELPER
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

var buildColumns = require('./build-columns');
var buildTitle = require('./build-title');
var buildRows = require('./build-rows');

/**
 * @this {!Settings}
 * @param {!Stack} stack
 * @param {string} style
 * @return {string}
 */
module.exports = function buildTable(stack, style) {

  /** @type {!Columns} */
  var columns;
  /** @type {string} */
  var title;

  columns = buildColumns.call(this, stack);
  title = buildTitle.call(this, columns, style);
  return title + buildRows.call(this, stack, columns, style);
};
