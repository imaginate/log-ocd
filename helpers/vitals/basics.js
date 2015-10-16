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

/**
 * A shortcut for Array.prototype.slice.call(obj, start, end) and
 *   String.prototype.slice(start, end).
 * @param {?(Object|string)} obj
 * @param {number=} start [default= 0]
 * @param {number=} end [default= arr.length]
 * @return {?(Array|string)}
 */
global.slice = function slice(obj, start, end) {

  /** @type {!Array} */
  var arr;
  /** @type {number} */
  var len;
  /** @type {number} */
  var i;

  if ( !is.obj(obj) || !has(obj, 'length') ) {
    return is.str(obj) ? obj.slice(start, end) : null;
  }

  len = obj.length;
  start = start || 0;
  start = start < 0 ? len + start : start;
  end = end || len;
  end = end > len ?
    len : end < 0 ?
      len + end : end;

  arr = start < end ? new Array( (end - start) ) : [];
  i = start - 1;
  while (++i < end) {
    arr[i] = obj[i];
  }
  return arr;
};

/**
 * Creates a new object with the properties of the given object.
 * @param {Object} obj
 * @param {boolean=} deep
 * @return {Object}
 */
global.clone = function clone(obj, deep) {

  /** @type {!Object} */
  var newObj;
  /** @type {string} */
  var prop;

  if ( !is.obj(obj) ) {
    return null;
  }

  newObj = {};
  for (prop in obj) {
    if ( has(obj, prop) ) {
      newObj[prop] = deep && is.obj( obj[prop] ) ?
        copy(obj[prop], true) : obj[prop];
    }
  }
  return newObj;
};
