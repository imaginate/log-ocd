// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// THIS MAKE TASK IS SET TO BE UPDATED TO AN ACT TASK
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// DO NOT USE
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

/**
 * -----------------------------------------------------------------------------
 * ACT TASK: test
 * -----------------------------------------------------------------------------
 * @file Use `$ act test` to access this file.
 * @version 1.0.0-beta.10
 *
 * @author Adam Smith <imagineadamsmith@gmail.com> (https://github.com/imaginate)
 * @copyright 2022 Adam A Smith <imagineadamsmith@gmail.com> (https://github.com/imaginate)
 *
 * @see [JSDoc3]{@link http://usejsdoc.org/}
 * @see [Closure Compiler specific JSDoc]{@link https://developers.google.com/closure/compiler/docs/js-for-compiler}
 */

'use strict';


////////////////////////////////////////////////////////////////////////////////
// DEFINE & EXPORT THE TASK
////////////////////////////////////////////////////////////////////////////////

/** @type {!Task} */
module.exports = newTask('test', 'all', {

  /**
   * @param {string=} options
   */
  all: function all(options) {

    /** @type {string} */
    var tests;
    /** @type {string} */
    var title;

    options = getOptions(options);
    tests = './tests/*.js';
    title = 'All';

    configLog();

    logStart(title);
    runTests(options, tests);
    logFinish(title);

    resetLog();
  },

  /**
   * @param {string=} options
   */
  config: function config(options) {

    /** @type {string} */
    var tests;
    /** @type {string} */
    var title;

    options = getOptions(options);
    tests = './tests/config-methods.js';
    title = 'Config Method';

    configLog();

    logStart(title);
    runTests(options, tests);
    logFinish(title);

    resetLog();
  },

  /**
   * @param {string=} options
   */
  logs: function logs(options) {

    /** @type {string} */
    var tests;
    /** @type {string} */
    var title;

    options = getOptions(options);
    tests = './tests/logging-methods.js';
    title = 'Logging Method';

    configLog();

    logStart(title);
    runTests(options, tests);
    logFinish(title);

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
    reporter: 'spec',
    slow: 50,
    timeout: 5000
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

  return result + '--require ./tests/setup.js --globals logOCD ';
}

/**
 * @param {string} options
 * @param {string} tests
 */
function runTests(options, tests) {
  options = options.replace(/([^ ])$/, '$1 ');
  exec('node ./node_modules/mocha/bin/mocha ' + options + tests);
}

/**
 * @param {string} title
 */
function logStart(title) {
  log.debug('Starting ' + title + ' Tests');
}

/**
 * @param {string} title
 */
function logFinish(title) {
  log.pass('Finished ' + title + ' Tests');
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
