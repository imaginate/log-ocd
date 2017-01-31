/**
 * -----------------------------------------------------------------------------
 * LOG-OCD: SETTINGS NEW-SETTINGS
 * -----------------------------------------------------------------------------
 * @version 1.0.0-beta.8
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

var help = require('../helpers');
var amend = help.amend;
var each  = help.each;
var seal  = help.seal;

var newEmptyObj = require('../helpers/new-empty-obj');
var newNaturalNum = require('../helpers/new-natural-num');

var METHODS = require('./values/methods');

var newSetting = require('./new-setting');

/**
 * @param {number} inst
 * @return {!Settings}
 */
module.exports = function newSettings(inst) {

  /** @type {!Settings} */
  var settings;
  /** @type {function} */
  var setter;
  /** @type {!Object} */
  var props;
  /** @type {!Object} */
  var desc;

  settings = newEmptyObj('Settings');

  // set private instance prop
  desc = {
    configurable: false,
    enumerable:   false,
    writable:     false
  };
  settings = amend(settings, '__INST', inst, desc);

  // set private count props
  props = {
    '__maxLen': -1,
    '__keyLen': 0,
    '__indent': 0
  };
  desc = { enumerable: false };
  each(props, function(val, key) {
    setter = val
      ? newNaturalNum.build(val)
      : newNaturalNum;
    settings = amend(settings, key, val, desc, 'number', setter);
  });

  // set private ocdmap prop
  settings = amend(settings, '__ocdmap', true, desc, 'boolean');

  // set public props
  desc = { writable: false };
  each(METHODS, function(method) {
    settings = amend(settings, method, newSetting(method), desc);
  });

  return seal(settings);
};
