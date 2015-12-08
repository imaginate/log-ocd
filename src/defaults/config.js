/**
 * -----------------------------------------------------------------------------
 * LOG-OCD: CONFIG DEFAULTS
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
var create = help.create;
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
 * @type {!Object<string, function>}
 * @const
 */
var FACTORY = freeze({
  'toString': newPrepConfig,
  'log':      newLogConfig,
  'pass':     newLogConfig,
  'error':    newLogConfig,
  'warn':     newLogConfig,
  'debug':    newLogConfig,
  'fail':     newLogConfig,
  'trace':    newTraceConfig
});

/**
 * @private
 * @type {!Object<string, string>}
 * @const
 */
var VALID_KEYS = freeze({
  'toString': 'style',
  'log':      '',
  'pass':     'header, msg',
  'error':    'header, msg',
  'warn':     'header, msg',
  'debug':    'header, msg',
  'fail':     'header, msg',
  'trace':    ''
});

/**
 * @private
 * @type {!Object<string, string>}
 * @const
 */
var TRUE_KEYS = freeze({
  'toString': '',
  'log':      '',
  'pass':     'header',
  'error':    'header, stack, throw, msg',
  'warn':     'header, msg',
  'debug':    'header',
  'fail':     'msg',
  'trace':    ''
});

////////////////////////////////////////////////////////////////////////////////
// FACTORY METHODS
////////////////////////////////////////////////////////////////////////////////

/**
 * @typedef {!{
 *   __TYPE: string,
 *   ocdMap: boolean,
 *   header: ?boolean,
 *   stack:  boolean,
 *   throw:  boolean,
 *   exit:   boolean,
 *   msg:    ?boolean
 * }} LogConfig
 */

/**
 * @private
 * @param {string} validKeys
 * @param {string=} trueKeys
 * @return {!LogConfig}
 */
function newLogConfig(validKeys, trueKeys) {

  /** @type {!LogConfig} */
  var config;
  /** @type {string} */
  var keys;

  config = newEmptyObj('Config');
  keys  = 'ocdMap, stack, throw, exit';
  config = amend(config, keys, false, 'boolean');
  keys  = 'header, msg';
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

/**
 * @typedef {!{
 *   __TYPE: string,
 *   throw:  boolean,
 *   exit:   boolean
 * }} TraceConfig
 */

/**
 * @private
 * @return {!TraceConfig}
 */
function newTraceConfig() {

  /** @type {!TraceConfig} */
  var config;
  /** @type {string} */
  var keys;

  config = newEmptyObj('Config');
  keys  = 'throw, exit';
  config = amend(config, keys, false, 'boolean');
  return seal(config);
}

/**
 * @typedef {!{
 *   __TYPE: string,
 *   style:  ?boolean
 * }} PrepConfig
 */

/**
 * @private
 * @param {string} validKeys
 * @param {string=} trueKeys
 * @return {!PrepConfig}
 */
function newPrepConfig(validKeys, trueKeys) {

  /** @type {!PrepConfig} */
  var config;
  /** @type {string} */
  var keys;

  config = newEmptyObj('Config');
  keys  = 'style';
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
// EXPORTS
////////////////////////////////////////////////////////////////////////////////

/**
 * @typedef {!(LogConfig|TraceConfig|PrepConfig)} Config
 */

/**
 * @private
 * @param {string} method
 * @return {!Config}
 */
module.exports = function getDefaultConfig(method) {
  return FACTORY[method](VALID_KEYS[method], TRUE_KEYS[method]);
};
