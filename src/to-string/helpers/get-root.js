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
var getSpace = require('./get-space');
var divideRoot = require('./divide-root');

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
  /** @type {!RootFormat} */
  var format;
  /** @type {!Array<string>} */
  var space;
  /** @type {string} */
  var dirs;
  /** @type {number} */
  var len;

  style += '.root';
  format = this.trace.format.root;
  len = format.brackets.length;
  len += len && 1;
  len += format.identifier.length + format.spaceBefore;
  identifier = getIdentifier(format.identifier, style);
  brackets = getBrackets(format.brackets, style);
  space = getSpace(format.spaceBefore, format.spaceAfter, style);
  dirs = divideRoot(stack.base, format.lineLimit, len, format.spaceAfter);
  dirs = colors[style](dirs);
  return space[0] + identifier + brackets[0] + dirs + brackets[1] + space[1];
};
