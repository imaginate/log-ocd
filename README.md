# log-ocd [![npm version](https://img.shields.io/badge/npm-1.0.0--beta.4-yellow.svg?style=flat)](https://www.npmjs.com/package/log-ocd)
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

log.pass('A Success Story', 'with easy arg mapping via ocdmap', {
  'ocdmap': true,
  'a': 1.2,
  'b': null,
  'c': 'yum'
});

var errorInst = require('log-ocd/example/error');
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
```
<img src="http://www.algorithmiv.com/images/log-ocd/example-4b4b357ffd482a1713ed.png" alt="log-ocd Example" />


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
