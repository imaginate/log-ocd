/**
 * -----------------------------------------------------------------------------
 * LOG-OCD: FORMAT NEW-FORMAT
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

var newSubFormat = require('./new-sub-format');

/**
 * @param {string} category
 * @param {Object<string, (string|number|SubFormat)>=} props
 * @return {!Format}
 */
module.exports = function newFormat(category, props) {

  /** @type {!Format} */
  var format;
  /** @type {*} */
  var val;

  props = props || null;

  format = newEmptyObj('Format');

  each(CATEGORIES[category], function(obj, key) {
    val = obj.make
      ? newSubFormat(key)
      : obj.val;
    format = obj.setter
      ? amend(format, key, val, obj.type, obj.setter)
      : amend(format, key, val, obj.type);
  });

  format = seal(format);
  return fuse(format, props);
};
