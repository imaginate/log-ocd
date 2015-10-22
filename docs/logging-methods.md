# The Logging Methods
- [logOCD](#logocd)
- [logOCD.pass](#logocdpass)
- [logOCD.error](#logocderror)
- [logOCD.warn](#logocdwarn)
- [logOCD.debug](#logocddebug)
- [logOCD.fail](#logocdfail)


## logOCD
Handles all basic logging (also accessible via ``` logOCD.log ```).

| Param | Type  |
| :---- | :---- |
| args  | ...*  |


## logOCD.pass
Logs success messages.

| Param  | Type   | Details |
| :----- | :----- | :------ |
| header | string | This param may be disabled. ``` logOCD.setConfig('pass.header', false); ``` |
| args   | ...*   |         |


## logOCD.error
Logs error messages and can trigger ``` process.exit(1); ```.

| Param  | Type   | Details |
| :----- | :----- | :------ |
| header | string | This param may be disabled. ``` logOCD.setConfig('error.header', false); ``` |
| msg    | string | The details for the error. |
| args   | ...*   |         |


## logOCD.warn
Logs warning messages.

| Param  | Type   | Details |
| :----- | :----- | :------ |
| header | string | This param may be disabled. ``` logOCD.setConfig('warn.header', false); ``` |
| msg    | string | The details for the warning. |
| args   | ...*   |         |


## logOCD.debug
Logs debug messages.

| Param  | Type   | Details |
| :----- | :----- | :------ |
| header | string | This param may be disabled. ``` logOCD.setConfig('debug.header', false); ``` |
| args   | ...*   |         |


## logOCD.fail
Logs simple failure messages.

| Param  | Type   | Details |
| :----- | :----- | :------ |
| msg    | string | The details of the failure. |
| args   | ...*   |         |

<br />
--
**Happy Developing,**

<a href="http://www.algorithmiv.com/log-ocd"><img src="http://www.algorithmiv.com/images/aIV-logo.png" alt="Algorithm IV Logo" /></a>
