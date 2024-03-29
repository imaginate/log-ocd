/**
 * -----------------------------------------------------------------------------
 * LOG-OCD: PRIMITIVE-TO-STRING
 * -----------------------------------------------------------------------------
 * @version 1.0.0-beta.11
 * @see [log-ocd]{@link https://github.com/imaginate/log-ocd}
 *
 * @author Adam Smith <imagineadamsmith@gmail.com> (https://github.com/imaginate)
 * @copyright 2022 Adam A Smith <imagineadamsmith@gmail.com> (https://github.com/imaginate)
 *
 * Supporting Libraries:
 * @see [chalk]{@link https://github.com/chalk/chalk}
 * @see [vitals]{@link https://github.com/imaginate/vitals}
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

/**
 * @private
 * @type {string}
 * @const
 */
var TYPES = 'string, number, boolean, undefined, null, nan';

/**
 * @this {Settings}
 * @param {string} method
 * @param {*} val
 * @return {string}
 */
module.exports = function primitiveToString(method, val) {

  /** @type {string} */
  var result;
  /** @type {string} */
  var type;

  until(true, TYPES, function(typeOpt) {
    if ( is[typeOpt](val) ) type = typeOpt;
    return !!type;
  });
  result = require('./' + type).call(this, method, val);
  return noStyle(this[method].config) ? stripStyle(result) : result;
};
