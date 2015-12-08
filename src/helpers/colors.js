/**
 * -----------------------------------------------------------------------------
 * LOG-OCD: COLORS HELPER
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

var help = require('./index');
var is   = help.is;
var each = help.each;
var fuse = help.fuse;
var has  = help.has;

// see https://github.com/Marak/colors.js
var colors = require('colors/safe');

////////////////////////////////////////////////////////////////////////////////
// SET THEMES
////////////////////////////////////////////////////////////////////////////////

// stacktrace themes
colors.setTheme({
  ostack:   'white',
  estack: [ 'white', 'bgBlue' ]
};

colors.setThemes = setThemes;

////////////////////////////////////////////////////////////////////////////////
// SETUP METHODS
////////////////////////////////////////////////////////////////////////////////

/**
 * @private
 * @param {!Theme} theme
 * @return {!Array}
 */
function makeTheme(theme) {

  /** @type {!Array} */
  var result;
  /** @type {string} */
  var keys;

  result = [];
  keys = 'color, bg';
  each(keys, function(key) {
    theme[key] && result.push( theme[key] );
  });
  keys = 'bold, dim, hidden, inverse, italic, reset, strikethrough, underline';
  each(keys, function(key) {
    theme[key] && result.push(key);
  });
  return result;
}

/**
 * @private
 * @param {string} name
 * @param {!Object} obj
 * @return {!Object}
 */
function buildThemes(name, obj) {

  /** @type {!Object} */
  var themes;

  themes = {};

  if ( is.theme(obj) ) themes[name] = makeTheme(obj);

  each(obj, function(val, key) {
    if ( !is.obj(val) ) return;
    val = buildThemes(name + key, val);
    themes = fuse(themes, val);
  });

  return themes;
}

/**
 * @private
 * @param {string} name
 * @param {!Object} obj
 */
function setThemes(name, obj) {

  /** @type {!Object} */
  var themes;

  themes = buildThemes(name, obj);
  if ( !is.empty(themes) ) colors.setTheme(themes);
}

////////////////////////////////////////////////////////////////////////////////
// EXPORTS
////////////////////////////////////////////////////////////////////////////////

module.exports = colors;
