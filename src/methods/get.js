/**
 * -----------------------------------------------------------------------------
 * LOG-OCD: GET
 * -----------------------------------------------------------------------------
 * @version 1.0.0-beta.9
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
var fuse = help.fuse;
var has  = help.has;
var same = help.same;

var log = require('./log');
var typeError = require('./helpers/type-error');
var rangeError = require('./helpers/range-error');

/**
 * This method logs the specified `Settings`.
 *
 * @this {!Settings}
 * @param {string} type - The property to log. Options: config, format, style
 * @param {string=} method - [default= "all"]
 * @return {boolean}
 */
module.exports = function get(type, method) {

  /** @type {!Settings} */
  var settings;
  /** @type {!Config} */
  var config;
  /** @type {!Object} */
  var props;
  /** @type {?string} */
  var title;
  /** @type {!Array} */
  var args;

  settings = this;
  method = method || 'all';

  if ( !is.str(method) ) return typeError(settings, 'get', 'method', method);

  if ( same(method, 'all') ) {
    props = {};
    each(settings, function(setting, method) {
      props[method] = settings[method][type];
    });
  }
  else if ( !has(settings, method) ) return rangeError(settings, 'get', method);
  else props = settings[method][type];

  config = settings.get.config;
  config.msg = false;

  if (config.header) {
    settings.get.format.header.accentMark = '`';
    method = same(method, 'all')
      ? 'all methods'
      : fuse('`', method, '`');
    title = fuse('`', type, '` for ', method);
  }
  else title = null;

  args = fuse([ 'get' ], title, props);
  return log.apply(settings, args);
};
