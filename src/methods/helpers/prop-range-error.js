/**
 * -----------------------------------------------------------------------------
 * LOG-OCD: PROP-RANGE-ERROR HELPER
 * -----------------------------------------------------------------------------
 * @version 1.0.0-beta.7
 * @see [log-ocd]{@link https://github.com/imaginate/log-ocd}
 *
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2016 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
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

var fuse = require('../../helpers').fuse;
var log = require('../log');

/**
 * @param {Settings} settings
 * @param {string} method
 * @param {string} prop
 * @return {boolean}
 */
module.exports = function propRangeError(settings, method, prop) {

  /** @type {string} */
  var errorMsg;
  /** @type {!Config} */
  var config;
  /** @type {string} */
  var header;
  /** @type {!RangeError} */
  var error;
  /** @type {!Array} */
  var args;
  /** @type {string} */
  var msg;

  config = settings.error.config;

  header = fuse('Invalid `log-ocd.', method, '` Call');
  msg = fuse('the setting prop, `', prop, '`, does not exist');

  errorMsg = fuse(header, ': ', msg);
  error = new RangeError(errorMsg);

  args = [ 'error' ];
  if (config.header) args = fuse(args, header);
  if (config.msg) args = fuse(args, msg);
  args = fuse(args, error);
  log.apply(settings, args);

  return false;
};
