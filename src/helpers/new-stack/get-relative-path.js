/**
 * -----------------------------------------------------------------------------
 * LOG-OCD: GET-RELATIVE-PATH HELPER
 * -----------------------------------------------------------------------------
 * @version 1.0.0-beta.10
 * @see [log-ocd]{@link https://github.com/imaginate/log-ocd}
 *
 * @author Adam Smith <imagineadamsmith@gmail.com> (https://github.com/imaginate)
 * @copyright 2022 Adam A Smith <imagineadamsmith@gmail.com> (https://github.com/imaginate)
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
var fill  = help.fill;
var fuse  = help.fuse;
var same  = help.same;
var slice = help.slice;
var to    = help.to;
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
    if ( same(base[i], dir[i]) ) return false;
    index = i;
    return true;
  });

  len = base.length - dir.length;
  dir = same(index, -1) ? [] : slice(dir, index);
  len += dir.length;
  dir = to.string(dir, '');
  dir = dir && cutSlash(dir);
  dir = dir && fuse(dir, '/');
  pre = fill(len, '../') || './';
  return fuse(pre, dir);
};
