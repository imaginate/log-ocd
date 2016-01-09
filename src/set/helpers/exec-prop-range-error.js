/**
 * -----------------------------------------------------------------------------
 * LOG-OCD: EXEC-PROP-RANGE-ERROR HELPER
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

var fuse = require('../../helpers').fuse;
var log = require('../../log');

/**
 * @this {!Settings}
 * @param {string} method
 * @param {string} prop
 * @return {boolean}
 */
module.exports = function execPropRangeError(method, prop) {

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

  config = this.error.config;
  header = 'Invalid `log-ocd.' + method + '` Call';
  msg    = 'the setting prop, `' + prop + '`, does not exist';
  error  = new RangeError(header + ': ' + msg);

  args = [ 'error' ];
  config.header && fuse(args, header);
  config.msg && fuse(args, msg);
  fuse(args, error);
  log.apply(this, args);

  return false;
};
