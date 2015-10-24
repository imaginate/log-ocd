### Simply, Awesome Logging for Node.js
[_log-ocd_](https://github.com/imaginate/log-ocd) is the best way to handle logging for Node.js. It is easy to use and makes all logs more legible. Forget ``` console.log ``` and start using [_log-ocd_](https://github.com/imaginate/log-ocd) today!

```javascript
// You can set the config for each or all methods with the constructor or
var log = require('log-ocd')({
  all:   { argMap: true },
  error: { exit: false }
});
// with the setConfig and resetConfig methods
log.setConfig('fail.spaceBefore', 0);
log.setConfig('pass.spaceAfter', 0);
log.resetConfig('pass');

log('a quick message');
log.pass('A `Success` Story', { argMap: true, easily: 'view', given: 'values' }, 'plus', { endless: 'superfluous', extra: 'details' });
log.error('A `Failure`', 'with some `guidance`', { andAnArgMap: 'with', easy: 'titling', of: 'any value' });
log.warn('A Word of `Caution`', 'with a tale of `adventure`');
log.debug('A Beacon of `Hope`', [ 'with', 'all', 'the', 'juicy', 'details' ], /you want to know/g);
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
