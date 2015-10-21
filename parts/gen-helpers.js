/**
 * -----------------------------------------------------------------------------
 * LOG-OCD GENERAL HELPERS
 * -----------------------------------------------------------------------------
 * @version 0.0.1
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
// CONSTRUCTORS
///////////////////////////////////////////////////////////////////////////////

/**
 * @private
 * @param {?(Array<string>|string)=} props - [default= null] If props is a
 *   string newMap uses one of the chars in the following list as the separator
 *   (chars listed in order of use):  ", "  ","  "|"  " "
 * @param {*=} propVal - [default= null] The value for all props if an array or
 *   string is used for the props param.
 * @param {(string|function(*): boolean)=} staticType - [default= "*"] If
 *   staticType is a string newMap uses an [is method]{@link https://github.com/imaginate/are/blob/master/docs/is-methods.md}
 *   or the [is main function]{@link https://github.com/imaginate/are/blob/master/docs/is-main-func.md}
 *   to check all new values.
 * @return {!Object}
 */
function newMap(props, propVal, staticType) {

  /** @type {!Array<string>} */
  var keys;
  /** @type {!Object} */
  var obj;

  if ( is.null(props) ) {
    return Object.create(null);
  }

  if ( is('!str|arr', props) ) {
    keys = is.arr(props) ? props : props.split(
      /, /.test(props) ?
        ', ' : /,/.test(props) ?
          ',' : /\|/.test(props) ?
            '|' : ' '
    );
    props = {};
    each(keys, function(/** string */ key) {
      props[key] = propVal;
    });
  }
  else {
    staticType = propVal;
  }

  staticType = is('func=', staticType) ?
    staticType : has(is, staticType) ?
      is[staticType] : function(val) { return is(staticType, val); }

  obj = {};
  each(props, function(/** * */ val, /** string */ key) {
    obj[key] = {
      value: val,
      writable: true,
      enumerable: true,
      configurable: false
    };
    if (staticType) {
      obj[key].set = function(val) {
        if ( staticType(val) ) {
          this[key] = val;
        }
      };
    }
  });

  return Object.create(null, obj);
}


////////////////////////////////////////////////////////////////////////////////
// METHODS
////////////////////////////////////////////////////////////////////////////////

/**
 * A shortcut for Object.prototype.hasOwnProperty that accepts null objects.
 * @private
 * @param {?(Object|function)} obj
 * @param {*} prop
 * @return {boolean}
 */
function has(obj, prop) {
  return is._obj(obj) && ('hasOwnProperty' in obj ?
    obj.hasOwnProperty(prop) : prop in obj
  );
}

/**
 * A shortcut for Array.prototype.slice.call(obj, start).
 * @private
 * @param {Object} obj
 * @param {number=} start - negative numbers not allowed [default= 0]
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
 * @private
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
 * @private
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
 * Fills an existing or new array with specified values.
 * @private
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
