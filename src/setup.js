/**
 * -----------------------------------------------------------------------------
 * LOG-OCD: SETUP
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

var help = require('./helpers');
var each = help.each;
var fuse = help.fuse;

var capFirst = require('./helpers/cap-first');

var getDefaultSettings = require('./settings');
var log = require('./log');
var logTrace = require('./log/trace');
var toString = require('./to-string');
var set = require('./set');
var reset = require('./reset');

/** @type {number} */
var instCount = 0;

/**
 * @typedef {!{
 *   toString:    function,
 *   log:         function,
 *   pass:        function,
 *   error:       function,
 *   warn:        function,
 *   debug:       function,
 *   fail:        function,
 *   trace:       function,
 *   setConfig:   function,
 *   setFormat:   function,
 *   setStyle:    function,
 *   resetConfig: function,
 *   resetFormat: function,
 *   resetStyle:  function
 * }} LogOCD
 */

/**
 * @return {!LogOCD}
 */
module.exports = function setupLogOCD() {

  /** @type {!Settings} */
  var settings;
  /** @type {!LogOCD} */
  var logocd;
  /** @type {function} */
  var setter;

  settings = getDefaultSettings(++instCount);
  logocd = bind(log, settings, 'log');
  logocd.log = logocd;
  each('pass, error, warn, debug, fail', function(method) {
    logocd[method] = bind(log, settings, method);
  });
  logocd.trace = bind(logTrace, settings, 'trace');
  logocd.toString = bind(toString, settings, 'toString');
  each(logocd, function(method) {
    method = appendSet(method, settings, method);
  });
  logocd = appendSet(logocd, settings);
  return logocd;
};

/**
 * @private
 * @param {function} func
 * @param {Settings} settings
 * @param {string=} method
 * @return {function}
 */
function bind(func, settings, method) {
  return method ? func.bind(settings, method) : func.bind(settings);
}

/**
 * @private
 * @param {function} func
 * @param {Settings} settings
 * @param {string=} method
 * @return {function}
 */
function appendSet(func, settings, method) {

  /** @type {function} */
  var resetter;
  /** @type {function} */
  var setter;

  each('config, format, style', function(setting) {
    setter = set(setting);
    resetter = reset(setting);
    setting = capFirst(setting);
    setting = fuse('set', setting);
    func[setting] = bind(setter, settings, method);
    setting = fuse('re', setting);
    func[setting] = bind(resetter. settings, method);
  });
  return func;
}
