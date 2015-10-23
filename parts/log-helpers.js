/**
 * -----------------------------------------------------------------------------
 * LOG-OCD LOG HELPERS
 * -----------------------------------------------------------------------------
 * @version 0.0.2
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
var CONFIG_PROPS = {
  spaceBefore: is.num,
  spaceAfter: is.num,
  argMap: is.bool,
  header: is.bool,
  style: function(val) { return is._str(val) && has(THEMES, val); },
  stack: is.bool,
  exit: is.bool
};

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
 * @param {string} str
 * @return {boolean}
 */
function hasAccent(str) {
  return /`.+`/.test(str);
}

/**
 * @private
 * @param {string} style
 * @param {string} str
 * @return {string}
 */
function getAccentStr(style, str) {
  return hasAccent(str) ? mapArr(str.split('`'),
    function(/** string */ part, /** number */ i) {
      return colors[ (i % 2 ? 'a' : '') + style ](part);
    }
  ).join('') : colors[style](str);
}

/**
 * @private
 * @param {*} val
 * @return {string}
 */
function makeLogStr(val) {
  return is.str(val) ?
    val || '""' : is.func(val) ?
      '[Function] {' : is.arr(val) ?
        '[ '+ val.join(', ') +' ]' : is.args(val) ?
          '[ '+ slice(val).join(', ') +' ]' : is.regex(val) ?
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
 * @param {string} style
 * @param {!Array} args
 * @param {boolean=} argMap
 */
function logAny(style, args, argMap) {
  each(args, function(/** * */ val) {
    if ( is.func(val) || ( is.obj(val) && !is('regex|arr', val) ) ) {
      val.argMap || argMap ? logArgMap(val) : logObj(val, style);
    }
    else {
      log(is._str(val) ?
        getAccentStr(style, val) : colors[style]( makeLogStr(val) )
      );
    }
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
 * @param {string} style
 * @param {string} msg
 */
function logHeader(style, msg) {
  log(
    colors[style](' ') + getAccentStr(style, msg) + colors[style]('        ')
  );
}

/**
 * @private
 * @param {string} style
 * @param {string} msg
 */
function logDetails(style, msg) {
  log( colors[style]('  - ') + getAccentStr(style, msg) );
}

/**
 * @private
 * @param {!Stack} stack
 */
function logStack(stack) {

  /** @type {function} */
  var color;
  /** @type {string} */
  var str;

  str = fillStr(stack.event - 10, ' ');
  str += '  file';
  str += fillStr(stack.file - 4, ' ');
  str += fillStr(stack.line, ' ');
  str += 'line';
  str += fillStr(stack.column, ' ');
  str += 'column ';
  log( colors.error(' Stacktrace') + colors.bgRed(str) );

  each(stack, function(/** !Trace */ trace, /** number */ i) {
    color = i % 2 ? colors.estack : colors.ostack;
    str = ' ' + trace.event;
    str += fillStr(stack.event - trace.event.length, ' ');
    str += '  ' + trace.file;
    str += fillStr(stack.file - trace.file.length, ' ');
    str += '    ';
    str += fillStr(stack.line - trace.line.length, ' ');
    str += trace.line;
    str += '      ';
    str += fillStr(stack.column - trace.column.length, ' ');
    str += trace.column + ' ';
    log( color(str) );
    //trace.dir && log( color(' - ' + trace.dir) );
  });
}

/**
 * @private
 * @param {!Object} obj
 */
function logArgMap(obj) {

  /** @type {string} */
  var str;

  each(obj, function(/** * */ val, /** string */ key) {
    if (key !== 'argMap') {
      str = makeLogStr(val);
      log( colors.view(key + ': ') + colors.plain(str) );
      if ( is.func(val) || str === '{' ) {
        logObj(val, 'plain', -1);
      }
    }
  });
}

/**
 * @private
 * @param {!Object} obj
 * @param {string=} style
 * @param {number=} indent
 */
function logObj(obj, style, indent) {

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

  style = style || 'plain';
  indent = indent || 0;

  indent || log(
    colors[style]( is.func(obj) ? '[Function] {' : '{' )
  );
  indent = indent < 0 ? 0 : indent;

  spaces = fillStr(indent, '  ');

  keys = objKeys(obj);
  last = keys.length - 1;
  each(keys, function(/** string */ key, /** number */ i) {
    val = obj[key];
    str = makeLogStr(val);
    if ( is.func(val) || str === '{' ) {
      log( colors[style]('  ' + spaces + key + ': ' + str) );
      logObj(val, style, (indent + 1));
    }
    else {
      log(
        colors[style](
          '  ' + spaces + key + ': ' + str + ( i !== last ? ',' : '' )
        )
      );
    }
  });
  log(
    colors[style]( spaces + '}' + (indent ? ',' : '') )
  );
}
