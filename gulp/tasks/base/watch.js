var gulp            = require( 'gulp' );
var del             = require( 'del' );
var runSequence     = require( 'run-sequence' );





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
