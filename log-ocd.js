/**
 * -----------------------------------------------------------------------------
 * LOG-OCD
 * -----------------------------------------------------------------------------
 * @version 1.0.0-beta.11
 * @see [log-ocd]{@link https://github.com/imaginate/log-ocd}
 *
 * @author Adam Smith <imagineadamsmith@gmail.com> (https://github.com/imaginate)
 * @copyright 2022 Adam A Smith <imagineadamsmith@gmail.com> (https://github.com/imaginate)
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

var newLogOCD = require('./src/init');

/**
 * @public
 * @param {string=} globalKey - If globalKey is defined the new log-ocd instance
 *   is appended to the global object using globalKey's value as the key.
 * @return {LogOCD} A new log-ocd instance.
 */
module.exports = function initLogOCD(globalKey) {

  /** @type {LogOCD} */
  var logocd;

  logocd = newLogOCD();

  if (globalKey) global[globalKey] = logocd;

  return logocd;
};
