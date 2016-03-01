/**
 * -----------------------------------------------------------------------------
 * LOG-OCD: GET-RELATIVE-PATH HELPER
 * -----------------------------------------------------------------------------
 * @version 1.0.0-beta.6
 * @see [log-ocd]{@link https://github.com/imaginate/log-ocd}
 *
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2016 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Supporting Libraries:
 * @see [chalk]{@link https://github.com/chalk/chalk}
 * @see [vitals]{@link https://github.com/imaginate/vitals}
 *
 * Annotations:
 * @see [JSDoc3]{@link http://usejsdoc.org/}
 * @see [Closure Compiler specific JSDoc]{@link https://developers.google.com/closure/compiler/docs/js-for-compiler}
 */

'use strict';

var help = require('../index');
var is    = help.is;
var fill  = help.fill;
var fuse  = help.fuse;
var slice = help.slice;
var until = help.until;

var cutSlash = require('./cut-slash');

/**
 * @param {!Array<string>} base
 * @param {!Array<string>} dir
 * @return {string}
 */
module.exports = function getRelativePath(base, dir) {

  /** @type {number} */
  var index;
  /** @type {number} */
  var min;
  /** @type {number} */
  var len;
  /** @type {string} */
  var pre;

  index = -1;
  min = base.length;
  min = dir.length < min ? dir.length : min;
  until(true, min, function(i) {
    if ( is.same(base[i], dir[i]) ) return false;
    index = i;
    return true;
  });

  len = base.length - dir.length;
  dir = is.same(index, -1) ? [] : slice(dir, index);
  len += dir.length;
  dir = dir.join('');
  dir = dir && fuse(cutSlash(dir), '/');
  pre = fill(len, '../') || './';
  return fuse(pre, dir);
};
