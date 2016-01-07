/**
 * -----------------------------------------------------------------------------
 * LOG-OCD: SET-CONFIG
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
var is    = help.is;
var has   = help.has;

var execTypeError = require('./helpers/exec-type-error');
var execRangeError = require('./helpers/exec-range-error');

/**
 * @this {!Settings}
 * @param {string=} method - [default= "all"]
 * @param {!Object} val
 * @return {string}
 */
module.exports = function setConfig(method, val) {

  /** @type {string} */
  var ;

  if (arguments.length === 1) {
    val = method;
    method = 'all';
  }

  if ( !is.str(method) ) {
    return execTypeError.call(this, 'setConfig', 'method', method);
  }
  if ( !is.obj(val) ) {
    return execTypeError.call(this, 'setConfig', 'val', val);
  }

  if ( method !== 'all' && !has(this, method) ) {
    return execRangeError.call(this, 'setConfig', 'method', method);
  }

};
