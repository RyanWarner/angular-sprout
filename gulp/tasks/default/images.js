var gulp            = require( 'gulp' );
var connect         = require( 'gulp-connect' );





gulp.task( 'images', [ 'favicon' ], function(  )
{
	return gulp.src( IMAGES_SRC )
		.pipe( gulp.dest( IMAGES ) );
} );

gulp.task( 'favicon', function(  )
{
	return gulp.src( FAVICON )
		.pipe( gulp.dest( BUILD_DIR ) );
} );


