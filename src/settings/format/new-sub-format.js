/**
 * -----------------------------------------------------------------------------
 * LOG-OCD: FORMAT NEW-SUB-FORMAT
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

var help = require('../../helpers');
var amend = help.amend;
var each  = help.each;
var fuse  = help.fuse;
var seal  = help.seal;

var newEmptyObj = require('../../helpers/new-empty-obj');

var TYPES = require('./values/types');

/**
 * @param {string} type
 * @param {Object<string, (string|number)>=} props
 * @return {!SubFormat}
 */
module.exports = function newSubFormat(type, props) {

  /** @type {!SubFormat} */
  var format;

  props = props || null;
  format = newEmptyObj(type + 'Format');
  each(TYPES[type], function(obj, key) {
    format = obj.setter
      ? amend(format, key, obj.val, obj.type, obj.setter)
      : amend(format, key, obj.val, obj.type);
  });
  format = seal(format);
  return fuse(format, props);
};
