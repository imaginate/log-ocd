/**
 * -----------------------------------------------------------------------------
 * ACT TASK: hash-img
 * -----------------------------------------------------------------------------
 * @file Use `$ act hash-img` to access this file.
 *
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2017 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * @see [JSDoc3]{@link http://usejsdoc.org/}
 * @see [Closure Compiler specific JSDoc]{@link https://developers.google.com/closure/compiler/docs/js-for-compiler}
 */

'use strict';

exports['desc'] = 'hashes all image names in repo';
exports['method'] = hashAllImg;

var vitals = require('node-vitals')('base', 'fs');
var each   = vitals.each;
var fuse   = vitals.fuse;
var get    = vitals.get;
var has    = vitals.has;
var remap  = vitals.remap;
var to     = vitals.to;

var crypto = require('crypto');

/**
 * @public
 * @type {function}
 */
function hashAllImg() {

  /** @type {!Array<string>} */
  var filepaths;
  /** @type {!Array<string>} */
  var newpath;
  /** @type {!Buffer} */
  var buffer;

  filepaths = get.filepaths('example', {
    validExts: /\.jpe?g|png|gif$/
  });
  each(filepaths, function(filepath) {
    filepath = fuse('example/', filepath);
    newpath = hashFile(filepath);
    buffer = get.file(filepath, true);
    to.file(buffer, newpath);
  });
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
