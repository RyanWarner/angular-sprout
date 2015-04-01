var gulp            = require( 'gulp' );
var gutil           = require( 'gulp-util' );
var connect         = require( 'gulp-connect' );
var cache           = require( 'gulp-cached' );


var mainBowerFiles  = require( 'main-bower-files' );
var inject          = require( 'gulp-inject' );
var angularFilesort = require( 'gulp-angular-filesort' )


var eslint          = require( 'gulp-eslint' );



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
