/**
 * -----------------------------------------------------------------------------
 * LOG-OCD: FORMAT
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


////////////////////////////////////////////////////////////////////////////////
// FORMAT FACTORY METHODS
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
 * }} ArgMapFormat
 */

/**
 * @private
 * @param {Object<string, (string|number)>=} props
 * @return {!ArgMapFormat}
 */
function newArgMapFormat(props) {

  /** @type {!ArgMapFormat} */
  var format;
  /** @type {string} */
  var keys;

  format = newEmptyObj('ArgMapFormat');
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
 *   argMap:      !ArgMapFormat,
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
 * @type {!Object<string, function>}
 * @const
 */
var TYPE_FORMAT_OPT_NEW_PROP = freeze({
  'header': newHeaderFormat,
  'msg':    newMsgFormat
  ''
});

/**
 * @private
 * @type {!Object<string, function>}
 * @const
 */
var TYPE_FORMAT_NEW_PROP = freeze({
  'argMap': newArgMapFormat,
  'string': newStringFormat,
  'regexp': newRegExpFormat
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

  format = newEmptyObj('Format');
  format = amend(format, 'lineLimit', 0, 'number');
  keys  = 'linesBefore, linesAfter';
  each(keys, function(key) {
    format = invalidKeys && has(invalidKeys, key)
      ? amend(format, key, null, 'null')
      : amend(format, key, 0, 'number');
  });
  each(TYPE_FORMAT_OPT_NEW_PROP, function(make, key) {
    format = invalidKeys && has(invalidKeys, key)
      ? amend(format, key, null, 'null')
      : amend(format, key, make(), '!object');
  });
  each(TYPE_FORMAT_NEW_PROP, function(make, key) {
    format = amend(format, key, make(), '!object');
  });
  keys  = 'undefined, null, nan';
  format = amend(format, keys, '', 'string');
  keys  = 'object, function, array, args, element, document';
  each(keys, function(key) {
    format = amend(format, key, newObjectFormat(), '!object');
  });
  format = seal(format);
  return props ? fuse(format, props) : format;
}


////////////////////////////////////////////////////////////////////////////////
// FORMAT SETUP METHODS
////////////////////////////////////////////////////////////////////////////////




////////////////////////////////////////////////////////////////////////////////
// FORMAT SETTERS
////////////////////////////////////////////////////////////////////////////////


