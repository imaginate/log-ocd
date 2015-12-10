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
var each   = help.each;
var freeze = help.freeze;
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

/**
 * All the valid boolean keys for each config object. Note that the logger prop
 *   is applied separately.
 * @private
 * @type {!Object<string, string>}
 * @const
 */
var CONFIG_KEYS = freeze({
  'log':   'ocdMap, header, stack, throw, exit, msg',
  'prep':  'style',
  'trace': 'throw, exit'
});

////////////////////////////////////////////////////////////////////////////////
// FACTORY METHODS
////////////////////////////////////////////////////////////////////////////////

/**
 * @typedef {!{
 *   __TYPE: string,
 *   logger: function,
 *   ocdMap: boolean,
 *   header: boolean,
 *   stack:  boolean,
 *   throw:  boolean,
 *   exit:   boolean,
 *   msg:    boolean
 * }} LogConfig
 */

/**
 * @private
 * @param {string} trueKeys
 * @return {!LogConfig}
 */
function newLogConfig(trueKeys) {

  /** @type {!LogConfig} */
  var config;

  config = newEmptyObj('Config');
  config = amend(config, 'logger', console.log, 'function');
  config = amend(config, CONFIG_KEYS.log, false, 'boolean');
  config = seal(config);
  trueKeys && each(trueKeys, function(key) {
    config[key] = true;
  });
  return config;
}

/**
 * @typedef {!{
 *   __TYPE: string,
 *   style:  boolean
 * }} PrepConfig
 */

/**
 * @private
 * @param {string} trueKeys
 * @return {!PrepConfig}
 */
function newPrepConfig(trueKeys) {

  /** @type {!PrepConfig} */
  var config;

  config = newEmptyObj('Config');
  config = amend(config, CONFIG_KEYS.prep, false, 'boolean');
  config = seal(config);
  trueKeys && each(trueKeys, function(key) {
    config[key] = true;
  });
  return config;
}

/**
 * @typedef {!{
 *   __TYPE: string,
 *   logger: function,
 *   throw:  boolean,
 *   exit:   boolean
 * }} TraceConfig
 */

/**
 * @private
 * @param {string} trueKeys
 * @return {!TraceConfig}
 */
function newTraceConfig(trueKeys) {

  /** @type {!TraceConfig} */
  var config;

  config = newEmptyObj('Config');
  config = amend(config, 'logger', console.log, 'function');
  config = amend(config, CONFIG_KEYS.trace, false, 'boolean');
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
  return FACTORY[method]( TRUE_KEYS[method] );
};
