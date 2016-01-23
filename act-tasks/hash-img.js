/**
 * -----------------------------------------------------------------------------
 * ACT TASK: hash-img
 * -----------------------------------------------------------------------------
 * @file Use `$ act hash-img` to access this file.
 *
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2016 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * @see [JSDoc3]{@link http://usejsdoc.org/}
 * @see [Closure Compiler specific JSDoc]{@link https://developers.google.com/closure/compiler/docs/js-for-compiler}
 */

'use strict';

var crypto = require('crypto');

// globally append all of are and vitals methods
require('node-are')();
require('node-vitals')(2, 'all');

exports['desc'] = 'hashes all image names in repo';
exports['method'] = hashAllImg;

/**
 * @public
 * @type {function}
 */
function hashAllImg() {

  /** @type {!Array<string>} */
  var filepaths;
  /** @type {!Array<string>} */
  var newpath;

  filepaths = get.filepaths('.', {
    validExts: 'jpg|png|gif|jpeg'
  });
  each(filepaths, function(filepath) {
    newpath = hashFile(filepath);
    copy.file(filepath, newpath, {
      'encoding': null,
      'eol':      null
    });
  });

  console.log('\n\u001b[1;42m Completed hash-img task      \u001b[0m');
}

/**
 * @private
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
  hash = fuse('$1-', hash, '$2');
  return remap(filepath, /^(.*)(\.[a-z]{2,5})$/i, hash);
}
