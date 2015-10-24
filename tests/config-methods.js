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
 * ------------------------------------------------------------------------
 * | Method | Props                                                       |
 * | :----- | :---------------------------------------------------------- |
 * | all    | spaceBefore, spaceAfter, argMap, header, style, stack, exit |
 * | log    | spaceBefore, spaceAfter, argMap, style                      |
 * | pass   | spaceBefore, spaceAfter, argMap, header                     |
 * | error  | spaceBefore, spaceAfter, argMap, header, stack, exit        |
 * | warn   | spaceBefore, spaceAfter, argMap, header, stack              |
 * | debug  | spaceBefore, spaceAfter, argMap, header, stack              |
 * | fail   | spaceBefore, spaceAfter, argMap, stack                      |
 * ------------------------------------------------------------------------
 */

/** @type {!Object} */
var tests = {
  methods: {
    truthy: {
      log:   [ 'spaceBefore', 'spaceAfter', 'argMap', 'style' ],
      pass:  [ 'spaceBefore', 'spaceAfter', 'argMap', 'header' ],
      error: [ 'spaceBefore', 'spaceAfter', 'argMap', 'header','stack','exit' ],
      warn:  [ 'spaceBefore', 'spaceAfter', 'argMap', 'header', 'stack' ],
      debug: [ 'spaceBefore', 'spaceAfter', 'argMap', 'header', 'stack' ],
      fail:  [ 'spaceBefore', 'spaceAfter', 'argMap', 'stack' ]
    },
    falsy: {
      log:   [ 'header', 'stack', 'exit' ],
      pass:  [ 'style', 'stack', 'exit' ],
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
      stack: false,
      exit: false
    },
    falsy: {
      spaceBefore: '2',
      spaceAfter: '1',
      argMap: null,
      header: null,
      style: 'false',
      stack: null,
      exit: null
    }
  }
};

/** @type {!Array<string>} */
var methods = Object.keys(tests.methods.truthy);
/** @type {!Array<string>} */
var props = Object.keys(tests.props.truthy);


////////////////////////////////////////////////////////////////////////////////
// RUN resetConfig TESTS
////////////////////////////////////////////////////////////////////////////////

describe('logOCD.resetConfig("<method>")', function() {

  describe('each should return true', function() {
    it(getResetTitle(),function(){
      passReset();
    });
    it(getResetTitle(methods), function() {
      passReset(methods);
    });
    each(methods, function(/** string */ method) {
      it(getResetTitle(method), function() {
        passReset(method);
      });
    });
  });

  describe('each should return false', function() {
    each('nope false extinct'.split(' '), function(/** string */ method) {
      it(getResetTitle(method), function() {
        failReset(method);
      });
    });
  });
});


////////////////////////////////////////////////////////////////////////////////
// RUN setConfig TESTS
////////////////////////////////////////////////////////////////////////////////

describe('logOCD.setConfig("<method>.<prop>", val)', function() {

  describe('each should return true', function() {
    each(tests.props.truthy, function(/** * */ val, /** string */ prop) {
      it(getSetTitle('all', prop, val), function() {
        passSet('all', prop, val);
      });
    });
    each(methods, function(/** string */ method) {
      each(tests.methods.truthy[method], function(/** string */ prop) {
        it(getSetTitle(true, method, prop), function() {
          passSet(method, prop);
        });
      });
    });
  });

  describe('each should return false', function() {
    each(tests.props.falsy, function(/** * */ val, /** string */ prop) {
      it(getSetTitle('all', prop, val), function() {
        failSet('all', prop, val);
      });
    });
    each(methods, function(/** string */ method) {
      each(tests.methods.falsy[method], function(/** string */ prop) {
        it(getSetTitle(false, method, prop), function() {
          failSet(method, prop);
        });
      });
    });
  });

  describe('each should change logging behavior', function() {
    beforeEach(function() {
      logOCD.resetConfig('log', 'pass');
    });

    it(getSetTitle('log', 'spaceBefore', 2), function() {
      testLog(logOCD, [ 'test' ], [ '', '"test"', '' ]);
      logOCD.setConfig('log.spaceBefore', 2);
      testLog(logOCD, [ 'test' ], [ '', '', '"test"', '' ]);
    });

    it(getSetTitle('log', 'spaceAfter', 0), function() {
      testLog(logOCD, [ 'test' ], [ '', '"test"', '' ]);
      logOCD.setConfig('log.spaceAfter', 0);
      testLog(logOCD, [ 'test' ], [ '', '"test"', undefined ]);
    });

    it(getSetTitle('log', 'argMap', true), function() {
      testLog(logOCD, [ { a: 'test' } ], [ '', '{', '  a: "test"', '}', '' ]);
      logOCD.setConfig('log.argMap', true);
      testLog(logOCD, [ { a: 'test' } ], [ '', 'a: "test"', '' ]);
    });

    it(getSetTitle('pass', 'header', false), function() {
      testLog(logOCD.pass, [ 'test' ], [ '', ' test        ', '' ]);
      logOCD.setConfig('pass.header', false);
      testLog(logOCD.pass, [ 'test' ], [ '', ' Pass        ', '', '"test"', '' ]);
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

/**
 * @param {(string|!Array<string>)=} method
 * @return {string}
 */
function getResetTitle(method) {
  method = is.arr(method) ? method.join('", "') : method;
  return method ? 'resetConfig("' + method + '")' : 'resetConfig()';
}

/**
 * @param {boolean=} props - truthy or falsy
 * @param {string=} method
 * @param {string=} prop
 * @param {*=} val
 * @return {string}
 */
function getSetTitle(props, method, prop, val) {
  if ( is.bool(props) ) {
    val = props ? tests.props.truthy[prop] : tests.props.falsy[prop];
  }
  else {
    val = prop;
    prop = method;
    method = props;
  }
  val = is.undefined(val) ?
    'val' : is.string(val) ?
      '"' + val + '"' : val;
  method = method || '<method>';
  prop = prop || '<prop>';
  return 'setConfig("' + method + '.' + prop + '", ' + val + ')';
}

