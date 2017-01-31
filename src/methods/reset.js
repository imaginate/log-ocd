/**
 * -----------------------------------------------------------------------------
 * LOG-OCD: RESET
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

var help = require('../helpers');
var is   = help.is;
var each = help.each;
var has  = help.has;
var same = help.same;

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

  if ( same(method, 'all') ) {
    each(this, function(setting, method) {
      setting[type] = getDefault(method);
    });
    return true;
  }

  if ( !has(this, method) ) return rangeError(this, 'reset', method);

  this[method][type] = getDefault(method);
  return true;
};
