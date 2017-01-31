/**
 * -----------------------------------------------------------------------------
 * ACT TASK: year
 * -----------------------------------------------------------------------------
 * @file Use `$ act year` to access this file.
 *
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2017 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * @see [JSDoc3]{@link http://usejsdoc.org/}
 * @see [Closure Compiler specific JSDoc]{@link https://developers.google.com/closure/compiler/docs/js-for-compiler}
 */

'use strict';

exports['desc'] = 'updates year in entire repo';
exports['value'] = '2xxx';
exports['method'] = updateYear;

var vitals = require('node-vitals')('base', 'fs');
var each   = vitals.each;
var fuse   = vitals.fuse;
var get    = vitals.get;
var has    = vitals.has;
var remap  = vitals.remap;
var to     = vitals.to;

var CPRT = /(copyright )2[0-9]{3}/ig;
var YEAR = /^2[0-9]{3}$/;

/**
 * @public
 * @param {string} year
 */
function updateYear(year) {

  /** @type {!Array<string>} */
  var filepaths;

  if ( !isYear(year) ) throw new Error('invalid `year` - should be `2xxx`');

  filepaths = get.filepaths('.', {
    basepath:    true,
    recursive:   true,
    validExts:   'js|md',
    invalidExts: 'json',
    invalidDirs: '.*|node_modules|tmp'
  });
  insertYears(filepaths, year);
}

/**
 * @private
 * @param {string} year
 * @return {boolean}
 */
function isYear(year) {
  return !!year && has(year, YEAR);
}

/**
 * @private
 * @param {!Array<string>} filepaths
 * @param {string} year
 */
function insertYears(filepaths, year) {
  year = fuse('$1', year);
  each(filepaths, function(filepath) {
    insertYear(filepath, year);
  });
}

/**
 * @private
 * @param {string} filepath
 * @param {string} year
 */
function insertYear(filepath, year) {

  /** @type {string} */
  var content;

  content = get.file(filepath);
  content = remap(content, CPRT, year);
  to.file(content, filepath);
}

