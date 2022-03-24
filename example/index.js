/**
 * -----------------------------------------------------------------------------
 * LOG-OCD EXAMPLE
 * -----------------------------------------------------------------------------
 * @see [log-ocd](https://github.com/imaginate/log-ocd)
 *
 * @author Adam Smith <imagineadamsmith@gmail.com> (https://github.com/imaginate)
 * @copyright 2022 Adam A Smith <imagineadamsmith@gmail.com> (https://github.com/imaginate)
 *
 * Supporting Libraries:
 * @see [chalk]{@link https://github.com/chalk/chalk}
 * @see [vitals]{@link https://github.com/imaginate/vitals}
 */

'use strict';

// make a local log-ocd instance
var log = require('log-ocd')();
// or make it global
require('log-ocd')('log');

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
log.pass.setStyle({ 'boolean': { 'bold': true } });
log.resetStyle('fail');

log('a quick message');

log.pass('A `Success` Story', 'with easy value mapping', {
  'ocdmap': true,
  '+bold': true,
  '-bold': null,
  ' @ @ ': undefined,
  ' \\_/ ': -1.2
});

var errorInst = require('./error');
log.error(errorInst, 'some !guidance! and a tale of !accented adventure!', {
  'plus': 'automatic mapping',
  'with': '< setConfig({ ocdmap: true }) >'
}, '<<and the BEST stacktrace printing EVER!!!>>');

log.debug('A Beacon of `Hope`', [
  'that', 'AUTOMAGICALLY', 'adjusts'
], [
  'to', 'the', 'set', 'limit'
], /_or your max terminal width_/i);
