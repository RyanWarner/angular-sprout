// Paths.

var path = require( 'path' );

var pathToThisFile = __dirname;
var root = path.dirname( pathToThisFile );

var destination = root + '/build';
var bowerDir = destination + '/bower';

module.exports =
{
	to:
	{
		destination: destination,
		main:
		{
			css_filename: 'angular-sprout.css',
			js_filename: 'angular-sprout.js'
		},
		jade:
		{
			source: root + '/app/**/*.jade',
			destination: destination
		},
		scripts:
		{
			source:
			[
				'./app/**/*.js',
				'./app/*.js',
				'!./app/**/*_test*.js'
			],
			destination: destination
		},
		sass:
		{
			source: root + '/app/**/*.scss',
			main: ''
			destination: desitnation + '/css';
		},
		images:
		{
			source: root + '/images/**/*.*',
			destination: destination + '/images'
		},
		favicon:
		{
			source: root + '/favicon.png',
			destination: destination
		}
		bower:
		{
			source: root + '/bower_components',
			manifest: root + '/bower.json',
			config: root + '/.bowerrc',
			destination: bowerDir,
			css: bowerDir + '/**/*.css',
			scripts: bowerDir + '/**/*.js',
		},
		tests:
		{
			source: root + '/app/**/*_test*.js',
			e2e: root + '/app/**/*_test-e2e.js'
		}
	}
};


var SASS_SRC_FILES    = __dirname + '/app/**/*.scss';
var MAIN_CSS_FILE     = BUILD_DIR + '/app_styles.css';
var CSS_DIR           = BUILD_DIR + '/css'
var CSS_FILES         = CSS_DIR + '/**/*.css';



var TEST_FILES        = __dirname + '/app/**/*_test*.js';
var ALL_JAVASCRIPT    = __dirname + '/app/**/*.js';


var IMAGES_SRC        = __dirname + '/images/**/*';
var IMAGES            = BUILD_DIR + '/images/';

var LINTERS_DIR       = __dirname + '/linters'

var E2E_TESTS         = __dirname + '/app/**/*_test-e2e.js';
