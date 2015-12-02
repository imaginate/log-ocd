/**
 * -----------------------------------------------------------------------------
 * TASK FACTORY
 * -----------------------------------------------------------------------------
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


////////////////////////////////////////////////////////////////////////////////
// EXPORT FACTORY
////////////////////////////////////////////////////////////////////////////////

/**
 * @param {(string|!Array<string>)=} defaultMethods
 * @param {!Object<string, function>} methods
 * @return {!Task}
 */
module.exports = function newTask(defaultMethods, methods) {
  return new Task(defaultMethods, methods);
};


////////////////////////////////////////////////////////////////////////////////
// TASK CONSTRUCTOR
////////////////////////////////////////////////////////////////////////////////

/**
 * @private
 * @param {(string|!Array<string>)=} defaultMethods
 * @param {(function|!Object<string, function>)} methods
 * @constructor
 */
function Task(defaultMethods, methods) {

  if (arguments.length === 1) {
    methods = defaultMethods;
    defaultMethods = [];
  }

  if ( !is('!str|strs', defaultMethods) ) throw typeError('defaultMethods');
  if ( !is._obj(methods)                ) throw typeError('methods');

  if ( is.func(methods) ) {
    methods = { main: methods };
    defaultMethods = [ 'main' ];
  }
  else {
    if ( !is('!funcMap', methods) ) throw typeError(
      'a prop in methods', 'each prop value must be a function'
    );
    if ( is.empty(methods) ) throw error(
      'Empty methods object', 'must have at least one method defined'
    );
    if ( is.str(defaultMethods) ) defaultMethods = splitKeys(defaultMethods);
  }

  this.name = getTaskName();
  this.defaultMethods = defaultMethods;
  this.methods = methods;
}

Task.prototype.constructor = Task;


////////////////////////////////////////////////////////////////////////////////
// PUBLIC METHODS
////////////////////////////////////////////////////////////////////////////////

/**
 * @param {string} method
 * @param {string=} val
 */
Task.prototype.run = function run(method, val) {
  if ( !has(this.methods, method) ) throw invalidMethod(method);
  this.methods[method](val);
};


////////////////////////////////////////////////////////////////////////////////
// PRIVATE HELPERS
////////////////////////////////////////////////////////////////////////////////

/**
 * @private
 * @param {string} keys - One of the chars in the following list is used as
 *   the separator (chars listed in order of use):  ","  "-"  "|"  " "
 * @return {!Array<string>}
 */
function splitKeys(keys) {

  /** @type {string} */
  var separator;

  separator = has(keys, ',')
    ? ','   : has(keys, '-')
      ? '-' : has(keys, '|')
        ? '|' : ' ';
  return keys.split(separator);
}

/**
 * @private
 * @param {string} arg - The param name.
 * @param {string=} extra
 * @return {!TypeError}
 */
function typeError(arg, extra) {
  extra = extra ? ' (i.e. ' + extra + ') ' : ' ';
  return new TypeError(
    'Invalid type for ' + arg + ' param' + extra +
    'in newTask, ' + getTaskName() + ', call.'
  );
}

/**
 * @private
 * @param {string} intro
 * @param {string=} extra
 * @return {!Error}
 */
function error(intro, extra) {
  extra = extra ? ' (i.e. ' + extra + ') ' : ' ';
  return new Error(intro + extra + 'for newTask, '+ getTaskName() +', call.');
}

/**
 * @private
 * @param {string} method
 * @return {!RangeError}
 */
function invalidMethod(method) {
  return new RangeError(
    'Invalid method name , ' + method + ', for task, ' getTaskName() + '.'
  );
}

/**
 * @private
 * @return {string}
 */
function getTaskName() {
  return __filename.replace(/^.*?\/?([^\/]+)\.js$/, '$1');
}
