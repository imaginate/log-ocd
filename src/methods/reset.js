/**
 * -----------------------------------------------------------------------------
 * LOG-OCD: RESET
 * -----------------------------------------------------------------------------
 * @version 1.0.0
 * @see [log-ocd]{@link https://github.com/imaginate/log-ocd}
 *
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2016 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
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
var is   = help.is;
var each = help.each;
var has  = help.has;

var setColors = require('../helpers/colors').setThemes;

var typeError = require('./helpers/type-error');
var rangeError = require('./helpers/range-error');

/**
 * @type {!Object}
 * @const
 */
var GET_DEFAULT = {
  config: require('../settings/config'),
  format: require('../settings/format'),
  style:  require('../settings/style')
};

/**
 * @this {Settings}
 * @param {string} type - The reset type. Options: config, format, style
 * @param {string=} method - [default= "all"]
 * @return {boolean}
 */
module.exports = function reset(type, method) {

  /** @type {function} */
  var getDefault;

  method = method || 'all';

  if ( !is.str(method) ) return typeError(this, 'reset', 'method', method);

  getDefault = GET_DEFAULT[type];

  if ( is.same(method, 'all') ) {
    each(this, function(setting, method) {
      setting[type] = getDefault(method);
    });
    if ( is.same(type, 'style') ) {
      each(this, function(setting, method) {
        setColors(this.__INST, setting.style, method);
      }, this);
    }
    return true;
  }

  if ( !has(this, method) ) return rangeError(this, 'reset', method);

  this[method][type] = getDefault(method);
  if ( is.same(type, 'style') ) setColors(this.__INST, this[method].style, method);
  return true;
};
