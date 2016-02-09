/**
 * -----------------------------------------------------------------------------
 * LOG-OCD: MSG-LINES-TO-STRING
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
var fill  = help.fill;
var fuse  = help.fuse;
var until = help.until;

var stripStyle = require('../helpers/strip-style');

var lineToString = require('./line');

/**
 * @param {MsgTheme} theme
 * @param {!Array} msg
 * @param {number} limit
 * @param {string} indent
 * @param {string} bullet
 * @return {string}
 */
module.exports = function linesToString(theme, msg, limit, indent, bullet) {

  /** @type {string} */
  var result;
  /** @type {string} */
  var lead;
  /** @type {string} */
  var line;
  /** @type {number} */
  var len;

  bullet = bullet && fuse(bullet, ' ');
  lead   = fuse(indent, bullet);
  result = lineToString(theme, msg, limit, lead);
  bullet = bullet && stripStyle(bullet);
  bullet = fill(bullet.length, ' ');
  lead   = fuse(indent, bullet);
  until(0, function() {
    line = lineToString(theme, msg, limit, lead);
    result = fuse(result, line);
    return line.length;
  });
  return result;
};
