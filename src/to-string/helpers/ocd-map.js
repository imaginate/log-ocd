/**
 * -----------------------------------------------------------------------------
 * LOG-OCD: OCD-MAP HELPER
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

var help = require('../../helpers');
var is     = help.is;
var has    = help.has;
var freeze = help.freeze;
var until  = help.until;

/**
 * @private
 * @type {!Array<string>}
 * @const
 */
var KEYS = freeze(
  'ocdmap, _ocdmap, __ocdmap, ocdMap, _ocdMap, __ocdMap'.split(', ')
);

/**
 * @param {!Object} config
 * @param {string} type
 * @param {*} val
 * @return {boolean}
 */
module.exports = function ocdMap(config, type, val) {

  if ( !is._obj(val) ) return false;

  if ( type === 'object' && check(config, 'ocdmap') ) return true;

  return until(true, KEYS, function(key) {
    return check(val, key);
  });
};

/**
 * @private
 * @param {!Object} obj
 * @param {string} key
 * @return {boolean}
 */
function check(obj, key) {
  return has(obj, key) && obj[key] === true;
}
