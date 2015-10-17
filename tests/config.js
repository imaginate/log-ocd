/**
 * -----------------------------------------------------------------------------
 * LOG-OCD TESTS: CONFIG
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

/** @type {Function<string, function>} */
var logOCD = require('../src/log-ocd.js')({
  error: { exit: false }
});


////////////////////////////////////////////////////////////////////////////////
// THE CONFIG TESTS
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
      style: 'false',
      exit: null
    }
  }
};


////////////////////////////////////////////////////////////////////////////////
// RUN THE RESET TESTS
////////////////////////////////////////////////////////////////////////////////

describe('logOCD.resetConfig\n', function() {

  describe('resetConfig("<method>")', function() {

    describe('each should return true', function() {

      /** @type {!Array<string>} */
      var keys = Object.keys(tests.methods.truthy);

      it('resetConfig() && resetConfig(' + keys.join(', ') + ')', function() {
        passReset();
        passReset(keys);
      });
      each(keys, function(/** string */ method) {
        it('resetConfig(' + method + ')', function() {
          passReset(method);
        });
      });
    });

    describe('each should return false', function() {
      each('nope false extinct'.split(' '), function(/** string */ method) {
        it('resetConfig(' + method + ')', function() {
          failReset(method);
        });
      });
    });
  });
});


////////////////////////////////////////////////////////////////////////////////
// RUN THE SET TESTS
////////////////////////////////////////////////////////////////////////////////

describe('logOCD.setConfig\n', function() {

  describe('setConfig("all.<prop>", val)', function() {

    describe('truthy', function() {
      each(tests.props.truthy, function(/** * */ val, /** string */ prop) {
        it('setConfig("all.' + prop + '", ' + val + ')', function() {
          passSet('all', prop, val);
        });
      });
    });

    describe('falsy', function() {
      each(tests.props.falsy, function(/** * */ val, /** string */ prop) {
        it(prop, function() {
          failSet('all', prop, val);
        });
      });
    });
  });


  describe('\n    <method>.<prop>\n', function() {

    describe('truthy', function() {
      each(tests.methods.truthy,
        function(/** !Array<string> */ props, /** string */ method) {
          describe(method + '.<prop>', function() {
            each(props, function(/** string */ prop) {
              it(prop, function() {
                passSet(method, prop);
              });
            });
          });
        }
      );
    });

    describe('\n      falsy', function() {
      each(tests.methods.falsy,
        function(/** !Array<string> */ props, /** string */ method) {
          describe(method + '.<prop>', function() {
            each(props, function(/** string */ prop) {
              it(prop, function() {
                failSet(method, prop);
              });
            });
          });
        }
      );
    });
  });


  describe('\n  logOCD.setConfig should change logging behavior', function() {

    beforeEach(function() {
      logOCD.resetConfig('log', 'pass');
    });

    it('config.log.spaceBefore', function() {
      testLog(logOCD, [ 'test' ], [ '', 'test', '' ]);
      logOCD.setConfig('log.spaceBefore', 2);
      testLog(logOCD, [ 'test' ], [ '', '', 'test', '' ]);
    });

    it('config.log.spaceAfter', function() {
      testLog(logOCD, [ 'test' ], [ '', 'test', '' ]);
      logOCD.setConfig('log.spaceAfter', 0);
      testLog(logOCD, [ 'test' ], [ '', 'test', undefined ]);
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
function passSet(method, prop, val) {
  val = is.undefined(val) ? tests.props.truthy[prop] : val;
  val = logOCD.setConfig(method + '.' + prop, val);
  assert(true, val);
}

/**
 * @param {string} method
 * @param {string} prop
 * @param {*=} val
 */
function failSet(method, prop, val) {
  val = is.undefined(val) ? tests.props.truthy[prop] : val;
  val = logOCD.setConfig(method + '.' + prop, val);
  assert(false, val);
}

/**
 * @param {string=} method
 */
function passReset(method) {
  val = !method ?
    logOCD.resetConfig() : is.arr(method) ?
      logOCD.resetConfig.apply(null, method) : logOCD.resetConfig(method);
  assert(true, val);
}

/**
 * @param {string=} method
 */
function failReset(method) {
  val = method ? logOCD.resetConfig(method) : logOCD.resetConfig();
  assert(false, val);
}
