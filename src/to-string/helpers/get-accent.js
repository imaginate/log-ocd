/**
 * -----------------------------------------------------------------------------
 * LOG-OCD: GET-ACCENT HELPER
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

var escape = require('../../helpers/escape');

/**
 * @param {string} accent
 * @return {?{
 *   group: !RegExp,
 *   mark:  !RegExp
 * }}
 */
module.exports = function getAccent(accent) {
  if (!accent) return null;
  accent = escape(accent);
  return {
    group: new RegExp(accent + '[^' + accent + ']+' + accent),
    mark:  new RegExp(accent + '+')
  };
};
