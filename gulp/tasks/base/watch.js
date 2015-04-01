'use strict';

var gulp        = require( 'gulp' );
var del         = require( 'del' );
var runSequence = require( 'run-sequence' );

var path        = require( '../../paths.js' );


gulp.task( 'watch', function(  )
{
	gulp.watch( path.to.sass.source, [ 'sass' ] );

	gulp.watch( path.to.jade.source, function(  )
	{
		runSequence( 'jade', 'inject' );
	} );

	gulp.watch( path.to.scripts.source, function(  )
	{
		runSequence( 'scripts', 'jade', 'inject' );
	} );

	gulp.watch( path.to.tests.source, [ 'eslint' ] );
} );
