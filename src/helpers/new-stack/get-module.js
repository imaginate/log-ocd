/**
 * -----------------------------------------------------------------------------
 * LOG-OCD: GET-MODULE HELPER
 * -----------------------------------------------------------------------------
 * @version 1.0.0-beta.11
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

var fuse = require('../index').fuse;

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
  return fuse(basepath, trace.file);
};
