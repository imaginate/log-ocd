/**
 * -----------------------------------------------------------------------------
 * LOG-OCD: FORMAT NEW-SUB-FORMAT
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
    format = amend(format, key, obj.val, obj.type);
  });
  format = seal(format);
  return fuse(format, props);
};
