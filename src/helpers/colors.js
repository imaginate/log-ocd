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
var copy = help.copy;
var cut  = help.cut;
var each = help.each;
var fuse = help.fuse;
var get  = help.get;
var has  = help.has;

var capFirst = require('./cap-first');
var newTheme = require('../settings/style/new-theme');

// see https://github.com/Marak/colors.js
var colors = require('colors/safe');

/**
 * @private
 * @type {!Object<string, function>}
 * @const
 */
var BUILD = {
  'title': buildTitleThemes,
  'row':   buildRowThemes
};

colors.setThemes = setThemes;
module.exports = colors;

/**
 * @private
 * @param {!Style} style
 * @param {string} method
 * @param {!Array=} keys - The keys for each changed property.
 */
function setThemes(style, method, keys) {

  /** @type {!Object} */
  var themes;
  /** @type {function} */
  var build;
  /** @type {!Object} */
  var obj;

  themes = {};
  keys = keys || get.keys(style);
  each(keys, function(key) {
    build = has(BUILD, key) ? BUILD[key] : buildThemes;
    obj = style[key];
    key = method + '.' + key;
    obj = build(key, obj);
    themes = fuse(themes, obj);
  });

  if ( !is.empty(themes) ) colors.setTheme(themes);
}

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
  if (theme.color) result = fuse(result, theme.color);
  if (theme.bg) result = fuse(result, 'bg' + capFirst(theme.bg));
  keys = 'bold, dim, hidden, inverse, italic, reset, strikethrough, underline';
  each(keys, function(key) {
    if ( theme[key] ) result = fuse(result, key);
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
    key = name + '.' + key;
    val = buildThemes(key, val);
    themes = fuse(themes, val);
  });

  return themes;
}

/**
 * @private
 * @param {string} name
 * @param {!StackTitleTheme} theme
 * @return {!Object}
 */
function buildTitleThemes(name, theme) {

  /** @type {!Object} */
  var themes;
  /** @type {!Object} */
  var props;

  themes = {};
  themes[name] = makeTheme(theme);

  props = buildProps(theme);
  name += '.';
  each(theme, function(val, key) {
    if ( !is.obj(val) ) return;
    key = name + key;
    val = buildProps(val, props);
    val = newTheme(val);
    themes[key] = makeTheme(val);
  });

  return themes;
}

/**
 * @private
 * @param {string} name
 * @param {!StackRowTheme} theme
 * @return {!Object}
 */
function buildRowThemes(name, theme) {

  /** @type {!Object} */
  var themes;
  /** @type {!Object} */
  var props;

  themes = {};
  name += '.';
  themes[name + 'odd' ] = makeTheme(theme);
  themes[name + 'even'] = makeTheme(theme.alternate);

  props = {};
  props.odd  = buildProps(theme);
  props.even = buildProps(theme.alternate);
  each(theme, function(val, key) {
    if ( !is.obj(val) || key === 'alternate' ) return;
    val = buildProps(val, props.odd);
    val = newTheme(val);
    themes[name + 'odd.' + key] = makeTheme(val);
    val = buildProps(val, props.even);
    val = newTheme(val);
    themes[name + 'even.' + key] = makeTheme(val);
  });

  return themes;
}

/**
 * @private
 * @param {!Theme} theme
 * @param {!Object=} props
 * @return {!Object}
 */
function buildProps(theme, props) {
  props = copy(props) || {};
  each(theme, function(val, key) {
    if ( !is.obj(val) && val ) props[key] = val;
  });
  return props;
}
