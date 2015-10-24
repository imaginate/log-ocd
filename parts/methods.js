/**
 * -----------------------------------------------------------------------------
 * LOG-OCD METHODS
 * -----------------------------------------------------------------------------
 * @version 0.1.0
 * @see [log-ocd]{@link https://github.com/imaginate/log-ocd}
 *
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2015 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Supporting Libraries:
 * @see [are]{@link https://github.com/imaginate/are}
 * @see [Colors]{@link https://www.npmjs.com/package/colors}
 *
 * Annotations:
 * @see [JSDoc3]{@link http://usejsdoc.org/}
 * @see [Closure Compiler specific JSDoc]{@link https://developers.google.com/closure/compiler/docs/js-for-compiler}
 */


// *****************************************************************************
// SECTION: PUBLIC METHODS
// *****************************************************************************


////////////////////////////////////////////////////////////////////////////////
// LOG METHODS
////////////////////////////////////////////////////////////////////////////////

/**
 * @public
 * @this {!LogOCD}
 * @param {*...} args
 * @return {boolean}
 */
function logOCD() {

  if (!arguments.length) {
    this.error('Invalid `log-ocd` Call', 'no arguments given');
    return false;
  }

  logSpaces(this._config.log.spaceBefore);
  logAny(arguments, this._config.log.style, this._config.log.argMap);
  logSpaces(this._config.log.spaceAfter);

  return true;
}

/**
 * @public
 * @this {!LogOCD}
 * @param {*...} args
 * @return {boolean}
 */
logOCD.log = logOCD;

/**
 * @public
 * @this {!LogOCD}
 * @param {string=} header - Only optional if the header config is disabled.
 * @param {*...=} args
 * @return {boolean}
 */
logOCD.pass = function(header) {

  logSpaces(this._config.pass.spaceBefore);

  if (this._config.pass.header) {

    if ( !is._str(header) ) {
      this.error(
        'Invalid `log-ocd pass` Call',
        'invalid type for `header` param (to disable headers use `setConfig`)',
        { argMap: true, header: header }
      );
      return false;
    }

    logHeader(header, 'pass');

    if (arguments.length > 1) {
      logSpaces(1);
      logAny(slice(arguments, 1), 'plain', this._config.pass.argMap);
    }
  }
  else {

    logHeader('Pass', 'pass');

    if (arguments.length) {
      logSpaces(1);
      logAny(arguments, 'plain', this._config.pass.argMap);
    }
  }

  logSpaces(this._config.pass.spaceAfter);

  return true;
};

/**
 * @public
 * @this {!LogOCD}
 * @param {string=} header - Only optional if the header config is disabled.
 * @param {string} msg
 * @param {*...=} args
 * @return {boolean}
 */
logOCD.error = function(header, msg) {

  /** @type {?Stack} */
  var stack;

  stack = this._config.error.stack ? newStack() : null;

  logSpaces(this._config.error.spaceBefore);

  if (this._config.error.header) {

    if ( !are._str(header, msg) ) {
      this.error(
        'Invalid `log-ocd error` Call',
        'invalid type for `header` or `msg` param',
        { argMap: true, header: header, msg: msg }
      );
      return false;
    }

    logHeader(header, 'error');
    logDetails(msg, 'plain');
    stack && logSpaces(1);
    stack && logStack(stack);

    if (arguments.length > 2) {
      logSpaces(1);
      logAny(slice(arguments, 2), 'view', this._config.error.argMap);
    }
  }
  else {

    msg = header;

    if ( !is._str(msg) ) {
      this.error(
        'Invalid `log-ocd error` Call',
        'invalid type for `msg` param (an error message is required)',
        { argMap: true, msg: msg }
      );
      return false;
    }

    logHeader('Error', 'error');
    logDetails(msg, 'plain');
    stack && logSpaces(1);
    stack && logStack(stack);

    if (arguments.length > 1) {
      logSpaces(1);
      logAny(slice(arguments, 1), 'view', this._config.error.argMap);
    }
  }

  logSpaces(this._config.error.spaceAfter);
  this._config.error.exit && process.exit(1);

  return true;
};

/**
 * @public
 * @this {!LogOCD}
 * @param {string=} header - Only optional if the header config is disabled.
 * @param {string} msg
 * @param {*...=} args
 * @return {boolean}
 */
logOCD.warn = function(header, msg) {

  /** @type {?Stack} */
  var stack;

  stack = this._config.warn.stack ? newStack() : null;

  logSpaces(this._config.warn.spaceBefore);

  if (this._config.warn.header) {

    if ( !are._str(header, msg) ) {
      this.error(
        'Invalid `log-ocd warn` Call',
        'invalid type for `header` or `msg` param',
        { argMap: true, header: header, msg: msg }
      );
      return false;
    }

    logHeader(header, 'warn');
    logDetails(msg, 'plain');
    stack && logSpaces(1);
    stack && logStack(stack);

    if (arguments.length > 2) {
      logSpaces(1);
      logAny(slice(arguments, 2), 'view', this._config.warn.argMap);
    }
  }
  else {

    msg = header;

    if ( !is._str(msg) ) {
      this.error(
        'Invalid `log-ocd warn` Call',
        'invalid type for `msg` param (a warning message is required)',
        { argMap: true, msg: msg }
      );
      return false;
    }

    logHeader('Warning', 'warn');
    logDetails(msg, 'plain');
    stack && logSpaces(1);
    stack && logStack(stack);

    if (arguments.length > 1) {
      logSpaces(1);
      logAny(slice(arguments, 1), 'view', this._config.warn.argMap);
    }
  }

  logSpaces(this._config.warn.spaceAfter);

  return true;
};

/**
 * @public
 * @this {!LogOCD}
 * @param {string=} header - Only optional if the header config is disabled.
 * @param {*...=} args
 * @return {boolean}
 */
logOCD.debug = function(header) {

  /** @type {?Stack} */
  var stack;

  stack = this._config.debug.stack ? newStack() : null;

  logSpaces(this._config.debug.spaceBefore);

  if (this._config.debug.header) {

    if ( !is._str(header) ) {
      this.error(
        'Invalid `log-ocd debug` Call',
        'invalid type for `header` param (to disable headers use `setConfig`)',
        { argMap: true, header: header }
      );
      return false;
    }

    logHeader(header, 'debug');
    stack && logSpaces(1);
    stack && logStack(stack);

    if (arguments.length > 1) {
      logSpaces(1);
      logAny(slice(arguments, 1), 'plain', this._config.debug.argMap);
    }
  }
  else {

    logHeader('Debug', 'debug');
    stack && logSpaces(1);
    stack && logStack(stack);

    if (arguments.length) {
      logSpaces(1);
      logAny(arguments, 'plain', this._config.debug.argMap);
    }
  }

  logSpaces(this._config.debug.spaceAfter);

  return true;
};

/**
 * @public
 * @this {!LogOCD}
 * @param {string} msg
 * @param {*...=} args
 * @return {boolean}
 */
logOCD.fail = function(msg) {

  /** @type {?Stack} */
  var stack;

  stack = this._config.fail.stack ? newStack() : null;

  if ( !is._str(msg) ) {
    this.error(
      'Invalid `log-ocd fail` Call',
      'invalid type for `msg` param (a failure message is required)',
      { argMap: true, msg: msg }
    );
    return false;
  }

  logSpaces(this._config.fail.spaceBefore);
  logMsg(msg, 'fail');
  stack && logSpaces(1);
  stack && logStack(stack);

  if (arguments.length > 1) {
    logAny(slice(arguments, 1), 'view', this._config.fail.argMap);
  }

  logSpaces(this._config.fail.spaceAfter);

  return true;
};

/**
 * @public
 * @this {!LogOCD}
 * @param {(!Error|string)=} stack
 * @return {boolean}
 */
logOCD.trace = function(stack) {

  stack = newStack(stack);

  logSpaces(this._config.trace.spaceBefore);
  logStack(stack);
  logSpaces(this._config.trace.spaceAfter);
  this._config.trace.exit && process.exit(1);

  return true;
};


////////////////////////////////////////////////////////////////////////////////
// CONFIG METHODS
////////////////////////////////////////////////////////////////////////////////

/**
 * All Methods & Their Config Properties
 * ------------------------------------------------------------------------
 * | Method | Props                                                       |
 * | :----- | :---------------------------------------------------------- |
 * | all    | spaceBefore, spaceAfter, argMap, header, style, stack, exit |
 * | log    | spaceBefore, spaceAfter, argMap, style                      |
 * | pass   | spaceBefore, spaceAfter, argMap, header                     |
 * | error  | spaceBefore, spaceAfter, argMap, header, stack, exit        |
 * | warn   | spaceBefore, spaceAfter, argMap, header, stack              |
 * | debug  | spaceBefore, spaceAfter, argMap, header, stack              |
 * | fail   | spaceBefore, spaceAfter, argMap, stack                      |
 * | trace  | spaceBefore, spaceAfter, exit                               |
 * ------------------------------------------------------------------------
 *
 * @example [logOCDInstance].setConfig("all.argMap", true);
 *
 * @public
 * @this {!LogOCD}
 * @param {string} prop - <method>.<prop> the method, "all", sets all methods
 * @param {(number|string|boolean)} val
 * @return {boolean}
 */
logOCD.setConfig = function(prop, val) {

  /** @type {string} */
  var method;

  if ( !is._str(prop) || !/\./.test(prop) ) {
    return false;
  }

  method = prop.replace(/^([a-z]+)\..*$/, '$1');
  method = has(CONFIG, method) || method === 'all' ? method : '';
  prop = prop.replace(/^[a-z]+\.(.*)$/, '$1');

  if ( !method || !prop || !isConfigProp(prop, val) ) {
    return false;
  }

  if (method === 'all') {
    if ( !has(CONFIG_PROPS, prop) ) {
      return false;
    }
    each(this._config, function(/** !Object */ obj) {
      if ( has(obj, prop) ) {
        obj[prop] = val;
      }
    });
  }
  else {
    if ( !has(CONFIG[method], prop) ) {
      return false;
    }
    this._config[method][prop] = val;
  }

  return true;
};

/**
 * @public
 * @this {!LogOCD}
 * @param {string...=} methods - if left undefined all methods get reset
 */
logOCD.resetConfig = function() {

  /** @type {string} */
  var method;
  /** @type {number} */
  var i;

  if (arguments.length) {
    i = arguments.length;
    while (i--) {
      method = arguments[i];
      if ( is._str(method) && has(CONFIG, method) ) {
        this._config[method] = clone( CONFIG[method] );
      }
      else {
        return false;
      }
    }
  }
  else {
    this._config = clone(CONFIG, true);
  }
  return true;
};
