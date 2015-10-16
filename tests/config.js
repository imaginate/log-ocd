/**
 * -----------------------------------------------------------------------------
 * LOG-OCD CONFIG TESTS
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
var log = require('../src/log-ocd.js')({
  error: { exit: false }
});

console.log(log);

////////////////////////////////////////////////////////////////////////////////
// SETUP THE TESTS
////////////////////////////////////////////////////////////////////////////////

/*
 * All log-ocd Instance Methods & Config Props
 * -----------------------------------------------------------------
 * | Method | Props                                                |
 * | :----- | :--------------------------------------------------- |
 * | all    | spaceBefore, spaceAfter, argMap, header, style, exit |
 * | log    | spaceBefore, spaceAfter, argMap, style               |
 * | pass   | spaceBefore, spaceAfter, argMap, header              |
 * | error  | spaceBefore, spaceAfter, argMap, header, exit        |
 * | warn   | spaceBefore, spaceAfter, argMap, header              |
 * | debug  | spaceBefore, spaceAfter, argMap, header              |
 * | fail   | spaceBefore, spaceAfter, argMap                      |
 * -----------------------------------------------------------------
 */

/** @type {!Object} */
var tests = {
  methods: {
    truthy: {
      log:   [ 'spaceBefore', 'spaceAfter', 'argMap', 'style' ],
      pass:  [ 'spaceBefore', 'spaceAfter', 'argMap', 'header'  ],
      error: [ 'spaceBefore', 'spaceAfter', 'argMap', 'header', 'exit' ],
      warn:  [ 'spaceBefore', 'spaceAfter', 'argMap', 'header' ],
      debug: [ 'spaceBefore', 'spaceAfter', 'argMap', 'header' ],
      fail:  [ 'spaceBefore', 'spaceAfter', 'argMap' ]
    },
    falsy: {
      log:   [ 'header', 'exit' ],
      pass:  [ 'style', 'exit' ],
      error: [ 'style' ],
      warn:  [ 'style', 'exit' ],
      debug: [ 'style', 'exit' ],
      fail:  [ 'header', 'style', 'exit' ]
    }
  },
  props: {
    truthy: {
      spaceBefore: 2,
      spaceAfter: 1,
      argMap: true,
      header: false,
      style: 'plain',
      exit: false
    },
    falsy: {
      spaceBefore: '2',
      spaceAfter: '1',
      argMap: null,
      header: null,
      style: 'fail',
      exit: null
    }
  }
};


////////////////////////////////////////////////////////////////////////////////
// RUN THE TESTS
////////////////////////////////////////////////////////////////////////////////

describe('log-ocd config', function() {

  describe('\n    all.<prop>', function() {
    describe('truthy', function() {
      each(tests.props.truthy, function(/** * */ val, /** string */ prop) {
        it('all.' + prop, function() {
          pass('all', prop, val);
        });
      });
    });
    describe('falsy', function() {
      each(tests.props.falsy, function(/** * */ val, /** string */ prop) {
        it('all.' + prop, function() {
          fail('all', prop, val);
        });
      });
    });
  });

  describe('\n    <method>.<prop>', function() {
    describe('truthy', function() {
      each(tests.methods.truthy,
        function(/** !Array<string> */ props, /** string */ method) {
          describe(method + '.<prop>', function() {
            each(props, function(/** string */ prop) {
              it(method + '.' + prop, function() {
                pass(method, prop);
              });
            });
          });
        }
      );
    });
    describe('falsy', function() {
      each(tests.methods.falsy,
        function(/** !Array<string> */ props, /** string */ method) {
          describe(method + '.<prop>', function() {
            each(props, function(/** string */ prop) {
              it(method + '.' + prop, function() {
                fail(method, prop);
              });
            });
          });
        }
      );
    });
  });

  describe('\n  logging behavior', function() {
    beforeEach(function() {
      log.resetConfig();
    });
    it('config.log.spaceBefore', function() {
      testLog();
      log.setConfig('log.spaceBefore', 2);
      testLog('', '', colorStr('test'), '');
    });
    it('config.log.spaceAfter', function() {
      testLog();
      log.setConfig('log.spaceAfter', 0);
      testLog('', colorStr('test'), undefined);
    });
    it('config.log.style', function() {
      testLog();
      log.setConfig('log.style', 'fail');
      testLog('', colorStr('test', 31), '');
    });
  });
});


////////////////////////////////////////////////////////////////////////////////
// PRIVATE HELPERS
////////////////////////////////////////////////////////////////////////////////

/**
 * @param {string} method
 * @param {string} prop
 * @param {*=} val
 */
function pass(method, prop, val) {
  val = is.undefined(val) ? tests.props.truthy[prop] : val;
  val = log.setConfig(method + '.' + prop, val);
  assert(true, val);
}

/**
 * @param {string} method
 * @param {string} prop
 * @param {*=} val
 */
function fail(method, prop, val) {
  val = is.undefined(val) ? tests.props.truthy[prop] : val;
  val = log.setConfig(method + '.' + prop, val);
  assert(false, val);
}

/**
 * @param {*...} logs
 */
function testLog() {

  if (!arguments.length) {
    testLog('', colorStr('test'), '');
    return;
  }

  logs = [];
  log('test');
  each(arguments, function(/** * */ val, /** number */ i) {
    assert(val, logs[i]);
  });
}

/**
 * @param {string} str
 * @param {number=} code [default= 37]
 * @return {string}
 */
function colorStr(str, code) {
  return '\x1B[' + (code || 37) + 'm' + str + '\x1B[39m';
}
