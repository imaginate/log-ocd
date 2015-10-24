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
 * A shortcut for Object.prototype.hasOwnProperty that accepts null objects or a
 *   shortcut for String.prototype.includes and RegExp.prototype.test.
 * @private
 * @param {?(Object|function|string)} source
 * @param {*} prop
 * @return {boolean}
 */
global.has = function(source, prop) {

  if (!source) {
    if ( !is('?str', source) ) {
      log.error(
        'Invalid `Vitals.has` Call',
        'invalid type for `source` param',
        mapArgs({ source: source, prop: prop })
      );
    }
    return false;
  }

  if ( is.str(source) ) {
    if ( is.str(prop) ) {
      return source.includes(prop);
    }
    else if ( is.regex(prop) ) {
      return prop.test(source);
    }
    else {
      log.error(
        'Invalid `Vitals.has` Call',
        'invalid type for `prop` param',
        mapArgs({ source: source, prop: prop })
      );
    }
  }

  if ( is._obj(source) ) {
    source = String(source);
    return 'hasOwnProperty' in source ?
      source.hasOwnProperty(prop) : prop in source;
  }

  log.error(
    'Invalid `Vitals.has` Call',
    'invalid type for `source` param',
    mapArgs({ source: source, prop: prop })
  );
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
    while(val--) {
      iteratee();
    }
  }
  return null;
};

/**
 * A shortcut for Array.prototype.slice.call(obj, start, end) and
 *   String.prototype.slice(start, end).
 * @param {?(Object|string)} val
 * @param {number=} start [default= 0]
 * @param {number=} end [default= arr.length]
 * @return {?(Array|string)}
 */
global.slice = function slice(val, start, end) {

  /** @type {!Array} */
  var arr;
  /** @type {number} */
  var len;
  /** @type {number} */
  var ii;
  /** @type {number} */
  var i;

  if ( is.str(val) ) {
    return val.slice(start, end);
  }

  if ( is.null(val) ) {
    return null;
  }

  if ( !is._obj(val) || !has(val, 'length') ) {
    log.error(
      'Invalid `Vitals.slice` Call',
      'invalid type for `val` param',
      mapArgs({ val: val, start: start, end: end })
    );
  }

  len = val.length;
  start = start || 0;
  start = start < 0 ? len + start : start;
  end = end || len;
  end = end > len ?
    len : end < 0 ?
      len + end : end;

  arr = start < end ? new Array(end - start) : [];
  ii = start - 1;
  i = 0;
  while (++ii < end) {
    arr[i++] = val[ii];
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

/**
 * Appends the properties of source objects to an existing object.
 * @param {(!Object|function)} dest
 * @param {...(!Object|function)} sources
 * @return {(!Object|function)}
 */
global.merge = function merge(dest) {

  /** @type {string} */
  var prop;
  /** @type {number} */
  var len;
  /** @type {number} */
  var i;

  if ( !are._obj(arguments) ) {
    return null;
  }

  len = arguments.length;
  i = -1;
  while(++i < len) {
    for (prop in source) {
      if ( has(source, prop) ) {
        dest[prop] = source[prop];
      }
    }
  }
  return dest;
};

/**
 * Freezes an object.
 * @private
 * @param {!Object} obj
 * @param {boolean=} deep
 * @return {!Object}
 */
global.freeze = function freeze(obj, deep) {

  /** @type {string} */
  var prop;

  if ( !is._obj(obj) ) {
    if ( !is.null(obj) ) {
      log.error(
        'Invalid `Vitals.freeze` Call',
        'invalid type for `obj` param',
        mapArgs({ iteratee: iteratee })
      );
    }
    return null;
  }

  if (deep) {
    for (prop in obj) {
      if ( has(obj, prop) ) {
        obj[prop] = freeze(obj[prop], true);
      }
    }
  }

  return Object.freeze(obj);
};


////////////////////////////////////////////////////////////////////////////////
// PRIVATE HELPERS
////////////////////////////////////////////////////////////////////////////////

/**
 * @private
 * @param {!Object} obj
 * @return {!Object}
 */
function mapArgs(obj) {
  obj = merge({ argMap: true }, obj);
  return freeze(obj);
}
