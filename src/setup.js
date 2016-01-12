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

var newSettings = require('./settings');

var LOG   = require('./methods/log');
var SET   = require('./methods/set');
var RESET = require('./methods/reset');

var SETTERS = {
  'config': 'setConfig',
  'format': 'setFormat',
  'style':  'setStyle'
};

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

var METHODS = {
  'toString': require('./methods/to-string'),
  'log':      LOG,
  'pass':     LOG,
  'error':    LOG,
  'warn':     LOG,
  'debug':    LOG,
  'fail':     LOG,
  'trace':    require('./methods/trace')
};

/** @type {number} */
var instCount = 0;

/**
 * Creates a new log-ocd instance.
 * @return {LogOCD}
 */
module.exports = function setupLogOCD() {

  /** @type {Settings} */
  var settings;
  /** @type {LogOCD} */
  var logocd;
  /** @type {function} */
  var setter;

  settings = newSettings( ++instCount );
  logocd = bind(LOG, settings, 'log');
  logocd = addSetters(logocd, settings);
  each(METHODS, function(func, method) {
    func = bind(func, settings, method);
    logocd[method] = addSetters(func, settings, method);
  });
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
 * @param {string} type
 * @param {string=} method
 * @return {function}
 */
function bindType(func, settings, type, method) {
  return method ? func.bind(settings, type, method) : func.bind(settings, type);
}

/**
 * @private
 * @param {function} func
 * @param {Settings} settings
 * @param {string=} method
 * @return {function}
 */
function addSetters(func, settings, method) {

  each(SETTERS, function(key, type) {
    func[key] = bindType(SET, settings, type, method);
    key = fuse('re', key);
    func[key] = bindType(RESET, settings, type, method);
  });
  return func;
}
