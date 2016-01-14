### Simply, Awesome Logging for Node.js
[_log-ocd_](https://github.com/imaginate/log-ocd) is the best way to handle logging for Node.js. It is easy to use and makes all logs more legible. Forget ``` console.log ``` and start using [_log-ocd_](https://github.com/imaginate/log-ocd) today!

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


## Getting Started
```bash
$ npm install log-ocd
```
```javascript
var log = require('log-ocd')([options]);
```


## API Documentation
- [log-ocd config methods](https://github.com/imaginate/log-ocd/blob/master/docs/config-methods.md)
- [log-ocd logging methods](https://github.com/imaginate/log-ocd/blob/master/docs/logging-methods.md)


## Contact Us
- [Open an issue](https://github.com/imaginate/log-ocd/issues) on this GitHub repository
- Send an email to [learn@algorithmiv.com](mailto:learn@algorithmiv.com)


--
**Happy Developing,**

<a href="http://www.algorithmiv.com/log-ocd"><img src="http://www.algorithmiv.com/images/aIV-logo.png" alt="Algorithm IV Logo" /></a>
