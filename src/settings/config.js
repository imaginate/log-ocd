/**
 * -----------------------------------------------------------------------------
 * LOG-OCD: CONFIG DEFAULTS
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

var help = require('../helpers');
var amend  = help.amend;
var each   = help.each;
var freeze = help.freeze;
var seal   = help.seal;

var newEmptyObj = require('../helpers/new-empty-obj');

////////////////////////////////////////////////////////////////////////////////
// DEFAULT VALUES
////////////////////////////////////////////////////////////////////////////////

/**
 * @private
 * @type {!Object<string, !{ category: string, trueKeys: string }>}
 * @const
 */
var METHODS = freeze({
  'toString': { category: 'prep',  trueKeys: ''                          },
  'log':      { category: 'log',   trueKeys: ''                          },
  'pass':     { category: 'log',   trueKeys: 'header'                    },
  'error':    { category: 'log',   trueKeys: 'header, stack, throw, msg' },
  'warn':     { category: 'log',   trueKeys: 'header, msg'               },
  'debug':    { category: 'log',   trueKeys: 'header'                    },
  'fail':     { category: 'log',   trueKeys: 'header'                    },
  'trace':    { category: 'trace', trueKeys: ''                          }
}, true);

/**
 * @private
 * @type {!Object}
 * @const
 */
var PROPS = freeze({
  'log': {
    'logger': { type: 'function', val: console.log },
    'ocdmap': { type: 'boolean',  val: false       },
    'header': { type: 'boolean',  val: false       },
    'stack':  { type: 'boolean',  val: false       },
    'throw':  { type: 'boolean',  val: false       },
    'exit':   { type: 'boolean',  val: false       },
    'msg':    { type: 'boolean',  val: false       }
  },
  'prep': {
    'style':  { type: 'boolean',  val: false }
  },
  'trace': {
    'logger': { type: 'function', val: console.log },
    'throw':  { type: 'boolean',  val: false       },
    'exit':   { type: 'boolean',  val: false       },
    'root':   { type: 'boolean',  val: true        },
    'title':  { type: 'boolean',  val: true        },
    'event':  { type: 'boolean',  val: true        },
    'file':   { type: 'boolean',  val: false       },
    'module': { type: 'boolean',  val: true        },
    'line':   { type: 'boolean',  val: true        },
    'column': { type: 'boolean',  val: true        }
  }
}, true);

////////////////////////////////////////////////////////////////////////////////
// CONFIG TYPEDEFS
////////////////////////////////////////////////////////////////////////////////

/**
 * @typedef {!{
 *   __TYPE: string,
 *   logger: function,
 *   ocdmap: boolean,
 *   header: boolean,
 *   stack:  boolean,
 *   throw:  boolean,
 *   exit:   boolean,
 *   msg:    boolean
 * }} LogConfig
 */

/**
 * @typedef {!{
 *   __TYPE: string,
 *   style:  boolean
 * }} PrepConfig
 */

/**
 * @typedef {!{
 *   __TYPE: string,
 *   logger: function,
 *   throw:  boolean,
 *   exit:   boolean,
 *   root:   boolean,
 *   title:  boolean,
 *   event:  boolean,
 *   file:   boolean,
 *   module: boolean,
 *   line:   boolean,
 *   column: boolean
 * }} TraceConfig
 */

/**
 * @typedef {!(LogConfig|TraceConfig|PrepConfig)} Config
 */

////////////////////////////////////////////////////////////////////////////////
// FACTORY METHODS
////////////////////////////////////////////////////////////////////////////////

/**
 * @private
 * @param {string} category
 * @param {string} trueKeys
 * @return {!Config}
 */
function newConfig(category, trueKeys) {

  /** @type {!Config} */
  var config;

  config = newEmptyObj('Config');
  each(PROPS[category], function(obj, key) {
    config = amend(config, key, obj.val, obj.type);
  });
  format = seal(format);
  trueKeys && each(trueKeys, function(key) {
    config[key] = true;
  });
  return config;
}

////////////////////////////////////////////////////////////////////////////////
// EXPORTS
////////////////////////////////////////////////////////////////////////////////

/**
 * @private
 * @param {string} method
 * @return {!Config}
 */
module.exports = function getDefaultConfig(method) {
  method = METHODS[method];
  return newConfig(method.category, method.trueKeys);
};
