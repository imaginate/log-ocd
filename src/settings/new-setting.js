/**
 * -----------------------------------------------------------------------------
 * LOG-OCD: SETTINGS NEW-SETTING
 * -----------------------------------------------------------------------------
 * @version 1.0.0
 * @see [log-ocd]{@link https://github.com/imaginate/log-ocd}
 *
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2016 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
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

var help = require('../helpers');
var amend = help.amend;
var each  = help.each;
var seal  = help.seal;

var newEmptyObj = require('../helpers/new-empty-obj');

/**
 * @param {string} method
 * @return {!Setting}
 */
module.exports = function newSetting(method) {

  /** @type {!Setting} */
  var setting;
  /** @type {function} */
  var getDefault;

  setting = newEmptyObj('Setting');
  each('config, format, style', function(key) {
    getDefault = require('./' + key);
    setting = amend(setting, key, getDefault(method), '!object');
  });
  return seal(setting);
};
