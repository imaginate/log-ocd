/**
 * -----------------------------------------------------------------------------
 * LOG-OCD: STYLE
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
// STYLE FACTORY METHODS
////////////////////////////////////////////////////////////////////////////////

/**
 * @typedef {!{
 *   __TYPE:  string,
 *   color:   string,
 *   bg:      string,
 *   bold:    boolean,
 *   dim:     boolean,
 *   hidden:  boolean,
 *   inverse: boolean,
 *   italic:  boolean,
 *   reset:   boolean,
 *   strikethrough: boolean,
 *   underline:     boolean
 * }} Theme
 */

/**
 * A factory method for Theme objects.
 * @private
 * @param {Object<string, (string|boolean)>=} props
 * @return {!Theme}
 */
function newTheme(props) {

  /** @type {!Theme} */
  var theme;
  /** @type {string} */
  var keys;

  theme = newEmptyObj('Theme');
  theme = amend(theme, 'color,bg', '', 'string');
  keys  = 'bold,dim,hidden,inverse,italic,reset,strikethrough,underline';
  theme = amend(theme, keys, false, 'boolean');
  theme = seal(theme);
  props = props || null;
  return fuse(theme, props);
}

/**
 * @typedef {!{
 *   __TYPE:     string,
 *   separators: ?Theme,
 *   brackets:   ?Theme,
 *   default:    ?Theme,
 *   ending:     ?Theme,
 *   indent:     ?Theme,
 *   intro:      ?Theme,
 *   flags:      ?Theme
 * }} Themes
 */

/**
 * A factory method for Themes objects.
 * @private
 * @param {Object<string, ?Theme>=} props
 * @return {!Themes}
 */
function newThemes(props) {

  /** @type {!Themes} */
  var themes;
  /** @type {string} */
  var keys;

  themes = newEmptyObj('Themes');
  keys   = 'separators,brackets,default,ending,indent,intro,flags';
  themes = amend(themes, keys, null, 'object');
  themes = seal(themes);
  props  = props || null;
  return fuse(themes, props);
}

/**
 * @typedef {!{
 *   __TYPE:  string,
 *   accent:  !Theme,
 *   color:   string,
 *   bg:      string,
 *   bold:    boolean,
 *   dim:     boolean,
 *   hidden:  boolean,
 *   inverse: boolean,
 *   italic:  boolean,
 *   reset:   boolean,
 *   strikethrough: boolean,
 *   underline:     boolean
 * }} AccentTheme
 */

/**
 * A factory method for AccentTheme objects.
 * @private
 * @param {Object<string, (string|boolean|Theme)>=} props
 * @return {!AccentTheme}
 */
function newAccentTheme(props) {

  /** @type {!AccentTheme} */
  var theme;
  /** @type {string} */
  var keys;

  theme = newEmptyObj('AccentTheme');
  theme = amend(theme, 'color,bg', '', 'string');
  keys  = 'bold,dim,hidden,inverse,italic,reset,strikethrough,underline';
  theme = amend(theme, keys, false, 'boolean');
  theme = amend(theme, 'accent', newTheme(), '!object');
  theme = seal(theme);
  props = props || null;
  return fuse(theme, props);
}

/**
 * @typedef {!{
 *   __TYPE:    string,
 *   header:    ?AccentTheme,
 *   msg:       ?AccentTheme,
 *   argMap:    !Themes,
 *   null:      !Themes,
 *   undefined: !Themes,
 *   boolean:   !Themes,
 *   string:    !Themes,
 *   number:    !Themes,
 *   nan:       !Themes,
 *   object:    !Themes,
 *   function:  !Themes,
 *   regexp:    !Themes,
 *   array:     !Themes,
 *   args:      !Themes,
 *   element:   !Themes,
 *   document:  !Themes
 * }} Style
 */

/**
 * A factory method for Style objects.
 * @private
 * @param {boolean} header
 * @param {boolean} msg
 * @param {Object<string, (AccentTheme|Themes)>=} props
 * @return {!Style}
 */
function newStyle(header, msg, props) {

  /** @type {!Style} */
  var style;
  /** @type {string} */
  var keys;

  style = newEmptyObj('Style');
  style = header
    ? amend(style, 'header', newAccentTheme(), '!object')
    : amend(style, 'header', null, 'null');
  style = msg
    ? amend(style, 'msg', newAccentTheme(), '!object')
    : amend(style, 'msg', null, 'null');
  keys = 'argMap,null,undefined,boolean,string,number,nan,object,' +
          'function,regexp,array,args,element,document';
  style = amend(style, keys, newThemes(), '!object');
  style = seal(style);
  props = props || null;
  return fuse(style, props);
}


////////////////////////////////////////////////////////////////////////////////
// STYLE SETUP
////////////////////////////////////////////////////////////////////////////////




////////////////////////////////////////////////////////////////////////////////
// STYLE SETTER
////////////////////////////////////////////////////////////////////////////////


