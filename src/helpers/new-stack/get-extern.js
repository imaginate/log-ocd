/**
 * -----------------------------------------------------------------------------
 * LOG-OCD: GET-EXTERN HELPER
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

var get = require('../index').get;
var cutSlash = require('./cut-slash');

/**
 * @param {!Array<string>} dir
 * @return {string}
 */
module.exports = function getExtern(dir) {

  /** @type {!Array<number>} */
  var ii;
  /** @type {number} */
  var i;

  ii = get.ii(dir, '/node_modules');
  i  = ii[ii.length - 1] + 1;
  return cutSlash( dir[i] );
};
