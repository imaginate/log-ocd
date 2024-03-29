/**
 * -----------------------------------------------------------------------------
 * LOG-OCD: FORMAT VALUES - CATEGORY-BASE
 * -----------------------------------------------------------------------------
 * @version 1.0.0-beta.11
 * @see [log-ocd]{@link https://github.com/imaginate/log-ocd}
 *
 * @author Adam Smith <imagineadamsmith@gmail.com> (https://github.com/imaginate)
 * @copyright 2022 Adam A Smith <imagineadamsmith@gmail.com> (https://github.com/imaginate)
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

var freeze = require('../../../helpers').freeze;

var newNaturalNum = require('../../../helpers/new-natural-num');

/**
 * @type {!Object}
 * @const
 */
var CATEGORY_BASE = {
  'type': {
    'lineLimit': { type: 'number', val: 0, setter: newNaturalNum },
    'undefined': { type: 'string', val: 'undefined' },
    'null':      { type: 'string', val: 'null'      },
    'nan':       { type: 'string', val: 'nan'       },
    'ocdmap':    { type: '!object', make: true },
    'string':    { type: '!object', make: true },
    'regexp':    { type: '!object', make: true },
    'object':    { type: '!object', make: true },
    'array':     { type: '!object', make: true },
    'args':      { type: '!object', make: true },
    'function':  { type: '!object', make: true },
    'element':   { type: '!object', make: true },
    'document':  { type: '!object', make: true }
  },
  'stack': {
    'linesBefore': { type: 'number', val: 1, setter: newNaturalNum },
    'linesAfter':  { type: 'number', val: 1, setter: newNaturalNum },
    'root':        { type: '!object', make: true },
    'row':         { type: '!object', make: true },
    'event':       { type: '!object', make: true },
    'file':        { type: '!object', make: true },
    'module':      { type: '!object', make: true },
    'line':        { type: '!object', make: true },
    'column':      { type: '!object', make: true }
  }
};

module.exports = freeze(CATEGORY_BASE, true);
