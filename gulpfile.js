var gulp        = require( 'gulp' );
var requireDir  = require( 'require-dir' )
var runSequence = require( 'run-sequence' );;

requireDir( './gulp/tasks', { recurse: true } );


gulp.task( 'default', function(  )
{
	runSequence(
		'clean'
		// [
		// 	'sass',
		// 	'scripts',
		// 	'jade',
		// 	'images'
		// ],
		// 'bower-files',
		// 'inject',
		// 'connect',
		// 'watch'
	);
} );

gulp.task( 'build', function(  )
{
	runSequence(
		'clean',
		[
			'build-images',
			'build-scripts',
			'build-css'
		],
		'jade',
		'build-inject',
		'build-html',
		'connect'
	);
} );