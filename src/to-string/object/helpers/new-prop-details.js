/**
 * -----------------------------------------------------------------------------
 * LOG-OCD: NEW-PROP-DETAILS HELPER
 * -----------------------------------------------------------------------------
 * @version 1.0.0-beta.8
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

var getIdentifier = require('../../helpers/get-identifier');
var getDelimiter = require('../../helpers/get-delimiter');
var getBrackets = require('../../helpers/get-brackets');
var getLimit = require('../../helpers/get-limit');

/**
 * @typedef {!{
 *   identifier: string,
 *   delimiter:  string,
 *   brackets:   !Array<string>,
 *   indent:     number,
 *   limit:      number,
 *   theme:      MainTheme
 * }} PropDetails
 */

/**
 * @param {Settings} settings
 * @param {string} method
 * @param {string} type
 * @return {PropDetails}
 */
module.exports = function newPropDetails(settings, method, type) {

  /** @type {PropDetails} */
  var details;
  /** @type {(Format|ObjectFormat)} */
  var format;
  /** @type {(Theme|MainTheme)} */
  var theme;

  details = {};
  format = settings[method].format;
  details.limit = getLimit(format.lineLimit, settings.__maxLen);
  details.limit = details.limit - settings.__keyLen;
  if (details.limit < 0) details.limit = 0;
  format = format[type];
  theme = settings[method]['style'][type];
  details.identifier = getIdentifier(theme, format.identifier);
  details.delimiter = getDelimiter(theme, format.delimiter);
  details.brackets = getBrackets(theme, format.brackets);
  details.indent = format.indent;
  details.theme = theme;
  return details;
};
