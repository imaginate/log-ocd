/**
 * -----------------------------------------------------------------------------
 * LOG-OCD: FORMAT VALUES - CATEGORIES
 * -----------------------------------------------------------------------------
 * @version 1.0.0-beta.9
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

var help = require('../../../helpers');
var freeze = help.freeze;

var newNaturalNum = require('../../../helpers/new-natural-num');

var fromCategoryBase = require('./helpers/from-category-base');

/**
 * @type {!Object}
 * @const
 */
var CATEGORIES = {
  'prep': fromCategoryBase('type'),
  'log':  fromCategoryBase('type', {
    'linesBefore': { type: 'number', val: 1, setter: newNaturalNum },
    'linesAfter':  { type: 'number', val: 1, setter: newNaturalNum },
    'header':      { type: '!object', make: true },
    'msg':         { type: '!object', make: true }
  }),
  'trace': fromCategoryBase('stack')
};

module.exports = freeze(CATEGORIES, true);
