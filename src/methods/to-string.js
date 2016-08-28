/**
 * -----------------------------------------------------------------------------
 * LOG-OCD: TO-STRING
 * -----------------------------------------------------------------------------
 * @version 1.0.0-beta.8
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

var help = require('../helpers');
var fuse  = help.fuse;
var roll  = help.roll;
var slice = help.slice;

var valToString = require('../to-string');

/**
 * @this {Settings}
 * @param {...*} vals
 * @return {string}
 */
module.exports = function toString(vals) {

  /** @type {string} */
  var result;
  /** @type {number} */
  var last;

  this.__maxLen = 0;
  this.__keyLen = 0;
  this.__indent = 0;
  this.__ocdmap = true;
  vals = slice(arguments);
  last = vals.length - 1;
  return roll.up('', vals, function(val, i) {
    val = valToString.call(this, 'toString', val);
    return i < last ? fuse(val, '\n') : val;
  }, this);
};
