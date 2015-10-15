/**
 * -----------------------------------------------------------------------------
 * VITALS LIBRARY - THE BASICS
 * -----------------------------------------------------------------------------
 * @file Vitals libraries, functional shortcuts, and other helpers.
 *
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2015 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Supporting Libraries:
 * @see [are]{@link https://github.com/imaginate/are}
 *
 * Annotations:
 * @see [JSDoc3]{@link http://usejsdoc.org/}
 * @see [Closure Compiler specific JSDoc]{@link https://developers.google.com/closure/compiler/docs/js-for-compiler}
 */

'use strict';


////////////////////////////////////////////////////////////////////////////////
// APPEND LIBRARIES
////////////////////////////////////////////////////////////////////////////////

/** @type {Function<string, function>} */
global.log = require('../log');
/** @type {Function<string, function>} */
global.is = require('node-are').is;
/** @type {Function<string, function>} */
global.are = require('node-are').are;


////////////////////////////////////////////////////////////////////////////////
// APPEND SHORTCUT METHODS
////////////////////////////////////////////////////////////////////////////////

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

  return !!obj && obj.hasOwnProperty(prop);
};

/**
 * A shortcut for iterating over object maps and arrays or invoking an action a
 *   set number of times.
 * @param {!(Object|function|Array|number)} val
 * @param {function(*, (string|number)=, (Object|function|Array)=)} iteratee
 * @return {(Object|function|Array)}
 */
global.each = function(val, iteratee) {

  /** @type {(string|number)} */
  var prop;
  /** @type {number} */
  var len;

  is.func(iteratee) || log.error(
    'Invalid `Vitals.each` Call',
    'invalid type for `iteratee` param',
    { argMap: true, iteratee: iteratee }
  );

  if ( is._obj(val) ) {
    if ( is._arr(val) ) {

      // iterate over an array or arguments obj
      val = slice(val);
      len = val.length;
      prop = -1;
      while (++prop < len) {
        iteratee(val[prop], prop, val);
      }
      return val;
    }
    else {

      // iterate over an object's own props
      val = clone(val) || val;
      for (prop in val) {
        if ( has(val, prop) ) {
          iteratee(val[prop], prop, val);
        }
      }
      return val;
    }
  }
  else if ( is.num(val) ) {

    // iterate specified number of times
    while(cycles--) {
      iteratee();
    }
  }
  return null;
};
