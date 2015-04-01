var gulp            = require( 'gulp' );
var gutil           = require( 'gulp-util' );
var connect         = require( 'gulp-connect' );
var cache           = require( 'gulp-cached' );

var mainBowerFiles  = require( 'main-bower-files' );
var inject          = require( 'gulp-inject' );
var angularFilesort = require( 'gulp-angular-filesort' )

var path   = require( '../../paths.js' );



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

	var target = gulp.src( path.to.destination + '/index.html' );

	var appJsSource    = gulp.src( [ path.to.destination + '/**/*.js', '!' + path.to.destination + '/bower/**/*.*' ] );
	var sortedAppJs    = appJsSource.pipe( angularFilesort(  ) );

	var bowerSource    = gulp.src( [ path.to.bower.scripts ], { read: false } );
	var bowerCssSource = gulp.src( [ path.to.bower.css ], { read: false } );

	var mainCssSource  = gulp.src( [ MAIN_CSS_FILE ], { read: false } );

	return target
		.pipe( inject( bowerCssSource, bowerInjectOptions ) )
		.pipe( inject( mainCssSource, injectOptions ) )
		.pipe( inject( bowerSource, bowerInjectOptions ) )
		.pipe( inject( sortedAppJs, injectOptions ) )
		.on( 'error', handleError )
		
		.pipe( gulp.dest( path.to.destination ) )
		.pipe( connect.reload(  ) );
} );
