/**
 * -----------------------------------------------------------------------------
 * LOG-OCD: REGEXP-TO-STRING
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
var cut  = help.cut;
var get  = help.get;

var colors = require('../helpers/colors');

var getIdentifier = require('./helpers/get-identifier');
var getBrackets = require('./helpers/get-brackets');
var getFlags = require('./helpers/get-flags');

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
  /** @type {!RegExpFormat} */
  var format;
  /** @type {string} */
  var style;
  /** @type {string} */
  var flags;

  style = 'ocd' + this[method].__INST + method + 'regexp';
  val = val.toString();
  format = this[method].format.regexp;
  identifier = getIdentifier(format.identifier, style);
  brackets = getBrackets(format.brackets, style);
  flags = get(val, /[a-z]+$/)[0];
  flags = getFlags(flags, style);
  val = cut(val, /^\/|\/[a-z]*$/g);
  val = colors[style](val);
  return identifier + brackets[0] + val + brackets[1] + flags;
};
