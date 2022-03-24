/**
 * -----------------------------------------------------------------------------
 * LOG-OCD EXAMPLE HELPERS
 * -----------------------------------------------------------------------------
 * @see [log-ocd](https://github.com/imaginate/log-ocd)
 *
 * @author Adam Smith <imagineadamsmith@gmail.com> (https://github.com/imaginate)
 * @copyright 2022 Adam A Smith <imagineadamsmith@gmail.com> (https://github.com/imaginate)
 */

'use strict';

module.exports = function whoops() {
  throw new ReferenceError('Your OCD mojo is down.');
};
