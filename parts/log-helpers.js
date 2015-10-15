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
 * @see [Lodash]{@link https://github.com/lodash/lodash}
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
  spaceBefore: is.num(val),
  spaceAfter: is.num(val),
  style: function(val) { return is._str(val) && has(themes, val); },
  exit: is.bool
};

/**
 * @param {string} prop
 * @param {string} val
 * @return {boolean}
 */
function checkConfigVal(prop, val) {
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
 * @param {*} val
 * @return {string}
 */
function makeLogStr(val) {
  return ( is.str(val) ?
    val || '""' : is.func(val) ?
      'function() { ... } props => {' : is.arr(val) ?
        '[ '+ val.join(', ') +' ]' : is.regex(val) ?
          '/'+ val.source +'/'+ val.flags : is.obj(val) ?
            '{' : String(val)
  );
}


////////////////////////////////////////////////////////////////////////////////
// LOGGING METHODS
////////////////////////////////////////////////////////////////////////////////

/**
 * @param {string} style
 * @param {!Array} args
 */
function log(style, args) {

  is._str(style) || helperError('log', 'style', style);
  has(themes, style) || helperError('log', 'style', style);
  is.arr(args) || helperError('log', 'args', args);

  args.forEach(function(/** * */ val) {
    if ( is.func(val) || ( is.obj(val) && !is('regex|arr', val) ) ) {
      val.argMap ? logArgs(val) : logObj(val, style);
    }
    else {
      console.log(is._str(val) && hasAccent(val) ?
        val.split('`').map(function(/** string */ part, /** number */ i) {
          return colors[ (i % 2 ? 'a' : '') + style ](part);
        }).join('')
        : colors[style]( makeStr(val) )
      );
    }
  });
}

/**
 * @param {number} spaces
 * @return {boolean}
 */
function logSpace(spaces) {

  is.num(spaces) || helperError('logSpace', 'spaces', spaces);

  while (spaces--) {
    console.log('');
  }
  return true;
}

/**
 * @param {string} style
 * @param {string} msg
 */
function logHeader(style, msg) {

  is._str(style) || helperError('logHeader', 'style', style);
  has(themes, style) || helperError('logHeader', 'style', style);
  is._str(msg) || helperError('logHeader', 'msg', msg);

  msg = hasAccent(msg) ? msg.split('`').map(
    function(/** string */ part, /** number */ i) {
      return colors[ (i % 2 ? 'a' : '') + style ](part);
    }
  ).join('') : colors[style](msg);
  console.log( colors[style](' ') + msg + colors[style]('        ') );
}

/**
 * @param {string} style
 * @param {string} msg
 */
function logDetails(style, msg) {

  is._str(style) || helperError('logDetails', 'style', style);
  has(themes, style) || helperError('logDetails', 'style', style);
  is._str(msg) || helperError('logDetails', 'msg', msg);

  msg = hasAccent(msg) ? msg.split('`').map(
    function(/** string */ part, /** number */ i) {
      return colors[ (i % 2 ? 'a' : '') + style ](part);
    }
  ).join('') : colors[style](msg);
  console.log( colors[style]('  - ') + msg );
}

/**
 * @param {!Object} obj
 */
function logArgs(obj) {

  /** @type {string} */
  var str;

  is._obj(obj) || helperError('logArgs', 'obj', obj);

  forOwn(obj, function(/** * */ val, /** string */ key) {
    if (key !== 'argMap') {
      str = makeStr(val);
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

  is._obj(obj) || helperError('logObj', 'obj', obj);

  style = is._str(style) && has(themes, style) ? style : 'view';

  indent = is._num(indent) ? indent : 0;
  indent || console.log(
    colors[style]( is.func(obj) ? 'function() { ... } props => {' : '{' )
  );
  indent = indent < 0 ? 0 : indent;

  spaces = indent ? fill(Array(indent), '  ').join('') : '';

  forOwn(obj, function(/** * */ val, /** string */ key) {
    str = makeStr(val);
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
