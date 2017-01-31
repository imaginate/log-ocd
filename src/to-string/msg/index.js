/**
 * -----------------------------------------------------------------------------
 * LOG-OCD: MSG-TO-STRING
 * -----------------------------------------------------------------------------
 * @version 1.0.0-beta.9
 * @see [log-ocd]{@link https://github.com/imaginate/log-ocd}
 *
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2017 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
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

var help  = require('../../helpers');
var is    = help.is;
var fill  = help.fill;
var fuse  = help.fuse;
var remap = help.remap;
var roll  = help.roll;
var same  = help.same;

var color = require('../../helpers/color');

var parseAccents = require('../helpers/parse-accents');
var stripStyle = require('../helpers/strip-style');
var getAccent = require('../helpers/get-accent');
var getBullet = require('../helpers/get-bullet');
var getLimit = require('../helpers/get-limit');
var noStyle = require('../helpers/no-style');

/**
 * @this {!Settings}
 * @param {string} method
 * @param {string} msg
 * @return {string}
 */
module.exports = function msgToString(method, msg) {

  /** @type {?Object} */
  var accent;
  /** @type {!Format} */
  var format;
  /** @type {string} */
  var bullet;
  /** @type {string} */
  var indent;
  /** @type {string} */
  var result;
  /** @type {!MsgTheme} */
  var theme;
  /** @type {number} */
  var limit;

  theme  = this[method].style.msg;
  format = this[method].format.msg;
  bullet = format.bullet;

  limit = getLimit(format.lineLimit, this.__maxLen);
  if (limit) {
    if (bullet.length) limit -= bullet.length + 1;
    limit -= format.indent;
  }

  accent = getAccent(format.accentMark);
  bullet = getBullet(theme, bullet);
  bullet = bullet && fuse(bullet, ' ');
  indent = fill(format.indent, ' ');

  msg = parseAccents(msg, accent);
  msg = addBreaks(msg, limit);
  msg = addColor(theme, msg);
  msg = addBegin(msg, indent, bullet);

  return noStyle(this[method].config)
    ? stripStyle(msg)
    : msg;
};

/**
 * @private
 * @param {!Array<string>} msg
 * @param {number} limit
 * @return {!Array<string>}
 */
function addBreaks(msg, limit) {

  /** @type {number} */
  var count;

  if (!limit) return msg;

  count = 0;
  return remap(msg, parseLine);

  /**
   * @private
   * @param {string} line
   * @return {string}
   */
  function parseLine(line) {

    /** @type {string} */
    var result;
    /** @type {number} */
    var len;
    /** @type {string} */
    var ch;
    /** @type {number} */
    var i;

    result = '';
    len = line.length;
    i = -1;
    while (++i < len) {
      ch = line[i];
      if ( same(ch, '\n') ) {
        count = 0;
      }
      else {
        ++count;
        if (count > limit) {
          result = fuse(result, '\n');
          count = 0;
        }
      }
      result = fuse(result, ch);
    }
    return result;
  }
}

/**
 * @private
 * @param {!MsgTheme} theme
 * @param {!Array<string>} msg
 * @return {string}
 */
function addColor(theme, msg) {
  return roll.up('', msg, function(part, i) {
    return is.odd(i)
      ? color(theme.accent, part)
      : color(theme, part);
  });
}

/**
 * @private
 * @param {string} msg
 * @param {string} indent
 * @param {string} bullet
 * @return {string}
 */
function addBegin(msg, indent, bullet) {

  /** @type {string} */
  var spacer;

  spacer = bullet && stripStyle(bullet);
  spacer = fill(spacer.length, ' ');
  spacer = fuse('\n', indent, spacer);
  msg = remap(msg, /\n/g, spacer);
  return fuse(indent, bullet, msg);
}
