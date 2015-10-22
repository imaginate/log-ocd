/**
 * -----------------------------------------------------------------------------
 * LOG-OCD THEME SETUP
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
    // default header
    header: newAccentTheme({
      default: newStyle({
        color: 'white',
        bg:    'black',
        bold:  true
      }),
      marker: '`',
      accent: newStyle({
        color: 'magenta',
        bg:    'black',
        bold:  true
      })
    }),
    // default msg
    msg: newAccentTheme({
      default: newStyle({
        color: 'white'
      }),
      marker: '`',
      accent: newStyle({
        color: 'magenta'
      })
    }),
    // default args
    args: newTypeThemes({
      default: newStyle({
        color: 'white'
      }),
      // default null
      null: newTypeTheme({
        values: newTypeValues({
          placeholder: 'null'
        }),
        styles: newTypeStyles({
          default: newStyle({
            color: 'magenta'
          })
        })
      }),
      // default undefined
      undefined: newTypeTheme({
        values: newTypeValues({
          placeholder: 'undefined'
        }),
        styles: newTypeStyles({
          default: newStyle({
            color: 'magenta'
          })
        })
      }),
      // default boolean
      boolean: newTypeTheme({
        values: newTypeValues({}),
        styles: newTypeStyles({
          default: newStyle({
            color: 'magenta'
          })
        })
      }),
      // default string
      string: newTypeTheme({
        values: newTypeValues({
          separators: ' +',
          brackets:   '"',
          indent:     '  ',
          limit:      150
        }),
        styles: newTypeStyles({
          separators: newStyle({
            color: 'red'
          }),
          default: newStyle({
            color: 'yellow'
          }),
          brackets: newStyle({
            color: 'yellow'
          })
        })
      }),
      // default number
      number: newTypeTheme({
        values: newTypeValues({}),
        styles: newTypeStyles({
          default: newStyle({
            color: 'magenta'
          })
        })
      }),
      // default nan
      nan: newTypeTheme({
        values: newTypeValues({
          placeholder: 'NaN'
        }),
        styles: newTypeStyles({
          default: newStyle({
            color: 'magenta'
          })
        })
      }),
      // default object
      object: newTypeTheme({
        values: newTypeValues({
          separators: ', ',
          outBracket: '}',
          inBracket:  '{',
          indent:     '  ',
          limit:      150
        }),
        styles: newTypeStyles({
          separators: newStyle({
            color: 'white'
          }),
          default: newStyle({
            color: 'white'
          }),
          brackets: newStyle({
            color: 'white'
          })
        })
      }),
      // default function
      function: newTypeTheme({
        values: newTypeValues({
          separators: ', ',
          outBracket: '}',
          inBracket:  '{',
          indent:     '  ',
          intro:      '[Function] ',
          limit:      150
        }),
        styles: newTypeStyles({
          separators: newStyle({
            color: 'white'
          }),
          default: newStyle({
            color: 'white'
          }),
          brackets: newStyle({
            color: 'white'
          }),
          intro: newStyle({
            color: 'white'
          })
        })
      }),
      // default regexp
      regexp: newTypeTheme({
        values: newTypeValues({
          brackets: '/'
        }),
        styles: newTypeStyles({
          default: newStyle({
            color: 'white'
          }),
          brackets: newStyle({
            color: 'yellow'
          }),
          flags: newStyle({
            color: 'yellow'
          })
        })
      }),
      // default array
      array: newTypeTheme({
        values: newTypeValues({
          separators: ', ',
          outBracket: ']',
          inBracket:  '[',
          indent:     '  ',
          limit:      150
        }),
        styles: newTypeStyles({
          separators: newStyle({
            color: 'white'
          }),
          default: newStyle({
            color: 'white'
          }),
          brackets: newStyle({
            color: 'white'
          })
        })
      }),
      // default arguments
      args: newTypeTheme({
        values: newTypeValues({
          separators: ', ',
          outBracket: ']',
          inBracket:  '[',
          indent:     '  ',
          intro:      '[Arguments] ',
          limit:      150
        }),
        styles: newTypeStyles({
          separators: newStyle({
            color: 'white'
          }),
          default: newStyle({
            color: 'white'
          }),
          brackets: newStyle({
            color: 'white'
          }),
          intro: newStyle({
            color: 'white'
          })
        })
      }),
      // default element
      element: newTypeTheme({
        values: newTypeValues({
          separators: ', ',
          outBracket: '}',
          inBracket:  '{',
          indent:     '  ',
          intro:      '[Element] ',
          limit:      150
        }),
        styles: newTypeStyles({
          separators: newStyle({
            color: 'white'
          }),
          default: newStyle({
            color: 'white'
          }),
          brackets: newStyle({
            color: 'white'
          }),
          intro: newStyle({
            color: 'white'
          })
        })
      }),
      // default document
      document: newTypeTheme({
        values: newTypeValues({
          separators: ', ',
          outBracket: '}',
          inBracket:  '{',
          indent:     '  ',
          intro:      '[Document] ',
          limit:      150
        }),
        styles: newTypeStyles({
          separators: newStyle({
            color: 'white'
          }),
          default: newStyle({
            color: 'white'
          }),
          brackets: newStyle({
            color: 'white'
          }),
          intro: newStyle({
            color: 'white'
          })
        })
      }),
      // default argMap
      argMap: newArgMapTheme({
        key: newTypeTheme({
          values: newTypeValues({
            separators: ': '
          }),
          styles: newTypeStyles({
            color: 'cyan'
          })
        }),
        value: newBasicTypeThemes()
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
