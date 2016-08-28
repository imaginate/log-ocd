/**
 * -----------------------------------------------------------------------------
 * LOG-OCD: CONFIG JSDOC TYPEDEFS
 * -----------------------------------------------------------------------------
 * @version 1.0.0-beta.8
 * @see [log-ocd]{@link https://github.com/imaginate/log-ocd}
 *
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2016 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Supporting Libraries:
 * @see [chalk]{@link https://github.com/chalk/chalk}
 * @see [vitals]{@link https://github.com/imaginate/vitals}
 *
 * Annotations:
 * @see [JSDoc3]{@link http://usejsdoc.org/}
 * @see [Closure Compiler specific JSDoc]{@link https://developers.google.com/closure/compiler/docs/js-for-compiler}
 */

/**
 * @typedef {!{
 *   __TYPE: string,
 *   logger: function,
 *   ocdmap: boolean,
 *   header: boolean,
 *   style:  boolean,
 *   stack:  boolean,
 *   throw:  boolean,
 *   exit:   boolean,
 *   msg:    boolean
 * }} LogConfig
 */

/**
 * @typedef {!{
 *   __TYPE: string,
 *   style:  boolean
 * }} PrepConfig
 */

/**
 * @typedef {!{
 *   __TYPE: string,
 *   logger: function,
 *   style:  boolean,
 *   throw:  boolean,
 *   exit:   boolean,
 *   root:   boolean,
 *   title:  boolean,
 *   event:  boolean,
 *   file:   boolean,
 *   module: boolean,
 *   line:   boolean,
 *   column: boolean
 * }} TraceConfig
 */

/**
 * @typedef {!(LogConfig|TraceConfig|PrepConfig)} Config
 */
