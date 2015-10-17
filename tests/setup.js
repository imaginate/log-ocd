/**
 * -----------------------------------------------------------------------------
 * LOG-OCD TESTS: SETUP
 * -----------------------------------------------------------------------------
 * @see [log-ocd]{@link https://github.com/imaginate/log-ocd}
 *
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2015 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Supporting Libraries:
 * @see [are]{@link https://github.com/imaginate/are}
 * @see [Colors]{@link https://www.npmjs.com/package/colors}
 *
 * Annotations:
 * @see [JSDoc3]{@link http://usejsdoc.org/}
 * @see [Closure Compiler specific JSDoc]{@link https://developers.google.com/closure/compiler/docs/js-for-compiler}
 */

// appends global helpers
// see ../helpers/vitals/basics.js
require('../helpers/vitals')();


////////////////////////////////////////////////////////////////////////////////
// SETUP LOG-OCD
////////////////////////////////////////////////////////////////////////////////

/** @type {function} */
global.assert = require('assert').strictEqual;

/** @type {!Array<string>} */
global.logs = [];

/** @type {function} */
global.logOCDLogger = function(str) {
  logs.push(str);
};

/**
 * @param {function} method
 * @param {!Array<string>} args
 * @param {!Array<string>} results
 */
global.testLog = function testLog(method, args, results) {
  logs = [];
  method.apply(null, args);
  each(results, function(/** * */ val, /** number */ i) {
    assert(val, logs[i]);
  });
};
