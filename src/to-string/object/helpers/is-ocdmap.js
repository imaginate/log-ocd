/**
 * -----------------------------------------------------------------------------
 * LOG-OCD: IS-OCDMAP HELPER
 * -----------------------------------------------------------------------------
 * @version 1.0.0
 * @see [log-ocd]{@link https://github.com/imaginate/log-ocd}
 *
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2016 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
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
 * @param {!Object} config
 * @param {string} type
 * @param {(!Object|function)} obj
 * @return {boolean}
 */
module.exports = function isOcdmap(config, type, obj) {

  if ( type === 'object' && check(config, 'ocdmap') ) return true;

  return until(true, KEYS, function(key) {
    return check(obj, key);
  });
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
