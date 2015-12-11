/**
 * -----------------------------------------------------------------------------
 * LOG-OCD: EXEC-ERROR HELPER
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
var log = require('../index');

/**
 * @this {!Settings}
 * @param {string} method
 * @param {string} param
 * @param {*} val
 * @return {boolean}
 */
module.exports = function execError(method, param, val) {

  /** @type {!Config} */
  var config;
  /** @type {!Object} */
  var ocdmap;
  /** @type {string} */
  var header;
  /** @type {!TypeError} */
  var error;
  /** @type {!Array} */
  var args;
  /** @type {string} */
  var msg;

  config = this.error.config;
  header = 'Invalid `log-ocd.' + method + '` Call';
  msg    = 'invalid type for `' + param + '` param';
  error  = new TypeError(header + ': ' + msg);
  ocdmap = { ocdmap: true };
  ocdmap[param] = val;

  args = [ 'error' ];
  config.header && fuse(args, header);
  config.msg && fuse(args, msg);
  fuse(args, error, ocdmap);
  log.apply(this, args);

  return false;
};
