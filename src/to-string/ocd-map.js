/**
 * -----------------------------------------------------------------------------
 * LOG-OCD: OCD-MAP-TO-STRING
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
var each  = help.each;
var fill  = help.fill;
var slice = help.slice;

var colors = require('../helpers/colors');

var getDelimiter = require('./helpers/get-delimiter');
var getKeys = require('./helpers/get-keys');

var toString = require('./index');

/**
 * @this {!Settings}
 * @param {string} method
 * @param {!Object} obj
 * @return {string}
 */
module.exports = function ocdMapToString(method, obj) {

  /** @type {string} */
  var delimiter;
  /** @type {string} */
  var result;
  /** @type {!OcdMapFormat} */
  var format;
  /** @type {string} */
  var style;
  /** @type {!Array<string>} */
  var space;
  /** @type {!Array<string>} */
  var keys;
  /** @type {*} */
  var val;

  result = '';
  keys = getKeys(obj);

  if (!keys.length) return result;

  style  = 'ocd' + this[method].__INST + method + 'ocdmap';
  format = this[method].format.ocdmap;
  space  = [
    fill(format.spaceBefore, ' '),
    fill(format.spaceAfter,  ' ')
  ];
  delimiter = getDelimiter(format.delimiter, style);
  each(keys, function(key) {
    val = obj[key];
    key = space[0] + colors[style](key) + space[1] + delimiter + ' ';
    result += key + toString.call(this, method, val) + '\n';
  }, this);
  return slice(result, -1);
};
