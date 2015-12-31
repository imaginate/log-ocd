/**
 * -----------------------------------------------------------------------------
 * LOG-OCD: FORMAT VALUES - TYPE-BASE
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

var freeze = require('../../../helpers').freeze;

/**
 * @type {!Object}
 * @const
 */
var BASE = {
  'header': {
    'spaceBefore': { type: 'number', val: 1   },
    'spaceAfter':  { type: 'number', val: 6   },
    'accentMark':  { type: 'string', val: '`' },
    'lineLimit':   { type: 'number', val: -1  }
  },
  'msg': {
    'accentMark': { type: 'string', val: '`' },
    'lineLimit':  { type: 'number', val: -1  },
    'bullet':     { type: 'string', val: '-' },
    'indent':     { type: 'number', val: 2   }
  },
  'ocdmap': {
    'spaceBefore': { type: 'number', val: 0   },
    'spaceAfter':  { type: 'number', val: 0   },
    'delimiter':   { type: 'string', val: ':' }
  },
  'string': {
    'brackets': { type: 'string', val: '"' }
  },
  'regexp': {
    'identifier': { type: 'string', val: ''  },
    'brackets':   { type: 'string', val: '/' }
  },
  'array': {
    'identifier': { type: 'string', val: ''   },
    'delimiter':  { type: 'string', val: ','  },
    'brackets':   { type: 'string', val: '[]' },
    'indent':     { type: 'number', val: 2    }
  },
  'object': {
    'identifier': { type: 'string', val: ''   },
    'delimiter':  { type: 'string', val: ','  },
    'brackets':   { type: 'string', val: '{}' },
    'indent':     { type: 'number', val: 2    }
  }
};

module.exports = freeze(BASE, true);
