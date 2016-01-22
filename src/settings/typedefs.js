/**
 * -----------------------------------------------------------------------------
 * LOG-OCD: SETTINGS JSDOC TYPEDEFS
 * -----------------------------------------------------------------------------
 * @version 1.0.0
 * @see [log-ocd]{@link https://github.com/imaginate/log-ocd}
 *
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2016 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
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

/**
 * @typedef {!{
 *   __TYPE: string,
 *   config: Config,
 *   format: Format,
 *   style:  Style
 * }} Setting
 */

/**
 * @typedef {!{
 *   __TYPE:   string,
 *   __INST:   number,
 *   __maxLen: number,
 *   __indent: number,
 *   __keyLen: number,
 *   __ocdmap: boolean,
 *   toString: Setting,
 *   log:      Setting,
 *   pass:     Setting,
 *   error:    Setting,
 *   warn:     Setting,
 *   debug:    Setting,
 *   fail:     Setting,
 *   trace:    Setting
 * }} Settings
 */
