var gulp            = require( 'gulp' );
var gutil           = require( 'gulp-util' );
var connect         = require( 'gulp-connect' );
var cache           = require( 'gulp-cached' );


var rimraf          = require( 'rimraf' );
var del             = require( 'del' );

var runSequence     = require( 'run-sequence' );
var noHash          = require( 'connect-history-api-fallback' );
var sass            = require( 'gulp-sass' );
var prefix          = require( 'gulp-autoprefixer' );

var mainBowerFiles  = require( 'main-bower-files' );
var inject          = require( 'gulp-inject' );
var angularFilesort = require( 'gulp-angular-filesort' )

var jade            = require( 'gulp-jade' );

var scsslint        = require( 'gulp-scss-lint' );
var csscomb         = require( 'gulp-csscomb' );
var eslint          = require( 'gulp-eslint' );

var ngAnnotate      = require( 'gulp-ng-annotate' );
var uglify          = require( 'gulp-uglify' );
var order           = require( 'gulp-order' );
var concat          = require( 'gulp-concat' );
var merge           = require( 'merge-stream' );
var streamqueue     = require( 'streamqueue' );

var karma                 = require( 'karma' ).server;
var protractor            = require( 'gulp-protractor' ).protractor;
var webdriver_standalone  = require( 'gulp-protractor' ).webdriver_standalone;
var webdriver_update      = require( 'gulp-protractor' ).webdriver_update;



var BUILD_DIR         = './build';
var DEPLOY_DIR        = './deploy';

var JADE_SRC_FILES    = './app/**/*.jade';
var HTML_OUTPUT       = BUILD_DIR;

var SASS_SRC_FILES    = './app/**/*.scss';
var MAIN_CSS_FILE     = BUILD_DIR + '/app_styles.css';
var CSS_DIR           = BUILD_DIR + '/css'
var CSS_FILES         = CSS_DIR + '/**/*.css';

var SCRIPTS_SRC_FILES =
[
	'./app/**/*.js',
	'./app/*.js',
	'!./app/**/*_test*.js'
];

var TEST_FILES = './app/**/*_test*.js';
var ALL_JAVASCRIPT = './app/**/*.js';

var BOWER_DIR         = BUILD_DIR + '/bower';
var BOWER_CSS_FILES   = BOWER_DIR + '/**/*.css';
var BOWER_JS_FILES    = BOWER_DIR + '/**/*.js';

var FAVICON           = 'favicon.png';

var LINTERS_DIR       = './linters'

var E2E_TESTS         = './app/**/*_test-e2e.js';


var handleError = function( err )
{
	console.log( err.toString(  ) );
	gutil.beep;
	this.emit( 'end' );
};

gulp.task( 'connect', function(  )
{
	connect.server(
	{
		root: BUILD_DIR,
		hostname: '0.0.0.0',
		livereload: true,
		middleware: function( connect, opt )
		{
			// This get's rid of the # symbol in the URL
			return[ noHash ];
		}
	} );
} );



// Tests

gulp.task( 'unit-tests', function( done )
{
	karma.start( {

		configFile: __dirname + '/tests/karma.config.js'

	}, done );
} );

gulp.task( 'update-webdriver', webdriver_update );

gulp.task( 'protractor', [ 'update-webdriver' ], function( done )
{
	gulp.src( E2E_TESTS )
		.pipe( protractor( {

			configFile: __dirname + '/tests/protractor.config.js'

		} ) )
		.on( 'error', handleError );
} );




// Jade.

gulp.task( 'jade', function( )
{
	return gulp.src( JADE_SRC_FILES )
		.pipe( cache( 'jade' ) )
		.pipe( jade( { pretty: true } ) )
		.on( 'error', handleError )
		.pipe( gulp.dest( HTML_OUTPUT ) );
} );

gulp.task( 'inject', function( )
{
	var injectOptions = 
	{
	  relative: true,
	  addRootSlash: false
	};

	var bowerInjectOptions =
	{
	  relative: true,
	  addRootSlash: false,
	  starttag: '<!-- inject:bower:{{ext}} -->'
	};
	
	var target = gulp.src( BUILD_DIR + '/index.html' );

	return target
		.pipe( inject( gulp.src( [ BOWER_CSS_FILES ], { read: false } ), bowerInjectOptions ) )
		.pipe( inject( gulp.src( [ MAIN_CSS_FILE ], { read: false } ), injectOptions ) )
		
		.pipe( inject( gulp.src( [ BOWER_JS_FILES ], { read: false } ), bowerInjectOptions ) )
		.pipe( inject( 
				gulp.src(
					[
						BUILD_DIR + '/**/*.js',
						'!' + BUILD_DIR + '/bower/**/*.*'
					],
					{
						read: false
					} )
				.pipe( angularFilesort(  ) ), injectOptions ) )
		.on( 'error', handleError )
		
		.pipe( gulp.dest( BUILD_DIR ) )
		.pipe( connect.reload(  ) );
} );




// Styles.

gulp.task( 'csscomb', function (  )
{
	return gulp.src( SASS_SRC_FILES )
		.pipe( cache( 'csscomb' ) )
		.pipe( csscomb(  ) )
		.on( 'error', handleError )
		.pipe( gulp.dest( './app' ) );
} );

gulp.task( 'scss-lint', [ 'csscomb' ], function(  )
{
	return gulp.src( SASS_SRC_FILES )
		.pipe( scsslint( { config: 'scss-linting-config.yml' } ) )
		.on( 'error', handleError );
} );

gulp.task( 'sass', [ 'scss-lint' ], function(  )
{
	return gulp.src( './app/app_styles.scss' )
		.pipe( cache( 'sass' ) )
		.pipe( sass(  ) )
		.on( 'error', handleError )
		.pipe( prefix( 'last 2 versions', { cascade: true } ) )
		.on( 'error', handleError )
		.pipe( gulp.dest( BUILD_DIR ) )
		.pipe( connect.reload(  ) );
} );



// Scripts.

gulp.task( 'bower-files', function( )
{
	// Copy bower components

	return gulp.src( mainBowerFiles(
		{
			paths:
			{
				bowerDirectory: './bower_components',
				bowerrc: './.bowerrc',
				bowerJson: './bower.json'
			} 
		} ),
		{
			base: './bower_components'
		} )
		.pipe( gulp.dest( BOWER_DIR ) );
} );

gulp.task( 'eslint', function(  )
{
	return gulp.src( ALL_JAVASCRIPT )
		.pipe( eslint(  ) )
		.pipe( eslint.format(  ) );
} );

gulp.task( 'scripts', [ 'eslint', 'bower-files' ], function( )
{   
	// Copy scripts

	return gulp.src( SCRIPTS_SRC_FILES )
		.pipe( cache( 'scripts' ) )
		.pipe( gulp.dest( BUILD_DIR ) );
} );



// Assets.

gulp.task( 'images', function(  )
{
	return gulp.src( './images/**/*' )
		.pipe( gulp.dest( BUILD_DIR + '/images/' ) );
} );

gulp.task( 'favicon', function(  )
{
	return gulp.src( FAVICON )
		.pipe( gulp.dest( BUILD_DIR ) );
} );



gulp.task( 'clean', function( callback )
{
	rimraf( './' + BUILD_DIR, callback );
} );

gulp.task( 'watch', function(  )
{
	gulp.watch( SASS_SRC_FILES, [ 'sass' ] );

	gulp.watch( JADE_SRC_FILES, function(  )
	{
		runSequence(
			'jade',
			'inject'
		);
	} );

	gulp.watch( SCRIPTS_SRC_FILES, function(  )
	{
		runSequence(
			'scripts',
			'jade',
			'inject'
		);
	} );

	gulp.watch( TEST_FILES, [ 'eslint' ] );
} );



// Deploy process.

gulp.task( 'deploy-clean', function(  )
{
	del( DEPLOY_DIR + '/angular-sprout.js' );
} );


gulp.task( 'deploy-test', function( )
{

	return streamqueue( { objectMode: true },
        gulp.src( BUILD_DIR + '/bower/**/*.js' )
		.pipe( order(
		[
			'angular/angular.js',
			'*'
		] ) ),
		//.pipe( concat(  ) )
		//.pipe( uglify(  ) ),

        gulp.src( SCRIPTS_SRC_FILES )
		.pipe( ngAnnotate(
		{
		    remove: true,
		    add: true,
		    single_quotes: true
		} ) )
		.pipe( angularFilesort(  ) )
		//.pipe( concat(  ) )
		//.pipe( uglify(  ) )
    )
        .pipe( concat( 'angular-sprout.js' ) )
        .pipe( uglify(  ) )
        .pipe( gulp.dest( DEPLOY_DIR ) );
} );





gulp.task( 'deploy-bower-js', function( )
{
	return gulp.src( BUILD_DIR + '/bower/**/*.js' )
		.pipe( order(
		[
			'angular/angular.js',
			'*'
		] ) )
		.pipe( concat( 'bower.js' ) )
		.pipe( uglify(  ) )
		.pipe( gulp.dest( DEPLOY_DIR ) );
} );

gulp.task( 'deploy-app-js', function( )
{
	return gulp.src( SCRIPTS_SRC_FILES )
		.pipe( ngAnnotate(
		{
		    remove: true,
		    add: true,
		    single_quotes: true
		} ) )
		.pipe( angularFilesort(  ) )
		.pipe( concat( 'angular-sprout.js' ) )
		.pipe( uglify(  ) )
		.pipe( gulp.dest( DEPLOY_DIR ) );
} );

gulp.task( 'concat-bower-and-app-js', function( )
{
	return gulp.src( DEPLOY_DIR + '**/*.js' )
		.pipe( order(
		[
			'bower.js',
			'angular-sprout.js'
		],{ base: DEPLOY_DIR } ) )
		.on( 'error', handleError )
		.pipe( concat( 'angular-sprout.js' ) )
		.pipe( gulp.dest( DEPLOY_DIR ) );
} );

gulp.task( 'del:bower', function(  )
{
	del( DEPLOY_DIR + '/bower.js' );
} );

gulp.task( 'deploy-jade', function( )
{
	return gulp.src( JADE_SRC_FILES )
		.pipe( cache( 'jade' ) )
		.pipe( jade( { pretty: true } ) )
		.on( 'error', handleError )
		.pipe( gulp.dest( DEPLOY_DIR ) );
} );

gulp.task( 'deploy-connect', function(  )
{
	connect.server(
	{
		root: DEPLOY_DIR,
		hostname: '0.0.0.0',
		livereload: true,
		middleware: function( connect, opt )
		{
			// This get's rid of the # symbol in the URL
			return[ noHash ];
		}
	} );
} );

gulp.task( 'deploy', function(  )
{
	runSequence(
		'deploy-clean',
		'deploy-test',
		'deploy-connect'
	);
} );




gulp.task( 'default', function(  )
{
	runSequence(
		'clean',
		[
			'sass',
			'scripts',
			'jade',
			'images',
			'favicon'
		],
		'inject',
		'connect',
		'watch'
	);
} );
