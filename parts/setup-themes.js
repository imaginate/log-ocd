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
// SECTION: THEME SETUP
// *****************************************************************************

/**
 * @private
 * @type {!LogOCDTheme}
 */
var logOCDTheme = newLogOCDTheme({
  default: newMethodTheme({
    header: newAccentTheme({
      default: newStyle({}),
      accent: newStyle({})
    }),
    msg: newAccentTheme({
      default: newStyle({}),
      accent: newStyle({})
    }),
    args: newTypeThemes({
      default: newStyle({}),
      null: newTypeTheme({
        values: newTypeValues({}),
        styles: newTypeStyles({})
      }),
      undefined: newTypeTheme({
        values: newTypeValues({}),
        styles: newTypeStyles({})
      }),
      boolean: newTypeTheme({
        values: newTypeValues({}),
        styles: newTypeStyles({})
      }),
      string: newTypeTheme({
        values: newTypeValues({}),
        styles: newTypeStyles({})
      }),
      number: newTypeTheme({
        values: newTypeValues({}),
        styles: newTypeStyles({})
      }),
      nan: newTypeTheme({
        values: newTypeValues({}),
        styles: newTypeStyles({})
      }),
      object: newTypeTheme({
        values: newTypeValues({}),
        styles: newTypeStyles({})
      }),
      function: newTypeTheme({
        values: newTypeValues({}),
        styles: newTypeStyles({})
      }),
      regexp: newTypeTheme({
        values: newTypeValues({}),
        styles: newTypeStyles({})
      }),
      array: newTypeTheme({
        values: newTypeValues({}),
        styles: newTypeStyles({})
      }),
      args: newTypeTheme({
        values: newTypeValues({}),
        styles: newTypeStyles({})
      }),
      element: newTypeTheme({
        values: newTypeValues({}),
        styles: newTypeStyles({})
      }),
      document: newTypeTheme({
        values: newTypeValues({}),
        styles: newTypeStyles({})
      }),
      argMap: newArgMapTheme({
        key: newTypeTheme({
          values: newTypeValues({}),
          styles: newTypeStyles({})
        }),
        value: newStyle({})
      })
    })
  }),
  log:     newMethodTheme({}),
  pass:    newMethodTheme({}),
  error:   newMethodTheme({}),
  warn:    newMethodTheme({}),
  debug:   newMethodTheme({}),
  fail:    newMethodTheme({})
});

// DEFAULT THEMES
// {
//   error: [ 'white', 'bold', 'bgRed'    ],
//   warn:  [ 'white', 'bold', 'bgYellow' ],
//   pass:  [ 'white', 'bold', 'bgGreen'  ],
//   debug: [ 'white', 'bold', 'bgBlue'   ],
//   plain: 'white',
//   view:  'cyan',
//   fail:  'red'
// }
// {
//   aerror: [ 'yellow',  'bold', 'bgRed'    ],
//   awarn:  [ 'blue',    'bold', 'bgYellow' ],
//   apass:  [ 'yellow',  'bold', 'bgGreen'  ],
//   adebug: [ 'magenta', 'bold', 'bgBlue'   ],
//   aplain: 'magenta',
//   aview:  'magenta',
//   afail:  'yellow'
// }

colors.setTheme();
