/**
 * -----------------------------------------------------------------------------
 * MAKE TASK: version
 * -----------------------------------------------------------------------------
 * @file Use `$ node make version` to access this file.
 *
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2015 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * @see [JSDoc3]{@link http://usejsdoc.org/}
 * @see [Closure Compiler specific JSDoc]{@link https://developers.google.com/closure/compiler/docs/js-for-compiler}
 */

'use strict';

/** @type {!Object} */
var crypto = require('crypto');
/** @type {!Object} */
var fs = require('fs');


////////////////////////////////////////////////////////////////////////////////
// DEFINE & EXPORT THE TASK
////////////////////////////////////////////////////////////////////////////////

/** @type {!Task} */
module.exports = newTask('version', 'all', {

  /**
   * @param {string} version
   */
  all: function all(version) {

    /** @type {!Array<string>} */
    var filepaths;

    isSemVersion(version) || log.error(
      'Invalid `version.all` Task Call',
      'a new semantic version was not provided',
      { argMap: true, version: version }
    );

    filepaths = retrieve.filepaths('.', {
      validExts: '.js',
      validDirs: 'parts|src',
      invalidFiles: 'make.js'
    }, true);
    filepaths.push('package.json');

    each(filepaths, function(/** string */ filepath) {
      insertVersion(filepath, version);
    });

    log.pass('Completed `version.all` Task');
  },

  /**
   * @type {function}
   */
  hash: function hash() {

    /** @type {!Array<string>} */
    var filepaths;

    filepaths = retrieve.filepaths('.', {
      validExts: 'jpg|png|gif|jpeg'
    }, false);

    each(filepaths, function(/** string */ filepath) {
      copy.file( filepath, hashFile(filepath) );
    });

    log.pass('Completed `version.hash` Task');
  }
});


////////////////////////////////////////////////////////////////////////////////
// DEFINE PRIVATE HELPERS
////////////////////////////////////////////////////////////////////////////////

/**
 * @param {string} version
 * @return {boolean}
 */
function isSemVersion(version) {

  /** @type {!RegExp} */
  var regex;

  regex = /^[0-9][0-9]?\.[0-9][0-9]?\.[0-9][0-9]?$/;
  return is._str(version) && regex.test(version);
}

/**
 * @param {string} filepath
 * @param {string} version
 */
function insertVersion(filepath, version) {

  /** @type {!RegExp} */
  var regex;

  regex = /^.*\.json$/.test(filepath) ?
    /("version": ")[0-9][0-9]?\.[0-9][0-9]?\.[0-9][0-9]?/
    : /\b(v?)[0-9][0-9]?\.[0-9][0-9]?\.[0-9][0-9]?\b/g;

  retrieve.file(filepath)
    .replace(regex, '$1' + version)
    .to(filepath);
}

/**
 * @param {string} filepath
 * @return {string}
 */
function hashFile(filepath) {

  /** @type {Buffer} */
  var content;
  /** @type {string} */
  var hash;

  content = retrieve.file(filepath, null);
  hash = crypto.createHash('sha1')
    .update(content)
    .digest('hex')
    .slice(0, 20);

  return filepath.replace(/^(.*)(\.[a-z]{2,5})$/i, '$1-' + hash + '$2');
}
