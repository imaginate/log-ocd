/**
 * -----------------------------------------------------------------------------
 * ACT TASK: year
 * -----------------------------------------------------------------------------
 * @file Use `$ act year` to access this file.
 *
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2016 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
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

/**
 * @public
 * @param {string} year
 */
function updateYear(year) {

  /** @type {!Array<string>} */
  var files;
  /** @type {!Object} */
  var opts;

  if ( !isYear(year) ) throw new Error('invalid `year` - should be `2xxx`');

  opts = {
    basepath:    true,
    validExts:   'js',
    invalidExts: 'json'
  };

  files = get.filepaths('.', opts);
  each(files, function(file) {
    insertYear(file, year);
  });

  opts.deep = true;

  files = get.filepaths('src', opts);
  each(files, function(file) {
    insertYear(file, year);
  });

  files = get.filepaths('example', opts);
  each(files, function(file) {
    insertYear(file, year);
  });
}

/**
 * @private
 * @param {string} year
 * @return {boolean}
 */
function isYear(year) {
  return !!year && has(year, /^2[0-9]{3}$/);
}

/**
 * @private
 * @param {string} filepath
 * @param {string} year
 */
function insertYear(filepath, year) {

  /** @type {string} */
  var content;
  /** @type {!RegExp} */
  var regex;

  regex = /(\@copyright )2[0-9]{3}/g;
  year = fuse('$1', year);
  content = get.file(filepath);
  content = remap(content, regex, year);
  to.file(content, filepath);
}
