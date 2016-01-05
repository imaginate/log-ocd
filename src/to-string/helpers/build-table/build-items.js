/**
 * -----------------------------------------------------------------------------
 * LOG-OCD: BUILD-ITEMS HELPER
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
var fill  = help.fill;
var remap = help.remap;
var slice = help.slice;
var until = help.until;

var buildVals = require('./build-vals');

/**
 * @typedef {!Array<string>} Item
 * @typedef {!Array<Item>} Items
 */

/**
 * @param {Columns} columns
 * @param {Trace=} trace
 * @return {Items}
 */
module.exports = function buildItems(columns, trace) {

  /** @type {number} */
  var remain;
  /** @type {Items} */
  var items;
  /** @type {!Array<string>} */
  var vals;
  /** @type {!Array<boolean>} */
  var done;

  remain = columns.length;
  items = [];
  done = new Array(remain);
  done = fill(done, false);
  vals = buildVals(columns, trace);
  vals = remap(vals, function(val, i) {
    if (val.length) return val;
    --remain;
    done[i] = true;
    return fill(column[i].len, ' ');
  });
  until(0, 100, function() {
    return addItem(remain, items, columns, vals, done);
  });
  return items;
};

/**
 * @private
 * @param {number} remain
 * @param {Items} items
 * @param {Columns} columns
 * @param {!Array<string>} vals
 * @param {!Array<boolean>} done
 * @return {number}
 */
function addItem(remain, items, columns, vals, done) {

  /** @type {Column} */
  var column;
  /** @type {string} */
  var space;
  /** @type {Item} */
  var item;

  item = remap(vals, function(val, i) {

    if ( done[i] ) return val;

    column = columns[i];

    if (val.length > column.len) {
      i = column.len + 1;
      vals[i] = slice(val, i);
      return slice(val, 0, i);
    }

    --remain;
    done[i] = true;
    vals[i] = fill(column.len, ' ');
    space = fill(column.len - val.length, ' ');
    return column.align === 'left' ? val + space : space + val;
  });

  items.push(item);
  return remain;
}
