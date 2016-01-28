/**
 * -----------------------------------------------------------------------------
 * LOG-OCD: REGEXP-TO-STRING
 * -----------------------------------------------------------------------------
 * @version 1.0.0
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

var help = require('../../helpers');
var cut  = help.cut;
var fuse = help.fuse;
var get  = help.get;

var color = require('../../helpers/color');

var getIdentifier = require('../helpers/get-identifier');
var getBrackets = require('../helpers/get-brackets');
var getFlags = require('../helpers/get-flags');

/**
 * @this {!Settings}
 * @param {string} method
 * @param {!RegExp} val
 * @return {string}
 */
module.exports = function regexpToString(method, val) {

  /** @type {string} */
  var identifier;
  /** @type {!Array} */
  var brackets;
  /** @type {RegExpFormat} */
  var format;
  /** @type {RegExpTheme} */
  var theme;
  /** @type {string} */
  var flags;

  theme = this[method].style.regexp;
  val = val.toString();
  format = this[method].format.regexp;
  identifier = getIdentifier(theme, format.identifier);
  brackets = getBrackets(theme, format.brackets);
  flags = get(val, /[a-z]+$/)[0];
  flags = getFlags(theme, flags);
  val = cut(val, /^\/|\/[a-z]*$/g);
  val = color(theme, val);
  return fuse(identifier, brackets[0], val, brackets[1], flags);
};
