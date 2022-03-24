/**
 * -----------------------------------------------------------------------------
 * LOG-OCD: MAIN HELPERS
 * -----------------------------------------------------------------------------
 * @version 1.0.0-beta.10
 * @see [log-ocd]{@link https://github.com/imaginate/log-ocd}
 *
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2022 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
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

// see https://github.com/imaginate/vitals
var vitals = require('node-vitals')('base', 'strict');
exports.amend  = vitals.amend;
exports.copy   = vitals.copy;
exports.create = vitals.create;
exports.cut    = vitals.cut;
exports.each   = vitals.each;
exports.fill   = vitals.fill;
exports.freeze = vitals.freeze;
exports.fuse   = vitals.fuse;
exports.get    = vitals.get;
exports.has    = vitals.has;
exports.is     = vitals.is;
exports.remap  = vitals.remap;
exports.roll   = vitals.roll;
exports.same   = vitals.same;
exports.seal   = vitals.seal;
exports.slice  = vitals.slice;
exports.to     = vitals.to;
exports.until  = vitals.until;

////////////////////////////////////////////////////////////////////////////////
// CHECK METHODS
////////////////////////////////////////////////////////////////////////////////

var has = vitals.has;

/**
 * @param {!Object} obj
 * @return {boolean}
 */
exports.is.theme = function isTheme(obj) {
  return has(obj, '__TYPE') && has(obj.__TYPE, /Theme$/);
};
