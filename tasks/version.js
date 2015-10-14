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


////////////////////////////////////////////////////////////////////////////////
// DEFINE THE TASK METHODS
////////////////////////////////////////////////////////////////////////////////

/** @type {!Object<string, function>} */
var methods = {};

/**
 * @param {string} version
 */
methods.all = function(version) {

  /** @type {!Array<string>} */
  var filepaths;
  /** @type {!RegExp} */
  var regex;

  regex = /^[0-9][0-9]?\.[0-9][0-9]?\.[0-9][0-9]?$/;
  ( version && regex.test(version) ) || log.error(
    'Invalid `version.all` Task Call',
    'a new semantic version was not provided',
    { argMap: true, version: version }
  );

  filepaths = retrieve.filepaths('.', {
    validExts: '.js',
    validDirs: 'parts|src',
    invalidFiles: 'make.js'
  }, true);
  filepaths.push('tasks/minify.js')

  regex = /\b(v?)[0-9][0-9]?\.[0-9][0-9]?\.[0-9][0-9]?\b/g;
  each(filepaths, function(/** string */ filepath) {
    retrieve.file(filepath)
      .replace(regex, '$1' + version)
      .to(filepath);
  });

  regex = /("version": ")[0-9][0-9]?\.[0-9][0-9]?\.[0-9][0-9]?/;
  retrieve.file('package.json')
    .replace(regex, '$1' + version)
    .to('package.json');

  log.pass('Completed `version.all` Task');
};


////////////////////////////////////////////////////////////////////////////////
// EXPORT THE TASK
////////////////////////////////////////////////////////////////////////////////

/** @type {!Task} */
module.exports = makeTask('version', 'all', methods);
