/**
 * -----------------------------------------------------------------------------
 * LOG-OCD: NUMBER-TO-STRING HELPER
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
var has  = help.has;

var colors = require('../helpers/colors');

////////////////////////////////////////////////////////////////////////////////
// MAIN METHOD
////////////////////////////////////////////////////////////////////////////////

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

  style = 'ocd' + this[method].__INST + method + 'number';
  val = String(val);
  identifier = get(val, /^[+-]/)[0] || '';
  identifier = identifier && colors[style + 'identifier'](identifier);
  val = cut(val, /^[+-]/);

  if ( !has(val, '\.') ) return identifier + colors[style](val);

  delimiter = colors[style + 'delimiter']('.');
  val = val.split('.');
  return identifier + colors[style]( val[0] ) +
         delimiter  + colors[style]( val[1] );
};
