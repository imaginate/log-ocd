/**
 * -----------------------------------------------------------------------------
 * LOG-OCD: PRINT-PROP-DETAILS
 * -----------------------------------------------------------------------------
 * @version 1.0.0-beta.8
 * @see [log-ocd]{@link https://github.com/imaginate/log-ocd}
 *
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2016 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
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

var help = require('../../../helpers');
var fill = help.fill;
var fuse = help.fuse;

/**
 * @param {Settings} settings
 * @param {PropDetails} details
 * @param {!Array<string>=} vals
 * @return {string}
 */
module.exports = function printProps(settings, details, vals) {

  /** @type {string} */
  var result;
  /** @type {string} */
  var indent;

  if (!vals) {
    return fuse(details.identifier, details.brackets[0], details.brackets[1]);
  }

  if ( !details.limit || (vals.len > 0 && vals.len <= details.limit) ) {
    vals = vals.join(' ');
    return fuse(vals, ' ', details.brackets[1]);
  }

  indent = fill(details.indent + settings.__indent, ' ');
  indent = fuse('\n', indent);
  result = vals.join(indent);
  indent = fill(settings.__indent, ' ');
  indent = fuse('\n', indent);
  return fuse(result, indent, details.brackets[1]);
};
