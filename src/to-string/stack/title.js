/**
 * -----------------------------------------------------------------------------
 * LOG-OCD: TITLE-TO-STRING
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

var help = require('../../helpers');
var fuse  = help.fuse;
var until = help.until;

var getSpaces = require('../helpers/get-spaces');

var buildVals = require('./helpers/build-vals');
var printVals = require('./helpers/print-vals');
var buildItems = require('./helpers/build-items');
var printItems = require('./helpers/print-items');

/**
 * @param {Settings} settings
 * @param {Columns} columns
 * @return {string}
 */
module.exports = function titleToString(settings, columns) {

  /** @type {string} */
  var result;
  /** @type {TitleFormat} */
  var format;
  /** @type {!Array<string>} */
  var spaces;
  /** @type {StackRowTheme} */
  var theme;
  /** @type {Items} */
  var items;
  /** @type {!Array<string>} */
  var vals;
  /** @type {boolean} */
  var over;

  if (!settings.trace.config.title) return '';

  theme  = settings.trace.style.title;
  format = settings.trace.format.row;
  spaces = getSpaces(format.spaceBefore, format.spaceAfter, theme);
  vals = buildVals(columns);
  over = columns.over && until(true, columns, function(column, i) {
    return vals[i].length > column.len;
  });
  if (over) items = buildItems(columns, vals);
  result = over
    ? printItems(theme, items, columns, spaces)
    : printVals(theme, vals, columns, spaces);
  return fuse(result, '\n');
};
