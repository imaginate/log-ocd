/**
 * -----------------------------------------------------------------------------
 * LOG-OCD: NUMBER-TO-STRING
 * -----------------------------------------------------------------------------
 * @version 1.0.0
 * @see [log-ocd]{@link https://github.com/imaginate/log-ocd}
 *
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2016 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
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
var cut   = help.cut;
var fuse  = help.fuse;
var get   = help.get;
var has   = help.has;
var remap = help.remap;

var colors = require('../../helpers/colors');

var getIdentifier = require('../helpers/get-identifier');
var getDelimiter = require('../helpers/get-delimiter');
var getStyleKey = require('../helpers/get-style-key');

/**
 * @this {!Settings}
 * @param {string} method
 * @param {number} val
 * @return {string}
 */
module.exports = function numberToString(method, val) {

  /** @type {string} */
  var identifier;
  /** @type {string} */
  var delimiter;
  /** @type {string} */
  var style;

  style = getStyleKey(this, method, 'number');
  val = String(val);
  identifier = get(val, /^[+-]/)[0] || '';
  identifier = getIdentifier(identifier, style);
  val = cut(val, /^[+-]/);

  if ( !has(val, '.') ) {
    val = colors[style](val);
    return fuse(identifier, val);
  }

  delimiter = getDelimiter('.', style);
  val = val.split('.');
  val = remap(val, function(subval) {
    return colors[style](subval);
  });
  return fuse(identifier, val[0], delimiter, val[1]);
};
