/**
 * -----------------------------------------------------------------------------
 * LOG-OCD: STYLE
 * -----------------------------------------------------------------------------
 * @version 1.0.0-beta.9
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

var help = require('../../helpers');
var amend = help.amend;
var each  = help.each;
var fuse  = help.fuse;
var seal  = help.seal;

var newEmptyObj = require('../../helpers/new-empty-obj');

var CATEGORIES = require('./values/categories');

var newMainTheme = require('./new-main-theme');

/**
 * @param {string} category
 * @param {Object<string, TypeTheme>=} props
 * @return {!Style}
 */
module.exports = function newStyle(category, props) {

  /** @type {!Style} */
  var style;
  /** @type {string} */
  var section;

  category = CATEGORIES[category];
  section = category.section;
  props = props || null;
  style = newEmptyObj('Style');
  each(category.keys, function(key) {
    style = amend(style, key, newMainTheme(section, key), '!object');
  });
  style = seal(style);
  return fuse(style, props);
};
