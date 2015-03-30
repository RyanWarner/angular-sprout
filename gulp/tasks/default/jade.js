var gulp            = require( 'gulp' );
var connect         = require( 'gulp-connect' );
var cache           = require( 'gulp-cached' );


var jade            = require( 'gulp-jade' );



// Jade.

gulp.task( 'jade', function( )
{
	return gulp.src( JADE_SRC_FILES )
		.pipe( cache( 'jade' ) )
		.pipe( jade( { pretty: true } ) )
		.on( 'error', handleError )
		.pipe( gulp.dest( BUILD_DIR ) )
		.pipe( connect.reload(  ) );
} );
