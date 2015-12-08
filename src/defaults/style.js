/**
 * -----------------------------------------------------------------------------
 * LOG-OCD: STYLE DEFAULTS
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
  'toString': newTypeStyle,
  'log':      newTypeStyle,
  'pass':     newTypeStyle,
  'error':    newTypeStyle,
  'warn':     newTypeStyle,
  'debug':    newTypeStyle,
  'fail':     newTypeStyle,
  'trace':    newTraceStyle
});

/**
 * @private
 * @type {!Object<string, string>}
 * @const
 */
var VALID_KEYS = freeze({
  'toString': '',
  'log':      '',
  'pass':     'header, msg',
  'error':    'header, msg',
  'warn':     'header, msg',
  'debug':    'header, msg',
  'fail':     'header, msg',
  'trace':    ''
});

/**
 * @private
 * @type {!Object<string, function>}
 * @const
 */
var PROPS = freeze({
  'toString': function() { return makeDefaultProps(); },
  'log':      function() { return makeDefaultProps(); },
  'pass':     function() { return makeDefaultProps({
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
  }); },
  'error':    function() { return makeDefaultProps({
    header: newAccentTheme({
      color: 'white',
      bg:    'red',
      bold:  true,
      accent: newTheme({
        color: 'yellow',
        bg:    'red',
        bold:  true
      })
    })
  }); },
  'warn':     function() { return makeDefaultProps({
    header: newAccentTheme({
      color: 'white',
      bg:    'yellow',
      bold:  true,
      accent: newTheme({
        color: 'blue',
        bg:    'yellow',
        bold:  true
      })
    })
  }); },
  'debug':    function() { return makeDefaultProps({
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
  }); },
  'fail':     function() { return makeDefaultProps({
    msg: newAccentTheme({
      color: 'red',
      accent: newTheme({ color: 'yellow' })
    })
  }); },
  'trace':    function() {}
});

////////////////////////////////////////////////////////////////////////////////
// FACTORY METHODS
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
  keys  = 'color, bg';
  theme = amend(theme, keys, '', 'string');
  keys  = 'bold, dim, hidden, inverse, italic, reset, strikethrough, underline';
  theme = amend(theme, keys, false, 'boolean');
  theme = seal(theme);
  return props ? fuse(theme, props) : theme;
}

/**
 * @typedef {!{
 *   __TYPE:     string,
 *   identifier: ?Theme,
 *   delimiter:  ?Theme,
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
  keys  = 'color, bg';
  theme = amend(theme, keys, '', 'string');
  keys  = 'bold, dim, hidden, inverse, italic, reset, strikethrough, underline';
  theme = amend(theme, keys, false, 'boolean');
  keys  = 'identifier, delimiter, brackets, flags';
  each(keys, function(key) {
    theme = validKeys && has(validKeys, key)
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
  keys  = 'color, bg';
  theme = amend(theme, keys, '', 'string');
  keys  = 'bold, dim, hidden, inverse, italic, reset, strikethrough, underline';
  theme = amend(theme, keys, false, 'boolean');
  theme = amend(theme, 'accent', newTheme(), '!object');
  theme = seal(theme);
  return props ? fuse(theme, props) : theme;
}

/**
 * @typedef {!(Theme|TypeTheme|AccentTheme)} AnyTheme
 */

/**
 * @typedef {!{
 *   __TYPE:    string,
 *   header:    ?AccentTheme,
 *   msg:       ?AccentTheme,
 *   ocdMap:    !Theme,
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
 * }} TypeStyle
 */

/**
 * @private
 * @type {!Object<string, string>}
 * @const
 */
var TYPE_VALID_KEYS = freeze({
  'string':   '            delimiter, brackets       ',
  'number':   'identifier, delimiter                 ',
  'object':   'identifier, delimiter, brackets       ',
  'function': 'identifier, delimiter, brackets       ',
  'regexp':   'identifier,            brackets, flags',
  'array':    'identifier, delimiter, brackets       ',
  'args':     'identifier, delimiter, brackets       ',
  'element':  'identifier, delimiter, brackets       ',
  'document': 'identifier, delimiter, brackets       '
});

/**
 * A factory method for TypeStyle objects.
 * @private
 * @param {string=} validKeys
 * @param {Object<string, AnyTheme>=} props
 * @return {!TypeStyle}
 */
function newTypeStyle(validKeys, props) {

  /** @type {!TypeStyle} */
  var style;
  /** @type {string} */
  var keys;

  style = newEmptyObj('Style');
  keys = 'header, msg';
  each(keys, function(key) {
    style = validKeys && has(validKeys, key)
      ? amend(style, key, newAccentTheme(), '!object')
      : amend(style, key, null, 'null');
  });
  keys = 'ocdMap, null, undefined, boolean, nan';
  each(keys, function(key) {
    style = amend(style, key, newTheme(), '!object');
  });
  each(TYPE_VALID_KEYS, function(validKeys, key) {
    style = amend(style, key, newTypeTheme(validKeys), '!object');
  });
  style = seal(style);
  return props ? fuse(style, props) : style;
}

/**
 * @typedef {!{
 *   __TYPE: string
 * }} TraceStyle
 */

/**
 * A factory method for TraceStyle objects.
 * @private
 * @param {string=} validKeys
 * @param {Object<string, AnyTheme>=} props
 * @return {!TraceStyle}
 */
function newTraceStyle(validKeys, props) {

  /** @type {!TraceStyle} */
  var style;
  /** @type {string} */
  var keys;

  style = newEmptyObj('Style');
  style = seal(style);
  return props ? fuse(style, props) : style;
}

////////////////////////////////////////////////////////////////////////////////
// HELPER METHODS
////////////////////////////////////////////////////////////////////////////////

/**
 * @private
 * @param {Object=} intro
 * @return {!Object}
 */
function makeDefaultProps(intro) {

  /** @type {!Object} */
  var props;

  props = {
    'ocdMap':    newTheme({ color: 'cyan'    }),
    'null':      newTheme({ color: 'magenta' }),
    'undefined': newTheme({ color: 'magenta' }),
    'boolean':   newTheme({ color: 'magenta' }),
    'nan':       newTheme({ color: 'magenta' }),
    'string': newTypeTheme({
      color: 'yellow',
      delimiter: newTheme({ color: 'red'    }),
      brackets:  newTheme({ color: 'yellow' })
    }),
    'number': newTypeTheme({
      color: 'magenta',
      identifier: newTheme({ color: 'magenta' }),
      delimiter:  newTheme({ color: 'magenta' })
    }),
    'object': newTypeTheme({
      color: 'white',
      identifier: newTheme({ color: 'white' }),
      delimiter:  newTheme({ color: 'white' }),
      brackets:   newTheme({ color: 'white' })
    }),
    'function': newTypeTheme({
      color: 'white',
      identifier: newTheme({ color: 'white' }),
      delimiter:  newTheme({ color: 'white' }),
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
      delimiter:  newTheme({ color: 'white' }),
      brackets:   newTheme({ color: 'white' })
    }),
    'args': newTypeTheme({
      color: 'white',
      identifier: newTheme({ color: 'white' }),
      delimiter:  newTheme({ color: 'white' }),
      brackets:   newTheme({ color: 'white' })
    }),
    'element': newTypeTheme({
      color: 'white',
      identifier: newTheme({ color: 'white' }),
      delimiter:  newTheme({ color: 'white' }),
      brackets:   newTheme({ color: 'white' })
    }),
    'document': newTypeTheme({
      color: 'white',
      identifier: newTheme({ color: 'white' }),
      delimiter:  newTheme({ color: 'white' }),
      brackets:   newTheme({ color: 'white' })
    })
  };

  if (intro) props = fuse(props, {
    header: newAccentTheme({
      color: 'white',
      bg:    'blue',
      bold:  true,
      accent: newTheme({
        color: 'magenta',
        bg:    'blue',
        bold:  true
      })
    }),
    msg: newAccentTheme({
      color: 'white',
      accent: newTheme({ color: 'magenta' })
    })
  }, intro);

  return props;
}

////////////////////////////////////////////////////////////////////////////////
// EXPORTS
////////////////////////////////////////////////////////////////////////////////

/**
 * @typedef {!(TypeStyle|TraceStyle)} Style
 */

/**
 * @private
 * @param {string} method
 * @return {!Style}
 */
module.exports = function getDefaultStyle(method) {
  return FACTORY[method]( VALID_KEYS[method], PROPS[method]() );
};
