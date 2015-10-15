/**
 * -----------------------------------------------------------------------------
 * LOG-OCD GENERAL HELPERS
 * -----------------------------------------------------------------------------
 * @version 0.0.0
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


// *****************************************************************************
// SECTION: GENERAL HELPERS
// *****************************************************************************

////////////////////////////////////////////////////////////////////////////////
// LIBRARIES
////////////////////////////////////////////////////////////////////////////////

/** @type {Function<string, function>} */
var is = require('node-are').is;
/** @type {Function<string, function>} */
var are = require('node-are').are;
/** @type {!Object} */
var colors = require('colors/safe');


////////////////////////////////////////////////////////////////////////////////
// METHODS
////////////////////////////////////////////////////////////////////////////////

/**
 * A shortcut for Object.prototype.hasOwnProperty that accepts null objects.
 * @param {?(Object|function)} obj
 * @param {*} prop
 * @return {boolean}
 */
function has(obj, prop) {
  return is._obj(obj) && obj.hasOwnProperty(prop);
}

/**
 * A shortcut for Array.prototype.slice.call(obj, start).
 * @param {Object} obj
 * @param {number=} start [default= 0]
 * @return {Array}
 */
function slice(obj, start) {

  /** @type {!Array} */
  var arr;
  /** @type {number} */
  var len;
  /** @type {number} */
  var i;

  if ( !is.obj(obj) || !has(obj, 'length') ) {
    return null;
  }

  len = obj.length;
  start = !start ? 0 : start < 0 ? len + start : start;

  arr = start < len ? new Array( (len - start) ) : [];
  i = start - 1;
  while (++i < len) {
    arr[i] = obj[i];
  }
  return arr;
}

/**
 * A shortcut for Array.prototype.map(obj, iteratee).
 * @param {Object} obj
 * @param {function(*, number): *} iteratee
 * @return {Array}
 */
function map(obj, iteratee) {

  /** @type {!Array} */
  var arr;
  /** @type {number} */
  var i;

  if ( !is.obj(obj) || !has(obj, 'length') ) {
    return null;
  }

  i = obj.length;
  arr = i ? new Array(i) : [];
  while (i--) {
    arr[i] = iteratee(obj[i], i);
  }
  return arr;
}

/**
 * Creates a new object with the properties of the given object.
 * @param {!Object} obj
 * @param {boolean=} deep
 * @return {!Object}
 */
function clone(obj, deep) {

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
        clone(obj[prop], true) : obj[prop];
    }
  }
  return newObj;
}

/**
 * Appends an object's properties to an existing object.
 * @param {(!Object|function)} dest
 * @param {(!Object|function)} source
 * @return {(!Object|function)}
 */
function merge(dest, source) {

  /** @type {string} */
  var prop;

  for (prop in source) {
    if ( has(source, prop) ) {
      dest[prop] = source[prop];
    }
  }
  return dest;
}

/**
 * A shortcut for iterating over object maps and arrays or invoking an action a
 *   set number of times.
 * @param {!(Object|function|Array|number)} val
 * @param {function(*, (string|number)=, (Object|function|Array)=)} iteratee
 * @return {(Object|function|Array)}
 */
function each(val, iteratee) {

  /** @type {(string|number)} */
  var prop;
  /** @type {number} */
  var len;

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
}

/**
 * Fills an existing or new array with specified values.
 * @param {(Array|number)} arr
 * @param {*} val
 * @return {Array}
 */
function fill(arr, val) {

  /** @type {number} */
  var i;

  arr = is.num(arr) ? new Array(arr) : arr;
  i = arr.length;
  while (i--) {
    arr[i] = val;
  }
  return arr;
}
