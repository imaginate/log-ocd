/**
 * -----------------------------------------------------------------------------
 * LOG-OCD: RESET-CONFIG
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
var is   = help.is;
var each = help.each;
var has  = help.has;

var execTypeError = require('./helpers/exec-type-error');
var execRangeError = require('./helpers/exec-range-error');

var getDefaultConfig = require('../settings/config');

/**
 * @this {!Settings}
 * @param {string=} method - [default= "all"]
 * @return {boolean}
 */
module.exports = function resetConfig(method) {

  if ( !is.str(method) ) {
    return execTypeError.call(this, 'resetConfig', 'method', method);
  }

  if (!method || method === 'all') return resetAll(this);

  if ( !has(this, method) ) {
    return execRangeError.call(this, 'resetConfig', method);
  }

  this[method].config = getDefaultConfig(method);
  return true;
};

/**
 * @private
 * @param {!Settings} settings
 * @return {boolean}
 */
function resetAll(settings) {
  each(settings, function(setting, method) {
    setting.config = getDefaultConfig(method);
  });
  return true;
}
