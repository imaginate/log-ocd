/**
 * -----------------------------------------------------------------------------
 * LOG-OCD: STYLE VALUES - CATEGORIES
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
 *   section: string,
 *   keys:    string
 * }} StyleCategory
 */

/**
 * @private
 * @type {string}
 * @const
 */
var DATA_TYPES = 'ocdmap, null, undefined, boolean, nan, string, number, ' +
                 'regexp, array, args, object, function, element, document';

/**
 * @type {!Object<string, StyleCategory>}
 * @const
 */
var CATEGORIES = {
  'log':   { section: 'type',  keys: 'header, msg, ' + DATA_TYPES },
  'prep':  { section: 'type',  keys: DATA_TYPES                   },
  'trace': { section: 'stack', keys: 'root, title, row'           }
};

module.exports = freeze(CATEGORIES, true);
