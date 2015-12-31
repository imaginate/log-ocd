/**
 * -----------------------------------------------------------------------------
 * LOG-OCD: FORMAT VALUES - CATEGORY-BASE
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

var freeze = require('../../../helpers').freeze;

/**
 * @type {!Object}
 * @const
 */
var BASE = {
  'type': {
    'lineLimit': { type: 'number',  val: -1          },
    'undefined': { type: 'string',  val: 'undefined' },
    'null':      { type: 'string',  val: 'null'      },
    'nan':       { type: 'string',  val: 'nan'       },
    'ocdmap':    { type: '!object', make: true       },
    'string':    { type: '!object', make: true       },
    'regexp':    { type: '!object', make: true       },
    'object':    { type: '!object', make: true       },
    'array':     { type: '!object', make: true       },
    'args':      { type: '!object', make: true       },
    'function':  { type: '!object', make: true       },
    'element':   { type: '!object', make: true       },
    'document':  { type: '!object', make: true       }
  },
  'stack': {
    '__maxLen':    { type: 'number',  val: -1    },
    'linesBefore': { type: 'number',  val: 1     },
    'linesAfter':  { type: 'number',  val: 1     },
    'root':        { type: '!object', make: true },
    'row':         { type: '!object', make: true },
    'event':       { type: '!object', make: true },
    'file':        { type: '!object', make: true },
    'module':      { type: '!object', make: true }
  }
};

module.exports = freeze(BASE, true);
