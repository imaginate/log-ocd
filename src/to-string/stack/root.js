/**
 * -----------------------------------------------------------------------------
 * LOG-OCD: ROOT-TO-STRING
 * -----------------------------------------------------------------------------
 * @version 1.0.0-beta.8
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

var help = require('../../helpers');
var fill  = help.fill;
var fuse  = help.fuse;
var slice = help.slice;

var color = require('../../helpers/color');

var getIdentifier = require('../helpers/get-identifier');
var getBrackets = require('../helpers/get-brackets');
var getSpace = require('../helpers/get-space');
var getLimit = require('../helpers/get-limit');

/**
 * @param {Settings} settings
 * @param {Stack} stack
 * @return {string}
 */
module.exports = function rootToString(settings, stack) {

  /** @type {string} */
  var identifier;
  /** @type {string} */
  var brackets;
  /** @type {string} */
  var dirpath;
  /** @type {RootFormat} */
  var format;
  /** @type {StackRootTheme} */
  var theme;
  /** @type {string} */
  var space;
  /** @type {number} */
  var limit;
  /** @type {number} */
  var intro;

  if (!settings.trace.config.root || !stack.base) return '';

  theme  = settings.trace.style.root;
  format = settings.trace.format.root;
  intro  = format.brackets.length && 1;
  intro += format.identifier.length + format.spaceBefore;
  identifier = getIdentifier(theme, format.identifier);
  brackets = getBrackets(theme, format.brackets);
  space = getSpace(format.spaceBefore, theme);
  limit = getLimit(format.lineLimit, settings.__maxLen);
  dirpath = divideRoot(stack.base, limit, intro);
  dirpath = color(theme, dirpath);
  return fuse(space, identifier, brackets[0], dirpath, brackets[1], '\n');
};

/**
 * @private
 * @param {!Array} dirpath
 * @param {number} limit
 * @param {number} intro
 * @return {string}
 */
function divideRoot(dirpath, limit, intro) {

  /** @type {string} */
  var result;
  /** @type {string} */
  var indent;
  /** @type {string} */
  var part;
  /** @type {number} */
  var i;

  dirpath = dirpath.join('');

  if (!limit) return dirpath;

  limit -= intro;
  limit -= 2;

  if (dirpath.length <= limit) return dirpath;

  result = slice(dirpath, 0, ++limit);
  dirpath = slice(dirpath, limit);
  indent = fill(intro, ' ');
  while (dirpath.length > limit) {
    part = slice(dirpath, 0, limit);
    result = fuse(result, '\n', indent, part);
    dirpath = slice(dirpath, limit);
  }
  return fuse(result, '\n', indent, dirpath);
}
