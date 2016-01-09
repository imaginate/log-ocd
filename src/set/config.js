/**
 * -----------------------------------------------------------------------------
 * LOG-OCD: SET-CONFIG
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
var is    = help.is;
var has   = help.has;
var until = help.until;

var execTypeError = require('./helpers/exec-type-error');
var execRangeError = require('./helpers/exec-range-error');
var execPropTypeError = require('./helpers/exec-prop-type-error');
var execPropRangeError = require('./helpers/exec-prop-range-error');

/**
 * @this {!Settings}
 * @param {string=} method - [default= "all"]
 * @param {!Object} props
 * @return {boolean}
 */
module.exports = function setConfig(method, props) {

  /** @type {!Config} */
  var config;

  if (arguments.length === 1) {
    props = method;
    method = 'all';
  }

  if ( !is.str(method) ) {
    return execTypeError.call(this, 'setConfig', 'method', method);
  }
  if ( !is.obj(props) ) {
    return execTypeError.call(this, 'setConfig', 'props', props);
  }

  if (method === 'all') return setAll(this, props);

  if ( !has(this, method) ) {
    return execRangeError.call(this, 'setConfig', 'method', method);
  }

  return setOne(this, method, props);
};

/**
 * @private
 * @param {!Settings} settings
 * @param {!Object} props
 * @return {boolean}
 */
function setAll(settings, props) {

  /** @type {!Config} */
  var config;

  return !until(true, settings, function(setting, method) {
    config = setting.config;
    return until(false, props, function(val, key) {
      if ( !has(config, key) ) return;
      try {
        config[key] = val;
      }
      catch (error) {
        if (!error.__setter || !error.__type) throw error;
        return execPropTypeError.call(settings, 'setConfig', key, val);
      }
    });
  });
}

/**
 * @private
 * @param {!Settings} settings
 * @param {string} method
 * @param {!Object} props
 * @return {boolean}
 */
function setOne(settings, method, props) {

  /** @type {!Config} */
  var config;

  config = settings[method].config;
  return !until(false, props, function(val, key) {
    if ( !has(config, key) ) {
      return execPropRangeError.call(settings, 'setConfig', key);
    }
    try {
      config[key] = val;
    }
    catch (error) {
      if (!error.__setter || !error.__type) throw error;
      return execPropTypeError.call(settings, 'setConfig', key, val);
    }
  });
}
