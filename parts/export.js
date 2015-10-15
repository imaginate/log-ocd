/**
 * -----------------------------------------------------------------------------
 * EXPORT LOG-OCD
 * -----------------------------------------------------------------------------
 * @version 0.0.0
 * @see [log-ocd]{@link https://github.com/imaginate/log-ocd}
 *
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2015 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Supporting Libraries:
 * @see [are]{@link https://github.com/imaginate/are}
 * @see [Colors]{@link https://www.npmjs.com/package/colors}
 *
 * Annotations:
 * @see [JSDoc3]{@link http://usejsdoc.org/}
 * @see [Closure Compiler specific JSDoc]{@link https://developers.google.com/closure/compiler/docs/js-for-compiler}
 */


'use strict';


////////////////////////////////////////////////////////////////////////////////
// EXPORT LOG-OCD FACTORY
////////////////////////////////////////////////////////////////////////////////

/**
 * @return {!LogOCD}
 */
module.exports = function newLogOCD() {

  /** @type {!Object} */
  var instance = {};
  /** @type {!LogOCD} */
  var LogOCD = logOCD.bind(instance);

  each(logOCD, function(/** function */ method, /** string */ key) {
    LogOCD[key] = method.bind(instance);
  });

  instance.config = clone(CONFIG);

  return LogOCD;
};
