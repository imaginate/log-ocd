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
 * @param {Object=} props - [default= null]
 * @return {?Style} - Returns null if no props are given.
 */
function newStyle(props) {

  /** @type {!Style} */
  var style;

  if (!props) {
    return null;
  }

  style = newMap('color, bg', '', 'str');
  style = newProps(
    'bold, dim, inverse, italic, reset, strikethrough, underline', false, 'bool'
  );
  style = seal(style);
  return merge(style, props);
}
