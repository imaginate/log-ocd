/**
 * -----------------------------------------------------------------------------
 * LOG-OCD: FORMAT VALUES - METHODS
 * -----------------------------------------------------------------------------
 * @version 1.0.0-beta.7
 * @see [log-ocd]{@link https://github.com/imaginate/log-ocd}
 *
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2016 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
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

/**
 * @typedef {{
 *   category: string,
 *   mkProps: ?function
 * }} FormatDefault
 *
 * @typedef {Object<string, !FormatDefault>} FormatDefaults
 */

/**
 * @type {!FormatDefaults}
 * @const
 */
module.exports = {
  'toString': { category: 'prep',  mkProps: null },
  'log':      { category: 'log',   mkProps: null },
  'pass':     { category: 'log',   mkProps: null },
  'error':    { category: 'log',   mkProps: null },
  'warn':     { category: 'log',   mkProps: null },
  'debug':    { category: 'log',   mkProps: null },
  'fail':     { category: 'log',   mkProps: null },
  'trace':    { category: 'trace', mkProps: null }
};
