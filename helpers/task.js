/**
 * -----------------------------------------------------------------------------
 * TASK LIBRARY
 * -----------------------------------------------------------------------------
 * @file A helper library for makefile tasks.
 *
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2015 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Supporting Libraries:
 * @see [are]{@link https://github.com/imaginate/are}
 * @see [Lodash]{@link https://github.com/lodash/lodash}
 *
 * Annotations:
 * @see [JSDoc3]{@link http://usejsdoc.org/}
 * @see [Closure Compiler specific JSDoc]{@link https://developers.google.com/closure/compiler/docs/js-for-compiler}
 */

'use strict';

/** @type {Function<string, function>} */
var log = require('./log');

require('./vitals')(); // appends helper methods and objects to global obj


////////////////////////////////////////////////////////////////////////////////
// DEFINE TASK CONSTRUCTOR
////////////////////////////////////////////////////////////////////////////////

/**
 * @param {string=} name
 * @param {(string|!Array<string>)=} defaultMethods
 * @param {!Object<string, function>} methods
 * @constructor
 */
function Task(name, defaultMethods, methods) {

  are('!str|strs|funcMap=', name, defaultMethods, methods) || log.error(
    'Invalid new `Task` Call',
    'invalid type for `name`, `defaultMethods`, or `methods` param',
    { argMap: true, name: name, defaultMethods: defaultMethods,
      methods: methods }
  );

  if ( !is('!funcMap', methods) ) {

    if ( is('!funcMap', defaultMethods) ) {
      methods = defaultMethods;
      defaultMethods = null;
    }
    else if ( is('!funcMap', name) ) {
      methods = name;
      defaultMethods = null;
      name = null;
    }
    else {
      log.error(
        'Invalid new `Task` Call',
        'a valid object for the `methods` param was not found',
        { argMap: true, name: name, defaultMethods: defaultMethods,
          methods: methods }
      );
    }
  }

  is.empty(methods) && log.error(
    'Invalid new `Task` Call',
    'invalid `methods` param (the given `methods` object was empty)',
    { argMap: true, name: name, defaultMethods: defaultMethods,
      methods: methods }
  );

  if ( !is('!str|arr', defaultMethods) ) {
    defaultMethods = is('!str|arr', name) ? name : null;
    name = null;
  }

  defaultMethods = is.str(defaultMethods) ?
    defaultMethods.split('-') : is.arr(defaultMethods) ?
      defaultMethods : [];

  name = is.str(name) ? name : '';

  this.name = name;
  this.defaultMethods = defaultMethods;
  this.methods = methods;
}

Task.prototype.constructor = Task;


////////////////////////////////////////////////////////////////////////////////
// DEFINE PUBLIC METHODS
////////////////////////////////////////////////////////////////////////////////

/**
 * @param {string} method
 * @param {string=} val
 */
Task.run = function run(method, val) {

  /** @type {string} */
  var name;

  name = this.name;
  has(this.methods, method) || log.error(
    'Invalid `make` Command',
    'invalid task method (i.e. method did not exist in the task\'s methods)',
    { argMap: true, task: name, invalidMethod: method }
  );

  this.methods[method](val);
};


////////////////////////////////////////////////////////////////////////////////
// EXPORT TASK CONSTRUCTOR
////////////////////////////////////////////////////////////////////////////////

/**
 * @param {string=} name
 * @param {(string|!Array<string>)=} defaultMethods
 * @param {!Object<string, function>} methods
 * @return {!Task}
 */
module.exports = function makeTask(name, defaultMethods, methods) {

  /** @type {!Task} */
  var task;

  task = new Task(name, defaultMethods, methods);
  each(Task, function(/** function */ method, /** string */ key) {
    task[key] = bindObj(method, task);
  });
  return task;
};

/**
 * @param {(function|!Object)} obj
 * @param {!Task} task
 * @return {(function|!Object)}
 */
function bindObj(obj, task) {

  /** @type {(function|!Object)} */
  var boundObj;

  is._obj(obj) || log.error(
    'Failed new `Task` Call',
    'error in private helper `bindObj` (invalid type for `obj` param)',
    { argMap: true, obj: obj, task: task }
  );

  boundObj = is.func(obj) ? obj.bind(task) : {};
  each(obj, function(/** (function|!Object) */ prop, /** string */ key) {
    boundObj[key] = bindObj(prop, task);
  });
  return boundObj;
}
