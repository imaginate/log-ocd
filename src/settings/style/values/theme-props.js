/**
 * -----------------------------------------------------------------------------
 * LOG-OCD: STYLE VALUES - THEME-PROPS
 * -----------------------------------------------------------------------------
 * @version 1.0.0-beta.10
 * @see [log-ocd]{@link https://github.com/imaginate/log-ocd}
 *
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2022 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
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
var each   = help.each;
var freeze = help.freeze;

var newThemeProp = require('./helpers/new-theme-prop');

/** @type {!ThemeProps} */
var props;
/** @type {string} */
var keys;

props = {};

keys = 'color, bg';
each(keys, function(key) {
  props[key] = newThemeProp('');
});

keys = 'bold, dim, hidden, inverse, italic, reset, strikethrough, underline';
each(keys, function(key) {
  props[key] = newThemeProp(false);
});

module.exports = freeze(props, true);
