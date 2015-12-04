/**
 * -----------------------------------------------------------------------------
 * LOG-OCD: SETTINGS
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


////////////////////////////////////////////////////////////////////////////////
// SETTINGS FACTORY METHODS
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
 * @type {!Object<string, function>}
 * @const
 */
var SETTINGS_GET_DEFAULT = freeze({
  'config': getDefaultConfig,
  'format': getDefaultFormat,
  'style':  getDefaultStyle
});

/**
 * A factory method for Setting objects.
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

/**
 * A factory method for Settings objects.
 * @private
 * @return {!Settings}
 */
function newSettings() {

  /** @type {!Settings} */
  var settings;

  settings = newEmptyObj('Settings');
  each(SETTINGS_INVALID_KEYS, function(invalidKeys, method) {
    settings = amend(settings,method,newSetting(method,invalidKeys), '!object');
  });
  return freeze(settings);
}
