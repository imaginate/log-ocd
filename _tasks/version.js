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
module.exports = newTask('all', {

  /**
   * @param {string} version
   */
  all: function all(version) {

    /** @type {!Array<string>} */
    var filepaths;

    if ( !isSemVersion(version) ) {
      throw new RangeError('invalid semantic version for version.all task');
    }

    filepaths = get.filepaths('.', {
      deep: true,
      validExts: '.js',
      validDirs: 'parts|src',
      invalidFiles: 'make.js'
    });
    fuse(filepaths, 'package.json');

    each(filepaths, function(filepath) {
      insertVersion(filepath, version);
    });

    console.log('Completed version.all task');
  },

  /**
   * @type {function}
   */
  hash: function hash() {

    /** @type {!Array<string>} */
    var filepaths;
    /** @type {!Array<string>} */
    var newpath;

    filepaths = get.filepaths('.', {
      validExts: 'jpg|png|gif|jpeg'
    });

    each(filepaths, function(filepath) {
      newpath = hashFile(filepath);
      copy.file(filepath, newpath);
    });

    console.log('Completed version.hash task');
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
  return is._str(version) && has(version, regex);
}

/**
 * @param {string} filepath
 * @param {string} version
 */
function insertVersion(filepath, version) {

  /** @type {string} */
  var content;
  /** @type {!RegExp} */
  var regex;

  if ( has(filepath, /^.*\.json$/) ) {
    regex = /("version": ")[0-9][0-9]?\.[0-9][0-9]?\.[0-9][0-9]?/;
  }
  else {
    regex = /\b(v?)[0-9][0-9]?\.[0-9][0-9]?\.[0-9][0-9]?\b/g;
  }

  content = get.file(filepath);
  content = remap(content, regex, fuse('$1', version));
  to.file(filepath);
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

  content = get.file(filepath, true);
  hash = crypto.createHash('sha1')
    .update(content)
    .digest('hex')
    .slice(0, 20);
  return remap(filepath, /^(.*)(\.[a-z]{2,5})$/i, fuse('$1-', hash, '$2'));
}
