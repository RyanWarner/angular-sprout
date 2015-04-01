'use strict';

var gulp     = require( 'gulp' );
var inject   = require( 'gulp-inject' );

var path     = require( '../../paths.js' );
var error    = require( '../../error-handler.js' );



gulp.task( 'build-inject', function( )
{
	var injectOptions =
	{
		relative: true,
		addRootSlash: false,
		name: 'min'
	};

	var target = gulp.src( path.to.destination + '/index.html' );

	return target
		.pipe( inject( gulp.src( path.to.destination + '/' + path.to.main.script.file, { read: false } ), injectOptions ) )
		.pipe( inject( gulp.src( path.to.destination + '/' + path.to.main.css.file, { read: false } ), injectOptions ) )
		.pipe( gulp.dest( path.to.destination ) );
} );
