/**
 * -----------------------------------------------------------------------------
 * LOG-OCD: MSG-TO-STRING
 * -----------------------------------------------------------------------------
 * @version 1.0.0-beta.6
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

var help = require('../../helpers');
var is   = help.is;
var fill = help.fill;
var fuse = help.fuse;
var roll = help.roll;

var color = require('../../helpers/color');

var parseAccents = require('../helpers/parse-accents');
var stripStyle = require('../helpers/strip-style');
var getAccent = require('../helpers/get-accent');
var getBullet = require('../helpers/get-bullet');
var getLimit = require('../helpers/get-limit');
var noStyle = require('../helpers/no-style');

var linesToString = require('./lines');

/**
 * @this {Settings}
 * @param {string} method
 * @param {string} msg
 * @return {string}
 */
module.exports = function msgToString(method, msg) {

  /** @type {?Object} */
  var accent;
  /** @type {Format} */
  var format;
  /** @type {string} */
  var bullet;
  /** @type {string} */
  var indent;
  /** @type {string} */
  var result;
  /** @type {MsgTheme} */
  var theme;
  /** @type {number} */
  var limit;
  /** @type {string} */
  var key;

  theme  = this[method].style.msg;
  format = this[method].format.msg;
  accent = getAccent(format.accentMark);
  bullet = getBullet(theme, format.bullet);
  indent = fill(format.indent, ' ');
  limit  = getLimit(format.lineLimit, this.__maxLen);
  limit -= limit && format.bullet.length && format.bullet.length + 1;
  limit -= limit && format.indent;
  msg = parseAccents(msg, accent);

  if ( limit && getLen(msg) > limit ) {
    return linesToString(theme, msg, ++limit, indent, bullet);
  }

  if (format.bullet) bullet = fuse(bullet, ' ');
  msg = roll.up('', msg, function(part, i) {
    return is.odd(i) ? color(theme.accent, part) : color(theme, part);
  });
  result = fuse(indent, bullet, msg);
  return noStyle(this[method].config) ? stripStyle(result) : result;
};

/**
 * @private
 * @param {!Array<string>} msg
 * @return {number}
 */
function getLen(msg) {
  return roll.up(0, msg, function(part) {
    return part.length;
  });
}
