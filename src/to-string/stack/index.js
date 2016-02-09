/**
 * -----------------------------------------------------------------------------
 * LOG-OCD: STACK-TO-STRING
 * -----------------------------------------------------------------------------
 * @version 1.0.0-beta.6
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

var fuse = require('../../helpers').fuse;

var noStyle = require('../helpers/no-style');
var stripStyle = require('../helpers/strip-style');

var buildColumns = require('./helpers/build-columns');

var rootToString = require('./root');
var rowsToString = require('./rows');
var titleToString = require('./title');

/**
 * @this {Settings}
 * @param {string} method
 * @param {Stack} stack
 * @return {string}
 */
module.exports = function stackToString(method, stack) {

  /** @type {!Columns} */
  var columns;
  /** @type {string} */
  var result;
  /** @type {string} */
  var title;
  /** @type {string} */
  var root;
  /** @type {string} */
  var rows;

  columns = buildColumns(this, stack);
  root   = rootToString(this, stack);
  title  = titleToString(this, columns);
  rows   = rowsToString(this, stack, columns);
  result = fuse(root, title, rows);
  return noStyle(this.trace.config) ? stripStyle(result) : result;
};
