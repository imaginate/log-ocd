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
  'toString': newTypeFormat,
  'log':      newTypeFormat,
  'pass':     newTypeFormat,
  'error':    newTypeFormat,
  'warn':     newTypeFormat,
  'debug':    newTypeFormat,
  'fail':     newTypeFormat,
  'trace':    newTraceFormat
});

/**
 * @private
 * @type {!Object<string, string>}
 * @const
 */
var VALID_KEYS = freeze({
  'toString': '',
  'log':      'linesBefore, linesAfter',
  'pass':     'linesBefore, linesAfter, header, msg',
  'error':    'linesBefore, linesAfter, header, msg',
  'warn':     'linesBefore, linesAfter, header, msg',
  'debug':    'linesBefore, linesAfter, header, msg',
  'fail':     'linesBefore, linesAfter, header, msg',
  'trace':    'linesBefore, linesAfter'
});

/**
 * @private
 * @type {!Object<string, function>}
 * @const
 */
var PROPS = freeze({
  'toString': function() { return makeDefaultProps(); },
  'log':      function() { return makeDefaultProps(true); },
  'pass':     function() { return makeDefaultProps(true, true); },
  'error':    function() { return makeDefaultProps(true, true); },
  'warn':     function() { return makeDefaultProps(true, true); },
  'debug':    function() { return makeDefaultProps(true, true); },
  'fail':     function() { return makeDefaultProps(true, true, {
    msg: newMsgFormat({
      accentMark: '`',
      lineLimit:  50,
      indent:     0,
      bullet:     ''
    })
  }); },
  'trace':    function() {}
});

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
  /** @type {string} */
  var keys;

  format = newEmptyObj('HeaderFormat');
  keys  = 'accentMark';
  format = amend(format, keys, '', 'string');
  keys  = 'spaceBefore, spaceAfter, lineLimit';
  format = amend(format, keys, 0, 'number');
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
  /** @type {string} */
  var keys;

  format = newEmptyObj('MsgFormat');
  keys  = 'accentMark, bullet';
  format = amend(format, keys, '', 'string');
  keys  = 'lineLimit, indent';
  format = amend(format, keys, 0, 'number');
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
  /** @type {string} */
  var keys;

  format = newEmptyObj('OcdMapFormat');
  keys  = 'delimiter';
  format = amend(format, keys, '', 'string');
  keys  = 'spaceBefore, spaceAfter';
  format = amend(format, keys, 0, 'number');
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
  /** @type {string} */
  var keys;

  format = newEmptyObj('StringFormat');
  keys  = 'brackets';
  format = amend(format, keys, '', 'string');
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
  /** @type {string} */
  var keys;

  format = newEmptyObj('ObjectFormat');
  keys  = 'identifier, delimiter, brackets';
  format = amend(format, keys, '', 'string');
  keys  = 'indent';
  format = amend(format, keys, 0, 'number');
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
  /** @type {string} */
  var keys;

  format = newEmptyObj('RegExpFormat');
  keys  = 'identifier, brackets';
  format = amend(format, keys, '', 'string');
  format = seal(format);
  return props ? fuse(format, props) : format;
}

/**
 * @typedef {!{
 *   __TYPE:    string,
 *   linesBefore: ?number,
 *   linesAfter:  ?number,
 *   lineLimit:   number,
 *   header:      ?HeaderFormat,
 *   msg:         ?MsgFormat,
 *   ocdMap:      !OcdMapFormat,
 *   undefined:   string,
 *   null:        string,
 *   nan:         string,
 *   string:      !StringFormat,
 *   object:      !ObjectFormat,
 *   function:    !ObjectFormat,
 *   regexp:      !RegExpFormat,
 *   array:       !ObjectFormat,
 *   args:        !ObjectFormat,
 *   element:     !ObjectFormat,
 *   document:    !ObjectFormat
 * }} TypeFormat
 */

/**
 * @private
 * @type {!Object}
 * @const
 */
var OPT_TYPE_PROPS = freeze({
  'linesBefore': { type: 'number', val: 1 },
  'linesAfter':  { type: 'number', val: 1 },
  'header': { type: '!object', make: newHeaderFormat },
  'msg':    { type: '!object', make: newMsgFormat }
});

/**
 * @private
 * @type {!Object<string, function>}
 * @const
 */
var TYPE_PROPS = freeze({
  'lineLimit': { type: 'number', val: 0 },
  'undefined': { type: 'string', val: '' },
  'null':      { type: 'string', val: '' },
  'nan':       { type: 'string', val: '' },
  'ocdMap':   { type: '!object', make: newOcdMapFormat },
  'string':   { type: '!object', make: newStringFormat },
  'regexp':   { type: '!object', make: newRegExpFormat },
  'object':   { type: '!object', make: newObjectFormat },
  'function': { type: '!object', make: newObjectFormat },
  'array':    { type: '!object', make: newObjectFormat },
  'args':     { type: '!object', make: newObjectFormat },
  'element':  { type: '!object', make: newObjectFormat },
  'document': { type: '!object', make: newObjectFormat }
});

/**
 * @private
 * @param {string=} invalidKeys
 * @param {Object=} props
 * @return {!TypeFormat}
 */
function newTypeFormat(invalidKeys, props) {

  /** @type {!TypeFormat} */
  var format;
  /** @type {string} */
  var keys;
  /** @type {*} */
  var val;

  format = newEmptyObj('Format');
  each(TYPE_PROPS, function(obj, key) {
    val = obj.make ? obj.make() : obj.val;
    format = amend(format, key, val, obj.type);
  });
  invalidKeys = invalidKeys || '';
  each(OPT_TYPE_PROPS, function(obj, key) {
    if ( has(invalidKeys, key) ) format = amend(format, key, null, 'null');
    else {
      val = obj.make ? obj.make() : obj.val;
      format = amend(format, key, val, obj.type);
    }
  });
  format = seal(format);
  return props ? fuse(format, props) : format;
}

////////////////////////////////////////////////////////////////////////////////
// HELPER METHODS
////////////////////////////////////////////////////////////////////////////////

/**
 * @private
 * @param {boolean=} lines
 * @param {boolean=} intro
 * @param {Object=} extra
 * @return {!Object}
 */
function makeDefaultProps(lines, intro, extra) {

  /** @type {!Object} */
  var props;

  props = {
    lineLimit:   50,
    'undefined': 'undefined',
    'null':      'null',
    'nan':       'nan',
    'ocdMap': newOcdMapFormat({ delimiter: ':' }),
    'string': newStringFormat({ brackets: '"' }),
    'object': newObjectFormat({
      delimiter: ',',
      brackets:  '{}',
      indent:    2
    }),
    'function': newObjectFormat({
      identifier: '[Function] ',
      delimiter:  ',',
      brackets:   '{}',
      indent:     2
    }),
    'regexp': newRegExpFormat({ brackets: '/' }),
    'array': newObjectFormat({
      delimiter: ',',
      brackets:  '[]',
      indent:    2
    }),
    'args': newObjectFormat({
      identifier: '[Arguments] ',
      delimiter:  ',',
      brackets:   '[]',
      indent:     2
    }),
    'element': newObjectFormat({
      identifier: '[DomElement] ',
      delimiter:  ',',
      brackets:   '{}',
      indent:     2
    }),
    'document': newObjectFormat({
      identifier: '[DomDocument] ',
      delimiter:  ',',
      brackets:   '{}',
      indent:     2
    })
  };

  if (lines) props = fuse(props, {
    linesBefore: 1,
    linesAfter:  1
  });

  if (intro) props = fuse(props, {
    header: newHeaderFormat({
      spaceBefore: 1,
      spaceAfter:  6,
      accentMark:  '`',
      lineLimit:   50
    }),
    msg: newMsgFormat({
      accentMark: '`',
      lineLimit:  50,
      indent:     2,
      bullet:     '-'
    })
  });

  return extra ? fuse(props, extra) : props;
}

////////////////////////////////////////////////////////////////////////////////
// EXPORTS
////////////////////////////////////////////////////////////////////////////////

/**
 * @typedef {!(TypeFormat|TraceFormat)} Format
 */

/**
 * @private
 * @param {string} method
 * @return {!Format}
 */
module.exports = function getDefaultFormat(method) {
  return FACTORY[method]( VALID_KEYS[method], PROPS[method]() );
};
