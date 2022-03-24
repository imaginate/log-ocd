/**
 * -----------------------------------------------------------------------------
 * LOG-OCD: STYLE VALUES - METHODS
 * -----------------------------------------------------------------------------
 * @version 1.0.0-beta.10
 * @see [log-ocd]{@link https://github.com/imaginate/log-ocd}
 *
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2022 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Supporting Libraries:
 * @see [chalk]{@link https://github.com/chalk/chalk}
 * @see [vitals]{@link https://github.com/imaginate/vitals}
 *
 * Annotations:
 * @see [JSDoc3]{@link http://usejsdoc.org/}
 * @see [Closure Compiler specific JSDoc]{@link https://developers.google.com/closure/compiler/docs/js-for-compiler}
 */

'use strict';

var newTheme = require('../new-theme');
var newMainTheme = require('../new-main-theme');

/**
 * @typedef {{
 *   category: string,
 *   mkProps: ?function
 * }} StyleDefault
 *
 * @typedef {Object<string, !StyleDefault>} StyleDefaults
 */

/**
 * @type {!StyleDefaults}
 * @const
 */
module.exports = {
  'toString': { category: 'prep',  mkProps: null       },
  'get':      { category: 'log',   mkProps: null       },
  'log':      { category: 'log',   mkProps: null       },
  'pass':     { category: 'log',   mkProps: passProps  },
  'error':    { category: 'log',   mkProps: errorProps },
  'warn':     { category: 'log',   mkProps: warnProps  },
  'debug':    { category: 'log',   mkProps: debugProps },
  'fail':     { category: 'log',   mkProps: failProps  },
  'trace':    { category: 'trace', mkProps: null       }
};

function passProps() {
  return {
    header: newMainTheme('type', 'header', {
      bg: 'green',
      accent: newTheme({
        color: 'yellow',
        bg:    'green',
        bold:  true
      })
    })
  };
}

function errorProps() {
  return {
    header: newMainTheme('type', 'header', {
      bg: 'red',
      accent: newTheme({
        color: 'yellow',
        bg:    'red',
        bold:  true
      })
    })
  };
}

function warnProps() {
  return {
    header: newMainTheme('type', 'header', {
      bg: 'yellow',
      accent: newTheme({
        color: 'blue',
        bg:    'yellow',
        bold:  true
      })
    })
  };
}

function debugProps() {
  return {
    header: newMainTheme('type', 'header', {
      bg: 'blue',
      accent: newTheme({
        color: 'magenta',
        bg:    'blue',
        bold:  true
      })
    })
  };
}

function failProps() {
  return {
    header: newMainTheme('type', 'header', {
      bg: 'red',
      accent: newTheme({
        color: 'yellow',
        bg:    'red',
        bold:  true
      })
    })
  };
}
