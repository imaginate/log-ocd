/**
 * -----------------------------------------------------------------------------
 * LOG-OCD: STRIP-STYLE HELPER
 * -----------------------------------------------------------------------------
 * @version 1.0.0-beta.8
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

var cut = require('../../helpers').cut;

/** @type {!RegExp} */
var STYLE = /\u001b\[[0-9]+m/g;

/**
 * @param {string} str
 * @return {string}
 */
module.exports = function stripStyle(str) {
  return cut(str, STYLE);
};
