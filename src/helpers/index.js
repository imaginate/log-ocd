/**
 * -----------------------------------------------------------------------------
 * LOG-OCD: MAIN HELPERS
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

// see https://github.com/imaginate/are
exports.is  = require('node-are').is;
exports.are = require('node-are').are;

// see https://github.com/Marak/colors.js
exports.colors = require('colors/safe');

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
exports.seal   = vitals.seal;
exports.slice  = vitals.slice;
exports.until  = vitals.until;
