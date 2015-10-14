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
// DEFINE THE TASK METHODS
////////////////////////////////////////////////////////////////////////////////

/** @type {!Object<string, function>} */
var methods = {};

/** @type {function} */
methods.all = function() {

  /** @type {string} */
  var fileIntro;
  /** @type {string} */
  var contents;
  /** @type {!Array<string>} */
  var inserts;
  /** @type {!RegExp} */
  var regex;

  contents = retrieve.file('parts/export.js')
    .replace(/\r\n?/g, '\n')
    .replace(/^\/\*[\s\S]*?\*\//, '');

  inserts = ('config methods helpers').split(' ');

  regex = /  \/\/ INSERT ([a-z-]+\.js)\n/g;
  each(inserts, function(/** string */ filename) {
    filename += '.js';
    contents = contents.replace(regex,
      function(/** string */ match, /** string */ insertname) {
        return ( insertname === filename ?
          retrieve.file('parts/' + filename)
            .replace(/\r\n?/g, '\n')
            .replace(/^\/\*[\s\S]*?\*\/\n\n/, '')
          : match
        );
      }
    );
  });

  fileIntro = retrieve.file('src/log-ocd.js')
    .replace(/\r\n?/g, '\n')
    .replace(/^(\/\*[\s\S]*?\*\/\n)[\s\S]*$/, '$1');

  (fileIntro + contents).to('src/log-ocd.js');

  log.pass('Completed `compile.all` Task');
};


////////////////////////////////////////////////////////////////////////////////
// EXPORT THE TASK
////////////////////////////////////////////////////////////////////////////////

/** @type {!Task} */
module.exports = newTask('compile', 'all', methods);
