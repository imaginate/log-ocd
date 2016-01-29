/**
 * -----------------------------------------------------------------------------
 * LOG-OCD: STYLE VALUES HELPERS - NEW-THEME-PROP
 * -----------------------------------------------------------------------------
 * @version 1.0.0-beta.5
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

var is = require('../../../../helpers').is;

/**
 * @typedef {!{
 *   type:  string,
 *   val:   (?string|boolean),
 *   make:  boolean,
 *   props: Object
 * }} ThemeProp
 */

/**
 * @private
 * @param {(string|boolean|Object)} val - If object the val is considered props.
 * @return {!ThemeProp}
 */
module.exports = function newThemeProp(val) {

  /** @type {!Object} */
  var prop;
  /** @type {boolean} */
  var make;
  /** @type {string} */
  var type;

  type = is.str(val)
    ? 'string'
    : is.bool(val)
      ? 'boolean'
      : '!object';
  make = type === '!object';
  
  prop = {};
  prop.type = type;
  prop.make = make;
  prop.props = make ? val : null;
  prop.val   = make ? null : val;
  return prop;
};
