/**
 * -----------------------------------------------------------------------------
 * LOG-OCD: CONFIG
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
// CONFIG FACTORY METHODS
////////////////////////////////////////////////////////////////////////////////

/**
 * @typedef {!{
 *   __TYPE: string,
 *   argMap: ?boolean,
 *   header: ?boolean,
 *   stack:  ?boolean,
 *   throw:  boolean,
 *   exit:   boolean
 * }} Config
 */

/**
 * A factory method for Config objects.
 * @private
 * @param {string} validKeys
 * @param {string=} trueKeys
 * @return {!Config}
 */
function newConfig(validKeys, trueKeys) {

  /** @type {!Config} */
  var config;
  /** @type {string} */
  var keys;

  config = newEmptyObj('Config');
  keys  = 'throw, exit';
  config = amend(config, keys, false, 'boolean');
  keys  = 'argMap, header, stack';
  each(keys, function(key) {
    config = validKeys && has(validKeys, key)
      ? amend(config, key, false, 'boolean')
      : amend(config, key, null, 'null');
  });
  config = seal(config);
  trueKeys && each(trueKeys, function(key) {
    config[key] = true;
  });
  return config;
}


////////////////////////////////////////////////////////////////////////////////
// CONFIG SETUP METHODS
////////////////////////////////////////////////////////////////////////////////

/**
 * @private
 * @param {string} method
 * @return {!Object}
 */
function getDefaultConfig(method) {
  switch (method) {
    case 'log':   return newConfig('argMap,header,stack');
    case 'pass':  return newConfig('argMap,header,stack', 'header');
    case 'error': return newConfig('argMap,header,stack', 'header,stack,throw');
    case 'warn':  return newConfig('argMap,header,stack', 'header');
    case 'debug': return newConfig('argMap,header,stack', 'header');
    case 'fail':  return newConfig('argMap,header,stack');
    case 'trace': return newConfig();
  }
}

/**
 * @private
 * @return {!Object}
 */
function getDefaultConfigs() {

  /** @type {!Object} */
  var configs;
  /** @type {string} */
  var methods;

  methods = 'log, pass, error, warn, debug, fail, trace';
  configs = {};
  each(methods, function(method) {
    configs[method] = getDefaultConfig(method);
  });
  return seal(configs);
}


////////////////////////////////////////////////////////////////////////////////
// CONFIG SETTERS
////////////////////////////////////////////////////////////////////////////////


