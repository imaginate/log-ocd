/**
 * -----------------------------------------------------------------------------
 * LOG-OCD: FORMAT VALUES - METHODS
 * -----------------------------------------------------------------------------
 * @version 1.0.0-beta.5
 * @see [log-ocd]{@link https://github.com/imaginate/log-ocd}
 *
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2016 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Supporting Libraries:
 * @see [are]{@link https://github.com/imaginate/are}
 * @see [chalk]{@link https://github.com/chalk/chalk}
 * @see [vitals]{@link https://github.com/imaginate/vitals}
 *
 * Annotations:
 * @see [JSDoc3]{@link http://usejsdoc.org/}
 * @see [Closure Compiler specific JSDoc]{@link https://developers.google.com/closure/compiler/docs/js-for-compiler}
 */

'use strict';

var help = require('../../../helpers');
var freeze = help.freeze;
var remap  = help.remap;

/**
 * @typedef {!{
 *   category:  string,
 *   makeProps: ?function
 * }} FormatDefault
 *
 * @typedef {!Object<string, FormatDefault>} FormatDefaults
 */

/** @type {FormatDefaults} */
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

module.exports = freeze(methods, true);
