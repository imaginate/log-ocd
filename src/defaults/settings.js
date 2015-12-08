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
var is     = help.is;
var are    = help.are;
var amend  = help.amend;
var copy   = help.copy;
var create = help.create;
var cut    = help.cut;
var each   = help.each;
var fill   = help.fill;
var freeze = help.freeze;
var fuse   = help.fuse;
var get    = help.get;
var has    = help.has;
var remap  = help.remap;
var seal   = help.seal;
var slice  = help.slice;
var until  = help.until;

var newEmptyObj = require('../helpers/new-empty-obj');

////////////////////////////////////////////////////////////////////////////////
// DEFAULT VALUES
////////////////////////////////////////////////////////////////////////////////

/**
 * @private
 * @type {!Object<string, function>}
 * @const
 */
var SETTINGS_GET_DEFAULT = freeze({
  'config': require('./config'),
  'format': require('./format'),
  'style':  require('./style')
});

/**
 * @private
 * @type {!Object<string, string>}
 * @const
 */
var SETTINGS_INVALID_KEYS = freeze({
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

  setting = newEmptyObj('Setting');
  each(SETTINGS_GET_DEFAULT, function(getDefault, key) {
    setting = invalidKeys && has(invalidKeys, key)
      ? amend(setting, key, null, 'null')
      : amend(setting, key, getDefault(method), '!object');
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
  each(SETTINGS_INVALID_KEYS, function(invalidKeys, method) {
    settings = amend(settings,method,newSetting(method,invalidKeys), '!object');
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
