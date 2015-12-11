/**
 * -----------------------------------------------------------------------------
 * LOG-OCD: STYLE DEFAULTS
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
var copy   = help.copy;
var each   = help.each;
var freeze = help.freeze;
var fuse   = help.fuse;
var has    = help.has;
var seal   = help.seal;

var newEmptyObj = require('../helpers/new-empty-obj');

////////////////////////////////////////////////////////////////////////////////
// DEFAULT VALUES
////////////////////////////////////////////////////////////////////////////////

/**
 * @private
 * @type {!Object<string, !{ category: string, makeProps: ?function }>}
 * @const
 */
var METHODS = freeze({
  'toString': { category: 'prep',  makeProps: null },
  'log':      { category: 'log',   makeProps: null },
  'pass':     { category: 'log',   makeProps: function() {
    return {
      header: newTypeTheme('header', {
        bg: 'green', accent: newTheme({ color: 'yellow', bg: 'green' })
      })
    };
  } },
  'error': { category: 'log', makeProps: function() {
    return {
      header: newTypeTheme('header', {
        bg: 'red', accent: newTheme({ color: 'yellow', bg: 'red' })
      })
    };
  } },
  'warn': { category: 'log', makeProps: function() {
    return {
      header: newTypeTheme('header', {
        bg: 'yellow', accent: newTheme({ color: 'blue', bg: 'yellow' })
      })
    };
  } },
  'debug': { category: 'log', makeProps: function() {
    return {
      header: newTypeTheme('header', {
        bg: 'blue', accent: newTheme({ color: 'magenta', bg: 'blue' })
      })
    };
  } },
  'fail': { category: 'log', makeProps: function() {
    return {
      msg: newTypeTheme('msg', {
        color: 'red', accent: newTheme({ color: 'yellow' })
      })
    };
  } },
  'trace': { category: 'trace', makeProps: null }
}, true);

/**
 * @private
 * @type {string}
 * @const
 */
var TYPES = 'ocdmap, null, undefined, boolean, nan, string, number, ' +
            'regexp, array, args, object, function, element, document';

/**
 * @private
 * @type {!Object<string, string>}
 * @const
 */
var CATEGORY_KEYS = freeze({
  'log':   'header, msg' + TYPES,
  'prep':  TYPES,
  'trace': ''
});

/**
 * @private
 * @type {!Object}
 * @const
 */
var THEME_BASE = freeze({
  'color':         { type: 'string',  val: ''    },
  'bg':            { type: 'string',  val: ''    },
  'bold':          { type: 'boolean', val: false },
  'dim':           { type: 'boolean', val: false },
  'hidden':        { type: 'boolean', val: false },
  'inverse':       { type: 'boolean', val: false },
  'italic':        { type: 'boolean', val: false },
  'reset':         { type: 'boolean', val: false },
  'strikethrough': { type: 'boolean', val: false },
  'underline':     { type: 'boolean', val: false }
}, true);

/**
 * @private
 * @type {!Object}
 * @const
 */
var THEME_PROPS = freeze({
  'header': fromThemeBase({
    'color':  { type: 'string',  val: 'white' },
    'bg':     { type: 'string',  val: 'blue'  },
    'bold':   { type: 'boolean', val:  true   },
    'accent': { type: '!object', make: true,
      props: { color: 'magenta', bg: 'blue', bold: true }
    }
  }),
  'msg': fromThemeBase({
    'color':  { type: 'string',  val: 'white' },
    'accent': { type: '!object', make: true, props: { color: 'magenta' } }
  }),
  'ocdmap': fromThemeBase({
    'color':     { type: 'string',  val: 'cyan' },
    'delimiter': { type: '!object', make: true, props: { color: 'cyan' } }
  }),
  'null': fromThemeBase({
    'color': { type: 'string', val: 'magenta' }
  }),
  'undefined': fromThemeBase({
    'color': { type: 'string', val: 'magenta' }
  }),
  'boolean': fromThemeBase({
    'color': { type: 'string', val: 'magenta' }
  }),
  'string': fromThemeBase({
    'color':     { type: 'string',  val: 'yellow' },
    'delimiter': { type: '!object', make: true, props: { color: 'red'    } },
    'brackets':  { type: '!object', make: true, props: { color: 'yellow' } }
  }),
  'number': fromThemeBase({
    'color':      { type: 'string',  val: 'magenta' },
    'identifier': { type: '!object', make: true, props: { color: 'magenta' } },
    'delimiter':  { type: '!object', make: true, props: { color: 'magenta' } }
  }),
  'nan': fromThemeBase({
    'color': { type: 'string', val: 'magenta' }
  }),
  'regexp': fromThemeBase({
    'color':      { type: 'string',  val: 'white' },
    'identifier': { type: '!object', make: true, props: { color: 'yellow' } },
    'brackets':   { type: '!object', make: true, props: { color: 'yellow' } },
    'flags':      { type: '!object', make: true, props: { color: 'yellow' } }
  }),
  'array': fromThemeBase({
    'color':      { type: 'string',  val: 'white' },
    'identifier': { type: '!object', make: true, props: { color: 'white' } },
    'delimiter':  { type: '!object', make: true, props: { color: 'white' } },
    'brackets':   { type: '!object', make: true, props: { color: 'white' } }
  }),
  'args': fromThemeBase({
    'color':      { type: 'string',  val: 'white' },
    'identifier': { type: '!object', make: true, props: { color: 'white' } },
    'delimiter':  { type: '!object', make: true, props: { color: 'white' } },
    'brackets':   { type: '!object', make: true, props: { color: 'white' } }
  }),
  'object': fromThemeBase({
    'color':      { type: 'string',  val: 'white' },
    'identifier': { type: '!object', make: true, props: { color: 'white' } },
    'delimiter':  { type: '!object', make: true, props: { color: 'white' } },
    'brackets':   { type: '!object', make: true, props: { color: 'white' } }
  }),
  'function': fromThemeBase({
    'color':      { type: 'string',  val: 'white' },
    'identifier': { type: '!object', make: true, props: { color: 'white' } },
    'delimiter':  { type: '!object', make: true, props: { color: 'white' } },
    'brackets':   { type: '!object', make: true, props: { color: 'white' } }
  }),
  'element': fromThemeBase({
    'color':      { type: 'string',  val: 'white' },
    'identifier': { type: '!object', make: true, props: { color: 'white' } },
    'delimiter':  { type: '!object', make: true, props: { color: 'white' } },
    'brackets':   { type: '!object', make: true, props: { color: 'white' } }
  }),
  'document': fromThemeBase({
    'color':      { type: 'string',  val: 'white' },
    'identifier': { type: '!object', make: true, props: { color: 'white' } },
    'delimiter':  { type: '!object', make: true, props: { color: 'white' } },
    'brackets':   { type: '!object', make: true, props: { color: 'white' } }
  })
}, true);

////////////////////////////////////////////////////////////////////////////////
// THEME TYPEDEFS
////////////////////////////////////////////////////////////////////////////////

/**
 * @typedef {!{
 *   __TYPE:        string,
 *   color:         string,
 *   bg:            string,
 *   bold:          boolean,
 *   dim:           boolean,
 *   hidden:        boolean,
 *   inverse:       boolean,
 *   italic:        boolean,
 *   reset:         boolean,
 *   strikethrough: boolean,
 *   underline:     boolean
 * }} Theme
 */

/**
 * @typedef {!{
 *   __TYPE:        string,
 *   accent:        Theme,
 *   color:         string,
 *   bg:            string,
 *   bold:          boolean,
 *   dim:           boolean,
 *   hidden:        boolean,
 *   inverse:       boolean,
 *   italic:        boolean,
 *   reset:         boolean,
 *   strikethrough: boolean,
 *   underline:     boolean
 * }} HeaderTheme
 */

/**
 * @typedef {!{
 *   __TYPE:        string,
 *   accent:        Theme,
 *   color:         string,
 *   bg:            string,
 *   bold:          boolean,
 *   dim:           boolean,
 *   hidden:        boolean,
 *   inverse:       boolean,
 *   italic:        boolean,
 *   reset:         boolean,
 *   strikethrough: boolean,
 *   underline:     boolean
 * }} MsgTheme
 */

/**
 * @typedef {!{
 *   __TYPE:        string,
 *   delimiter:     Theme,
 *   color:         string,
 *   bg:            string,
 *   bold:          boolean,
 *   dim:           boolean,
 *   hidden:        boolean,
 *   inverse:       boolean,
 *   italic:        boolean,
 *   reset:         boolean,
 *   strikethrough: boolean,
 *   underline:     boolean
 * }} OcdMapTheme
 */

/**
 * @typedef {!{
 *   __TYPE:        string,
 *   delimiter:     Theme,
 *   brackets:      Theme,
 *   color:         string,
 *   bg:            string,
 *   bold:          boolean,
 *   dim:           boolean,
 *   hidden:        boolean,
 *   inverse:       boolean,
 *   italic:        boolean,
 *   reset:         boolean,
 *   strikethrough: boolean,
 *   underline:     boolean
 * }} StringTheme
 */

/**
 * @typedef {!{
 *   __TYPE:        string,
 *   identifier:    Theme,
 *   delimiter:     Theme,
 *   color:         string,
 *   bg:            string,
 *   bold:          boolean,
 *   dim:           boolean,
 *   hidden:        boolean,
 *   inverse:       boolean,
 *   italic:        boolean,
 *   reset:         boolean,
 *   strikethrough: boolean,
 *   underline:     boolean
 * }} NumberTheme
 */

/**
 * @typedef {!{
 *   __TYPE:        string,
 *   identifier:    Theme,
 *   brackets:      Theme,
 *   flags:         Theme,
 *   color:         string,
 *   bg:            string,
 *   bold:          boolean,
 *   dim:           boolean,
 *   hidden:        boolean,
 *   inverse:       boolean,
 *   italic:        boolean,
 *   reset:         boolean,
 *   strikethrough: boolean,
 *   underline:     boolean
 * }} RegExpTheme
 */

/**
 * @typedef {!{
 *   __TYPE:        string,
 *   identifier:    Theme,
 *   delimiter:     Theme,
 *   brackets:      Theme,
 *   color:         string,
 *   bg:            string,
 *   bold:          boolean,
 *   dim:           boolean,
 *   hidden:        boolean,
 *   inverse:       boolean,
 *   italic:        boolean,
 *   reset:         boolean,
 *   strikethrough: boolean,
 *   underline:     boolean
 * }} ArrayTheme
 */

/**
 * @typedef {!{
 *   __TYPE:        string,
 *   identifier:    Theme,
 *   delimiter:     Theme,
 *   brackets:      Theme,
 *   color:         string,
 *   bg:            string,
 *   bold:          boolean,
 *   dim:           boolean,
 *   hidden:        boolean,
 *   inverse:       boolean,
 *   italic:        boolean,
 *   reset:         boolean,
 *   strikethrough: boolean,
 *   underline:     boolean
 * }} ObjectTheme
 */

/**
 * @typedef {!(
 *   Theme|
 *   HeaderTheme|
 *   MsgTheme|
 *   OcdMapTheme|
 *   StringTheme|
 *   NumberTheme|
 *   RegExpTheme|
 *   ArrayTheme|
 *   ObjectTheme
 * )} TypeTheme
 */

////////////////////////////////////////////////////////////////////////////////
// THEME FACTORY METHODS
////////////////////////////////////////////////////////////////////////////////

/**
 * @private
 * @param {Object=} props
 * @return {!Object}
 */
function fromThemeBase(props) {

  /** @type {!Object} */
  var base;

  props = props || null;
  base = copy(THEME_BASE);
  base = fuse(base, props);
  return freeze(base, true);
}

/**
 * @private
 * @param {Object<string, (string|boolean)>=} props
 * @return {!Theme}
 */
function newTheme(props) {

  /** @type {!Theme} */
  var theme;

  props = props || null;
  theme = newEmptyObj('Theme');
  each(THEME_BASE, function(obj, key) {
    theme = amend(theme, key, obj.val, obj.type);
  });
  theme = seal(theme);
  return fuse(theme, props);
}

/**
 * @private
 * @param {string} type
 * @param {Object<string, (string|boolean|Theme)>=} props
 * @return {!TypeTheme}
 */
function newTypeTheme(type, props) {

  /** @type {!TypeTheme} */
  var theme;
  /** @type {*} */
  var val;

  props = props || null;
  theme = newEmptyObj(type + 'Theme');
  each(THEME_PROPS[type], function(obj, key) {
    val = obj.make ? newTheme(obj.props) : obj.val;
    theme = amend(theme, key, val, obj.type);
  });
  theme = seal(theme);
  return fuse(theme, props);
}

////////////////////////////////////////////////////////////////////////////////
// STYLE TYPEDEFS
////////////////////////////////////////////////////////////////////////////////

/**
 * @typedef {!{
 *   __TYPE:    string,
 *   header:    HeaderTheme,
 *   msg:       MsgTheme,
 *   ocdmap:    OcdMapTheme,
 *   null:      Theme,
 *   undefined: Theme,
 *   boolean:   Theme,
 *   nan:       Theme,
 *   string:    StringTheme,
 *   number:    NumberTheme,
 *   regexp:    RegExpTheme,
 *   array:     ArrayTheme,
 *   args:      ArrayTheme,
 *   object:    ObjectTheme,
 *   function:  ObjectTheme,
 *   element:   ObjectTheme,
 *   document:  ObjectTheme
 * }} LogStyle
 */

/**
 * @typedef {!{
 *   __TYPE:    string,
 *   ocdmap:    OcdMapTheme,
 *   null:      Theme,
 *   undefined: Theme,
 *   boolean:   Theme,
 *   nan:       Theme,
 *   string:    StringTheme,
 *   number:    NumberTheme,
 *   regexp:    RegExpTheme,
 *   array:     ArrayTheme,
 *   args:      ArrayTheme,
 *   object:    ObjectTheme,
 *   function:  ObjectTheme,
 *   element:   ObjectTheme,
 *   document:  ObjectTheme
 * }} PrepStyle
 */

/**
 * @typedef {!{
 *   __TYPE: string
 * }} TraceStyle
 */

/**
 * @typedef {!(LogStyle|PrepStyle|TraceStyle)} Style
 */

////////////////////////////////////////////////////////////////////////////////
// STYLE FACTORY METHODS
////////////////////////////////////////////////////////////////////////////////

/**
 * @private
 * @param {string} category
 * @param {Object<string, TypeTheme>=} props
 * @return {!Style}
 */
function newStyle(category, props) {

  /** @type {!Style} */
  var style;
  /** @type {*} */
  var val;

  props = props || null;
  style = newEmptyObj('Style');
  each(CATEGORY_KEYS[category], function(key) {
    style = amend(style, key, newTypeTheme(key), '!object');
  });
  style = seal(style);
  return fuse(style, props);
}

////////////////////////////////////////////////////////////////////////////////
// EXPORTS
////////////////////////////////////////////////////////////////////////////////

/**
 * @private
 * @param {string} method
 * @return {!Style}
 */
module.exports = function getDefaultStyle(method) {

  /** @type {Object} */
  var props;

  method = METHODS[method];
  props = method.makeProps && method.makeProps();
  return newStyle(method.category, props);
};
