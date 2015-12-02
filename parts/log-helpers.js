/**
 * -----------------------------------------------------------------------------
 * LOG-OCD LOG HELPERS
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
// SECTION: LOG HELPERS
// *****************************************************************************


////////////////////////////////////////////////////////////////////////////////
// CONFIG METHODS
////////////////////////////////////////////////////////////////////////////////

/**
 * @private
 * @type {!Object<string, function(*): boolean>}
 * @const
 */
var CONFIG_PROPS = freeze({
  spaceBefore: is.num,
  spaceAfter: is.num,
  argMap: is.bool,
  header: is.bool,
  style(val) { return is._str(val) && has(THEMES, val); },
  stack: is.bool,
  exit: is.bool
});

/**
 * @private
 * @param {string} prop
 * @param {string} val
 * @return {boolean}
 */
function isConfigProp(prop, val) {
  return is._str(prop) && has(CONFIG_PROPS, prop) && CONFIG_PROPS[prop](val);
}


////////////////////////////////////////////////////////////////////////////////
// FORMATTING METHODS
////////////////////////////////////////////////////////////////////////////////

/**
 * @private
 * @param {!Object} obj
 * @return {!Object}
 */
function mapArgs(obj) {

  /** @type {!Object} */
  var map;

  map = newMap('ArgMap');
  map = newProp(map, 'argMap', true);
  map = merge(map, obj);
  return freeze(map);
}

/**
 * @private
 * @param {string} str
 * @param {string} theme
 * @return {string}
 */
function color(str, theme) {
  return colors[theme](str);
}

/**
 * @private
 * @param {string} str
 * @param {string} theme
 * @return {string}
 */
function getAccentStr(str, theme) {
  return has(str, /`[^`]+`/) ? mapArr(str.split(/`+/), (section, i) => {
      return color(section, ( i % 2 ? 'a' : '' ) + theme);
    }).join('') : color(str, theme);
}

/**
 * @private
 * @param {*} val
 * @return {string}
 */
function makeLogStr(val) {
  return is.str(val) ?
    `"${val}"` : is.func(val) ?
      '[Function] {' : is.arr(val) ?
        `[ ${val.join(', ')} ]` : is.args(val) ?
          `[ ${slice(val).join(', ')} ]` : is.regex(val) ?
            val.toString() : is.obj(val) ?
              '{' : String(val);
}


////////////////////////////////////////////////////////////////////////////////
// LOGGING METHODS
////////////////////////////////////////////////////////////////////////////////

/**
 * @private
 * @param {*...} vals
 */
var log = has(global, 'logOCDLogger') ? logOCDLogger : console.log;

/**
 * @private
 * @param {!Array} args
 * @param {string} theme
 * @param {boolean=} argMap
 */
function logAny(args, theme, argMap) {

  each(args, val => {

    if ( is._obj(val) && !is('regex|arr', val) ) {

      if (argMap || val.argMap) {
        logArgMap(val)
        return;
      }

      logObj(val, theme);
      return;
    }

    val = makeLogStr(val);
    val = color(val, theme);
    log(val);
  });
}

/**
 * @private
 * @param {number} spaces
 */
function logSpaces(spaces) {
  while (spaces--) {
    log('');
  }
}

/**
 * @private
 * @param {string} msg
 * @param {string} theme
 */
function logHeader(msg, theme) {
  msg = getAccentStr(msg, theme);
  msg = color(' ', theme) + msg + color('        ', theme);
  log(msg);
}

/**
 * @private
 * @param {string} msg
 * @param {string} theme
 */
function logDetails(msg, theme) {
  msg = getAccentStr(msg, theme);
  msg = color('  - ', theme) + msg;
  log(msg);
}

/**
 * @private
 * @param {string} msg
 * @param {string} theme
 */
function logMsg(msg, theme) {
  msg = getAccentStr(msg, theme);
  log(msg);
}

/**
 * @private
 * @param {!Stack} stack
 */
function logStack(stack) {

  /** @type {function} */
  var getSpace;
  /** @type {string} */
  var theme;
  /** @type {string} */
  var str;

  stack.base && log(`cwd: ${stack.base}`);

  getSpace = (prop, minus) => fillStr(stack[prop] - (minus || 0), ' ');
  str = `${getSpace('event', 10)}  module${getSpace('module', 6)}` +
        `${getSpace('line')}line${getSpace('column')}column `;
  str = color(' Stacktrace', 'error') + color(str, 'bgRed');
  log(str);

  each(stack, (trace, i) => {
    getSpace = prop => fillStr(stack[prop] - trace[prop].length, ' ');
    str = ` ${trace.event}${getSpace('event')} `   +
          ` ${trace.module}${getSpace('module')}   `   +
          ` ${getSpace('line')}${trace.line}     ` +
          ` ${getSpace('column')}${trace.column} `;
    theme = i % 2 ? 'estack' : 'ostack';
    str = color(str, theme);
    log(str);
  });
}

/**
 * @private
 * @param {!Object} obj
 */
function logArgMap(obj) {

  /** @type {!Array<string>} */
  var keys;
  /** @type {string} */
  var str;
  /** @type {*} */
  var val;

  obj = removeProp(obj, 'argMap');
  keys = objKeys(obj).sort( (a, b) => b.length - a.length );
  each(keys, key => {

    val = obj[key];
    str = makeLogStr(val);
    key = color(`${key}: `, 'view') + color(str, 'plain');
    log(key);

    if ( is.func(val) || str === '{' ) {
      logObj(val, 'plain', -1);
    }
  });
}

/**
 * @private
 * @param {!Object} obj
 * @param {string=} theme
 * @param {number=} indent
 */
function logObj(obj, theme, indent) {

  /** @type {string} */
  var spaces;
  /** @type {!Array<string>} */
  var keys;
  /** @type {number} */
  var last;
  /** @type {string} */
  var str;
  /** * */
  var val;

  theme = theme || 'plain';
  indent = indent || 0;

  str = indent ? '' : color(is.func(obj) ? '[Function] {' : '{', theme);
  str && log(str);

  indent = indent < 0 ? 0 : indent;
  spaces = fillStr(indent, '  ');
  keys = objKeys(obj).sort( (a, b) => b.length - a.length );
  last = keys.length - 1;

  each(keys, (key, i) => {
    val = obj[key];
    str = makeLogStr(val);
    if ( is.func(val) || str === '{' ) {
      str = `  ${spaces}${key}: ${str}`;
      str = color(str, theme);
      log(str);
      logObj(val, theme, (indent + 1));
    }
    else {
      str = `  ${spaces}${key}: ${str}` + ( i !== last ? ',' : '' );
      str = color(str, theme);
      log(str);
    }
  });

  str = spaces + '}' + ( indent ? ',' : '' );
  str = color(str, theme);
  log(str);
}
