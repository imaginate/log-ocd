/**
 * -----------------------------------------------------------------------------
 * LOG-OCD EXAMPLE ERROR
 * -----------------------------------------------------------------------------
 * @see [log-ocd](https://github.com/imaginate/log-ocd)
 *
 * @author Adam Smith <imagineadamsmith@gmail.com> (https://github.com/imaginate)
 * @copyright 2022 Adam A Smith <imagineadamsmith@gmail.com> (https://github.com/imaginate)
 */

'use strict';

var logLife = require('./helpers/log-life');

Error.stackTraceLimit = 6;

try {
  logLife();
}
catch (error) {
  module.exports = error;
}
