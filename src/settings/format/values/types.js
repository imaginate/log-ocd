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
var freeze = help.freeze;
var fuse   = help.fuse;
var remap  = help.remap;

var fromTypeBase = require('./helpers/from-type-base');

/** @type {!Object} */
var types;

types = {
  'header':   { base: 'header', props: null },
  'msg':      { base: 'msg',    props: null },
  'ocdmap':   { base: 'ocdmap', props: null },
  'string':   { base: 'string', props: null },
  'regexp':   { base: 'regexp', props: null },
  'array':    { base: 'array',  props: null },
  'args':     { base: 'array',  props: { identifier: '[Arguments] '   } },
  'object':   { base: 'object', props: null },
  'function': { base: 'object', props: { identifier: '[Function] '    } },
  'element':  { base: 'object', props: { identifier: '[DomElement] '  } },
  'document': { base: 'object', props: { identifier: '[DomDocument] ' } }
};

types = remap(types, function(obj) {
  return fromTypeBase(obj.base, obj.props);
});

types = fuse(types, {
  'root': {
    'spaceBefore': { type: 'number', val: 0  },
    'spaceAfter':  { type: 'number', val: 0  },
    'identifier':  { type: 'string', val: '' },
    'lineLimit':   { type: 'number', val: 60 },
    'brackets':    { type: 'string', val: '' }
  },
  'title': {
    'spaceBefore': { type: 'number', val: 1 },
    'spaceAfter':  { type: 'number', val: 1 }
  },
  'row': {
    'spaceBefore': { type: 'number', val: 1 },
    'spaceAfter':  { type: 'number', val: 1 }
  },
  'event': {
    'spaceBefore': { type: 'number', val: 0       },
    'spaceAfter':  { type: 'number', val: 0       },
    'lineLimit':   { type: 'number', val: 25      },
    'title':       { type: 'string', val: 'event' }
  },
  'file': {
    'spaceBefore': { type: 'number', val: 0      },
    'spaceAfter':  { type: 'number', val: 0      },
    'lineLimit':   { type: 'number', val: 25     },
    'dirDepth':    { type: 'number', val: -1     },
    'title':       { type: 'string', val: 'file' }
  },
  'module': {
    'spaceBefore': { type: 'number', val: 0        },
    'spaceAfter':  { type: 'number', val: 0        },
    'lineLimit':   { type: 'number', val: 25       },
    'title':       { type: 'string', val: 'module' }
  }
});

module.exports = freeze(types, true);
