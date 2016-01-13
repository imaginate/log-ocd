/**
 * -----------------------------------------------------------------------------
 * LOG-OCD: PARSE-ACCENTS HELPER
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

var has = require('../../helpers').has;
var escape = require('../../helpers/escape');

/**
 * @param {string} val
 * @param {Object} accent
 * @return {!Array<string>}
 */
module.exports = function parseAccents(val, accent) {
  return accent && has(val, accent.group)
    ? val.split(accent.mark)
    : [ val ];
};
