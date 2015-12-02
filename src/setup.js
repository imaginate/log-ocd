/**
 * -----------------------------------------------------------------------------
 * LOG-OCD: SETUP
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


////////////////////////////////////////////////////////////////////////////////
// REQUIRE EXTERNAL HELPERS
////////////////////////////////////////////////////////////////////////////////

// see https://github.com/imaginate/are
var is  = require('node-are').is;
var are = require('node-are').are;

// see https://github.com/Marak/colors.js
var colors = require('colors/safe');

// see https://github.com/imaginate/vitals
var vitals = require('node-vitals')('base', 'strict');
var amend  = vitals.amend;
var copy   = vitals.copy;
var create = vitals.create;
var cut    = vitals.cut;
var each   = vitals.each;
var fill   = vitals.fill;
var freeze = vitals.freeze;
var fuse   = vitals.fuse;
var get    = vitals.get;
var has    = vitals.has;
var remap  = vitals.remap;
var seal   = vitals.seal;
var slice  = vitals.slice;
var until  = vitals.until;
