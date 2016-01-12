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

var help = require('../../helpers');
var is    = help.is;
var has   = help.has;
var until = help.until;

var typeError = require('../helpers/type-error');
var rangeError = require('../helpers/range-error');
var propTypeError = require('../helpers/prop-type-error');
var propRangeError = require('../helpers/prop-range-error');

/**
 * @type {string}
 * @const
 */
var METHOD = 'setConfig';

/**
 * @this {Settings}
 * @param {string=} method - [default= "all"]
 * @param {!Object} props
 * @return {boolean}
 */
module.exports = function setConfig(method, props) {

  if (arguments.length < 2) {
    props = method;
    method = 'all';
  }

  if ( !is.str(method) ) return typeError(this, METHOD, 'method', method);
  if ( !is.obj(props)  ) return typeError(this, METHOD, 'props', props);

  if ( is.same(method, 'all') ) return setAll(this, props);

  if ( !has(this, method) ) return rangeError(this, METHOD, 'method', method);

  return setOne(this, method, props);
};

/**
 * @private
 * @param {Settings} settings
 * @param {!Object} props
 * @return {boolean}
 */
function setAll(settings, props) {

  /** @type {!Config} */
  var config;

  return !until(true, settings, function(setting, method) {
    config = setting.config;
    return until(false, props, function(val, key) {
      if ( !has(config, key) ) return true;
      return setProp(settings, config, key, val);
    });
  });
}

/**
 * @private
 * @param {Settings} settings
 * @param {string} method
 * @param {!Object} props
 * @return {boolean}
 */
function setOne(settings, method, props) {

  /** @type {!Config} */
  var config;

  config = settings[method].config;
  return !until(false, props, function(val, key) {
    return has(config, key)
      ? setProp(settings, config, key, val)
      : propRangeError(settings, METHOD, key);
  });
}

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
