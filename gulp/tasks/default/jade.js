'use strict';

var gulp    = require( 'gulp' );
var connect = require( 'gulp-connect' );
var cache   = require( 'gulp-cached' );
var jade    = require( 'gulp-jade' );

var path    = require( '../../paths.js' );
var error   = require( '../../error-handler.js' );



gulp.task( 'jade', function( )
{
	return gulp.src( path.to.jade.source )
		.pipe( cache( 'jade' ) )
		.pipe( jade( { pretty: true } ) )
		.on( 'error', error.handler )
		.pipe( gulp.dest( path.to.jade.destination ) )
		.pipe( connect.reload(  ) );
} );
