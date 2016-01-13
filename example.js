/**
 * -----------------------------------------------------------------------------
 * LOG-OCD EXAMPLE
 * -----------------------------------------------------------------------------
 * @see [log-ocd](https://github.com/imaginate/log-ocd)
 *
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2015 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Supporting Libraries:
 * @see [are]{@link https://github.com/imaginate/are}
 * @see [Colors]{@link https://www.npmjs.com/package/colors}
 */

'use strict';

var log = require('./log-ocd')();

// update config for all methods
log.setConfig('all', { ocdmap: true });
// or
log.setConfig({ ocdmap: true });

// update config for one method
log.setConfig('error', { 'throw': false });
// or
log.error.setConfig({ 'throw': false });

// reset config for one method
log.resetConfig('pass');
// or
log.pass.resetConfig();

// set or reset format and style the same as config
log.setFormat('fail', { linesBefore: 0 });
log.fail.setStyle({ msg: { color: 'blue' } });
log.resetStyle('fail');

// note: log-ocd uses two traces so add two to any limit change you make
Error.stackTraceLimit = 6;

log('a quick message');
log.pass('A `Success` Story', { ocdmap: true, easily: 'view', given: 'values' }, 'plus', { endless: 'superfluous', extra: 'details' });
log.error('A `Failure`', 'with some `guidance`', { andAnOCDMap: 'with', easy: 'titling', of: 'any value' });
log.warn('A Word of `Caution`', 'with a tale of `adventure`');
log.debug('A Beacon of `Hope`', [ 'with', 'all', 'the', 'juicy', 'details' ], /you want to know/g);
