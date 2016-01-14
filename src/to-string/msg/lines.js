/**
 * -----------------------------------------------------------------------------
 * LOG-OCD: MSG-LINES-TO-STRING
 * -----------------------------------------------------------------------------
 * @version 1.0.0
 * @see [log-ocd]{@link https://github.com/imaginate/log-ocd}
 *
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2016 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
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
var until = help.until;

var stripStyle = require('../helpers/strip-style');

var lineToString = require('./line');

/**
 * @param {!Array} msg
 * @param {number} limit
 * @param {string} bullet
 * @param {string} indent
 * @param {string} style
 * @return {string}
 */
module.exports = function linesToString(msg, limit, bullet, indent, style) {

  /** @type {string} */
  var result;
  /** @type {string} */
  var line;
  /** @type {number} */
  var len;

  bullet += bullet && ' ';
  result = lineToString(msg, limit, indent + bullet, style);
  bullet = bullet && stripStyle(bullet);
  bullet = fill(bullet.length, ' ');
  indent += bullet;
  until('', 100, function() {
    line = lineToString(msg, limit, indent, style);
    result += line;
    return line;
  });
  return result;
};
