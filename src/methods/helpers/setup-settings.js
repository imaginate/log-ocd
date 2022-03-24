/**
 * -----------------------------------------------------------------------------
 * LOG-OCD: SETUP-SETTINGS HELPER
 * -----------------------------------------------------------------------------
 * @version 1.0.0-beta.10
 * @see [log-ocd]{@link https://github.com/imaginate/log-ocd}
 *
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2022 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
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

/**
 * @param {!Settings} settings
 * @return {!Settings}
 */
module.exports = function setupSettings(settings) {

  /** @type {number} */
  var max;

  max = process.stdout && process.stdout.columns;
  max = max || 0;
  if (max && max < 21) max = 21;
  settings.__maxLen = max && --max;
  settings.__keyLen = 0;
  settings.__indent = 0;
  settings.__ocdmap = true;
  return settings;
};
