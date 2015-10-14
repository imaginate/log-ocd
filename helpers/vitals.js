/**
 * -----------------------------------------------------------------------------
 * VITALS LIBRARY
 * -----------------------------------------------------------------------------
 * @file Vitals libraries, functional shortcuts, and other helpers.
 *
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2015 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Supporting Libraries:
 * @see [are]{@link https://github.com/imaginate/are}
 * @see [Lodash]{@link https://github.com/lodash/lodash}
 * @see [ShellJS]{@link https://github.com/shelljs/shelljs}
 *
 * Annotations:
 * @see [JSDoc3]{@link http://usejsdoc.org/}
 * @see [Closure Compiler specific JSDoc]{@link https://developers.google.com/closure/compiler/docs/js-for-compiler}
 */

'use strict';

/** @type {!Object} */
var fs = require('fs');
/** @type {!Object} */
var shell = require('shelljs');
/** @type {function} */
var forOwn = require('lodash/object/forOwn');


////////////////////////////////////////////////////////////////////////////////
// APPEND FOUNDATION LIBRARIES
////////////////////////////////////////////////////////////////////////////////

/** @type {Function<string, function>} */
global.log = require('./log');
/** @type {Function<string, function>} */
global.is = require('node-are').is;
/** @type {Function<string, function>} */
global.are = require('node-are').are;


////////////////////////////////////////////////////////////////////////////////
// APPEND SHORTCUT METHODS
////////////////////////////////////////////////////////////////////////////////

/**
 * Executes a function for a set number of times.
 * @param {number} cycles
 * @param {function} action
 * @return {boolean}
 */
global.loop = function(cycles, action) {

  is.num(cycles) || log.error(
    'Invalid `Vitals.loop` Call',
    'invalid type for `cycles` param',
    { argMap: true, cycles: cycles }
  );

  is.func(action) || log.error(
    'Invalid `Vitals.loop` Call',
    'invalid type for `action` param',
    { argMap: true, action: action }
  );

  cycles = cycles < 0 ? Math.abs(cycles) : cycles;
  while(cycles--) {
    action();
  }
  return true;
};

/**
 * A shortcut for Object.prototype.hasOwnProperty that accepts null objects.
 * @param {?(Object|function)} obj
 * @param {*} prop
 * @return {boolean}
 */
global.has = function(obj, prop) {

  is('?obj|func', obj) || log.error(
    'Invalid `Vitals.has` Call',
    'invalid type for `obj` param',
    { argMap: true, obj: obj, prop: prop }
  );

  prop = is.str(prop) || is.num(prop) ? prop : String(prop);
  return !!obj && obj.hasOwnProperty(prop);
};

/**
 * @see https://lodash.com/docs#merge
 * @param {!Object} dest
 * @param {!Object...} sources
 * @param {function=} customizer
 * @param {Object=} thisArg
 * @return {!Object}
 */
global.merge = require('lodash/object/merge');

/**
 * A shortcut for iterating over object maps and arrays.
 * @see https://lodash.com/docs#forOwn
 * @param {!(Object|function|Array)} obj
 * @param {function} action
 * @param {Object=} thisArg
 */
global.each = function(obj, action, thisArg) {

  is('?obj|func', obj) || log.error(
    'Invalid `Vitals.each` Call',
    'invalid type for `obj` param',
    { argMap: true, obj: obj }
  );

  is.func(action) || log.error(
    'Invalid `Vitals.each` Call',
    'invalid type for `action` param',
    { argMap: true, action: action }
  );

  thisArg = is._obj(thisArg) ? thisArg : null;

  if ( is.arr(obj) ) {
    obj.forEach(action, thisArg);
  }
  else {
    obj && forOwn(obj, action, thisArg);
  }
};

/**
 * @see https://lodash.com/docs#slice
 * @param {!Array} arr
 * @param {number=} start [default= 0]
 * @param {number=} end [default= arr.length]
 * @return {!Array}
 */
global.slice = require('lodash/array/slice');

/**
 * @see https://lodash.com/docs#fill
 * @param {!Array} arr
 * @param {*} val
 * @param {number=} start [default= 0]
 * @param {number=} end [default= arr.length]
 * @return {!Array}
 */
global.fill = require('lodash/array/fill');

/**
 * @see https://github.com/shelljs/shelljs#execcommand--options--callback
 * @param {string} command
 * @param {Object=} options
 * @param {boolean=} options.async [default= callback ? true : false]
 * @param {boolean=} options.silent [default= false]
 * @param {function=} callback
 */
global.exec = shell.exec;


////////////////////////////////////////////////////////////////////////////////
// APPEND REMAINING LIBRARIES
////////////////////////////////////////////////////////////////////////////////

/** @type {Function<string, function>} */
global.copy = require('./copy');
/** @type {!Object<string, function>} */
global.retrieve = require('./retrieve');
/** @type {function} */
global.makeTask = require('./task');
