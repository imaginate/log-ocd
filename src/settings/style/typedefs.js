/**
 * -----------------------------------------------------------------------------
 * LOG-OCD: STYLE JSDOC TYPEDEFS
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

/**
 * @typedef {!{
 *   __TYPE:        string,
 *   identifier:    Theme,
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
 * }} StackRootTheme
 */

/**
 * @typedef {!{
 *   __TYPE:        string,
 *   event:         Theme,
 *   file:          Theme,
 *   module:        Theme,
 *   line:          Theme,
 *   column:        Theme,
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
 * }} StackTitleTheme
 */

/**
 * @typedef {!{
 *   __TYPE:        string,
 *   alternate:     Theme,
 *   event:         Theme,
 *   file:          Theme,
 *   module:        Theme,
 *   line:          Theme,
 *   column:        Theme,
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
 * }} StackRowTheme
 */

/**
 * @typedef {!(
 *   StackRootTheme|
 *   StackTitleTheme|
 *   StackRowTheme
 * )} StackTheme
 */

/**
 * @typedef {!(TypeTheme|StackTheme)} MainTheme
 */

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
 *   root:   Theme,
 *   title:  StackTitleTheme,
 *   row:    StackRowTheme
 * }} TraceStyle
 */

/**
 * @typedef {!(LogStyle|PrepStyle|TraceStyle)} Style
 */
