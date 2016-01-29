/**
 * -----------------------------------------------------------------------------
 * LOG-OCD: BUILD-ITEMS HELPER
 * -----------------------------------------------------------------------------
 * @version 1.0.0-beta.5
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

var help = require('../../../helpers');
var is    = help.is;
var fill  = help.fill;
var fuse  = help.fuse;
var remap = help.remap;
var slice = help.slice;
var until = help.until;

/**
 * @typedef {!Array<string>} Item
 * @typedef {!Array<Item>} Items
 */

/**
 * @param {Columns} columns
 * @param {!Array<string>} vals
 * @return {Items}
 */
module.exports = function buildItems(columns, vals) {

  /** @type {number} */
  var remain;
  /** @type {Items} */
  var items;
  /** @type {Item} */
  var item;
  /** @type {!Array<boolean>} */
  var done;

  remain = columns.length;
  items = [];
  done = new Array(remain);
  done = fill(done, false);
  vals = remap(vals, function(val, i) {
    if (val.length) return val;
    --remain;
    done[i] = true;
    return fill(column[i].len, ' ');
  });
  done.remain = remain;
  until(0, 100, function() {
    item = newItem(columns, vals, done);
    items = fuse.val(items, item);
    return done.remain;
  });
  return items;
};

/**
 * @private
 * @param {Columns} columns
 * @param {!Array<string>} vals
 * @param {!Array<boolean>} done
 * @return {Item}
 */
function newItem(columns, vals, done) {

  /** @type {Column} */
  var column;
  /** @type {string} */
  var space;
  /** @type {number} */
  var index;

  return remap(vals, function(val, i) {

    if ( done[i] ) return val;

    column = columns[i];

    if (val.length > column.len) {
      index = column.len + 1;
      vals[i] = slice(val, index);
      return slice(val, 0, index);
    }

    --done.remain;
    done[i] = true;
    vals[i] = fill(column.len, ' ');
    space = fill(column.len - val.length, ' ');
    return is.same(column.align, 'left')
      ? fuse(val, space)
      : fuse(space, val);
  });
}
