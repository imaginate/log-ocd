/**
 * -----------------------------------------------------------------------------
 * LOG-OCD GENERAL HELPERS
 * -----------------------------------------------------------------------------
 * @version 0.1.0
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

/**
 * @private
 * @type {Function<string, function>}
 */
var is = require('node-are').is;
/**
 * @private
 * @type {Function<string, function>}
 */
var are = require('node-are').are;
/**
 * @private
 * @type {!Object}
 */
var colors = require('colors/safe');


////////////////////////////////////////////////////////////////////////////////
// METHODS
////////////////////////////////////////////////////////////////////////////////

/**
 * A shortcut for Object.prototype.hasOwnProperty that accepts null objects or a
 *   shortcut for String.prototype.includes and RegExp.prototype.test.
 * @private
 * @param {?(Object|function|string)} source
 * @param {*} prop
 * @return {boolean}
 */
function has(source, prop) {
  return !source ? false : is.str(source) ?
    ( is.str(prop) ? source.includes(prop) : prop.test(source) ) : (
      'hasOwnProperty' in source ? source.hasOwnProperty(prop) : prop in source
    );
}

/**
 * A shortcut for Array.prototype.slice.call(obj, start).
 * @private
 * @param {Object} obj
 * @param {number=} start - [default= 0]
 * @return {Array}
 */
function slice(obj, start) {

  /** @type {!Array} */
  var arr;
  /** @type {number} */
  var len;
  /** @type {number} */
  var ii;
  /** @type {number} */
  var i;

  if ( !is.obj(obj) || !has(obj, 'length') ) {
    return null;
  }

  start = start || 0;
  start = start < 0 ? start + obj.length : start;
  len = obj.length - start;

  arr = len ? new Array(len) : [];
  ii = start;
  i = -1;
  while (++i < len) {
    arr[i] = obj[ii++];
  }

  return arr;
}

/**
 * A shortcut for Array.prototype.map(obj, iteratee).
 * @private
 * @param {Object} obj
 * @param {function(*, number): *} iteratee
 * @return {Array}
 */
function mapArr(obj, iteratee) {

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
 * Gets an object's property keys.
 * @private
 * @param {?(Object|function)} obj
 * @return {Array<string>}
 */
function objKeys(obj) {

  /** @type {string} */
  var prop;
  /** @type {!Array<string>} */
  var arr;

  if (!obj) {
    return null;
  }

  arr = [];
  for (prop in obj) {
    if ( has(obj, prop) ) {
      arr.push(prop);
    }
  }
  return arr;
}

/**
 * Creates a new object with the properties of the given object.
 * @private
 * @param {Object} obj
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
 * @private
 * @param {!(Object|function)} dest
 * @param {?(Object|function)} source
 * @return {?(Object|function)}
 */
function merge(dest, source) {

  /** @type {string} */
  var prop;

  if (!source) {
    return dest;
  }

  for (prop in source) {
    if ( has(source, prop) ) {
      dest[prop] = source[prop];
    }
  }
  return dest;
}

/**
 * Seals an object.
 * @private
 * @param {Object} obj
 * @param {boolean=} deep
 * @return {!Object}
 */
function seal(obj, deep) {

  /** @type {string} */
  var prop;

  if ( !is._obj(obj) ) {
    return obj;
  }

  if (deep) {
    for (prop in obj) {
      if ( has(obj, prop) ) {
        obj[prop] = seal(obj[prop], true);
      }
    }
  }

  return Object.seal(obj);
}

/**
 * Freezes an object.
 * @private
 * @param {!Object} obj
 * @param {boolean=} deep
 * @return {!Object}
 */
function freeze(obj, deep) {

  /** @type {string} */
  var prop;

  if ( !is._obj(obj) ) {
    return obj;
  }

  if (deep) {
    for (prop in obj) {
      if ( has(obj, prop) ) {
        obj[prop] = freeze(obj[prop], true);
      }
    }
  }

  return Object.freeze(obj);
}

/**
 * A shortcut for iterating over object maps and arrays or invoking an action a
 *   set number of times.
 * @private
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
 * Fills a string with specified values.
 * @private
 * @param {number} count
 * @param {string} val
 * @return {string}
 */
function fillStr(count, val) {

  /** @type {string} */
  var str;
  /** @type {number} */
  var i;

  count = count < 0 ? 0 : count;
  str = '';
  while (count--) {
    str += val;
  }
  return str;
}

/**
 * Deletes a property from an object.
 * @private
 * @param {!Object} obj
 * @param {string} prop
 * @return {!Object}
 */
function removeProp(obj, prop) {

  /** @type {!Object} */
  var newObj;
  /** @type {string} */
  var key;

  if ( !is.obj(obj) ) {
    return null;
  }

  newObj = {};
  for (key in obj) {
    if ( has(obj, key) && key !== prop ) {
      newObj[key] = obj[key];
    }
  }
  return newObj;
}
