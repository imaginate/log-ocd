/**
 * -----------------------------------------------------------------------------
 * LOG-OCD: CONFIG NEW-CONFIG
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
var seal  = help.seal;

var newEmptyObj = require('../../helpers/new-empty-obj');

var CATEGORIES = require('./values/categories');

/**
 * @param {string} category
 * @param {string} trueKeys
 * @return {Config}
 */
module.exports = function newConfig(category, trueKeys) {

  /** @type {!Config} */
  var config;

  config = newEmptyObj('Config');
  each(CATEGORIES[category], function(obj, key) {
    config = amend(config, key, obj.val, obj.type);
  });
  config = seal(config);
  trueKeys && each(trueKeys, function(key) {
    config[key] = true;
  });
  return config;
};
