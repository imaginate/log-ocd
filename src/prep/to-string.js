/**
 * -----------------------------------------------------------------------------
 * LOG-OCD: TO-STRING
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

var help = require('../helpers');
var remap = help.remap;
var slice = help.slice;

var valToString = require('../to-string');

/**
 * @this {!Settings}
 * @param {...*} vals
 * @return {string}
 */
module.exports = function toString(vals) {

  /** @type {string} */
  var result;

  this.__maxLen = 0;
  this.__indent = 0;
  vals = slice(arguments);
  vals = remap(vals, function(val) {
    return valToString.call(this, 'toString', val);
  }, this);
  return vals.join('\n');
};
