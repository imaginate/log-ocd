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
 * @type {!Object<string, function>}
 * @const
 */
var FACTORY = freeze({
  'toString': newPrepFormat,
  'log':      newLogFormat,
  'pass':     newLogFormat,
  'error':    newLogFormat,
  'warn':     newLogFormat,
  'debug':    newLogFormat,
  'fail':     newLogFormat,
  'trace':    newTraceFormat
});

/**
 * @private
 * @type {!Object<string, ?function>}
 * @const
 */
var PROPS = freeze({
  'toString': null,
  'log':      null,
  'pass':     null,
  'error':    null,
  'warn':     null,
  'debug':    null,
  'fail': function() {
    return {
      msg: newMsgFormat({ bullet: '', indent: 0 })
    };
  },
  'trace': null
});

/**
 * @private
 * @type {!Object}
 * @const
 */
var HEADER_PROPS = freeze({
  'spaceBefore': { type: 'number', val: 1   },
  'spaceAfter':  { type: 'number', val: 6   },
  'accentMark':  { type: 'string', val: '`' },
  'lineLimit':   { type: 'number', val: 50  }
}, true);

/**
 * @private
 * @type {!Object}
 * @const
 */
var MSG_PROPS = freeze({
  'accentMark': { type: 'string', val: '`' },
  'lineLimit':  { type: 'number', val: 50  },
  'bullet':     { type: 'string', val: '-' },
  'indent':     { type: 'number', val: 2   }
}, true);

/**
 * @private
 * @type {!Object}
 * @const
 */
var OCD_MAP_PROPS = freeze({
  'spaceBefore': { type: 'number', val: 0   },
  'spaceAfter':  { type: 'number', val: 0   },
  'delimiter':   { type: 'string', val: ':' }
}, true);

/**
 * @private
 * @type {!Object}
 * @const
 */
var STRING_PROPS = freeze({
  'brackets': { type: 'string', val: '"' }
}, true);

/**
 * @private
 * @type {!Object}
 * @const
 */
var OBJECT_PROPS = freeze({
  'identifier': { type: 'string', val: ''   },
  'delimiter':  { type: 'string', val: ','  },
  'brackets':   { type: 'string', val: '{}' },
  'indent':     { type: 'number', val: 2    }
}, true);

/**
 * @private
 * @type {!Object}
 * @const
 */
var ARRAY_PROPS = freeze({
  'identifier': { type: 'string', val: ''   },
  'delimiter':  { type: 'string', val: ','  },
  'brackets':   { type: 'string', val: '[]' },
  'indent':     { type: 'number', val: 2    }
}, true);

/**
 * @private
 * @type {!Object}
 * @const
 */
var REG_EXP_PROPS = freeze({
  'identifier': { type: 'string', val: ''  },
  'brackets':   { type: 'string', val: '/' }
}, true);

/**
 * @private
 * @type {!Object}
 * @const
 */
var TYPE_PROPS = freeze({
  'undefined': { type: 'string', val: 'undefined' },
  'null':      { type: 'string', val: 'null'      },
  'nan':       { type: 'string', val: 'nan'       },
  'ocdMap':   { type: '!object', make: newOcdMapFormat, props: null },
  'string':   { type: '!object', make: newStringFormat, props: null },
  'regexp':   { type: '!object', make: newRegExpFormat, props: null },
  'object':   { type: '!object', make: newObjectFormat, props: null },
  'array':    { type: '!object', make: newArrayFormat,  props: null },
  'args':     { type: '!object', make: newArrayFormat,
                                 props: { identifier: '[Arguments] '   } },
  'function': { type: '!object', make: newObjectFormat,
                                 props: { identifier: '[Function] '    } },
  'element':  { type: '!object', make: newObjectFormat,
                                 props: { identifier: '[DomElement] '  } },
  'document': { type: '!object', make: newObjectFormat,
                                 props: { identifier: '[DomDocument] ' } }
}, true);

/**
 * @private
 * @type {!Object}
 * @const
 */
var LOG_PROPS = freeze({
  'linesBefore': { type: 'number', val: 1  },
  'linesAfter':  { type: 'number', val: 1  },
  'lineLimit':   { type: 'number', val: 50 },
  'header': { type: '!object', make: newHeaderFormat, props: null },
  'msg':    { type: '!object', make: newMsgFormat,    props: null }
}, true);

/**
 * @private
 * @type {!Object}
 * @const
 */
var PREP_PROPS = freeze({
  'lineLimit': { type: 'number', val: 50 }
}, true);

////////////////////////////////////////////////////////////////////////////////
// FACTORY METHODS
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
 * @private
 * @param {Object<string, (string|number)>=} props
 * @return {!HeaderFormat}
 */
function newHeaderFormat(props) {

  /** @type {!HeaderFormat} */
  var format;

  format = newEmptyObj('HeaderFormat');
  each(HEADER_PROPS, function(obj, key) {
    format = amend(format, key, obj.val, obj.type);
  });
  format = seal(format);
  return props ? fuse(format, props) : format;
}

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
 * @private
 * @param {Object<string, (string|number)>=} props
 * @return {!MsgFormat}
 */
function newMsgFormat(props) {

  /** @type {!MsgFormat} */
  var format;

  format = newEmptyObj('MsgFormat');
  each(MSG_PROPS, function(obj, key) {
    format = amend(format, key, obj.val, obj.type);
  });
  format = seal(format);
  return props ? fuse(format, props) : format;
}

/**
 * @typedef {!{
 *   __TYPE:      string,
 *   spaceBefore: number,
 *   spaceAfter:  number,
 *   delimiter:   string
 * }} OcdMapFormat
 */

/**
 * @private
 * @param {Object<string, (string|number)>=} props
 * @return {!OcdMapFormat}
 */
function newOcdMapFormat(props) {

  /** @type {!OcdMapFormat} */
  var format;

  format = newEmptyObj('OcdMapFormat');
  each(OCD_MAP_PROPS, function(obj, key) {
    format = amend(format, key, obj.val, obj.type);
  });
  format = seal(format);
  return props ? fuse(format, props) : format;
}

/**
 * @typedef {!{
 *   __TYPE:   string,
 *   brackets: string
 * }} StringFormat
 */

/**
 * @private
 * @param {Object<string, string>=} props
 * @return {!StringFormat}
 */
function newStringFormat(props) {

  /** @type {!StringFormat} */
  var format;

  format = newEmptyObj('StringFormat');
  each(STRING_PROPS, function(obj, key) {
    format = amend(format, key, obj.val, obj.type);
  });
  format = seal(format);
  return props ? fuse(format, props) : format;
}

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
 * @private
 * @param {Object<string, (string|number)>=} props
 * @return {!ObjectFormat}
 */
function newObjectFormat(props) {

  /** @type {!ObjectFormat} */
  var format;

  format = newEmptyObj('ObjectFormat');
  each(OBJECT_PROPS, function(obj, key) {
    format = amend(format, key, obj.val, obj.type);
  });
  format = seal(format);
  return props ? fuse(format, props) : format;
}

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
 * @private
 * @param {Object<string, (string|number)>=} props
 * @return {!ArrayFormat}
 */
function newArrayFormat(props) {

  /** @type {!ArrayFormat} */
  var format;

  format = newEmptyObj('ArrayFormat');
  each(ARRAY_PROPS, function(obj, key) {
    format = amend(format, key, obj.val, obj.type);
  });
  format = seal(format);
  return props ? fuse(format, props) : format;
}

/**
 * @typedef {!{
 *   __TYPE:     string,
 *   identifier: string,
 *   brackets:   string
 * }} RegExpFormat
 */

/**
 * @private
 * @param {Object<string, string>=} props
 * @return {!RegExpFormat}
 */
function newRegExpFormat(props) {

  /** @type {!RegExpFormat} */
  var format;

  format = newEmptyObj('RegExpFormat');
  each(REG_EXP_PROPS, function(obj, key) {
    format = amend(format, key, obj.val, obj.type);
  });
  format = seal(format);
  return props ? fuse(format, props) : format;
}

/**
 * @typedef {!{
 *   __TYPE:      string,
 *   linesBefore: number,
 *   linesAfter:  number,
 *   lineLimit:   number,
 *   header:      HeaderFormat,
 *   msg:         MsgFormat,
 *   ocdMap:      !OcdMapFormat,
 *   undefined:   string,
 *   null:        string,
 *   nan:         string,
 *   string:      !StringFormat,
 *   regexp:      !RegExpFormat,
 *   array:       !ArrayFormat,
 *   args:        !ArrayFormat,
 *   object:      !ObjectFormat,
 *   function:    !ObjectFormat,
 *   element:     !ObjectFormat,
 *   document:    !ObjectFormat
 * }} LogFormat
 */

/**
 * @private
 * @param {Object=} props
 * @return {!LogFormat}
 */
function newLogFormat(props) {

  /** @type {!LogFormat} */
  var format;
  /** @type {*} */
  var val;

  format = newEmptyObj('Format');
  each(LOG_PROPS, function(obj, key) {
    val = obj.make ? obj.make(obj.props) : obj.val;
    format = amend(format, key, val, obj.type);
  });
  each(TYPE_PROPS, function(obj, key) {
    val = obj.make ? obj.make(obj.props) : obj.val;
    format = amend(format, key, val, obj.type);
  });
  format = seal(format);
  return props ? fuse(format, props) : format;
}

/**
 * @typedef {!{
 *   __TYPE:    string,
 *   lineLimit: number,
 *   ocdMap:    !OcdMapFormat,
 *   undefined: string,
 *   null:      string,
 *   nan:       string,
 *   string:    !StringFormat,
 *   regexp:    !RegExpFormat,
 *   array:     !ArrayFormat,
 *   args:      !ArrayFormat,
 *   object:    !ObjectFormat,
 *   function:  !ObjectFormat,
 *   element:   !ObjectFormat,
 *   document:  !ObjectFormat
 * }} PrepFormat
 */

/**
 * @private
 * @param {Object=} props
 * @return {!PrepFormat}
 */
function newPrepFormat(props) {

  /** @type {!PrepFormat} */
  var format;
  /** @type {*} */
  var val;

  format = newEmptyObj('Format');
  each(PREP_PROPS, function(obj, key) {
    val = obj.make ? obj.make(obj.props) : obj.val;
    format = amend(format, key, val, obj.type);
  });
  each(TYPE_PROPS, function(obj, key) {
    val = obj.make ? obj.make(obj.props) : obj.val;
    format = amend(format, key, val, obj.type);
  });
  format = seal(format);
  return props ? fuse(format, props) : format;
}

////////////////////////////////////////////////////////////////////////////////
// EXPORTS
////////////////////////////////////////////////////////////////////////////////

/**
 * @typedef {!(LogFormat|PrepFormat)} Format
 */

/**
 * @private
 * @param {string} method
 * @return {!Format}
 */
module.exports = function getDefaultFormat(method) {

  /** @type {?(function|Object)} */
  var props;

  props = PROPS[method];
  props = props && props();
  return FACTORY[method](props);
};
