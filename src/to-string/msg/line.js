/**
 * -----------------------------------------------------------------------------
 * LOG-OCD: MSG-LINE-TO-STRING
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
var slice = help.slice;
var until = help.until;

var colors = require('../../helpers/colors');

/**
 * @param {!Array} msg
 * @param {number} limit
 * @param {string} indent
 * @param {string} style
 * @return {string}
 */
module.exports = function lineToString(msg, limit, indent, style) {

  /** @type {string} */
  var result;
  /** @type {string} */
  var remain;

  result = '';
  until(0, msg, function(part, i) {
    if (!part) return;
    remain = slice(part, limit);
    part   = slice(part, 0, limit);
    limit -= part.length;
    result += colors[ i % 2 ? style + '.accent' : style ](part);
    msg[i] = remain;
    return limit;
  });
  return result && indent + result;
};
