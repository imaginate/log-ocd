/**
 * -----------------------------------------------------------------------------
 * LOG-OCD METHOD TESTS
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

/** @type {function} */
var assert = require('assert').strictEqual;

// note: ../helpers/vitals/basics.js is auto-loaded


////////////////////////////////////////////////////////////////////////////////
// SETUP LOG-OCD FOR TESTS
////////////////////////////////////////////////////////////////////////////////

/** @type {!Array<string>} */
var logs = [];

/** @type {function} */
global.logOCDLogger = function(str) {
  logs.push(str);
};

/** @type {Function<string, function>} */
var logOCD = require('../src/log-ocd.js')({
  all: {
    spaceBefore: 0,
    spaceAfter: 0
  },
  error: { exit: false }
});


////////////////////////////////////////////////////////////////////////////////
// SETUP THE TESTS
////////////////////////////////////////////////////////////////////////////////

/*
 * ------------------------------
 * | Method | Params            |
 * | :----- | :---------------- |
 * | log    | vals              |
 * | pass   | header, vals      |
 * | error  | header, msg, vals |
 * | warn   | header, msg, vals |
 * | debug  | header, vals      |
 * | fail   | msg, vals         |
 * ------------------------------
 */

/** @type {function} */
var func = function(){};
func.a = 'func';

/** @type {!Object} */
var tests = {
  methods: {
    log:   logOCD,
    pass:  logOCD.pass,
    error: logOCD.error,
    warn:  logOCD.warn,
    debug: logOCD.debug,
    fail:  logOCD.fail
  },
  args: {
    log: [
      [ 'str', func, [ 'arr' ], /regex/i, { a: 'obj' } ],
      [ { argMap: true, a: 'arg1', b: 'arg2' } ]
    ],
    pass: [
      [ 'header', 'str' ],
      [ 'header' ]
    ],
    error: [
      //[ '' ]
    ],
    warn: [
      //[ '' ]
    ],
    debug: [
      //[ '' ]
    ],
    fail: [
      //[ '' ]
    ]
  },
  results: {
    log: [
      [ 
        'str',
        '[ Function ]: {', '  a: func,', '}',
        '[ arr ]',
        '/regex/i',
        '{', '  a: obj,', '}'
      ],
      [ 'a: arg1', 'b: arg2' ]
    ],
    pass: [
      [ ' header        ', '', 'str' ],
      [ ' header        ' ]
    ],
    error: [
      //[ '' ]
    ],
    warn: [
      //[ '' ]
    ],
    debug: [
      //[ '' ]
    ],
    fail: [
      //[ '' ]
    ]
  }
};


////////////////////////////////////////////////////////////////////////////////
// RUN THE TESTS
////////////////////////////////////////////////////////////////////////////////

each(tests.methods, function(/** function */ log, /** string */ method) {
  describe('logOCD.' + method + '\n', function() {
    each(tests.args[method], function(/** !Array<*> */ args, /** number */ i) {
      it('(' + args.join(', ') + ')', function() {
        testLog(log, args, tests.results[method][i]);
      })
    });
  });
});


////////////////////////////////////////////////////////////////////////////////
// PRIVATE HELPERS
////////////////////////////////////////////////////////////////////////////////

/**
 * @param {function} method
 * @param {!Array<string>} args
 * @param {!Array<string>} results
 */
function testLog(method, args, results) {
  logs = [];
  method.apply(null, args);
  each(results, function(/** * */ val, /** number */ i) {
    assert(val, logs[i]);
  });
}
