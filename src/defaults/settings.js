/**
 * -----------------------------------------------------------------------------
 * LOG-OCD: SETTINGS DEFAULTS
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
var amend  = help.amend;
var each   = help.each;
var freeze = help.freeze;
var has    = help.has;
var seal   = help.seal;

var newEmptyObj = require('../helpers/new-empty-obj');

////////////////////////////////////////////////////////////////////////////////
// DEFAULT VALUES
////////////////////////////////////////////////////////////////////////////////

/**
 * @private
 * @type {!Object<string, string>}
 * @const
 */
var INVALID_KEYS = freeze({
  'toString': '',
  'log':      '',
  'pass':     '',
  'error':    '',
  'warn':     '',
  'debug':    '',
  'fail':     '',
  'trace':    ''
});

////////////////////////////////////////////////////////////////////////////////
// FACTORY METHODS
////////////////////////////////////////////////////////////////////////////////

/**
 * @typedef {!{
 *   __TYPE: string,
 *   config: ?Config,
 *   format: ?Format,
 *   style:  ?Style
 * }} Setting
 */

/**
 * @private
 * @param {string} method
 * @param {string=} invalidKeys
 * @return {!Setting}
 */
function newSetting(method, invalidKeys) {

  /** @type {!Setting} */
  var setting;
  /** @type {function} */
  var getDefault;

  setting = newEmptyObj('Setting');
  invalidKeys = invalidKeys || '';
  each('config, format, style', function(key) {
    getDefault = has(invalidKeys, key) ? null : require('./' + key);
    setting = getDefault
      ? amend(setting, key, getDefault(method), '!object')
      : amend(setting, key, null, 'null');
  });
  return seal(setting);
}

/**
 * @typedef {!{
 *   __TYPE:   string,
 *   __INST:   number,
 *   toString: !Setting,
 *   log:      !Setting,
 *   pass:     !Setting,
 *   error:    !Setting,
 *   warn:     !Setting,
 *   debug:    !Setting,
 *   fail:     !Setting,
 *   trace:    !Setting
 * }} Settings
 */

/**
 * @private
 * @param {number} inst
 * @return {!Settings}
 */
function newSettings(inst) {

  /** @type {!Settings} */
  var settings;

  settings = newEmptyObj('Settings');
  settings = amend(settings, '__INST', inst, {
    configurable: false,
    enumerable: false,
    writable: false
  });
  each(INVALID_KEYS, function(keys, method) {
    settings = amend(settings, method, newSetting(method, keys), '!object');
  });
  return freeze(settings);
}

////////////////////////////////////////////////////////////////////////////////
// EXPORTS
////////////////////////////////////////////////////////////////////////////////

/**
 * @private
 * @param {number} inst
 * @return {!Settings}
 */
module.exports = function getDefaultSettings(inst) {
  return newSettings(inst);
};
