/**
 * -----------------------------------------------------------------------------
 * LOG-OCD: GET-ROOT HELPER
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

var colors = require('../../helpers/colors');

var getIdentifier = require('./get-identifier');
var getBrackets = require('./get-brackets');
var divideRoot = require('./divide-root');
var getSpace = require('./get-space');
var getLimit = require('./get-limit');

/**
 * @this {!Settings}
 * @param {!Stack} stack
 * @param {string} style
 * @return {string}
 */
module.exports = function getRoot(stack, style) {

  /** @type {string} */
  var identifier;
  /** @type {string} */
  var brackets;
  /** @type {string} */
  var dirpath;
  /** @type {!RootFormat} */
  var format;
  /** @type {!Array<string>} */
  var space;
  /** @type {number} */
  var limit;
  /** @type {number} */
  var len;

  style += '.root';
  format = this.trace.format.root;
  len = format.brackets.length ? 1 : 0;
  len += format.identifier.length + format.spaceBefore;
  identifier = getIdentifier(format.identifier, style);
  brackets = getBrackets(format.brackets, style);
  space = getSpace(format.spaceBefore, format.spaceAfter, style);
  limit = getLimit(format.lineLimit, this.__maxLen);
  dirpath = divideRoot(stack.base, limit, len);
  dirpath = colors[style](dirpath);
  return space[0] + identifier + brackets[0] +
         dirpath + brackets[1] + '\n';
};
