/**
 * -----------------------------------------------------------------------------
 * ACT TASK: version
 * -----------------------------------------------------------------------------
 * @file Use `$ act version` to access this file.
 *
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2017 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * @see [JSDoc3]{@link http://usejsdoc.org/}
 * @see [Closure Compiler specific JSDoc]{@link https://developers.google.com/closure/compiler/docs/js-for-compiler}
 */

'use strict';

exports['desc'] = 'updates version for the repo';
exports['value'] = 'x.x.x-pre.x';
exports['default'] = '-all';
exports['methods'] = {
  'all': {
    'desc': 'updates version for entire repo',
    'value': 'x.x.x-pre.x',
    'method': updateAllVersion
  },
  'npm': {
    'desc': 'updates only npm version',
    'value': 'x.x.x-pre.x',
    'method': updateNPMVersion
  }
};

var vitals = require('node-vitals')('base', 'fs');
var each   = vitals.each;
var fuse   = vitals.fuse;
var get    = vitals.get;
var has    = vitals.has;
var remap  = vitals.remap;
var to     = vitals.to;

var ERROR_MSG = 'invalid value (must be a semantic version)';
var SEMANTIC  = /^[0-9]+\.[0-9]+\.[0-9]+(?:-[a-z]+\.?[0-9]*)?$/;
var NPM_BADGE = /(badge\/npm-)[0-9]+\.[0-9]+\.[0-9]+(?:--[a-z]+\.?[0-9]*)?/;
var ALL_VERSION = /\b(v?)[0-9]+\.[0-9]+\.[0-9]+(?:-[a-z]+\.?[0-9]*)?\b/g;
var NPM_VERSION = /("version": ")[0-9]+\.[0-9]+\.[0-9]+(?:-[a-z]+\.?[0-9]*)?/;

/**
 * @public
 * @param {string} version
 */
function updateAllVersion(version) {

  /** @type {!Array<string>} */
  var files;
  /** @type {!Object} */
  var opts;

  if ( !isSemVersion(version) ) throw new Error(ERROR_MSG);

  opts = { base: true, validExts: 'js' };
  files = get.filepaths('.', opts);
  each(files, function(file) {
    insertVersion(file, version);
  });

  opts.deep = true;
  files = get.filepaths('src', opts);
  each(files, function(file) {
    insertVersion(file, version);
  });

  updateNPMVersion(version);
}

/**
 * @public
 * @param {string} version
 */
function updateNPMVersion(version) {

  /** @type {string} */
  var content;

  if ( !isSemVersion(version, true) ) throw new Error(ERROR_MSG);

  content = get.file('./package.json');
  version = fuse('$1', version);
  content = remap(content, NPM_VERSION, version);
  to.file(content, './package.json');

  content = get.file('./README.md');
  version = remap(version, /-/, '--');
  content = remap(content, NPM_BADGE, version);
  to.file(content, './README.md');
}


/**
 * @private
 * @param {string} version
 * @return {boolean}
 */
function isSemVersion(version) {
  return !!version && has(version, SEMANTIC);
}

/**
 * @private
 * @param {string} filepath
 * @param {string} version
 */
function insertVersion(filepath, version) {

  /** @type {string} */
  var content;

  version = fuse('$1', version);
  content = get.file(filepath);
  content = remap(content, ALL_VERSION, version);
  to.file(content, filepath);
}
