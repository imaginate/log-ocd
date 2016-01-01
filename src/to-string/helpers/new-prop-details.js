/**
 * -----------------------------------------------------------------------------
 * LOG-OCD: NEW-PROP-DETAILS HELPER
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

var getIdentifier = require('./get-identifier');
var getDelimiter = require('./get-delimiter');
var getBrackets = require('./get-brackets');
var getStyleKey = require('./get-style-key');

/**
 * @typedef {!{
 *   identifier: string,
 *   delimiter:  string,
 *   brackets:   !Array<string>,
 *   indent:     number,
 *   style:      string,
 *   limit:      number
 * }} PropDetails
 */

/**
 * @param {!Settings} settings
 * @param {string} method
 * @param {string} type
 * @return {!PropDetails}
 */
module.exports = function newPropDetails(settings, method, type) {

  /** @type {!PropDetails} */
  var details;
  /** @type {!(Format|ObjectFormat)} */
  var format;
  /** @type {string} */
  var style;

  details = {};

  format = settings[method].format;
  details.limit = format.lineLimit;

  format = format[type];
  style = getStyleKey.call(settings, method, type);
  details.identifier = getIdentifier(format.identifier, style);
  details.delimiter = getDelimiter(format.delimiter, style);
  details.brackets = getBrackets(format.brackets, style);
  details.indent = format.indent;
  details.style = style;

  return details;
};
