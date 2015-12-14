/**
 * -----------------------------------------------------------------------------
 * LOG-OCD: FORMAT VALUES HELPER - FROM-CATEGORY-BASE
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

var help = require('../../../../helpers');
var copy   = help.copy;
var freeze = help.freeze;
var seal   = help.seal;

var CATEGORY_BASE = require('../category-base');

/**
 * @param {string} type
 * @param {Object=} props
 * @return {!Object}
 */
module.exports = function fromCategoryBase(type, props) {

  /** @type {!Object} */
  var base;

  props = props || null;
  base = copy(CATEGORY_BASE[type], true);
  base = fuse(base, props);
  return freeze(base, true);
};