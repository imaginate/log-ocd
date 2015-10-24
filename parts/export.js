/**
 * -----------------------------------------------------------------------------
 * EXPORT LOG-OCD
 * -----------------------------------------------------------------------------
 * @version 0.1.0
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


'use strict';


////////////////////////////////////////////////////////////////////////////////
// EXPORT LOG-OCD FACTORY
////////////////////////////////////////////////////////////////////////////////

/**
 * @public
 * @param {!Object=} options
 * @param {!Object=} options.all
 * @param {!Object=} options.log
 * @param {!Object=} options.pass
 * @param {!Object=} options.error
 * @param {!Object=} options.warn
 * @param {!Object=} options.debug
 * @param {!Object=} options.fail
 * @param {number=} options.all.spaceBefore
 * @param {number=} options.all.spaceAfter
 * @param {boolean=} options.all.argMap
 * @param {boolean=} options.all.header
 * @param {boolean=} options.all.exit
 * @param {string=} options.all.style
 * @param {number=} options.log.spaceBefore
 * @param {number=} options.log.spaceAfter
 * @param {boolean=} options.log.argMap
 * @param {string=} options.log.style
 * @param {number=} options.pass.spaceBefore
 * @param {number=} options.pass.spaceAfter
 * @param {boolean=} options.pass.argMap
 * @param {boolean=} options.pass.header
 * @param {number=} options.error.spaceBefore
 * @param {number=} options.error.spaceAfter
 * @param {boolean=} options.error.argMap
 * @param {boolean=} options.error.header
 * @param {boolean=} options.error.exit
 * @param {number=} options.warn.spaceBefore
 * @param {number=} options.warn.spaceAfter
 * @param {boolean=} options.warn.argMap
 * @param {boolean=} options.warn.header
 * @param {number=} options.debug.spaceBefore
 * @param {number=} options.debug.spaceAfter
 * @param {boolean=} options.debug.argMap
 * @param {boolean=} options.debug.header
 * @param {number=} options.fail.spaceBefore
 * @param {number=} options.fail.spaceAfter
 * @param {boolean=} options.fail.argMap
 * @return {!LogOCD}
 */
module.exports = function newLogOCD(options) {

  /** @type {!Object} */
  var instance = {};
  /** @type {!LogOCD} */
  var LogOCD = logOCD.bind(instance);

  each(logOCD, function(/** function */ method, /** string */ key) {
    LogOCD[key] = method.bind(instance);
  });
  instance._config = clone(CONFIG, true);
  is.obj(options) && setOptions(options, instance);

  return LogOCD;
};

/**
 * @private
 * @param {!Object} options
 * @param {!LogOCD} instance
 */
function setOptions(options, instance) {

  each(options, function(/** !Object */ obj, /** string */ method) {

    if ( !is.obj(obj) ) {
      return;
    }

    if (method === 'all') {
      each(obj, function(/** * */ val, /** string */ prop) {
        if ( has(CONFIG_PROPS, prop) && isConfigProp(prop, val) ) {
          // set each of the instance's config methods
          each(instance._config,
            function(/** !Object */ _obj, /** string */ _method) {
              if ( has(CONFIG[_method], prop) ) {
                _obj[prop] = val;
              }
            }
          );
        }
      });
    }
    else {
      if ( !has(CONFIG, method) ) {
        return;
      }      
      each(obj, function(/** * */ val, /** string */ prop) {
        // set a specific config method for the instance
        if ( has(CONFIG[method], prop) && isConfigProp(prop, val) ) {
          instance._config[method][prop] = val;
        }
      });
    }
  });
}

// INSERT gen-helpers.js

// INSERT config.js

// INSERT log-helpers.js

// INSERT methods.js
