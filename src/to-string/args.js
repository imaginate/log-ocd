/**
 * -----------------------------------------------------------------------------
 * LOG-OCD: ARGUMENTS-TO-STRING
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

var slice = require('../helpers').slice;

var getIdentifier = require('./helpers/get-identifier');
var getDelimiter = require('./helpers/get-delimiter');
var getBrackets = require('./helpers/get-brackets');
var getStyleKey = require('./helpers/get-style-key');

var arrPropsToString = require('./array-props');

/**
 * @this {!Settings}
 * @param {string} method
 * @param {!Arguments} val
 * @return {string}
 */
module.exports = function argumentsToString(method, val) {

  /** @type {!ObjectFormat} */
  var format;
  /** @type {string} */
  var style;
  /** @type {!Object} */
  var vals;

  val = slice(val);
  style = getStyleKey.call(this, method, 'args');
  format = this[method].format.args;
  vals = {
    identifier: getIdentifier(format.identifier, style),
    delimiter:  getDelimiter(format.delimiter, style),
    brackets:   getBrackets(format.brackets, style),
    indent:     format.indent,
    style:      style
  };
  vals.limit = this[method].format.lineLimit;
  return arrPropsToString.call(this, method, vals, val);
};
