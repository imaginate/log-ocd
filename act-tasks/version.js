/**
 * -----------------------------------------------------------------------------
 * ACT TASK: version
 * -----------------------------------------------------------------------------
 * @file Use `$ act version` to access this file.
 *
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2016 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * @see [JSDoc3]{@link http://usejsdoc.org/}
 * @see [Closure Compiler specific JSDoc]{@link https://developers.google.com/closure/compiler/docs/js-for-compiler}
 */

'use strict';

// globally append all of are and vitals methods
require('node-are')();
require('node-vitals')(2, 'all');


var ERROR_MSG = 'invalid version (must be a semantic version) for act version task';
var BASE_SEMANTIC = /^[0-9]+\.[0-9]+\.[0-9]+$/;
var PRE_SEMANTIC = /^[0-9]+\.[0-9]+\.[0-9]+(?:-[a-z]+(?:.[0-9]+)?)?$/;
var BASE_VERSION = /\b(v?)[0-9]+\.[0-9]+\.[0-9]+\b/g;
var NPM_VERSION = /("version": ")[0-9]+\.[0-9]+\.[0-9]+/;


exports['desc'] = 'updates version for the repo';
exports['value'] = 'semantic-version';
exports['default'] = '-all';
exports['methods'] = {
  'all': {
    'desc': 'updates version for entire repo',
    'value': 'semantic-version',
    'method': updateAllVersion
  },
  'npm': {
    'desc': 'updates only npm version',
    'value': 'semantic-version',
    'method': updateNPMVersion
  }
};


/**
 * @public
 * @param {string} version
 */
function updateAllVersion(version) {

  /** @type {!Array<string>} */
  var filepaths;

  if ( !isSemVersion(version) ) throw new Error(ERROR_MSG);

  filepaths = get.filepaths('.', {
    deep:      true,
    validExts: '.js',
    validDirs: 'src'
  });
  each(filepaths, function(filepath) {
    insertJSVersion(filepath, version);
  });

  insertNPMVersion(version);

  console.log('\u001b[42m Completed version.all task      \u001b[49m');
}

/**
 * @public
 * @param {string} version
 */
function updateNPMVersion(version) {

  if ( !isSemVersion(version, true) ) throw new Error(ERROR_MSG);

  insertNPMVersion(version);

  console.log('\u001b[42m Completed version.npm task      \u001b[49m');
}


/**
 * @private
 * @param {string} version
 * @param {boolean=} includePre
 * @return {boolean}
 */
function isSemVersion(version, includePre) {

  /** @type {!RegExp} */
  var semantic;

  semantic = includePre ? PRE_SEMANTIC : BASE_SEMANTIC;
  return is._str(version) && has(version, semantic);
}

/**
 * @private
 * @param {string} filepath
 * @param {string} version
 */
function insertJSVersion(filepath, version) {

  /** @type {string} */
  var content;

  content = get.file(filepath);
  version = fuse('$1', version);
  content = remap(content, BASE_VERSION, version);
  to.file(content, filepath);
}

/**
 * @private
 * @param {string} version
 */
function insertNPMVersion(version) {

  /** @type {string} */
  var content;

  content = get.file('./package.json');
  version = fuse('$1', version);
  content = remap(content, NPM_VERSION, version);
  to.file(content, './package.json');
}
