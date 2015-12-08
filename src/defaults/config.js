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
var CONFIG_FACTORY = freeze({
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
var CONFIG_VALID_KEYS = freeze({
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
var CONFIG_TRUE_KEYS = freeze({
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
 * A factory method for LogConfig objects.
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
 * A factory method for TraceConfig objects.
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
 * A factory method for PrepConfig objects.
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
  return CONFIG_FACTORY[method](
    CONFIG_VALID_KEYS[method],
    CONFIG_TRUE_KEYS[method]
  );
};
