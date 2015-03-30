var gulp            = require( 'gulp' );
var gutil           = require( 'gulp-util' );
var connect         = require( 'gulp-connect' );
var cache           = require( 'gulp-cached' );

var del             = require( 'del' );

var runSequence     = require( 'run-sequence' );
var noHash          = require( 'connect-history-api-fallback' );

var mainBowerFiles  = require( 'main-bower-files' );
var inject          = require( 'gulp-inject' );
var angularFilesort = require( 'gulp-angular-filesort' )

var sass            = require( 'gulp-sass' );
var prefix          = require( 'gulp-autoprefixer' );
var jade            = require( 'gulp-jade' );



// Linting plugins.

var scsslint        = require( 'gulp-scss-lint' );
var csscomb         = require( 'gulp-csscomb' );
var eslint          = require( 'gulp-eslint' );


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

	var appJsSource    = gulp.src( [ BUILD_DIR + '/**/*.js', '!' + BUILD_DIR + '/bower/**/*.*' ] );
	var sortedAppJs    = appJsSource.pipe( angularFilesort(  ) );

	var bowerSource    = gulp.src( [ BOWER_JS_FILES ], { read: false } );
	var bowerCssSource = gulp.src( [ BOWER_CSS_FILES ], { read: false } );

	var mainCssSource  = gulp.src( [ MAIN_CSS_FILE ], { read: false } );

	return target
		.pipe( inject( bowerCssSource, bowerInjectOptions ) )
		.pipe( inject( mainCssSource, injectOptions ) )
		.pipe( inject( bowerSource, bowerInjectOptions ) )
		.pipe( inject( sortedAppJs, injectOptions ) )
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
				bowerDirectory: BOWER_SRC,
				bowerrc: BOWER_CONFIG,
				bowerJson: BOWER_MANIFEST
			}
		} ),
		{
			base: BOWER_SRC
		} )
		.pipe( gulp.dest( BOWER_DIR ) );
} );

gulp.task( 'eslint', function(  )
{
	return gulp.src( ALL_JAVASCRIPT )
		.pipe( eslint(  ) )
		.pipe( eslint.format(  ) );
} );

gulp.task( 'scripts', [ 'eslint' ], function( )
{   
	// Copy scripts

	return gulp.src( SCRIPTS_SRC_FILES )
		.pipe( cache( 'scripts' ) )
		.pipe( gulp.dest( BUILD_DIR ) );
} );
