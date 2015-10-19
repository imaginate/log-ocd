# The _log-ocd_ Makefile
A custom [makefile](https://github.com/imaginate/log-ocd/blob/master/make.js) is used to handle all [development tasks](https://github.com/imaginate/log-ocd/tree/master/tasks) for [log-ocd](https://github.com/imaginate/log-ocd).
- [Overview](#overview)
- [Examples](#examples)
- [Shortcuts](#shortcuts)
- [Task Methods](#task-methods)
- [Task Values](#task-values)


## Overview
Use the following to execute makefile tasks:
```bash
$ cd <log-ocd-root>
$ node make <task>[-method][=val] <task>[-method][=val]
```
Tasks are executed in the order given and may be repeated. You may view each task's source code in the [tasks directory](https://github.com/imaginate/log-ocd/tree/master/tasks) (each task is saved as ``` <taskname>.js ```).


## Examples
```bash
## The two dashes preceding each task are optional
$ node make --task
$ node make --task-method
$ node make --task-method-method
$ node make --task-method=value
$ node make --task=defaultValue-method-method
$ node make --task=defaultValue-method-method-method=value
```


## Shortcuts
| Shortcut                 | Command Equivalent           |
| :----------------------- | :--------------------------- |
| ```$ node make ```       | ```$ node make --dev ```     |
| ```$ node make --dev ``` | ```$ node make --compile ``` |


## Task Methods
| Task    | Methods         | Default Methods |
| :------ | :-------------- | :-------------- |
| compile | main            | main            |
| test    | all,logs,config | all             |
| version | all             | all             |


## Task Values
| Task    | Method | Value            | Example                                      |
| :------ | :----- | :--------------- | :------------------------------------------- |
| test    | *      | Mocha Options    | ```$ node make --test=bail+reporter=spec ``` |
| version | all    | Semantic Version | ```$ node make --version=1.2.4 ```           |


<br />
--
**Happy Developing,**

<a href="http://www.algorithmiv.com/log-ocd"><img src="http://www.algorithmiv.com/images/aIV-logo.png" alt="Algorithm IV Logo" /></a>
