/**
 * -----------------------------------------------------------------------------
 * LOG-OCD: STYLE VALUES - METHODS
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

var help = require('../../../helpers');
var freeze = help.freeze;
var remap  = help.remap;

var newTheme = require('../new-theme');
var newMainTheme = require('../new-main-theme');

/**
 * @typedef {!{
 *   category:  string,
 *   makeProps: ?function
 * }} StyleDefault
 */

/** @type {!Object<string, StyleDefault>} */
var methods = {
  'toString': { category: 'prep'  },
  'log':      { category: 'log'   },
  'pass':     { category: 'log'   },
  'error':    { category: 'log'   },
  'warn':     { category: 'log'   },
  'debug':    { category: 'log'   },
  'fail':     { category: 'log'   },
  'trace':    { category: 'trace' }
};

// append null makeProps property to each method
methods = remap(methods, function(obj) {
  obj.makeProps = null;
  return obj;
});

// append all makeProps methods
methods['pass'].makeProps = function() {
  return {
    header: newMainTheme('type', 'header', {
      bg: 'green',
      accent: newTheme({
        color: 'yellow',
        bg:    'green'
      })
    })
  };
};
methods['error'].makeProps = function() {
  return {
    header: newMainTheme('type', 'header', {
      bg: 'red',
      accent: newTheme({
        color: 'yellow',
        bg:    'red'
      })
    })
  };
};
methods['warn'].makeProps = function() {
  return {
    header: newMainTheme('type', 'header', {
      bg: 'yellow',
      accent: newTheme({
        color: 'blue',
        bg:    'yellow'
      })
    })
  };
};
methods['debug'].makeProps = function() {
  return {
    header: newMainTheme('type', 'header', {
      bg: 'blue',
      accent: newTheme({
        color: 'magenta',
        bg:    'blue'
      })
    })
  };
};
methods['fail'].makeProps = function() {
  return {
    header: newMainTheme('type', 'header', {
      bg: 'red',
      accent: newTheme({
        color: 'yellow',
        bg:    'red'
      })
    })
  };
};

/**
 * @type {!Object<string, StyleDefault>}
 * @const
 */
module.exports = freeze(methods, true);