/**
 * -----------------------------------------------------------------------------
 * MAKEFILE
 * -----------------------------------------------------------------------------
 * @file Use `$ node make <task>[-method][=val] ...` to execute make tasks.
 *   Tasks are executed in the order given. Tasks may be repeated. You may view
 *   each task's source code in the "tasks" directory as "taskname.js".
 *
 * @see [makefile docs](https://github.com/imaginate/log-ocd/blob/master/_tasks/README.md)
 *
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2015 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Supporting Libraries:
 * @see [are]{@link https://github.com/imaginate/are}
 * @see [vitals]{@link https://github.com/imaginate/vitals}
 *
 * Annotations:
 * @see [JSDoc3]{@link http://usejsdoc.org/}
 * @see [Closure Compiler specific JSDoc]{@link https://developers.google.com/closure/compiler/docs/js-for-compiler}
 */

'use strict';

// append global helpers for tasks
require('node-vitals')(2, 'all');
global.newTask = require('./_tasks/_helpers/new-task.js');


////////////////////////////////////////////////////////////////////////////////
// MAKEFILE CONFIG
////////////////////////////////////////////////////////////////////////////////

/** @type {string} */
var taskDir = './_tasks';


////////////////////////////////////////////////////////////////////////////////
// PARSE THE COMMAND ARGS
////////////////////////////////////////////////////////////////////////////////

/** @type {!Object<string, string>} */
var shortcuts;
/** @type {!Array<string>} */
var tasks;

shortcuts = {
  dev: 'compile'
};

tasks = process.argv;
tasks = tasks.length > 2 ? slice(tasks, 2) : shortcuts.dev.split(' ');
tasks = remap(tasks, function(task){
  task = task.replace(/^--/, '');
  return has(shortcuts, task) ? shortcuts[task] : task;
});


////////////////////////////////////////////////////////////////////////////////
// PREP THE TASK DIRECTORY
////////////////////////////////////////////////////////////////////////////////

taskDir = taskDir ? taskDir.replace(/([^\/])$/, '$1/') : './_tasks/';

if ( !is.dir(taskDir) ) {
  throw new RangeError('The makefile tasks directory does not exist.');
}


////////////////////////////////////////////////////////////////////////////////
// RUN THE TASKS
////////////////////////////////////////////////////////////////////////////////

each(tasks, function(taskStr) {

  /** @type {string} */
  var defaultVal;
  /** @type {!Array} */
  var methods;
  /** @type {string} */
  var name;
  /** @type {string} */
  var file;
  /** @type {!Task} */
  var task;
  /** @type {string} */
  var val;

  name = getName(taskStr);
  file = taskDir + name + '.js';
  methods = taskStr.split('-');
  defaultVal = getVal( methods.shift() );

  if ( !is.file(file) ) {
    throw new RangeError('The makefile task, ' + name + ' , does not exist.');
  }

  task = require(file);
  task.name = name;

  methods = methods.length ? methods : task.defaultMethods;
  methods = defaultVal ? remap(methods, function(method) {
    return has(method, '=') ? method : method + defaultVal;
  }) : methods;

  each(methods, function(method) {
    val = getVal(method);
    val = val && slice(val, 1); // trim "=" from string start
    method = getName(method);
    task.run(method, val);
  });
});


////////////////////////////////////////////////////////////////////////////////
// PRIVATE HELPERS
////////////////////////////////////////////////////////////////////////////////

/**
 * @param {string} str
 */
function getName(str) {
  return str && str.replace(/^([a-z]+)(?:[^a-z].*)?$/i, '$1');
}

/**
 * @param {string} str
 */
function getVal(str) {
  return str && str.replace(/^[a-z]+(\=.*)?$/i, '$1');
}
