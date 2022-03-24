/**
 * -----------------------------------------------------------------------------
 * LOG-OCD: SET
 * -----------------------------------------------------------------------------
 * @version 1.0.0-beta.10
 * @see [log-ocd]{@link https://github.com/imaginate/log-ocd}
 *
 * @author Adam Smith <imagineadamsmith@gmail.com> (https://github.com/imaginate)
 * @copyright 2022 Adam A Smith <imagineadamsmith@gmail.com> (https://github.com/imaginate)
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
var is   = help.is;
var has  = help.has;
var same = help.same;

var typeError = require('../helpers/type-error');
var rangeError = require('../helpers/range-error');

/**
 * @type {!Object}
 * @const
 */
var SET = {
  config: require('./config'),
  format: require('./format'),
  style:  require('./style')
};

/**
 * @this {Settings}
 * @param {string} type - The set type. Options: config, format, style
 * @param {string=} method - [default= "all"]
 * @param {!Object} props
 * @return {boolean}
 */
module.exports = function set(type, method, props) {

  if (arguments.length < 3) {
    props = method;
    method = 'all';
  }

  if ( !is.str(method) ) return typeError(this, 'set', 'method', method);
  if ( !is.obj(props)  ) return typeError(this, 'set', 'props', props);

  if ( same(method, 'all') ) return SET[type].all(this, props);

  if ( !has(this, method) ) return rangeError(this, 'set', 'method', method);

  return SET[type].one(this, method, props);
};
