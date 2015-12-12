/**
 * -----------------------------------------------------------------------------
 * LOG-OCD: GET-MODULE HELPER
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

var isExtern = require('./is-extern');
var getExtern = require('./get-extern');
var getRelativePath = require('./get-relative-path');

/**
 * @param {string} traceStr
 * @param {!Array<string>=} base
 * @param {!Trace} trace
 * @return {string}
 */
module.exports = function getModule(traceStr, base, trace) {

  /** @type {string} */
  var basepath;

  if ( isExtern(traceStr) ) return getExtern(trace.dir);

  if (!base || !trace.dir.length) return '(node.js core)';

  basepath = getRelativePath(base, trace.dir);
  return basepath + trace.file;
};