/**
 * -----------------------------------------------------------------------------
 * LOG-OCD: TO-STRING
 * -----------------------------------------------------------------------------
 * @version 1.0.0
 * @see [log-ocd]{@link https://github.com/imaginate/log-ocd}
 *
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2016 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Supporting Libraries:
 * @see [are]{@link https://github.com/imaginate/are}
 * @see [chalk]{@link https://github.com/chalk/chalk}
 * @see [vitals]{@link https://github.com/imaginate/vitals}
 *
 * Annotations:
 * @see [JSDoc3]{@link http://usejsdoc.org/}
 * @see [Closure Compiler specific JSDoc]{@link https://developers.google.com/closure/compiler/docs/js-for-compiler}
 */

'use strict';

var is = require('../helpers').is;

var objectToString = require('./object');
var primitiveToString = require('./primitive');

/**
 * @this {Settings}
 * @param {string} method
 * @param {*} val
 * @return {string}
 */
module.exports = function toString(method, val) {
  return is._obj(val)
    ? objectToString.call(this, method, val)
    : primitiveToString.call(this, method, val);
};
