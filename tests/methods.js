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
      [ 'header', 'msg: `accent` ...', { argMap: true, a: /regex/i } ],
      [ 'header', 'msg' ]
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
        '[Function] {', '  a: func,', '}',
        '[ arr ]',
        '/regex/i',
        '{', '  a: obj,', '}'
      ],
      [ 'a: arg1', 'b: arg2' ]
    ],
    pass: [
      [ ' header        ', '', 'str' ],
      [ ' header        ', undefined, undefined ]
    ],
    error: [
      [ ' header        ', '  - msg: accent ...', '', 'a: /regex/i' ],
      [ ' header        ', '  - msg', undefined, undefined ]
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

each(tests.methods, function(/** function */ method, /** string */ name) {

  describe('logOCD.' + name + '\n', function() {
    each(tests.args[name], function(/** !Array<*> */ args, /** number */ i) {

      /** @type {!Array<*>} */
      var results = tests.results[name][i];

      it(testTitle(name, args, results), function() {
        testLog(method, args, results);
      });
    });
  });
});


////////////////////////////////////////////////////////////////////////////////
// PRIVATE HELPERS
////////////////////////////////////////////////////////////////////////////////

/**
 * @private
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

/**
 * @private
 * @param {string} name
 * @param {!Array<string>} args
 * @param {!Array<string>} results
 * @return {string}
 */
function testTitle(name, args, results) {

  /** @type {string} */
  var result;
  /** @type {number} */
  var last;

  result = name === 'log' ? name : 'log.' + name;
  result += '(';
  last = args.length - 1;
  each(args, function(/** * */ arg, /** number */ i) {
    result += makeValStr(arg) + ( i === last ? '' : ', ' );
  });
  result += ') ';

  result += 'should log =>\n        ';
  last = results.length;
  each(results, function(/** * */ log, /** number */ i) {
    result += (++i) + ') ' + makeValStr(log) + ( i === last ? '' : '\n        ' );
  });

  return result;
}

/**
 * @private
 * @param {*} val
 * @return {string}
 */
function makeValStr(val) {
  return is.obj(val) ?
    getObjStr(val) : is.str(val) ?
      '"' + val + '"' : String(val);
}

/**
 * @private
 * @param {(!Object|function)} obj
 * @return {string}
 */
function getObjStr(obj) {

  /** @type {!Array<string>} */
  var keys;
  /** @type {number} */
  var last;
  /** @type {string} */
  var result;

  if ( is.regex(obj) ) {
    return obj.toString();
  }

  if ( is._arr(obj) ) {
    result = is.args(obj) ? '[Arguments] [ ' : '[ ';
    obj = slice(obj);
    return result + obj.join(', ') + ' ]';
  }

  keys = Object.keys(obj);
  last = keys.length - 1;

  result = is.func(obj) ? '[Function] { ' : '{ ';
  each(keys, function(/** string */ key, /** number */ i) {
    result += key + ': ' + String( obj[key] ) + ( i === last ? '' : ', ' );
  });
  return result + ' }';
}
