// Paths.

module.exports =
{
	to:
	{
		jade:
		{
			source:,
			destination:
		},
		scripts:
		{
			source:,
			destination:
		},
		sass:
		{
			source:,
			destination:
		},
		images:
		{
			source:,
			destination:
		}
	}
};

var BUILD_DIR         = __dirname + '/build';

var MAIN_CSS_FILENAME = 'angular-sprout.css';
var MAIN_JS_FILENAME  = 'angular-sprout.js';

var JADE_SRC_FILES    = __dirname + '/app/**/*.jade';

var SASS_SRC_FILES    = __dirname + '/app/**/*.scss';
var MAIN_CSS_FILE     = BUILD_DIR + '/app_styles.css';
var CSS_DIR           = BUILD_DIR + '/css'
var CSS_FILES         = CSS_DIR + '/**/*.css';

var SCRIPTS_SRC_FILES =
[
	'./app/**/*.js',
	'./app/*.js',
	'!./app/**/*_test*.js'
];

var TEST_FILES        = __dirname + '/app/**/*_test*.js';
var ALL_JAVASCRIPT    = __dirname + '/app/**/*.js';

var BOWER_SRC         = __dirname + '/bower_components';
var BOWER_MANIFEST    = __dirname + '/bower.json';
var BOWER_CONFIG      = __dirname + '/.bowerrc';

var BOWER_DIR         = BUILD_DIR + '/bower';
var BOWER_CSS_FILES   = BOWER_DIR + '/**/*.css';
var BOWER_JS_FILES    = BOWER_DIR + '/**/*.js';

var IMAGES_SRC        = __dirname + '/images/**/*';
var IMAGES            = BUILD_DIR + '/images/';
var FAVICON           = __dirname + '/favicon.png';

var LINTERS_DIR       = __dirname + '/linters'

var E2E_TESTS         = __dirname + '/app/**/*_test-e2e.js';
