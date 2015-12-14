/**
 * -----------------------------------------------------------------------------
 * LOG-OCD: STACK-TO-STRING
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

var each = require('../helpers').each;

var getStyleKey = require('./helpers/get-style-key');
var getTitle = require('./helpers/get-title');
var getRoot = require('./helpers/get-root');
var getRow = require('./helpers/get-row');
var stripStyle = require('./helpers/strip-style');
var noStyle = require('./helpers/no-style');

/**
 * @this {!Settings}
 * @param {string} method
 * @param {!Stack} stack
 * @return {string}
 */
module.exports = function stackToString(method, stack) {

  /** @type {!Config} */
  var config;
  /** @type {string} */
  var result;
  /** @type {string} */
  var style;
  /** @type {string} */
  var key;

  style = getStyleKey.call(this, 'trace');
  config = this.trace.config;
  result = config.root ? getRoot.call(this, stack, style) : '';
  result += config.title ? getTitle.call(this, stack, style) : '';
  style += '.';
  each(stack, function(trace, i) {
    key = style;
    key += i % 2 ? 'odd' : 'even';
    result += getRow.call(this, trace, stack, key);
  }, this);
  return noStyle(config) ? stripStyle(result) : result;
};
