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
  return props ? fuse(theme, props) : theme;
}

/**
 * @typedef {!{
 *   __TYPE:     string,
 *   identifier: ?Theme,
 *   separator:  ?Theme,
 *   brackets:   ?Theme,
 *   flags:      ?Theme,
 *   color:      string,
 *   bg:         string,
 *   bold:       boolean,
 *   dim:        boolean,
 *   hidden:     boolean,
 *   inverse:    boolean,
 *   italic:     boolean,
 *   reset:      boolean,
 *   strikethrough: boolean,
 *   underline:     boolean
 * }} TypeTheme
 */

/**
 * A factory method for TypeTheme objects.
 * @private
 * @param {string} validKeys
 * @param {Object<string, (string|boolean|Theme)>=} props
 * @return {!TypeTheme}
 */
function newTypeTheme(validKeys, props) {

  /** @type {!TypeTheme} */
  var theme;
  /** @type {string} */
  var keys;

  theme = newEmptyObj('TypeTheme');
  theme = amend(theme, 'color,bg', '', 'string');
  keys  = 'bold,dim,hidden,inverse,italic,reset,strikethrough,underline';
  theme = amend(theme, keys, false, 'boolean');
  keys  = 'identifier,separator,brackets,flags';
  each(keys.split(','), function(key) {
    theme = has(validKeys, key)
      ? amend(theme, key, newTheme(), '!object')
      : amend(theme, key, null, 'null');
  });
  theme = seal(theme);
  return props ? fuse(theme, props) : theme;
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
  return props ? fuse(theme, props) : theme;
}

/**
 * @typedef {!{
 *   __TYPE:    string,
 *   header:    ?AccentTheme,
 *   msg:       ?AccentTheme,
 *   argMap:    !Theme,
 *   null:      !Theme,
 *   undefined: !Theme,
 *   boolean:   !Theme,
 *   string:    !TypeTheme,
 *   number:    !TypeTheme,
 *   nan:       !Theme,
 *   object:    !TypeTheme,
 *   function:  !TypeTheme,
 *   regexp:    !TypeTheme,
 *   array:     !TypeTheme,
 *   args:      !TypeTheme,
 *   element:   !TypeTheme,
 *   document:  !TypeTheme
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

  /** @type {!Object} */
  var validKeys;
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
  keys  = 'argMap,null,undefined,boolean,nan';
  style = amend(style, keys, newTheme(), '!object');
  validKeys = {
    'string':   'separator,brackets',
    'number':   'identifier,separator',
    'object':   'identifier,separator,brackets',
    'function': 'identifier,separator,brackets',
    'regexp':   'identifier,brackets,flags',
    'array':    'identifier,separator,brackets',
    'args':     'identifier,separator,brackets',
    'element':  'identifier,separator,brackets',
    'document': 'identifier,separator,brackets'
  };
  each(validKeys, function(val, key) {
    style = amend(style, key, newTypeTheme(val), '!object');
  });
  style = seal(style);
  return props ? fuse(style, props) : style;
}


////////////////////////////////////////////////////////////////////////////////
// STYLE SETUP METHODS
////////////////////////////////////////////////////////////////////////////////

/**
 * @private
 * @param {Object=} props
 * @return {!Object}
 */
function setupStyleProps(props) {
  return fuse({
    'argMap':    newTheme({ color: 'cyan'    }),
    'null':      newTheme({ color: 'magenta' }),
    'undefined': newTheme({ color: 'magenta' }),
    'boolean':   newTheme({ color: 'magenta' }),
    'nan':       newTheme({ color: 'magenta' }),
    'string': newTypeTheme({
      color: 'yellow',
      separator: newTheme({ color: 'red'    }),
      brackets:  newTheme({ color: 'yellow' })
    }),
    'number': newTypeTheme({
      color: 'magenta',
      identifier: newTheme({ color: 'magenta' }),
      separator:  newTheme({ color: 'magenta' })
    }),
    'object': newTypeTheme({
      color: 'white',
      identifier: newTheme({ color: 'white' }),
      separator:  newTheme({ color: 'white' }),
      brackets:   newTheme({ color: 'white' })
    }),
    'function': newTypeTheme({
      color: 'white',
      identifier: newTheme({ color: 'white' }),
      separator:  newTheme({ color: 'white' }),
      brackets:   newTheme({ color: 'white' })
    }),
    'regexp': newTypeTheme({
      color: 'white',
      identifier: newTheme({ color: 'yellow' }),
      brackets:   newTheme({ color: 'yellow' }),
      flags:      newTheme({ color: 'yellow' })
    }),
    'array': newTypeTheme({
      color: 'white',
      identifier: newTheme({ color: 'white' }),
      separator:  newTheme({ color: 'white' }),
      brackets:   newTheme({ color: 'white' })
    }),
    'args': newTypeTheme({
      color: 'white',
      identifier: newTheme({ color: 'white' }),
      separator:  newTheme({ color: 'white' }),
      brackets:   newTheme({ color: 'white' })
    }),
    'element': newTypeTheme({
      color: 'white',
      identifier: newTheme({ color: 'white' }),
      separator:  newTheme({ color: 'white' }),
      brackets:   newTheme({ color: 'white' })
    }),
    'document': newTypeTheme({
      color: 'white',
      identifier: newTheme({ color: 'white' }),
      separator:  newTheme({ color: 'white' }),
      brackets:   newTheme({ color: 'white' })
    })
  }, props || null);
}

/**
 * @private
 * @return {!Object}
 */
function getDefaultStyles() {
  return seal({
    'log':  newStyle(false, false, setupStyleProps());
    'pass': newStyle(true,  false, setupStyleProps({
      header: newAccentTheme({
        color: 'white',
        bg:    'green',
        bold:  true,
        accent: newTheme({
          color: 'yellow',
          bg:    'green',
          bold:  true
        })
      })
    }),
    'error': newStyle(true, true, setupStyleProps({
      header: newAccentTheme({
        color: 'white',
        bg:    'red',
        bold:  true,
        accent: newTheme({
          color: 'yellow',
          bg:    'red',
          bold:  true
        })
      }),
      msg: newAccentTheme({
        color: 'white',
        accent: newTheme({ color: 'magenta' })
      })
    }),
    'warn': newStyle(true, true, setupStyleProps({
      header: newAccentTheme({
        color: 'white',
        bg:    'yellow',
        bold:  true,
        accent: newTheme({
          color: 'blue',
          bg:    'yellow',
          bold:  true
        })
      }),
      msg: newAccentTheme({
        color: 'white',
        accent: newTheme({ color: 'magenta' })
      })
    }),
    'debug': newStyle(true, false, setupStyleProps({
      header: newAccentTheme({
        color: 'white',
        bg:    'blue',
        bold:  true,
        accent: newTheme({
          color: 'magenta',
          bg:    'blue',
          bold:  true
        })
      })
    }),
    'fail': newStyle(false, true, setupStyleProps({
      msg: newAccentTheme({
        color: 'red',
        accent: newTheme({ color: 'yellow' })
      })
    })
  });
}


////////////////////////////////////////////////////////////////////////////////
// STYLE CHECK METHODS
////////////////////////////////////////////////////////////////////////////////

/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
function isTheme(val) {
  return is.obj(val) && val.__TYPE === 'Theme';
}


////////////////////////////////////////////////////////////////////////////////
// COLORS SETUP METHODS
////////////////////////////////////////////////////////////////////////////////

/**
 * @private
 * @param {!Theme} theme
 * @return {!Array}
 */
function makeColorsTheme(theme) {

  /** @type {!Array} */
  var result;
  /** @type {string} */
  var keys;

  result = [];
  each([ 'color', 'bg' ], function(key) {
    if ( theme[key] ) result.push( theme[key] );
  });
  keys = 'bold, dim, hidden, inverse, italic, reset, strikethrough, underline';
  each(keys.split(', '), function(key) {
    if ( theme[key] ) result.push(key);
  });
  return result;
}

/**
 * @private
 * @param {string} name
 * @param {!Object} obj
 */
function setColorsThemes(name, obj) {

  /** @type {!Object} */
  var themes;

  each(obj, function(val, key) {
    if ( isTheme(val) ) {
      themes = themes || {};
      themes[name + key] = makeColorsTheme(val);
      return;
    }
    if ( is.obj(val) ) setColorsThemes(name + key, val);
  });

  if (themes) colors.setTheme(themes);
}

/**
 * @private
 * @param {!Object} styles
 */
function setAllColorsThemes(styles) {
  each(styles, function(val, key) {
    setColorsThemes(key, val);
  });
}


////////////////////////////////////////////////////////////////////////////////
// SET ADDITIONAL THEMES FOR COLORS
////////////////////////////////////////////////////////////////////////////////

// stacktrace themes
colors.setTheme({
  ostack:   'white',
  estack: [ 'white', 'bgBlue' ]
};


////////////////////////////////////////////////////////////////////////////////
// STYLE SETTER
////////////////////////////////////////////////////////////////////////////////


