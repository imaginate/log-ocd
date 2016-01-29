/**
 * -----------------------------------------------------------------------------
 * LOG-OCD: GET-COLUMN HELPER
 * -----------------------------------------------------------------------------
 * @version 1.0.0-beta.5
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
var freeze = help.freeze;
var get    = help.get;

/**
 * @private
 * @type {!RegExp}
 * @const
 */
var COLUMN = freeze( /[0-9]+(?=\)?$)/ );

/**
 * @param {string} trace
 * @return {string}
 */
module.exports = function getColumn(trace) {
  return get(trace, COLUMN)[0];
};
