/**
 * -----------------------------------------------------------------------------
 * LOG-OCD: MSG-TO-STRING
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
var each  = help.each;
var fill  = help.fill;
var remap = help.remap;

var colors = require('../../helpers/colors');

var parseAccents = require('../helpers/parse-accents');
var getStyleKey = require('../helpers/get-style-key');
var getAccent = require('../helpers/get-accent');
var getBullet = require('../helpers/get-bullet');
var getLimit = require('../helpers/get-limit');

var linesToString = require('./lines');

/**
 * @this {!Settings}
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
  var style;
  /** @type {number} */
  var limit;

  style  = getStyleKey(this, method, 'msg');
  format = this[method].format.msg;
  accent = getAccent(format.accentMark);
  bullet = getBullet(format.bullet);
  indent = fill(format.indent, ' ');
  limit  = getLimit(format.lineLimit, this.__maxLen);
  limit -= limit && format.bullet.length && format.bullet.length + 1;
  limit -= limit && format.indent;
  msg = parseAccents(msg, accent);

  if ( limit && getLen(msg) > limit ) {
    return linesToString(msg, ++limit, bullet, indent, style);
  }

  if (format.bullet) bullet += ' ';
  msg = remap(msg, function(part, i) {
    return colors[ i % 2 ? style + '.accent' : style ](part);
  });
  return indent + bullet + msg.join('');
};

/**
 * @private
 * @param {!Array<string>} msg
 * @return {number}
 */
function getLen(msg) {

  /** @type {number} */
  var len;

  len = 0;
  each(msg, function(part) {
    len += part.length;
  });
  return len;
}
