/**
 * -----------------------------------------------------------------------------
 * LOG-OCD EXAMPLE ERROR
 * -----------------------------------------------------------------------------
 * @see [log-ocd](https://github.com/imaginate/log-ocd)
 *
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2017 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
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
