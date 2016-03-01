/**
 * -----------------------------------------------------------------------------
 * LOG-OCD: NUMBER-TO-STRING
 * -----------------------------------------------------------------------------
 * @version 1.0.0-beta.6
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

var help = require('../../helpers');
var cut   = help.cut;
var fuse  = help.fuse;
var get   = help.get;
var has   = help.has;
var remap = help.remap;

var color = require('../../helpers/color');

var getIdentifier = require('../helpers/get-identifier');
var getDelimiter = require('../helpers/get-delimiter');

/**
 * @this {Settings}
 * @param {string} method
 * @param {number} val
 * @return {string}
 */
module.exports = function numberToString(method, val) {

  /** @type {string} */
  var identifier;
  /** @type {string} */
  var delimiter;
  /** @type {NumberTheme} */
  var theme;

  theme = this[method]['style']['number'];
  val = String(val);
  identifier = get(val, /^[+-]/)[0] || '';
  identifier = getIdentifier(theme, identifier);
  val = cut(val, /^[+-]/);

  if ( !has(val, '.') ) {
    val = color(theme, val);
    return fuse(identifier, val);
  }

  delimiter = getDelimiter(theme, '.');
  val = val.split('.');
  val = remap(val, function(subval) {
    return color(theme, subval);
  });
  return fuse(identifier, val[0], delimiter, val[1]);
};
