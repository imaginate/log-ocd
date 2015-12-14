/**
 * -----------------------------------------------------------------------------
 * LOG-OCD: BUILD-COLUMNS HELPER
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

var buildColumn = require('./build-column');

/**
 * @typedef {!Array<Column>} Columns
 */

/**
 * @this {!Settings}
 * @param {!Stack} stack
 * @return {!Columns}
 */
module.exports = function buildColumns(stack) {

  /** @type {!Columns} */
  var columns;
  /** @type {!Column} */
  var column;
  /** @type {!Config} */
  var config;
  /** @type {!Format} */
  var format;
  /** @type {string} */
  var title;

  config = this.trace.config;
  format = this.trace.format;
  columns = [];
  each('event, file, module, line, column', function(key) {
    if ( !config[key] ) return;
    title = config.title ? format[key].title : '';
    column = buildColumn.call(this, stack, key, title);
    columns = fuse(columns, column);
  }, this);
  return columns;
};
