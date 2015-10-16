/**
 * -----------------------------------------------------------------------------
 * MAKE TASK: compile
 * -----------------------------------------------------------------------------
 * @file Use `$ node make compile` to access this file.
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
module.exports = newTask('compile', 'main', {

  /**
   * @type {function}
   */
  main: function main() {

    /** @type {string} */
    var contents;
    /** @type {string} */
    var parts;

    contents = getFileIntro('src/log-ocd.js');
    contents += getFile('parts/export.js');

    parts = 'config gen-helpers log-helpers methods';

    each(parts.split(' '), function(/** string */ filename) {
      contents = insertFile(contents, filename);
    });
    contents.to('src/log-ocd.js');

    log.pass('Completed `compile.main` Task');
  }
});


////////////////////////////////////////////////////////////////////////////////
// DEFINE PRIVATE HELPERS
////////////////////////////////////////////////////////////////////////////////

/**
 * @param {string} filepath
 * @return {string}
 */
function getFile(filepath) {
  return retrieve.file(filepath) // get file contents
    .replace(/\r\n?/g, '\n') // normalize line breaks
    .replace(/^\/\*[\s\S]*?\*\/\n\n/, ''); // strip intro
}

/**
 * @param {string} contents
 * @param {string} filename
 * @return {string}
 */
function insertFile(contents, filename) {
  filename += '.js';
  return contents.replace(
    new RegExp('  \\/\\/ INSERT ' + filename.replace(/\./g, '\\.') + '\\n'),
    getFile('parts/' + filename)
  );
}

/**
 * @param {string} filepath
 * @return {string}
 */
function getFileIntro(filepath) {
  return retrieve.file(filepath) // get file contents
    .replace(/\r\n?/g, '\n') // normalize line breaks
    .replace(/^(\/\*[\s\S]*?\*\/\n)[\s\S]*$/, '$1'); // get file intro
}
