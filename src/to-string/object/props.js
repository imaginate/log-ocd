/**
 * -----------------------------------------------------------------------------
 * LOG-OCD: PROPS-TO-STRING
 * -----------------------------------------------------------------------------
 * @version 1.0.0-beta.10
 * @see [log-ocd]{@link https://github.com/imaginate/log-ocd}
 *
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2017 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
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

var is = require('../../helpers').is;

var newPropDetails = require('./helpers/new-prop-details');
var getPropVals = require('./helpers/get-prop-vals');
var printProps = require('./helpers/print-props');

/**
 * @this {Settings}
 * @param {string} method
 * @param {string} type
 * @param {!Object} obj
 * @return {string}
 */
module.exports = function propsToString(method, type, obj) {

  /** @type {PropDetails} */
  var details;
  /** @type {!Array<string>} */
  var vals;

  details = newPropDetails(this, method, type);
  this.__keyLen = 0;

  if ( is.empty(obj) ) return printProps(this, details);

  this.__indent += details.indent;
  vals = getPropVals(this, method, details, obj);
  this.__indent -= details.indent;
  this.__keyLen = 0;
  return printProps(this, details, vals);
};
