/**
 * -----------------------------------------------------------------------------
 * LOG-OCD LOG HELPERS
 * -----------------------------------------------------------------------------
 * @version 0.0.0
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

/** @type {!Object<string, function(*): boolean>} */
var configProps = {
  spaceBefore: is.num,
  spaceAfter: is.num,
  style: function(val) { return is._str(val) && has(themes, val); },
  exit: is.bool
};

/**
 * @param {string} prop
 * @param {string} val
 * @return {boolean}
 */
function isConfigProp(prop, val) {
  return is._str(prop) && has(configProps, prop) && configProps[prop](val);
}


////////////////////////////////////////////////////////////////////////////////
// FORMATTING METHODS
////////////////////////////////////////////////////////////////////////////////

/**
 * @param {string} str
 * @return {boolean}
 */
function hasAccent(str) {
  return /`.+`/.test(str);
}

/**
 * @param {string} style
 * @param {string} str
 * @return {string}
 */
function getAccentStr(style, str) {
  return hasAccent(str) ? map(str.split('`'),
    function(/** string */ part, /** number */ i) {
      return colors[ (i % 2 ? 'a' : '') + style ](part);
    }
  ).join('') : colors[style](str);
}

/**
 * @param {*} val
 * @return {string}
 */
function makeLogStr(val) {
  return is.str(val) ?
    val || '""' : is.func(val) ?
      '[ Function ]: {' : is.arr(val) ?
        '[ '+ val.join(', ') +' ]' : is.args(val) ?
          '[ '+ slice(val).join(', ') +' ]' : is.regex(val) ?
            '/'+ val.source +'/'+ val.flags : is.obj(val) ?
              '{' : String(val);
}


////////////////////////////////////////////////////////////////////////////////
// LOGGING METHODS
////////////////////////////////////////////////////////////////////////////////

/**
 * @param {string} style
 * @param {!Array} args
 * @param {boolean=} argMap
 */
function log(style, args, argMap) {
  each(args, function(/** * */ val) {
    if ( is.func(val) || ( is.obj(val) && !is('regex|arr', val) ) ) {
      val.argMap || argMap ? logArgMap(val) : logObj(val, style);
    }
    else {
      console.log(is._str(val) ?
        getAccentStr(style, val) : colors[style]( makeLogStr(val) )
      );
    }
  });
}

/**
 * @param {number} spaces
 */
function logSpace(spaces) {
  while (spaces--) {
    console.log('');
  }
}

/**
 * @param {string} style
 * @param {string} msg
 */
function logHeader(style, msg) {
  console.log(
    colors[style](' ') + getAccentStr(style, msg) + colors[style]('        ')
  );
}

/**
 * @param {string} style
 * @param {string} msg
 */
function logDetails(style, msg) {
  console.log( colors[style]('  - ') + getAccentStr(style, msg) );
}

/**
 * @param {!Object} obj
 */
function logArgMap(obj) {

  /** @type {string} */
  var str;

  each(obj, function(/** * */ val, /** string */ key) {
    if (key !== 'argMap') {
      str = makeLogStr(val);
      console.log( colors.plain(key + ': ') + colors.view(str) );
      if ( is.func(val) || str === '{' ) {
        logObj(val, 'view', -1);
      }
    }
  });
}

/**
 * @param {!Object} obj
 * @param {string=} style
 * @param {number=} indent
 */
function logObj(obj, style, indent) {

  /** @type {string} */
  var spaces;
  /** @type {string} */
  var str;

  style = style || 'view';
  indent = indent || 0;

  indent || console.log(
    colors[style]( is.func(obj) ? '[ Function ]: {' : '{' )
  );
  indent = indent < 0 ? 0 : indent;

  spaces = indent ? fill(indent, '  ').join('') : '';

  each(obj, function(/** * */ val, /** string */ key) {
    str = makeLogStr(val);
    if ( is.func(val) || str === '{' ) {
      console.log( colors[style]('  ' + spaces + key + ': ' + str) );
      logObj(val, style, (indent + 1));
    }
    else {
      console.log( colors[style]('  ' + spaces + key + ': ' + str + ',') );
    }
  });
  console.log(
    colors[style]( spaces + '}' + (indent ? ',' : '') )
  );
}
