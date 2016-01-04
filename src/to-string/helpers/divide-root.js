/**
 * -----------------------------------------------------------------------------
 * LOG-OCD: DIVIDE-ROOT HELPER
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

var help = require('../../helpers');
var fill  = help.fill;
var slice = help.slice;

/**
 * @param {!Array} dirpath
 * @param {number} limit
 * @param {number} intro
 * @return {string}
 */
module.exports = function divideRoot(dirpath, limit, intro) {

  /** @type {string} */
  var result;
  /** @type {string} */
  var indent;
  /** @type {number} */
  var i;

  dirpath = dirpath.join('');

  if (!limit) return dirpath;

  limit -= intro;

  if (dirpath.length <= limit) return dirpath;

  result = slice(dirpath, 0, ++limit);
  dirpath = slice(dirpath, limit);
  indent = fill(intro, ' ');
  while (dirpath.length > limit) {
    result += '\n' + indent + slice(dirpath, 0, limit);
    dirpath = slice(dirpath, limit);
  }
  result += dirpath && '\n' + indent + dirpath;
  return result;
};
