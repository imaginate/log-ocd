/**
 * -----------------------------------------------------------------------------
 * LOG-OCD: NEW-TRACE HELPER
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

var help = require('../index');
var amend  = help.amend;
var each   = help.each;
var freeze = help.freeze;
var slice  = help.slice;

var newEmptyObj = require('../new-empty-obj');
var getModule = require('./get-module');
var isNative = require('./is-native');

/**
 * @private
 * @type {!Object}
 * @const
 */
var KEYS = freeze({
  'event':  { type: 'string', make: require('./get-event'),    nat: '' },
  'dir':    { type: '!array', make: require('./get-dirpath'),  nat: [] },
  'file':   { type: 'string', make: require('./get-file'),     nat: '' },
  'line':   { type: 'string', make: require('./get-line'),     nat: '' },
  'column': { type: 'string', make: require('./get-column'),   nat: '' },
  'module': { type: 'string', make: function(){}, nat: '(native core)' }
}, true);

/**
 * @typedef {!{
 *   event:  string,
 *   dir:    !Array,
 *   file:   string,
 *   line:   string,
 *   column: string,
 *   module: string
 * }} Trace
 */

/**
 * @param {string} traceStr
 * @param {!Array<string>=} base
 * @return {!Trace}
 */
module.exports = function newTrace(traceStr, base) {

  /** @type {!Trace} */
  var trace;

  trace = newEmptyObj('Trace');

  if ( isNative(traceStr) ) return nativeTrace(trace);

  each(PARTS, function(obj, key) {
    trace = amend(trace, key, obj.make(traceStr), obj.type);
  });
  trace.module = getModule(traceStr, base, trace);
  return freeze(trace, true);
};

/**
 * @private
 * @param {!Trace} trace
 * @return {!Trace}
 */
function nativeTrace(trace) {
  each(PARTS, function(obj, key) {
    trace = amend(trace, key, slice(obj.nat), obj.type);
  });
  return freeze(trace, true);
}