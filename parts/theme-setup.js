/**
 * -----------------------------------------------------------------------------
 * LOG-OCD THEME SETUP
 * -----------------------------------------------------------------------------
 * @version 1.0.0
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

  log: newMethodTheme(),

  pass: newMethodTheme({
    header: newAccentTheme({
      default: newStyle({
        color: 'white',
        bg:    'green',
        bold:  true
      }),
      marker: '`',
      accent: newStyle({
        color: 'yellow',
        bg:    'green',
        bold:  true
      })
    })
  }),

  error: newMethodTheme({
    header: newAccentTheme({
      default: newStyle({
        color: 'white',
        bg:    'red',
        bold:  true
      }),
      marker: '`',
      accent: newStyle({
        color: 'yellow',
        bg:    'red',
        bold:  true
      })
    }),

    msg: newAccentTheme({
      default: newStyle({
        color: 'white'
      }),
      marker: '`',
      accent: newStyle({
        color: 'magenta'
      })
    })
  }),

  warn: newMethodTheme({
    header: newAccentTheme({
      default: newStyle({
        color: 'white',
        bg:    'yellow',
        bold:  true
      }),
      marker: '`',
      accent: newStyle({
        color: 'blue',
        bg:    'yellow',
        bold:  true
      })
    }),

    msg: newAccentTheme({
      default: newStyle({
        color: 'white'
      }),
      marker: '`',
      accent: newStyle({
        color: 'magenta'
      })
    })
  }),

  debug: newMethodTheme({
    header: newAccentTheme({
      default: newStyle({
        color: 'white',
        bg:    'blue',
        bold:  true
      }),
      marker: '`',
      accent: newStyle({
        color: 'magenta',
        bg:    'blue',
        bold:  true
      })
    })
  }),

  fail: newMethodTheme({
    msg: newAccentTheme({
      default: newStyle({
        color: 'red'
      }),
      marker: '`',
      accent: newStyle({
        color: 'yellow'
      })
    })
  })
});

colors.setTheme();
