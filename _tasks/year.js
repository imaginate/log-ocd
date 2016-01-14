/**
 * -----------------------------------------------------------------------------
 * MAKE TASK: year
 * -----------------------------------------------------------------------------
 * @file Use `$ node make year` to access this file.
 *
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2015 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * @see [JSDoc3]{@link http://usejsdoc.org/}
 * @see [Closure Compiler specific JSDoc]{@link https://developers.google.com/closure/compiler/docs/js-for-compiler}
 */

'use strict';


////////////////////////////////////////////////////////////////////////////////
// DEFINE & EXPORT THE TASK
////////////////////////////////////////////////////////////////////////////////

/** @type {!Task} */
module.exports = newTask(function updateYear(year) {

  /** @type {!Array<string>} */
  var filepaths;
  /** @type {!Object} */
  var options;

  if ( !isYear(year) ) throw new RangeError('invalid year for year task');

  options = {
    validExts:   '.js',
    invalidExts: '.json'
  };

  filepaths = get.filepaths('.', options);
  insertYears('.', filepaths, year);

  options.deep = true;

  filepaths = get.filepaths('example', options);
  insertYears('example', filepaths, year);

  filepaths = get.filepaths('src', options);
  insertYears('src', filepaths, year);

  console.log('Completed version.all task');
});


////////////////////////////////////////////////////////////////////////////////
// DEFINE PRIVATE HELPERS
////////////////////////////////////////////////////////////////////////////////

/**
 * @param {string} year
 * @return {boolean}
 */
function isYear(year) {
  return !!year && has(year, /^20[1-9][0-9]$/);
}

/**
 * @param {string} base
 * @param {!Array<string>} filepaths
 * @param {string} year
 */
function insertYears(base, filepaths, year) {
  base = fuse(base, '/');
  year = fuse('$1', year);
  each(filepaths, function(filepath) {
    filepath = fuse(base, filepath);
    insertYear(filepath, year);
  });
}

/**
 * @param {string} filepath
 * @param {string} year
 */
function insertYear(filepath, year) {

  /** @type {string} */
  var content;
  /** @type {!RegExp} */
  var regex;

  regex = /(\@copyright )20[1-5][0-9]/g;
  content = get.file(filepath);
  content = remap(content, regex, year);
  to.file(content, filepath);
}
