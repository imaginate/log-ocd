# log-ocd [![npm version](https://badge.fury.io/js/log-ocd.svg)](https://badge.fury.io/js/log-ocd)
### A New Logging Level
[_log-ocd_](https://github.com/imaginate/log-ocd) is the best way to handle [node.js](https://nodejs.org) logging. It will increase your efficiency with **beyond legible logs** and simple architecture. For the ocd among us, you can **easily customize an insane number of details** from error handling to font colors to type bullets and brackets and delimiters, oh my! Quite simply, your logs will never be the same.

## Example
```javascript
// make a local log-ocd instance
var log = require('log-ocd')();
// or make it global
require('log-ocd')('log');

// set the config for all methods
log.setConfig('all', { 'throw': false });
log.setConfig({ 'exit': false });

// set the config for one method
log.setConfig('error', { 'ocdmap': true });
log.trace.setConfig({ 'root': false });

// reset the config for one method
log.resetConfig('warn');
log.debug.resetConfig();

// set and reset the format and style settings
log.setFormat('fail', { 'linesBefore': 0 });
log.warn.setFormat({ 'msg': { 'accentMark': '!' } });
log.debug.setFormat({ 'lineLimit': 35 });
log.fail.setStyle({ 'msg': { 'color': 'blue' } });
log.resetStyle('fail');

log('a quick message');

log.pass('A `Success` Story', 'and easy arg mapping via the ocdmap property', {
  'ocdmap': true,
  'a': 1.2,
  'b': null,
  'c': 'yum'
});

log.error('A `Failure`', 'with some `guidance`', {
  'plus': 'easier',
  'arg': 'mapping',
  'via': 'config.ocdmap',
  '===': true
}, 'and the best (and most flexible) stacktrace printing');

log.warn('A Word of `Caution`', 'with a tale of !accented adventure!');

log.debug('A Beacon of `Hope`', [
  'that', 'AUTOMAGICALLY', 'adjusts'
], [
  'to', 'the', 'line', 'limit'
], /_or your max terminal width_/i);
```
<img src="http://www.algorithmiv.com/images/log-ocd/example-c9783b9285f4f7f1abfd.png" alt="log-ocd Example" />


## Install
```bash
$ npm install log-ocd
```


## Documentation
The docs for version 1.0.0 will be ready with the live launch (i.e. currently in beta).


## Other Details
**contributing:** [see contributing guideline](https://github.com/imaginate/log-ocd/blob/master/CONTRIBUTING.md)<br>
**bugs/improvements:** [open an issue](https://github.com/imaginate/log-ocd/issues)<br>
**questions:** learn@algorithmiv.com


--
**Happy Developing,**

<a href="http://www.algorithmiv.com/log-ocd"><img src="http://www.algorithmiv.com/images/aIV-logo.png" alt="Algorithm IV Logo" /></a>
