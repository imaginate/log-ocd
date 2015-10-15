/**
 * -----------------------------------------------------------------------------
 * VITALS LIBRARY
 * -----------------------------------------------------------------------------
 * @file Vitals libraries, functional shortcuts, and other helpers.
 *
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2015 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Supporting Libraries:
 * @see [are]{@link https://github.com/imaginate/are}
 * @see [ShellJS]{@link https://github.com/shelljs/shelljs}
 *
 * Annotations:
 * @see [JSDoc3]{@link http://usejsdoc.org/}
 * @see [Closure Compiler specific JSDoc]{@link https://developers.google.com/closure/compiler/docs/js-for-compiler}
 */

'use strict';

/** @type {Function<string, function>} */
var is = require('node-are').is;
/** @type {!Object} */
var fs = require('fs');


////////////////////////////////////////////////////////////////////////////////
// EXPORT THE FACTORY METHOD
////////////////////////////////////////////////////////////////////////////////

/**
 * @param {string...} includes - The vitals sections to append to the global. If
 *   "all" is only given then all sections are appended.
 */
module.exports = function Vitals(includes) {

  /** @type {!Array} */
  var sections;
  /** @type {number} */
  var len;

  require('./vitals/basics');

  len = arguments.length;
  sections = !len ? [] : len > 1 ?
    slice(arguments) : includes !== 'all' ?
      [ includes ] : getFilepaths('helpers/vitals/');

  sections.forEach(function(/** string */ section) {
    section = 'helpers/vitals/' + section.replace(/^(.*)(?:\.js)?$/, '$1.js');
    is.file(section) && require(section);
  })
};


////////////////////////////////////////////////////////////////////////////////
// PRIVATE HELPER
////////////////////////////////////////////////////////////////////////////////

/**
 * A shortcut for Array.prototype.slice.call(obj, 0).
 * @param {Object} obj
 * @return {Array}
 */
function slice(obj) {

  /** @type {!Array} */
  var arr;
  /** @type {number} */
  var i;

  i = obj.length;
  arr = i ? new Array(i) : [];
  while (i--) {
    arr[i] = obj[i];
  }
  return arr;
}

/**
 * Get all of the filepaths from a directory.
 * @param {dirpath} dirpath
 * @return {!Array<string>}
 */
function getFilepaths(dirpath) {

  return fs.readdirSync(dirpath)
    .filter(function(/** string */ filepath) {
      return is.file(dirpath + filepath);
    });
}
