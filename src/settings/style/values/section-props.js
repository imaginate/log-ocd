/**
 * -----------------------------------------------------------------------------
 * LOG-OCD: STYLE VALUES - SECTION PROPS
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

'use strict';

var help = require('../../../helpers');
var freeze = help.freeze;
var remap  = help.remap;

var newThemeProps = require('./helpers/new-theme-props');

/**
 * @typedef {!Object<string, ThemeProps>} SectionProp
 * @typedef {!Object<string, SectionProp>} SectionProps
 */

/** @type {SectionProp} */
var type;
/** @type {SectionProp} */
var stack;

type = {};
stack = {};

type['header'] = {
  'color': 'white',
  'bg':    'blue',
  'bold':  true,
  'accent': {
    color: 'magenta',
    bg:    'blue',
    bold:  true
  }
};

type['msg'] = {
  'color':  'white',
  'accent': { color: 'magenta' }
};

type['ocdmap'] = {
  'color':     'cyan',
  'delimiter': { color: 'cyan' }
};

type['null'] = {
  'color': 'magenta'
};

type['undefined'] = {
  'color': 'magenta'
};

type['boolean'] = {
  'color': 'magenta'
};

type['string'] = {
  'color':     'yellow',
  'delimiter': { color: 'red'    },
  'brackets':  { color: 'yellow' }
};

type['number'] = {
  'color':      'magenta',
  'identifier': { color: 'red'     },
  'delimiter':  { color: 'magenta' }
};

type['nan'] = {
  'color': 'magenta'
};

type['regexp'] = {
  'color':      'green',
  'identifier': { color: 'yellow' },
  'brackets':   { color: 'white'  },
  'flags':      { color: 'white'  }
};

type['array'] = {
  'color':      'white',
  'identifier': { color: 'white' },
  'delimiter':  { color: 'white' },
  'brackets':   { color: 'white' }
};

type['args'] = {
  'color':      'white',
  'identifier': { color: 'white' },
  'delimiter':  { color: 'white' },
  'brackets':   { color: 'white' }
};

type['object'] = {
  'color':      'white',
  'identifier': { color: 'white' },
  'delimiter':  { color: 'white' },
  'brackets':   { color: 'white' }
};

type['function'] = {
  'color':      'white',
  'identifier': { color: 'white' },
  'delimiter':  { color: 'white' },
  'brackets':   { color: 'white' }
};

type['element'] = {
  'color':      'white',
  'identifier': { color: 'white' },
  'delimiter':  { color: 'white' },
  'brackets':   { color: 'white' }
};

type['document'] = {
  'color':      'white',
  'identifier': { color: 'white' },
  'delimiter':  { color: 'white' },
  'brackets':   { color: 'white' }
};

stack['root'] = {
  'color':      'white',
  'identifier': { color: 'white' },
  'brackets':   { color: 'white' }
};

stack['title'] = {
  'color':  'white',
  'bg':     'red',
  'event':  null,
  'file':   null,
  'module': null,
  'line':   null,
  'column': null
};

stack['row'] = {
  'color':  'white',
  'event':  null,
  'file':   null,
  'module': null,
  'line':   null,
  'column': null
};

stack['altrow'] = {
  'color':  'white',
  'bg':     'blue',
  'event':  null,
  'file':   null,
  'module': null,
  'line':   null,
  'column': null
};

/**
 * @type {SectionProps}
 * @const
 */
module.exports = freeze({
  type:  newSectionProp(type),
  stack: newSectionProp(stack)
}, true);

/**
 * @private
 * @param {!Object} props
 * @return {SectionProp}
 */
function newSectionProp(props) {
  return remap(props, function(prop) {
    return newThemeProps(prop);
  });
}
