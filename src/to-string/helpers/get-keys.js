/**
 * -----------------------------------------------------------------------------
 * LOG-OCD: GET-KEYS HELPER
 * -----------------------------------------------------------------------------
 * @version 1.0.0-beta.6
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

var get = require('../../helpers').get;

/**
 * @param {!Object} obj
 * @return {!Array<string>}
 */
module.exports = function getKeys(obj) {

  /** @type {!Array<string>} */
  var keys;

  keys = get.keys(obj);
  if (!keys.length) return keys;
  return keys.sort(function(a, b) {
    return b.length - a.length;
  });
};
