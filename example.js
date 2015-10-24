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

// You can set the config for each or all methods with the constructor or
var log = require('./src/log-ocd')({
  all:   { argMap: true },
  error: { exit: false }
});
// with the setConfig and resetConfig methods
log.setConfig('fail.spaceBefore', 0);
log.setConfig('pass.spaceAfter', 0);
log.resetConfig('pass');

// note: log-ocd uses two traces so add two to any limit change you make
Error.stackTraceLimit = 6;

log('a quick message');
log.pass('A `Success` Story', { argMap: true, easily: 'view', given: 'values' }, 'plus', { endless: 'superfluous', extra: 'details' });
log.error('A `Failure`', 'with some `guidance`', { andAnArgMap: 'with', easy: 'titling', of: 'any value' });
log.warn('A Word of `Caution`', 'with a tale of `adventure`');
log.debug('A Beacon of `Hope`', [ 'with', 'all', 'the', 'juicy', 'details' ], /you want to know/g);
