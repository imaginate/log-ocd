/**
 * -----------------------------------------------------------------------------
 * LOG-OCD: MAIN HELPERS
 * -----------------------------------------------------------------------------
 * @version 1.0.0-beta.5
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

// see https://github.com/imaginate/are
var are = require('node-are');
exports.is  = are.is;
exports.are = are.are;

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
exports.remap  = vitals.remap;
exports.roll   = vitals.roll;
exports.seal   = vitals.seal;
exports.slice  = vitals.slice;
exports.until  = vitals.until;

////////////////////////////////////////////////////////////////////////////////
// CHECK METHODS
////////////////////////////////////////////////////////////////////////////////

var has = vitals.has;

/**
 * @param {!Object} obj
 * @return {boolean}
 */
are.is.theme = function isTheme(obj) {
  return has(obj, '__TYPE') && has(obj.__TYPE, /Theme$/);
};
