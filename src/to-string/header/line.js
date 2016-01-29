/**
 * -----------------------------------------------------------------------------
 * LOG-OCD: HEADER-LINE-TO-STRING
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

var help = require('../../helpers');
var fuse  = help.fuse;
var slice = help.slice;
var until = help.until;

var color = require('../../helpers/color');

/**
 * @param {HeaderTheme} theme
 * @param {!Array} header
 * @param {number} limit
 * @param {!Array} spaces
 * @return {string}
 */
module.exports = function lineToString(theme, header, limit, spaces) {

  /** @type {string} */
  var result;
  /** @type {string} */
  var remain;

  result = '';
  until(0, header, function(part, i) {
    if (!part) return;
    remain = slice(part, limit);
    part   = slice(part, 0, limit);
    limit -= part.length;
    part   = is.odd(i) ? color(theme.accent, part) : color(theme, part);
    result = fuse(result, part);
    header[i] = remain;
    return limit;
  });
  return result && fuse(spaces[0], result, spaces[1]);
};
