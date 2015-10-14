/**
 * -----------------------------------------------------------------------------
 * MAKE TASK: test
 * -----------------------------------------------------------------------------
 * @file Use `$ node make test` to access this file.
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
module.exports = newTask('test', 'main', {

  /**
   * @param {string=} options
   */
  main: function main(options) {

    /** @type {string} */
    var source;
    /** @type {string} */
    var tests;

    options = getOptions(options);

    configLog();

    source = './src/log-ocd.js';
    tests = './tests/*.js';

    logStart(source);
    runTests(options, tests);
    logFinish(source);

    resetLog();
  }
});


////////////////////////////////////////////////////////////////////////////////
// DEFINE PRIVATE HELPERS
////////////////////////////////////////////////////////////////////////////////

/**
 * @param {string=} options
 * @return {string}
 */
function getOptions(options) {

  /** @type {!Object} */
  var defaults;
  /** @type {string} */
  var result;

  options = is.str(options) ? options.split('+') : [];

  defaults = {
    reporter: 'dot',
    slow: 5,
    timeout: 1000
  };
  result = '--colors ';

  each(options, function(/** string */ option) {
    if ( /=/.test(option) ) {
      defaults[ getName(option) ] = getVal(option);
    }
    else {
      result += option && '--' + hyphenate(option) + ' ';
    }
  });

  each(defaults, function(/** * */ val, /** string */ option) {
    result += '--' + hyphenate(option) + ' ' + val + ' ';
  });

  return result;
}

/**
 * @param {string} options
 * @param {string} tests
 */
function runTests(options, tests) {
  exec('node ./node_modules/mocha/bin/mocha ' + options + ' ' + tests);
}

/**
 * @param {string} source
 */
function logStart(source) {
  log.debug('Testing `' + source + '`');
}

/**
 * @param {string} source
 */
function logFinish(source) {
  log.pass('Finished testing `' + source + '`');
}

/** @type {function} */
function configLog() {
  log.setConfig('pass.spaceAfter', 2);
  log.setConfig('debug.spaceAfter', 0);
}

/** @type {function} */
function resetLog() {
  log.resetConfig();
}

/**
 * @param {string} str
 */
function getName(str) {
  return str && str.replace(/^([a-z]+)(?:[^a-z].*)?$/i, '$1');
}

/**
 * @param {string} str
 */
function getVal(str) {
  return str && str.replace(/^[a-z]+\=(.*)?$/i, '$1');
}

/**
 * @param {string} str
 * @return {string}
 */
function hyphenate(str) {
  return str && str.replace(/([A-Z])/g, '-$1').toLowerCase();
}
