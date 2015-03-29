var gulp  = require( 'gulp' );
var del   = require( 'del' );



gulp.task( 'clean', function(  )
{
	del( BUILD_DIR );
} );

