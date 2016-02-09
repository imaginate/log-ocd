/**
 * -----------------------------------------------------------------------------
 * LOG-OCD: GET-DIRPATH HELPER
 * -----------------------------------------------------------------------------
 * @version 1.0.0-beta.6
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

var help = require('../index');
var cut    = help.cut;
var freeze = help.freeze;
var get    = help.get;

/**
 * @private
 * @type {!RegExp}
 * @const
 */
var DIR = freeze( /(?:\(|\/)[^\/]+/ );

/**
 * @private
 * @type {!RegExp}
 * @const
 */
var OPEN_PAR = freeze( /^\(/ );

/**
 * @param {string} trace
 * @return {!Array}
 */
module.exports = function getDirpath(trace) {

  /** @type {!Array} */
  var dirpath;

  dirpath = get(trace, DIR);
  dirpath = cut(dirpath, -1);
  if (dirpath.length) dirpath[0] = cut(dirpath[0], OPEN_PAR);
  return dirpath;
};
