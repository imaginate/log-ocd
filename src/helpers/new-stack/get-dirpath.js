/**
 * -----------------------------------------------------------------------------
 * LOG-OCD: GET-DIRPATH HELPER
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

var help = require('../index');
var cut  = help.cut;
var fuse = help.fuse;
var get  = help.get;
var has  = help.has;

var DIR   = /\/[^\/]+/;
var DRIVE = /^[a-z]:/i;
var EVENT = /^[^\(]+? *\(/;

/**
 * @param {string} trace
 * @return {!Array}
 */
module.exports = function getDirpath(trace) {

  /** @type {!Array} */
  var dirpath;
  /** @type {string} */
  var drive;

  trace = cut(trace, EVENT);
  dirpath = get(trace, DIR);
  dirpath = cut(dirpath, -1);

  if ( has(trace, DRIVE) ) {
    drive = get(trace, DRIVE)[0];
    dirpath = fuse.val.top(dirpath, drive);
  }

  return dirpath;
};
