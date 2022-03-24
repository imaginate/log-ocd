/**
 * -----------------------------------------------------------------------------
 * LOG-OCD: SETTINGS NEW-SETTING
 * -----------------------------------------------------------------------------
 * @version 1.0.0-beta.10
 * @see [log-ocd]{@link https://github.com/imaginate/log-ocd}
 *
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2022 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
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

var help = require('../helpers');
var amend = help.amend;
var each  = help.each;
var seal  = help.seal;

var newEmptyObj = require('../helpers/new-empty-obj');

/**
 * The properties for each `Setting` as `propName => getDefault` pairs.
 *
 * @type {!Object<string, function>}
 * @const
 */
var PROPS = {
  'config': require('./config'),
  'format': require('./format'),
  'style':  require('./style')
};

/**
 * @param {string} method
 * @return {!Setting}
 */
module.exports = function newSetting(method) {

  /** @type {!Setting} */
  var setting;

  setting = newEmptyObj('Setting');
  each(PROPS, function(getDefault, key) {
    setting = amend(setting, key, getDefault(method), '!object');
  });
  return seal(setting);
};
