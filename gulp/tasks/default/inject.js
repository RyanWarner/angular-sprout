var gulp            = require( 'gulp' );
var gutil           = require( 'gulp-util' );
var connect         = require( 'gulp-connect' );
var cache           = require( 'gulp-cached' );



var mainBowerFiles  = require( 'main-bower-files' );
var inject          = require( 'gulp-inject' );
var angularFilesort = require( 'gulp-angular-filesort' )




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
