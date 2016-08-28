/**
 * -----------------------------------------------------------------------------
 * LOG-OCD: CONFIG VALUES - CATEGORIES
 * -----------------------------------------------------------------------------
 * @version 1.0.0-beta.8
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
 *   type: string,
 *   val:  *
 * }} ConfigProp
 *
 * @typedef {Object<string, !ConfigProp>} ConfigProps
 */

/**
 * The `Config` categories.
 *
 * @type {!ConfigProps}
 * @const
 */
module.exports = {
  'log': {
    'logger': { type: 'function', val: console.log },
    'ocdmap': { type: 'boolean',  val: false       },
    'header': { type: 'boolean',  val: false       },
    'style':  { type: 'boolean',  val: true        },
    'stack':  { type: 'boolean',  val: false       },
    'throw':  { type: 'boolean',  val: false       },
    'exit':   { type: 'boolean',  val: false       },
    'msg':    { type: 'boolean',  val: false       }
  },
  'prep': {
    'style':  { type: 'boolean',  val: false       }
  },
  'trace': {
    'logger': { type: 'function', val: console.log },
    'style':  { type: 'boolean',  val: true        },
    'throw':  { type: 'boolean',  val: false       },
    'exit':   { type: 'boolean',  val: false       },
    'root':   { type: 'boolean',  val: true        },
    'title':  { type: 'boolean',  val: true        },
    'event':  { type: 'boolean',  val: true        },
    'file':   { type: 'boolean',  val: false       },
    'module': { type: 'boolean',  val: true        },
    'line':   { type: 'boolean',  val: true        },
    'column': { type: 'boolean',  val: false       }
  }
};
