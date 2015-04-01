var gulp    = require( 'gulp' );
var connect = require( 'gulp-connect' );
var cache   = require( 'gulp-cached' );
var jade    = require( 'gulp-jade' );

var path    = require( '../../paths.js' );



gulp.task( 'jade', function( )
{
	return gulp.src( path.to.jade.source )
		.pipe( cache( 'jade' ) )
		.pipe( jade( { pretty: true } ) )
		.on( 'error', handleError )
		.pipe( gulp.dest( path.to.jade.destination ) )
		.pipe( connect.reload(  ) );
} );
