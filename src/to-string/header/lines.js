/**
 * -----------------------------------------------------------------------------
 * LOG-OCD: HEADER-LINES-TO-STRING
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

var until = require('../../helpers').until;

var lineToString = require('./line');

/**
 * @param {!Array} header
 * @param {number} limit
 * @param {!Array} spaces
 * @param {string} style
 * @return {string}
 */
module.exports = function linesToString(header, limit, spaces, style) {

  /** @type {string} */
  var result;
  /** @type {string} */
  var line;
  /** @type {number} */
  var len;

  result = '';
  until('', 100, function() {
    line = lineToString(header, limit, spaces, style);
    result += line;
    return line;
  });
  return result;
};
