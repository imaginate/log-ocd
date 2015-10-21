/**
 * -----------------------------------------------------------------------------
 * LOG-OCD THEMES
 * -----------------------------------------------------------------------------
 * @version 0.0.1
 * @see [log-ocd]{@link https://github.com/imaginate/log-ocd}
 *
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2015 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Supporting Libraries:
 * @see [are]{@link https://github.com/imaginate/are}
 * @see [Colors]{@link https://www.npmjs.com/package/colors}
 *
 * Annotations:
 * @see [JSDoc3]{@link http://usejsdoc.org/}
 * @see [Closure Compiler specific JSDoc]{@link https://developers.google.com/closure/compiler/docs/js-for-compiler}
 */


// *****************************************************************************
// SECTION: THEMES
// *****************************************************************************


////////////////////////////////////////////////////////////////////////////////
// CONSTRUCTORS
////////////////////////////////////////////////////////////////////////////////

/**
 * @typedef {{
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
 * }} Style
 */

/**
 * A factory method for Style objects.
 * @private
 * @param {Object<string, (string|boolean)>=} props - [default= null]
 * @return {?Style} Returns null if no props are given.
 */
function newStyle(props) {

  /** @type {!Style} */
  var style;

  if (!props) {
    return null;
  }

  style = newMap('Style');
  style = newProps(style, 'color, bg', '', 'str');
  style = newProps(style, [
    'bold', 'dim', 'inverse', 'italic', 'reset', 'strikethrough', 'underline'
  ], false, 'bool');
  style = seal(style);
  return merge(style, props);
}

/**
 * @typedef {{
 *   placeholder: ?string,
 *   separators: ?string,
 *   brackets: ?string,
 *   accents: ?string,
 *   ending: ?string,
 *   intro: ?string,
 *   flags: ?string
 * }} TypeValues
 */

/**
 * A factory method for TypeValues objects.
 * @private
 * @param {Object<string, ?string>=} props - [default= null]
 * @return {?TypeValues} Returns null if no props are given.
 */
function newTypeValues(props) {

  /** @type {!TypeValues} */
  var values;

  if (!props) {
    return null;
  }

  values = newMap('TypeValues');
  values = newProps(values, [
    'placeholder', 'separators', 'brackets',
    'accents', 'ending', 'intro', 'flags'
  ], null, '?str');
  values = seal(values);
  return merge(values, props);
}

/**
 * @typedef {{
 *   placeholder: ?Style,
 *   separators: ?Style,
 *   brackets: ?Style,
 *   accents: ?Style,
 *   ending: ?Style,
 *   intro: ?Style,
 *   flags: ?Style
 * }} TypeStyles
 */

/**
 * A factory method for TypeStyles objects.
 * @private
 * @param {Object<string, ?Style>=} props - [default= null]
 * @return {?TypeStyles} Returns null if no props are given.
 */
function newTypeStyles(props) {

  /** @type {!TypeStyles} */
  var styles;

  if (!props) {
    return null;
  }

  styles = newMap('TypeStyles');
  styles = newProps(styles, [
    'placeholder', 'separators', 'brackets',
    'accents', 'ending', 'intro', 'flags'
  ], null, function(/** * */ val) {
    return is.null(val) || ( is.obj(val) && obj._TYPE === 'Style' );
  });
  styles = seal(styles);
  return merge(styles, props);
}

/**
 * @typedef {{
 *   values: ?TypeValues,
 *   styles: ?TypeStyles
 * }} TypeTheme
 */

/**
 * A factory method for TypeTheme objects.
 * @private
 * @param {?TypeValues=} values - [default= null]
 * @param {?TypeStyles=} styles - [default= null] Must state values param to
 *   supply a styles param.
 * @return {?TypeTheme} Returns null if no values and styles are given.
 */
function newTypeTheme(values, styles) {

  /** @type {!TypeTheme} */
  var theme;

  if (!values && !styles) {
    return null;
  }

  values = values || null;
  styles = styles || null;

  theme = newMap('TypeTheme');
  theme = newProp(theme, 'values', values, function(/** * */ val) {
    return is.null(val) || ( is.obj(val) && obj._TYPE === 'TypeValues' );
  });
  theme = newProp(theme, 'styles', styles, function(/** * */ val) {
    return is.null(val) || ( is.obj(val) && obj._TYPE === 'TypeStyles' );
  });
  return seal(theme);
}
