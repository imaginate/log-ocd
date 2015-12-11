/**
 * -----------------------------------------------------------------------------
 * LOG-OCD: FORMAT DEFAULTS
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
var remap  = help.remap;
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
  'toString': { category: 'prep',  makeProps: null          },
  'log':      { category: 'log',   makeProps: null          },
  'pass':     { category: 'log',   makeProps: null          },
  'error':    { category: 'log',   makeProps: null          },
  'warn':     { category: 'log',   makeProps: null          },
  'debug':    { category: 'log',   makeProps: null          },
  'fail':     { category: 'log',   makeProps: makeFailProps },
  'trace':    { category: 'trace', makeProps: null          }
}, true);

/**
 * @private
 * @return {!Object}
 */
function makeFailProps() {
  return {
    msg: newTypeFormat('msg', {
      bullet: '',
      indent: 0
    })
  };
}

/**
 * @private
 * @type {!Object}
 * @const
 */
var TYPE_BASE = freeze({
  'header': {
    'spaceBefore': { type: 'number', val: 1   },
    'spaceAfter':  { type: 'number', val: 6   },
    'accentMark':  { type: 'string', val: '`' },
    'lineLimit':   { type: 'number', val: 50  }
  },
  'msg': {
    'accentMark': { type: 'string', val: '`' },
    'lineLimit':  { type: 'number', val: 50  },
    'bullet':     { type: 'string', val: '-' },
    'indent':     { type: 'number', val: 2   }
  },
  'ocdmap': {
    'spaceBefore': { type: 'number', val: 0   },
    'spaceAfter':  { type: 'number', val: 0   },
    'delimiter':   { type: 'string', val: ':' }
  },
  'string': {
    'brackets': { type: 'string', val: '"' }
  },
  'regexp': {
    'identifier': { type: 'string', val: ''  },
    'brackets':   { type: 'string', val: '/' }
  },
  'array': {
    'identifier': { type: 'string', val: ''   },
    'delimiter':  { type: 'string', val: ','  },
    'brackets':   { type: 'string', val: '[]' },
    'indent':     { type: 'number', val: 2    }
  },
  'object': {
    'identifier': { type: 'string', val: ''   },
    'delimiter':  { type: 'string', val: ','  },
    'brackets':   { type: 'string', val: '{}' },
    'indent':     { type: 'number', val: 2    }
  }
}, true);

/**
 * @private
 * @type {!Object}
 * @const
 */
var TYPE_PROPS = freeze(remap({
  'header':   { base: 'header', props: null },
  'msg':      { base: 'msg',    props: null },
  'ocdmap':   { base: 'ocdmap', props: null },
  'string':   { base: 'string', props: null },
  'regexp':   { base: 'regexp', props: null },
  'array':    { base: 'array',  props: null },
  'args':     { base: 'array',  props: { identifier: '[Arguments] '   } },
  'object':   { base: 'object', props: null },
  'function': { base: 'object', props: { identifier: '[Function] '    } },
  'element':  { base: 'object', props: { identifier: '[DomElement] '  } },
  'document': { base: 'object', props: { identifier: '[DomDocument] ' } }
}, function(obj) {
  return fromTypeBase(obj.base, obj.props);
}, true);

/**
 * @private
 * @type {!Object}
 * @const
 */
var CATEGORY_BASE = freeze({
  'lineLimit': { type: 'number',  val: 50          },
  'undefined': { type: 'string',  val: 'undefined' },
  'null':      { type: 'string',  val: 'null'      },
  'nan':       { type: 'string',  val: 'nan'       },
  'ocdmap':    { type: '!object', makeType: true   },
  'string':    { type: '!object', makeType: true   },
  'regexp':    { type: '!object', makeType: true   },
  'object':    { type: '!object', makeType: true   },
  'array':     { type: '!object', makeType: true   },
  'args':      { type: '!object', makeType: true   },
  'function':  { type: '!object', makeType: true   },
  'element':   { type: '!object', makeType: true   },
  'document':  { type: '!object', makeType: true   }
}, true);

/**
 * @private
 * @type {!Object}
 * @const
 */
var CATEGORY_PROPS = freeze({
  'prep': fromCategoryBase(null),
  'log':  fromCategoryBase({
    'linesBefore': { type: 'number',  val: 1         },
    'linesAfter':  { type: 'number',  val: 1         },
    'header':      { type: '!object', makeType: true },
    'msg':         { type: '!object', makeType: true }
  }),
  'trace': {}
}, true);

////////////////////////////////////////////////////////////////////////////////
// FORMAT TYPEDEFS
////////////////////////////////////////////////////////////////////////////////

/**
 * @typedef {!{
 *   __TYPE:      string,
 *   spaceBefore: number,
 *   spaceAfter:  number,
 *   accentMark:  string,
 *   lineLimit:   number
 * }} HeaderFormat
 */

/**
 * @typedef {!{
 *   __TYPE:     string,
 *   accentMark: string,
 *   lineLimit:  number,
 *   indent:     number,
 *   bullet:     string
 * }} MsgFormat
 */

/**
 * @typedef {!{
 *   __TYPE:      string,
 *   spaceBefore: number,
 *   spaceAfter:  number,
 *   delimiter:   string
 * }} OcdMapFormat
 */

/**
 * @typedef {!{
 *   __TYPE:   string,
 *   brackets: string
 * }} StringFormat
 */

/**
 * @typedef {!{
 *   __TYPE:     string,
 *   identifier: string,
 *   brackets:   string
 * }} RegExpFormat
 */

/**
 * @typedef {!{
 *   __TYPE:     string,
 *   identifier: string,
 *   delimiter:  string,
 *   brackets:   string,
 *   indent:     number
 * }} ArrayFormat
 */

/**
 * @typedef {!{
 *   __TYPE:     string,
 *   identifier: string,
 *   delimiter:  string,
 *   brackets:   string,
 *   indent:     number
 * }} ObjectFormat
 */

/**
 * @typedef {!(
 *   HeaderFormat|
 *   MsgFormat|
 *   OcdMapFormat|
 *   StringFormat|
 *   RegExpFormat|
 *   ArrayFormat|
 *   ObjectFormat
 * )} TypeFormat
 */

/**
 * @typedef {!{
 *   __TYPE:      string,
 *   linesBefore: number,
 *   linesAfter:  number,
 *   lineLimit:   number,
 *   header:      HeaderFormat,
 *   msg:         MsgFormat,
 *   ocdmap:      OcdMapFormat,
 *   undefined:   string,
 *   null:        string,
 *   nan:         string,
 *   string:      StringFormat,
 *   regexp:      RegExpFormat,
 *   object:      ObjectFormat,
 *   function:    ObjectFormat,
 *   array:       ObjectFormat,
 *   args:        ObjectFormat,
 *   element:     ObjectFormat,
 *   document:    ObjectFormat
 * }} LogFormat
 */

/**
 * @typedef {!{
 *   __TYPE:    string,
 *   lineLimit: number,
 *   ocdmap:    OcdMapFormat,
 *   undefined: string,
 *   null:      string,
 *   nan:       string,
 *   string:    StringFormat,
 *   regexp:    RegExpFormat,
 *   object:    ObjectFormat,
 *   function:  ObjectFormat,
 *   array:     ObjectFormat,
 *   args:      ObjectFormat,
 *   element:   ObjectFormat,
 *   document:  ObjectFormat
 * }} PrepFormat
 */

/**
 * @typedef {!{
 *   __TYPE: string
 * }} TraceFormat
 */

/**
 * @typedef {!(LogFormat|PrepFormat|TraceFormat)} Format
 */

////////////////////////////////////////////////////////////////////////////////
// FACTORY METHODS
////////////////////////////////////////////////////////////////////////////////

/**
 * @private
 * @param {string} type
 * @param {Object<string, (string|number)>=} props
 * @return {!Object}
 */
function fromTypeBase(type, props) {

  /** @type {!Object} */
  var base;

  base = copy(TYPE_BASE[type], true);
  base = seal(base, true);
  props && each(props, function(val, key) {
    base[key].val = val;
  });
  return freeze(base, true);
}

/**
 * @private
 * @param {Object=} props
 * @return {!Object}
 */
function fromCategoryBase(props) {

  /** @type {!Object} */
  var base;

  props = props || null;
  base = copy(CATEGORY_BASE);
  base = fuse(base, props);
  return freeze(base, true);
}

/**
 * @private
 * @param {string} type
 * @param {Object<string, (string|number)>=} props
 * @return {!TypeFormat}
 */
function newTypeFormat(type, props) {

  /** @type {!TypeFormat} */
  var format;

  props = props || null;
  format = newEmptyObj(type + 'Format');
  each(TYPE_PROPS[type], function(obj, key) {
    format = amend(format, key, obj.val, obj.type);
  });
  format = seal(format);
  return fuse(format, props);
}

/**
 * @private
 * @param {string} category
 * @param {Object<string, (string|number|TypeFormat)>=} props
 * @return {!Format}
 */
function newCategoryFormat(category, props) {

  /** @type {!Format} */
  var format;
  /** @type {*} */
  var val;

  props = props || null;
  format = newEmptyObj('Format');
  each(CATEGORY_PROPS[category], function(obj, key) {
    val = obj.makeType ? newTypeFormat(key) : obj.val;
    format = amend(format, key, val, obj.type);
  });
  format = seal(format);
  return fuse(format, props);
}

////////////////////////////////////////////////////////////////////////////////
// EXPORTS
////////////////////////////////////////////////////////////////////////////////

/**
 * @private
 * @param {string} method
 * @return {!Format}
 */
module.exports = function getDefaultFormat(method) {

  /** @type {Object} */
  var props;

  method = METHODS[method];
  props = method.makeProps && method.makeProps();
  return newCategoryFormat(method.category, props);
};
