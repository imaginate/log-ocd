/**
 * -----------------------------------------------------------------------------
 * LOG-OCD CONFIG
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
// SECTION: CONFIG
// *****************************************************************************


////////////////////////////////////////////////////////////////////////////////
// SET THEMES
////////////////////////////////////////////////////////////////////////////////

/**
 * @private
 * @type {!{
 *   error: (string|!Array<string>),
 *   warn:  (string|!Array<string>),
 *   pass:  (string|!Array<string>),
 *   debug: (string|!Array<string>),
 *   plain: (string|!Array<string>),
 *   view:  (string|!Array<string>),
 *   fail:  (string|!Array<string>)
 * }}
 * @const
 */
var THEMES = {
  error: [ 'white', 'bold', 'bgRed'    ],
  warn:  [ 'white', 'bold', 'bgYellow' ],
  pass:  [ 'white', 'bold', 'bgGreen'  ],
  debug: [ 'white', 'bold', 'bgBlue'   ],
  plain: 'white',
  view:  'cyan',
  fail:  'red'
};

// accent settings for each theme
colors.setTheme(
  merge(clone(THEMES), {
    aerror: [ 'yellow',  'bold', 'bgRed'    ],
    awarn:  [ 'blue',    'bold', 'bgYellow' ],
    apass:  [ 'yellow',  'bold', 'bgGreen'  ],
    adebug: [ 'magenta', 'bold', 'bgBlue'   ],
    aplain: 'magenta',
    aview:  'magenta',
    afail:  'yellow'
  })
);


////////////////////////////////////////////////////////////////////////////////
// DEFINE PRIVATE CONFIG
////////////////////////////////////////////////////////////////////////////////

/**
 * @private
 * @type {!Object}
 * @const
 */
var CONFIG = {
  log: {
    style: 'plain',
    spaceBefore: 1,
    spaceAfter: 1,
    argMap: false
  },
  pass: {
    spaceBefore: 1,
    spaceAfter: 1,
    argMap: false,
    header: true
  },
  error: {
    spaceBefore: 1,
    spaceAfter: 1,
    argMap: false,
    header: true,
    exit: true
  },
  warn: {
    spaceBefore: 1,
    spaceAfter: 1,
    argMap: false,
    header: true
  },
  debug: {
    spaceBefore: 1,
    spaceAfter: 1,
    argMap: false,
    header: true
  },
  fail: {
    spaceBefore: 1,
    spaceAfter: 1,
    argMap: false
  }
};
