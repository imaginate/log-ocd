/**
 * -----------------------------------------------------------------------------
 * LOG-OCD: CUT-SLASH HELPER
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

var cut = require('../index').cut;

/**
 * @private
 * @type {!RegExp}
 * @const
 */
var OPEN_SLASH = /^\//;

/**
 * @param {string} dir
 * @return {string}
 */
module.exports = function cutSlash(dir) {
  return cut(dir, OPEN_SLASH);
};
