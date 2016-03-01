/**
 * -----------------------------------------------------------------------------
 * LOG-OCD: HEADER-LINES-TO-STRING
 * -----------------------------------------------------------------------------
 * @version 1.0.0-beta.7
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

var until = require('../../helpers').until;

var lineToString = require('./line');

/**
 * @param {HeaderTheme} theme
 * @param {!Array} header
 * @param {number} limit
 * @param {!Array} spaces
 * @return {string}
 */
module.exports = function linesToString(theme, header, limit, spaces) {

  /** @type {string} */
  var result;
  /** @type {string} */
  var line;
  /** @type {number} */
  var len;

  result = '';
  until('', 100, function() {
    line = lineToString(theme, header, limit, spaces);
    result += line;
    return line;
  });
  return result;
};
