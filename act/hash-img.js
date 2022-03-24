/**
 * -----------------------------------------------------------------------------
 * ACT TASK: hash-img
 * -----------------------------------------------------------------------------
 * @file Use `$ act hash-img` to access this file.
 * @version 1.0.0-beta.10
 *
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2022 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * @see [JSDoc3](http://usejsdoc.org)
 * @see [Closure Compiler JSDoc](https://developers.google.com/closure/compiler/docs/js-for-compiler)
 */

'use strict';

////////////////////////////////////////////////////////////
// EXPORTS
////////////////////////////////////////////////////////////

exports['desc'] = 'hashes all image names in repo';
exports['method'] = hashAllImg;

////////////////////////////////////////////////////////////
// HELPERS
////////////////////////////////////////////////////////////

var vitals = require('node-vitals')('base', 'fs');
var each   = vitals.each;
var fuse   = vitals.fuse;
var get    = vitals.get;
var has    = vitals.has;
var remap  = vitals.remap;
var to     = vitals.to;

var crypto = require('crypto');

var path = require('path');
var resolve = path.resolve;

////////////////////////////////////////////////////////////
// CONSTANTS
////////////////////////////////////////////////////////////

var ROOTPATH = resolve(__dirname, '..');

////////////////////////////////////////////////////////////
// PUBLIC METHODS
////////////////////////////////////////////////////////////

/**
 * @public
 * @type {function}
 */
function hashAllImg() {

  /** @type {!Array<string>} */
  var imgpaths;
  /** @type {string} */
  var dirpath;
  /** @type {string} */
  var dest;
  /** @type {!Buffer} */
  var buff;

  dirpath = resolve(ROOTPATH, 'example');
  imgpaths = get.filepaths(dirpath, {
    basepath:  true,
    validExts: 'jpg|jpeg|png|gif'
  });
  each(imgpaths, function(src) {
    dest = hashFile(src);
    buff = get.file(src, true);
    to.file(buff, dest);
  });
}

////////////////////////////////////////////////////////////
// PRIVATE METHODS
////////////////////////////////////////////////////////////

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

