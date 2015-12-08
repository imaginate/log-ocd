/**
 * -----------------------------------------------------------------------------
 * LOG-OCD: TO-STRING HELPER
 * -----------------------------------------------------------------------------
 * @version 1.0.0
 * @see [log-ocd]{@link https://github.com/imaginate/log-ocd}
 *
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2015 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Supporting Libraries:
 * @see [are]{@link https://github.com/imaginate/are}
 * @see [vitals]{@link https://github.com/imaginate/vitals}
 * @see [Colors]{@link https://github.com/Marak/colors.js}
 *
 * Annotations:
 * @see [JSDoc3]{@link http://usejsdoc.org/}
 * @see [Closure Compiler specific JSDoc]{@link https://developers.google.com/closure/compiler/docs/js-for-compiler}
 */

'use strict';

var help = require('./index');
var is     = help.is;
var are    = help.are;
var amend  = help.amend;
var copy   = help.copy;
var create = help.create;
var cut    = help.cut;
var each   = help.each;
var fill   = help.fill;
var freeze = help.freeze;
var fuse   = help.fuse;
var get    = help.get;
var has    = help.has;
var remap  = help.remap;
var seal   = help.seal;
var slice  = help.slice;
var until  = help.until;

var colors = require('./colors');

////////////////////////////////////////////////////////////////////////////////
// MAPS
////////////////////////////////////////////////////////////////////////////////

/**
 * @private
 * @type {!Object<string, string>}
 * @const
 */
var TYPES = freeze({
  primitives: 'string, number, boolean, undefined, null, nan',
  objects: 'func, regexp, array, args, element, document'
});

/**
 * @private
 * @type {!Object<string, function>}
 */
var make = {};

/**
 * @private
 * @type {!Object<string, function>}
 */
var divide = {};

////////////////////////////////////////////////////////////////////////////////
// MAKE METHODS
////////////////////////////////////////////////////////////////////////////////

/**
 * @private
 * @this {!Settings}
 * @param {string} method
 * @param {string} val
 * @return {string}
 */
make.string = function stringToString(method, val) {

  /** @type {string} */
  var delimiter;
  /** @type {string} */
  var brackets;
  /** @type {!Array} */
  var bracket;
  /** @type {!TypeFormat} */
  var format;
  /** @type {string} */
  var style;
  /** @type {function} */
  var color;

  format = this[method].format;
  style = this[method].__INST + method + 'string';

  if ( has(val, /^<[\s\S]+>$/) ) {
    color = colors[style];
    val = remap(val, /^<<|>>$/g, '');
    return color(val);
  }

  color = colors[style + 'brackets'];
  brackets = format.string.brackets;
  brackets += brackets.length > 1 ? '' : brackets;
  bracket = [ color( brackets[0] ), color( brackets[1] ) ];

  val = makeString.string.divide(format.lineLimit, val);

  if ( !has(val, '\n') ) {
    color = colors[style];
    return bracket[0] + color(val) + bracket[1];
  }

  color = colors[style + 'delimiter'];
  delimiter = color(' +');

  color = colors[style];
  return remap(val, /(.+)(\n)?/g, function(match, line, eol) {
    eol = eol ? delimiter + eol : '';
    return bracket[0] + color(line) + bracket[1] + eol;
  });
};

////////////////////////////////////////////////////////////////////////////////
// DIVIDE METHODS
////////////////////////////////////////////////////////////////////////////////

/**
 * @private
 * @param {number} limit
 * @param {string} val
 * @return {string}
 */
divide.string = function(limit, val) {

  /** @type {string} */
  var result;
  /** @type {number} */
  var i;

  if (val.length <= limit) return val;

  result = '';
  while (val.length > limit) {
    i = getLastSpace(val, limit) || val.length;
    result += '\n' + slice(val, 0, i);
    val = slice(val, i);
  }
  result += val && '\n' + val;
  return result;
};

////////////////////////////////////////////////////////////////////////////////
// HELPERS
////////////////////////////////////////////////////////////////////////////////

/**
 * @private
 * @param {string} str
 * @param {number=} limit
 * @return {number}
 */
function getLastSpace(str, limit) {

  /** @type {string} */
  var temp;

  temp = limit ? str.substr(0, limit) : str;
  return ( temp.lastIndexOf(' ') || str.indexOf(' ') ) + 1;
}

////////////////////////////////////////////////////////////////////////////////
// EXPORTS
////////////////////////////////////////////////////////////////////////////////

/**
 * @private
 * @this {!Settings}
 * @param {string} method
 * @param {*} val
 * @return {string}
 */
module.exports = function toString(method, val) {

  /** @type {!Setting} */
  var setting;
  /** @type {string} */
  var types;
  /** @type {string} */
  var type;

  types = is._obj(val) ? 'objects' : 'primitives';
  types = TYPES[types];
  until(true, types, function(_type) {
    if ( is[_type](val) ) type = _type;
    return !!type;
  });
  type = type || 'object';
  setting = this[method];
  return has(setting.config, 'style') && setting.config.style === false
    ? make[type].noStyle.call(this, val)
    : make[type].call(this, method, val);
};
