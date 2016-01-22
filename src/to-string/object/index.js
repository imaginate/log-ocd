/**
 * -----------------------------------------------------------------------------
 * LOG-OCD: OBJECT-TO-STRING
 * -----------------------------------------------------------------------------
 * @version 1.0.0
 * @see [log-ocd]{@link https://github.com/imaginate/log-ocd}
 *
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2016 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
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

var help = require('../../helpers');
var is    = help.is;
var until = help.until;

var stripStyle = require('../helpers/strip-style');
var noStyle = require('../helpers/no-style');

var ocdmap = require('./helpers/ocdmap');

/**
 * @private
 * @type {string}
 * @const
 */
var TYPES = 'function, regexp, array, args, element, document, object';

/**
 * @this {Settings}
 * @param {string} method
 * @param {(!Object|function)} obj
 * @return {string}
 */
module.exports = function objectToString(method, obj) {

  /** @type {string} */
  var result;
  /** @type {string} */
  var types;
  /** @type {string} */
  var type;

  until(true, TYPES, function(typeOpt) {
    if ( is[typeOpt](obj) ) type = typeOpt;
    return !!type;
  });
  type = ocdmap(this, method, type, obj);
  result = require('./' + type).call(this, method, obj);
  return noStyle(this[method].config) ? stripStyle(result) : result;
};
