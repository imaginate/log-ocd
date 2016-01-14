/**
 * -----------------------------------------------------------------------------
 * LOG-OCD: CONFIG VALUES - METHODS
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

var freeze = require('../../../helpers').freeze;

/**
 * @typedef {!{
 *   category: string,
 *   trueKeys: string
 * }} ConfigDefault
 *
 * @typedef {!Object<string, ConfigDefault>} ConfigDefaults
 */

/**
 * @type {ConfigDefaults}
 * @const
 */
var METHODS = {
  'toString': { category: 'prep',  trueKeys: ''                          },
  'log':      { category: 'log',   trueKeys: ''                          },
  'pass':     { category: 'log',   trueKeys: 'header'                    },
  'error':    { category: 'log',   trueKeys: 'header, stack, throw, msg' },
  'warn':     { category: 'log',   trueKeys: 'header, msg'               },
  'debug':    { category: 'log',   trueKeys: 'header'                    },
  'fail':     { category: 'log',   trueKeys: 'header'                    },
  'trace':    { category: 'trace', trueKeys: ''                          }
};

module.exports = freeze(METHODS, true);
