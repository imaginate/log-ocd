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
 * @param {number} indent
 * @return {string}
 */
module.exports = function divideRoot(dirpath, limit, indent) {

  /** @type {string} */
  var result;
  /** @type {number} */
  var i;

  dirpath = dirpath.join('') + '/';

  if (limit < 0) return dirpath;

  limit -= indent;

  if (dirpath.length <= limit) return dirpath;

  i = getLastDir(dirpath, limit);
  result = slice(dirpath, 0, i);
  dirpath = slice(dirpath, i);
  indent = fill(indent, ' ');
  while (dirpath.length > limit) {
    i = getLastDir(dirpath, limit);
    result += '\n' + indent + slice(dirpath, 0, i);
    dirpath = slice(dirpath, i);
  }
  result += dirpath && '\n' + indent + dirpath;
  return result;
};

/**
 * @private
 * @param {string} dirpath
 * @param {number=} limit
 * @return {number}
 */
function getLastDir(dirpath, limit) {

  /** @type {string} */
  var temp;
  /** @type {number} */
  var i;

  temp = limit ? slice(dirpath, 0, limit) : dirpath;
  i = temp.lastIndexOf('/') || dirpath.indexOf('/');
  return ++i || dirpath.length;
}
