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
 * @see [Lodash]{@link https://github.com/lodash/lodash}
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
// LODASH METHODS
////////////////////////////////////////////////////////////////////////////////

/**
 * @see https://lodash.com/docs#fill
 * @param {!Array} arr
 * @param {*} val
 * @param {number=} start [default= 0]
 * @param {number=} end [default= arr.length]
 * @return {!Array}
 */
var fill = require('lodash/array/fill');

/**
 * @see https://lodash.com/docs#merge
 * @param {!Object} dest
 * @param {!Object...} sources
 * @param {function=} customizer
 * @param {Object=} thisArg
 * @return {!Object}
 */
var merge = require('lodash/object/merge');

/**
 * @see https://lodash.com/docs#cloneDeep
 * @param {*} val
 * @param {function=} customizer
 * @param {Object=} thisArg
 * @return {*}
 */
var clone = require('lodash/lang/cloneDeep');

/**
 * @see https://lodash.com/docs#forOwn
 * @param {!(Object|function|Array)} obj
 * @param {function} action
 * @param {Object=} thisArg
 */
var forOwn = require('lodash/object/forOwn');

/**
 * @see https://lodash.com/docs#slice
 * @param {!Array} arr
 * @param {number=} start [default= 0]
 * @param {number=} end [default= arr.length]
 * @return {!Array}
 */
var sliceArr = require('lodash/array/slice');


////////////////////////////////////////////////////////////////////////////////
// OTHER METHODS
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
 * A shortcut for iterating over object maps and arrays.
 * @param {!(Object|function|Array)} obj
 * @param {function} action
 * @param {Object=} thisArg
 */
function each(obj, action, thisArg) {
  thisArg = is._obj(thisArg) ? thisArg : null;
  is.arr(obj) ?
    obj.forEach(action, thisArg)
    : obj && forOwn(obj, action, thisArg);
}
