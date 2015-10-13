/**
 * -----------------------------------------------------------------------------
 * REGEX LIBRARY
 * -----------------------------------------------------------------------------
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2015 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Supporting Libraries:
 * @see [are]{@link https://github.com/imaginate/are}
 * @see [Lodash]{@link https://github.com/lodash/lodash}
 *
 * Annotations:
 * @see [JSDoc3]{@link http://usejsdoc.org/}
 * @see [Closure Compiler specific JSDoc]{@link https://developers.google.com/closure/compiler/docs/js-for-compiler}
 */

'use strict';

require('./vitals')(); // appends helper methods to global obj


////////////////////////////////////////////////////////////////////////////////
// DEFINE REGEX CONSTRUCTOR
////////////////////////////////////////////////////////////////////////////////

/**
 * Creates the Regex object.
 * @param {!RegExp=} escapeChars
 * @constructor
 */
var Regex = function(escapeChars) {

  //////////////////////////////////////////////////////////////////////////
  // PROTECTED PROPERTIES
  //////////////////////////////////////////////////////////////////////

  /**
   * @typedef {!{
   *   org: *,
   *   val: *
   * }} ProtectedProp
   */

  /**
   * @typedef {!Object<string, ProtectedProp>} ProtectedProps
   */

  /**
   * Creates a protected property.
   * @param {*} val
   * @return {ProtectedProp}
   */
  var makeProp = function(val) {
    return {
      VAL: val,
      val: val
    };
  };

  /**
   * The protected properties for each public method.
   * @type {!{
   *   escape: ProtectedProps,
   *   make:   ProtectedProps
   * }}
   */
  var methods = {
    escape: {
      chars: makeProp( /([\*\+\?\.\-\:\{\}\[\]\(\)\/\,\\\^\$\=\!\|])/g )
    },
    make: {}
  };


  //////////////////////////////////////////////////////////////////////////
  // PRIVATE GETTERS & SETTERS
  //////////////////////////////////////////////////////////////////////

  /**
   * @param {string} method
   * @param {string} prop
   * @return {*}
   */
  this._get = function(method, prop) {

    ( has(methods, method) && has(methods[method], prop) ) || log.error(
      'Failed `Regex` Call',
      'error in private `_get` method',
      { argMap: true, method: method, prop: prop }
    );

    return methods[method][prop]['val'];
  };

  /**
   * @param {string} method
   * @param {string} prop
   * @param {*} val
   */
  this._set = function(method, prop, val) {

    ( has(methods, method) && has(methods[method], prop) ) || log.error(
      'Failed `Regex` Call',
      'error in private `_set` method',
      { argMap: true, method: method, prop: prop, val: val }
    );

    methods[method][prop]['val'] = val;
  };

  /**
   * @param {string} method
   * @param {string} prop
   */
  this._reset = function(method, prop) {

    ( has(methods, method) && has(methods[method], prop) ) || log.error(
      'Failed `Regex` Call',
      'error in private `_reset` method',
      { argMap: true, method: method, prop: prop }
    );

    methods[method][prop]['val'] = methods[method][prop]['VAL'];
  };


  //////////////////////////////////////////////////////////////////////////
  // CHECK FOR CUSTOM NEW INSTANCE CONFIG
  //////////////////////////////////////////////////////////////////////

  is.regex(escapeChars) && this._set('escape', 'chars', escapeChars);

};

Regex.prototype.constructor = Regex;


////////////////////////////////////////////////////////////////////////////////
// DEFINE PUBLIC METHODS
////////////////////////////////////////////////////////////////////////////////

/**
 * @param {string} regex
 * @return {string}
 */
Regex.escape = function escape(regex) {

  is.str(regex) || log.error(
    'Invalid `Regex.escape` Call',
    'invalid type for `regex` param',
    { argMap: true, regex: regex }
  );

  return regex && regex.replace(this._get('escape', 'chars'), '\\$1');
};

/**
 * @type {!{
 *   get: function(): !RegExp,
 *   set: function(!RegExp),
 *   reset: function
 * }}
 */
Regex.escape.chars = {

  get: function() {
    return this._get('escape', 'chars');
  },

  set: function(val) {
    is.regex(val) || log.error(
      'Invalid `Regex.escape.chars.set` Call',
      'invalid type for `val` param',
      { argMap: true, val: val }
    );

    this._set('escape', 'chars', val);
  },

  reset: function() {
    this._reset('escape', 'chars');
  }
};

/**
 * @param {string} regex
 * @param {string=} flags - [default= '']
 * @return {!RegExp}
 */
Regex.make = function make(regex, flags) {

  is._str(regex) || log.error(
    'Invalid `Regex.make` Call',
    'invalid type for `regex` param',
    { argMap: true, regex: regex }
  );

  flags = is._str(flags) && /^[gimy]+$/.test(flags) ? flags : '';
  return new RegExp(regex, flags);
};


////////////////////////////////////////////////////////////////////////////////
// EXPORT LIBRARY
////////////////////////////////////////////////////////////////////////////////

/**
 * @param {!RegExp=} escapeChars
 * @return {!Regex}
 */
module.exports = function setupRegex(escapeChars) {

  /** @type {!Regex} */
  var regex;

  regex = new Regex(escapeChars);
  each(Regex, function(/** function */ method, /** string */ key) {
    regex[key] = bindObj(method, regex);
  });
  return regex;
};

/**
 * @param {(function|!Object)} obj
 * @param {!Regex} regex
 * @return {(function|!Object)}
 */
function bindObj(obj, regex) {

  /** @type {(function|!Object)} */
  var boundObj;

  is._obj(obj) || log.error(
    'Failed `Regex` Call',
    'error in private helper `bindObj` (invalid type for `obj` param)',
    { argMap: true, obj: obj, regex: regex }
  );

  boundObj = is.func(obj) ? obj.bind(regex) : {};
  each(obj, function(/** (function|!Object) */ prop, /** string */ key) {
    boundObj[key] = bindObj(prop, regex);
  });
  return boundObj;
}
