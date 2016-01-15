/**
 * -----------------------------------------------------------------------------
 * LOG-OCD: FORMAT
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
 *   spaceBefore: number,
 *   spaceAfter:  number,
 *   identifier:  string,
 *   lineLimit:   number,
 *   brackets:    string
 * }} RootFormat
 */

/**
 * @typedef {!{
 *   __TYPE:      string,
 *   spaceBefore: number,
 *   spaceAfter:  number
 * }} RowFormat
 */

/**
 * @typedef {!{
 *   __TYPE:      string,
 *   spaceBefore: number,
 *   spaceAfter:  number,
 *   lineLimit:   number,
 *   align:       string,
 *   title:       string
 * }} ColumnFormat
 */

/**
 * @typedef {!{
 *   __TYPE:      string,
 *   spaceBefore: number,
 *   spaceAfter:  number,
 *   lineLimit:   number,
 *   dirDepth:    number,
 *   align:       string,
 *   title:       string
 * }} FileColumnFormat
 */

/**
 * @typedef {!(
 *   RootFormat|
 *   RowFormat|
 *   ColumnFormat|
 *   FileColumnFormat
 * )} StackFormat
 */

/**
 * @typedef {!(TypeFormat|StackFormat)} SubFormat
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
 *   __TYPE:      string,
 *   linesBefore: number,
 *   linesAfter:  number,
 *   root:        RootFormat,
 *   row:         RowFormat,
 *   event:       ColumnFormat,
 *   file:        FileColumnFormat,
 *   module:      ColumnFormat,
 *   line:        ColumnFormat,
 *   column:      ColumnFormat
 * }} TraceFormat
 */

/**
 * @typedef {!(LogFormat|PrepFormat|TraceFormat)} Format
 */
