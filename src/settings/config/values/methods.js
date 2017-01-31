/**
 * -----------------------------------------------------------------------------
 * LOG-OCD: CONFIG VALUES - METHODS
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

/**
 * @typedef {{
 *   category: string,
 *   trueKeys: string
 * }} ConfigDefault
 *
 * @typedef {Object<string, !ConfigDefault>} ConfigDefaults
 */

/**
 * The category for each method, and its boolean properties with `true` default
 *   values. See the category values for all properties and defaults.
 *
 * @type {!ConfigDefaults}
 * @const
 */
module.exports = {
  'toString': { category: 'prep',  trueKeys: ''                          },
  'get':      { category: 'log',   trueKeys: 'header'                    },
  'log':      { category: 'log',   trueKeys: ''                          },
  'pass':     { category: 'log',   trueKeys: 'header'                    },
  'error':    { category: 'log',   trueKeys: 'header, stack, throw, msg' },
  'warn':     { category: 'log',   trueKeys: 'header, msg'               },
  'debug':    { category: 'log',   trueKeys: 'header'                    },
  'fail':     { category: 'log',   trueKeys: 'header'                    },
  'trace':    { category: 'trace', trueKeys: ''                          }
};
