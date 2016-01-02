/**
 * -----------------------------------------------------------------------------
 * LOG-OCD: FORMAT VALUES - TYPES
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
var copy   = help.copy;
var each   = help.each;
var freeze = help.freeze;
var fuse   = help.fuse;
var remap  = help.remap;

var newNaturalNum = require('../../../helpers/new-natural-num');

var fromProps = require('./helpers/from-props');

/**
 * @private
 * @param {!Object} types
 * @param {!Object} base
 * @param {!Object} newTypes
 * @return {!Object}
 */
function buildNewProps(types, base, newTypes) {
  newTypes = remap(newTypes, function(props) {
    return fromProps(base, props);
  });
  return fuse(types, newTypes);
}

/** @type {!Object} */
var types;
/** @type {!Object} */
var base;

// PROPS FOR LOG & PREP CATEGORIES
types = {
  'header': {
    'spaceBefore': { type: 'number', val: 1,  setter: newNaturalNum },
    'spaceAfter':  { type: 'number', val: 6,  setter: newNaturalNum },
    'accentMark':  { type: 'string', val: '`'                       },
    'lineLimit':   { type: 'number', val: 0,  setter: newNaturalNum }
  },
  'msg': {
    'accentMark':  { type: 'string', val: '`'                       },
    'lineLimit':   { type: 'number', val: 0,  setter: newNaturalNum },
    'bullet':      { type: 'string', val: '-'                       },
    'indent':      { type: 'number', val: 2,  setter: newNaturalNum }
  },
  'ocdmap': {
    'spaceBefore': { type: 'number', val: 0,  setter: newNaturalNum },
    'spaceAfter':  { type: 'number', val: 0,  setter: newNaturalNum },
    'delimiter':   { type: 'string', val: ':'                       }
  },
  'string': {
    'brackets':    { type: 'string', val: '"' }
  },
  'regexp': {
    'identifier':  { type: 'string', val: ''  },
    'brackets':    { type: 'string', val: '/' }
  },
  'array': {
    'identifier':  { type: 'string', val: ''   },
    'delimiter':   { type: 'string', val: ','  },
    'brackets':    { type: 'string', val: '[]' },
    'indent':      { type: 'number', val: 2, setter: newNaturalNum }
  },
  'object': {
    'identifier':  { type: 'string', val: ''   },
    'delimiter':   { type: 'string', val: ','  },
    'brackets':    { type: 'string', val: '{}' },
    'indent':      { type: 'number', val: 2, setter: newNaturalNum }
  }
};
types = buildNewProps(types, types['array'], {
  'args': {
    'identifier':  { type: 'string', val: '[Arguments] ' }
  }
});
types = buildNewProps(types, types['object'], {
  'function': {
    'identifier':  { type: 'string', val: '[Function] ' }
  },
  'element':  {
    'identifier':  { type: 'string', val: '[DOMElement] ' }
  },
  'document': {
    'identifier':  { type: 'string', val: '[DOMDocument] ' }
  }
});

// PROPS FOR TRACE CATEGORY
base = {
  'spaceBefore': { type: 'number', val: 1, setter: newNaturalNum },
  'spaceAfter':  { type: 'number', val: 1, setter: newNaturalNum }
};
types = buildNewProps(types, base, {
  'title': {},
  'row':   {}
});
base = {
  'spaceBefore': { type: 'number', val: 0, setter: newNaturalNum },
  'spaceAfter':  { type: 'number', val: 0, setter: newNaturalNum },
  'lineLimit':   { type: 'number', val: 0, setter: newNaturalNum }
};
types = buildNewProps(types, base, {
  'root': {
    'identifier': { type: 'string', val: '' },
    'brackets':   { type: 'string', val: '' }
  },
  'event': {
    'title':    { type: 'string', val: 'event' }
  },
  'file': {
    'dirDepth': { type: 'number', val: -1, setter: newNaturalNum.build(-1) },
    'title':    { type: 'string', val: 'file' }
  },
  'module': {
    'title':    { type: 'string', val: 'module' }
  },
  'line': {
    'title':    { type: 'string', val: 'line' }
  },
  'column': {
    'title':    { type: 'string', val: 'column' }
  }
});

module.exports = freeze(types, true);
