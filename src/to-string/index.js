/**
 * -----------------------------------------------------------------------------
 * LOG-OCD: TO-STRING
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

var help = require('../helpers');
var is     = help.is;
var freeze = help.freeze;
var has    = help.has;
var until  = help.until;

var stripStyle = require('./helpers/strip-style');
var noStyle = require('./helpers/no-style');
var ocdMap = require('./helpers/ocd-map');

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
 * @this {!Settings}
 * @param {string} method
 * @param {*} val
 * @return {string}
 */
module.exports = function toString(method, val) {

  /** @type {!Config} */
  var config;
  /** @type {string} */
  var result;
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
  config = this[method].config;
  type = ocdMap(config, type, val) ? 'ocdmap' : type;
  result = require('./' + type).call(this, method, val);
  return noStyle(config) ? stripStyle(result) : result;
};
