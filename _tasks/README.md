# The Makefile & Its Tasks
This directory consists of tasks called by a custom [makefile](https://github.com/imaginate/log-ocd/blob/master/make.js). Each script in this directory must export one [Task object](https://github.com/imaginate/log-ocd/blob/master/_tasks/_helpers/new-task.js) with at least one method. Below are instructions for using the makefile and its tasks.
- [Overview](#overview)
- [Examples](#examples)
- [Methods](#methods)
- [Values](#values)


## Overview
Use the following to execute makefile tasks:
```bash
$ cd <log-ocd-root>
$ node make <task>[-method][=val] <task>[-method][=val]
```
Tasks are executed in the order given and may be repeated. You may view each task's source code in the [tasks directory](https://github.com/imaginate/log-ocd/tree/master/_tasks) (each task is saved as ``` <taskname>.js ```).


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


## Methods
| Task    | Methods         | Default Methods |
| :------ | :-------------- | :-------------- |
| test    | all,logs,config | all             |
| version | all             | all             |


## Values
| Task    | Method | Value            | Example                                      |
| :------ | :----- | :--------------- | :------------------------------------------- |
| test    | *      | Mocha Options    | ```$ node make --test=bail+reporter=spec ``` |
| version | all    | Semantic Version | ```$ node make --version=1.2.4 ```           |


<br>
--
**Happy Developing,**

<a href="http://www.algorithmiv.com/log-ocd"><img src="http://www.algorithmiv.com/images/aIV-logo.png" alt="Algorithm IV Logo" /></a>
