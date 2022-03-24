/**
 * -----------------------------------------------------------------------------
 * LOG-OCD: OCDMAP HELPER
 * -----------------------------------------------------------------------------
 * @version 1.0.0-beta.10
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

var help = require('../../../helpers');
var has   = help.has;
var until = help.until;

/**
 * @private
 * @type {string}
 * @const
 */
var KEYS = 'ocdmap, _ocdmap, __ocdmap, ocdMap, _ocdMap, __ocdMap';

/**
 * @param {Settings} settings
 * @param {string} method
 * @param {string} type
 * @param {(!Object|function)} obj
 * @return {string}
 */
module.exports = function ocdmap(settings, method, type, obj) {

  /** @type {boolean} */
  var pass;

  if (!settings.__ocdmap) return type;

  settings.__ocdmap = false;
  pass = type === 'object' && check(settings[method].config, 'ocdmap');
  pass = pass || until(true, KEYS, function(key) {
    return check(obj, key);
  });
  return pass ? 'ocdmap' : type;
};

/**
 * @private
 * @param {(!Object|function)} obj
 * @param {string} key
 * @return {boolean}
 */
function check(obj, key) {
  return has(obj, key) && obj[key] === true;
}
