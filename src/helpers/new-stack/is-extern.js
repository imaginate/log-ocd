/**
 * -----------------------------------------------------------------------------
 * LOG-OCD: IS-EXTERN HELPER
 * -----------------------------------------------------------------------------
 * @version 1.0.0-beta.8
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

var help = require('../index');
var has    = help.has;
var freeze = help.freeze;

/**
 * @private
 * @type {!RegExp}
 * @const
 */
var EXTERN = freeze( /\/node_modules\// );

/**
 * @param {string} trace
 * @return {boolean}
 */
module.exports = function isExtern(trace) {
  return has(trace, EXTERN);
};
