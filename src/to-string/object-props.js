/**
 * -----------------------------------------------------------------------------
 * LOG-OCD: OBJECT-PROPS-TO-STRING
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
var each = help.each;
var fill = help.fill;
var fuse = help.fuse;

var colors = require('../helpers/colors');

var getKeys = require('./helpers/get-keys');
var stripStyle = require('./helpers/strip-style');

var toString = require('./index');

/**
 * @this {!Settings}
 * @param {string} method
 * @param {!Object} vals
 * @param {!Object} obj
 * @return {string}
 */
module.exports = function objectPropsToString(method, vals, obj) {

  /** @type {!Array<string>} */
  var result;
  /** @type {string} */
  var indent;
  /** @type {function} */
  var color;
  /** @type {!Array<string>} */
  var keys;
  /** @type {number} */
  var last;
  /** @type {number} */
  var len;

  keys = getKeys(obj);

  if (!keys.length) return vals.identifier + vals.brackets[0] + vals.brackets[1];

  result = [];
  result = fuse(result, vals.identifier + vals.brackets[0]);

  // convert all object values to a string
  len = stripStyle( result[0] ).length;
  last = keys.length - 1;
  color = colors[vals.style];
  each(keys, function(key, i) {
    key = color(key + ':') + ' ' + toString.call(this, method, obj[key]);
    len += stripStyle(key).length;
    key += i < last ? vals.delimiter : '';
    result = fuse(result, key);
  }, this);

  len = len < vals.limit;
  indent = len ? ' ' : '\n' + fill(vals.indent, ' ');
  result = result.join(indent);
  result += len ? ' ' : '\n';
  return result + vals.brackets[1];
};
