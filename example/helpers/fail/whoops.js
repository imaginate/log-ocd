/**
 * -----------------------------------------------------------------------------
 * LOG-OCD EXAMPLE HELPERS
 * -----------------------------------------------------------------------------
 * @see [log-ocd](https://github.com/imaginate/log-ocd)
 *
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2016 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 */

'use strict';

module.exports = function whoops() {
  throw new ReferenceError('Your OCD mojo is down.');
};
