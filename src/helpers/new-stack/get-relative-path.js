/**
 * -----------------------------------------------------------------------------
 * LOG-OCD: GET-RELATIVE-PATH HELPER
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

var help = require('../index');
var fill  = help.fill;
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
  until(false, min, function(i) {
    if (base[i] !== dir[i]) index = i;
    return index < 0;
  });

  len = base.length - dir.length;
  dir = index < 0 ? [] : slice(dir, index);
  len += dir.length;
  dir = dir.join('');
  dir = dir && cutSlash(dir) + '/';
  pre = fill(len, '../') || './';
  return pre + dir;
};
