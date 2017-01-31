/**
 * -----------------------------------------------------------------------------
 * LOG-OCD: SET-CONFIG
 * -----------------------------------------------------------------------------
 * @version 1.0.0-beta.10
 * @see [log-ocd]{@link https://github.com/imaginate/log-ocd}
 *
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2017 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
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

var help = require('../../helpers');
var is    = help.is;
var has   = help.has;
var until = help.until;

var propTypeError = require('../helpers/prop-type-error');
var propRangeError = require('../helpers/prop-range-error');

/**
 * @type {string}
 * @const
 */
var METHOD = 'setConfig';

/**
 * @param {Settings} settings
 * @param {!Object} props
 * @return {boolean}
 */
exports.all = function setAllConfig(settings, props) {

  /** @type {!Config} */
  var config;

  return !until(true, settings, function(setting, method) {
    config = setting.config;
    return until(false, props, function(val, key) {
      if ( !has(config, key) ) return true;
      return setProp(settings, config, key, val);
    });
  });
};

/**
 * @param {Settings} settings
 * @param {string} method
 * @param {!Object} props
 * @return {boolean}
 */
exports.one = function setOneConfig(settings, method, props) {

  /** @type {!Config} */
  var config;

  config = settings[method].config;
  return !until(false, props, function(val, key) {
    return has(config, key)
      ? setProp(settings, config, key, val)
      : propRangeError(settings, METHOD, key);
  });
};

/**
 * @private
 * @param {Settings} settings
 * @param {Config} config
 * @param {string} key
 * @param {*} val
 * @return {boolean}
 */
function setProp(settings, config, key, val) {
  try {
    config[key] = val;
  }
  catch (error) {
    if (!error.__setter || !error.__type) throw error;
    return propTypeError(settings, METHOD, key, val);
  }
  return true;
}
