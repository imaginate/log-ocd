/**
 * -----------------------------------------------------------------------------
 * LOG-OCD: FORMAT VALUES HELPER - FROM-PROPS
 * -----------------------------------------------------------------------------
 * @version 1.0.0-beta.10
 * @see [log-ocd]{@link https://github.com/imaginate/log-ocd}
 *
 * @author Adam Smith <imagineadamsmith@gmail.com> (https://github.com/imaginate)
 * @copyright 2022 Adam A Smith <imagineadamsmith@gmail.com> (https://github.com/imaginate)
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

var help = require('../../../../helpers');
var copy  = help.copy;
var fuse  = help.fuse;
var remap = help.remap;

/**
 * @param {!Object} base
 * @param {Object=} props
 * @return {!Object}
 */
module.exports = function fromProps(base, props) {
  base = remap(base, function(prop) {
    return copy(prop);
  });
  props = props || null;
  return fuse(base, props);
};
