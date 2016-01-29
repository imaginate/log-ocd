/**
 * -----------------------------------------------------------------------------
 * LOG-OCD: RANGE-ERROR HELPER
 * -----------------------------------------------------------------------------
 * @version 1.0.0
 * @see [log-ocd]{@link https://github.com/imaginate/log-ocd}
 *
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2016 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Supporting Libraries:
 * @see [are]{@link https://github.com/imaginate/are}
 * @see [chalk]{@link https://github.com/chalk/chalk}
 * @see [vitals]{@link https://github.com/imaginate/vitals}
 *
 * Annotations:
 * @see [JSDoc3]{@link http://usejsdoc.org/}
 * @see [Closure Compiler specific JSDoc]{@link https://developers.google.com/closure/compiler/docs/js-for-compiler}
 */

'use strict';

var fuse = require('../../helpers').fuse;
var log = require('../log');

/**
 * @param {Settings} settings
 * @param {string} method
 * @param {string} name
 * @param {*=} val
 * @return {boolean}
 */
module.exports = function rangeError(settings, method, name, val) {

  /** @type {string} */
  var errorMsg;
  /** @type {boolean} */
  var hasVal;
  /** @type {!Config} */
  var config;
  /** @type {?Object} */
  var ocdmap;
  /** @type {string} */
  var header;
  /** @type {!RangeError} */
  var error;
  /** @type {!Array} */
  var args;
  /** @type {string} */
  var msg;

  hasVal = arguments.length > 3;
  config = settings.error.config;

  header = fuse('Invalid `log-ocd.', method, '` Call');
  msg = hasVal
    ? fuse('`', name, '` does not exist')
    : fuse('the method, `', name, '`, does not exist');

  errorMsg = fuse(header, ': ', msg);
  error = new RangeError(errorMsg);

  ocdmap = hasVal ? { ocdmap: true } : null;
  if (hasVal) ocdmap[param] = val;

  args = [ 'error' ];
  if (config.header) args = fuse(args, header);
  if (config.msg) args = fuse(args, msg);
  args = fuse(args, error, ocdmap);
  log.apply(settings, args);

  return false;
};
