/**
 * -----------------------------------------------------------------------------
 * LOG-OCD: STYLE NEW-THEME
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

'use strict';

var capFirst = require('../../helpers/cap-first');

var help = require('../../helpers');
var cut    = help.cut;
var each   = help.each;
var freeze = help.freeze;
var fuse   = help.fuse;
var has    = help.has;

var MODIFIERS = 'bold,dim,hidden,inverse,italic,reset,strikethrough,underline';

var COLORS = freeze([
  'black','red','green','yellow','blue','magenta','cyan','white','gray'
]);
var BGS = freeze([
  'black','red','green','yellow','blue','magenta','cyan','white'
]);

var COLOR_ERROR = fuse('invalid color (opts: ', COLORS.join(','), ')');
var BG_ERROR = fuse('invalid bg (opts: ', BGS.join(','), ')');

exports['color'] = setColor;
exports['bg'] = setBG;
each(MODIFIERS, function(mod) {
  exports[mod] = newModSetter(mod);
});
freeze(exports);

/**
 * @this {(Theme|MainTheme)}
 * @param {string} curr
 * @param {string} prev
 * @return {string}
 */
function setColor(curr, prev) {

  /** @type {!Error} */
  var error;
  /** @type {!Array<string>} */
  var keys;

  if ( curr && !has.val(COLORS, curr) ) {
    error = new Error(COLOR_ERROR);
    error.__setter = true;
    error.__type = true;
    throw error;
  }

  keys = this.__keys || [];
  if (prev) keys = cut.val(keys, prev);
  if (curr) keys = fuse.val(keys, curr);
  this.__keys = keys.length ? keys : null;
  return curr;
}

/**
 * @this {(Theme|MainTheme)}
 * @param {string} curr
 * @param {string} prev
 * @return {string}
 */
function setBG(curr, prev) {

  /** @type {!Error} */
  var error;
  /** @type {!Array<string>} */
  var keys;

  if ( curr && !has.val(BGS, curr) ) {
    error = new Error(BG_ERROR);
    error.__setter = true;
    error.__type = true;
    throw error;
  }

  keys = this.__keys || [];
  if (prev) keys = cut.val(keys, prev);
  if (curr) {
    curr = capFirst(curr);
    curr = fuse('bg', curr);
    keys = fuse.val(keys, curr);
  }
  this.__keys = keys.length ? keys : null;
  return curr;
}

/**
 * @private
 * @param {string} mod
 * @return {function}
 */
function newModSetter(mod) {

  /**
   * @this {(Theme|MainTheme)}
   * @param {boolean} curr
   * @param {boolean} prev
   * @return {boolean}
   */
  return function setModifier(curr, prev) {

    /** @type {!Array<string>} */
    var keys;

    keys = this.__keys || [];
    if (prev) keys = cut.val(keys, mod);
    if (curr) keys = fuse.val(keys, mod);
    this.__keys = keys.length ? keys : null;
    return curr;
  };
}
