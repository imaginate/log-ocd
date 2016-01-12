/**
 * -----------------------------------------------------------------------------
 * LOG-OCD: OCDMAP-TO-STRING
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

var help = require('../../helpers');
var fuse = help.fuse;
var roll = help.roll;

var colors = require('../../helpers/colors');

var getDelimiter = require('../helpers/get-delimiter');
var getStyleKey = require('../helpers/get-style-key');
var getSpaces = require('../helpers/get-spaces');
var getKeys = require('../helpers/get-keys');

var toString = require('../index');

/**
 * @this {!Settings}
 * @param {string} method
 * @param {!Object} obj
 * @return {string}
 */
module.exports = function ocdmapToString(method, obj) {

  /** @type {string} */
  var delimiter;
  /** @type {!OcdMapFormat} */
  var format;
  /** @type {!Array<string>} */
  var spaces;
  /** @type {string} */
  var style;
  /** @type {!Array<string>} */
  var keys;
  /** @type {number} */
  var last;
  /** @type {string} */
  var val;

  keys = getKeys(obj);

  if (!keys.length) return '';

  style = getStyleKey(this, method, 'ocdmap');
  format = this[method].format.ocdmap;
  spaces = getSpaces(format.spaceBefore, format.spaceAfter, style);
  delimiter = getDelimiter(format.delimiter, style);
  last = keys.length - 1;
  return roll.up(keys, function(key, i) {
    val = toString.call(this, method, obj[key]);
    val = i < last ? fuse(val, '\n') : val;
    key = colors[style](key);
    return fuse(spaces[0], key, spaces[1], delimiter, val);
  }, this);
};
