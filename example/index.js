/**
 * -----------------------------------------------------------------------------
 * LOG-OCD EXAMPLE
 * -----------------------------------------------------------------------------
 * @see [log-ocd](https://github.com/imaginate/log-ocd)
 *
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2016 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Supporting Libraries:
 * @see [are]{@link https://github.com/imaginate/are}
 * @see [vitals]{@link https://github.com/imaginate/vitals}
 * @see [Colors]{@link https://github.com/Marak/colors.js}
 */

'use strict';

// make a local log-ocd instance
var log = require('../log-ocd')();
// or make it global
require('../log-ocd')('log');

// set the config for all methods
log.setConfig('all', { 'throw': false });
log.setConfig({ 'exit': false });

// set the config for one method
log.setConfig('error', { 'ocdmap': true });
log.toString.setConfig({ 'style': false });

// reset the config for one method
log.resetConfig('warn');
log.debug.resetConfig();

// set and reset the format and style settings
log.setFormat('log', { 'linesAfter': 0 });
log.error.setFormat({ 'msg': { 'accentMark': '!' } });
log.debug.setFormat({ 'lineLimit': 35 });
log.trace.setFormat({ 'root': { 'identifier': 'stacktrace-root-dir: ' } });
log.fail.setStyle({ 'msg': { 'color': 'blue' } });
log.resetStyle('fail');

log('a quick message');

log.pass('A `Success` Story', 'with easy arg mapping via ocdmap', {
  'ocdmap': true,
  'a': 1.2,
  'b': null,
  'c': 'yum'
});

var errorInst = require('./error');
log.error(errorInst, 'some !guidance! and a tale of !accented adventure!', {
  'plus': 'easier',
  'arg': 'mapping',
  'via': 'config.ocdmap',
  '===': true
}, 'and the best (and most flexible) stacktrace printing');

log.debug('A Beacon of `Hope`', [
  'that', 'AUTOMAGICALLY', 'adjusts'
], [
  'to', 'the', 'set', 'limit'
], /_or your max terminal width_/i);
