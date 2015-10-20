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
 *
 * Annotations:
 * @see [JSDoc3]{@link http://usejsdoc.org/}
 * @see [Closure Compiler specific JSDoc]{@link https://developers.google.com/closure/compiler/docs/js-for-compiler}
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

log('a quick message');
log.fail('a quick slip');
log.pass('A `Success` Story', { argMap: true, and: 'an', object: 'with' }, { some: 'superfluous', extra: 'details' });
log.error('A `Failure`', 'with some `guidance`', { and: 'an', arg: 'Map', with: 'all', the: 'meaty', states: 'shown' });
log.warn('A Word of `Caution`', 'with a story of `danger`');
log.debug('A Beacon of `Hope`', [ 'with', 'all', 'the', 'juicy', 'details' ], /you want to know/g);
