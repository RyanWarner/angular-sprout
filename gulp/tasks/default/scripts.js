var gulp            = require( 'gulp' );
var gutil           = require( 'gulp-util' );
var connect         = require( 'gulp-connect' );
var cache           = require( 'gulp-cached' );

var mainBowerFiles  = require( 'main-bower-files' );
var inject          = require( 'gulp-inject' );
var angularFilesort = require( 'gulp-angular-filesort' )


var eslint          = require( 'gulp-eslint' );

var path            = require( '../../paths.js' );
var error           = require( '../../error-handler.js' );



gulp.task( 'bower-files', function( )
{
	// Copy bower components

	return gulp.src( mainBowerFiles(
		{
			paths:
			{
				bowerDirectory: path.to.bower.source,
				bowerrc: path.to.bower.config,
				bowerJson: path.to.bower.manifest
			}
		} ),
		{
			base: path.to.bower.source
		} )
		.pipe( gulp.dest( path.to.bower.destination ) );
} );

gulp.task( 'eslint', function(  )
{
	return gulp.src( path.to.scripts.source )
		.pipe( eslint(  ) )
		.pipe( eslint.format(  ) );
} );

gulp.task( 'scripts', [ 'eslint' ], function(  )
{
	return gulp.src( path.to.scripts.source )
		.pipe( cache( 'scripts' ) )
		.pipe( gulp.dest( path.to.destination ) );
} );
