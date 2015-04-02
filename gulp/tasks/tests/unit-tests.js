'use strict';

var gulp            = require( 'gulp' );
var karma           = require( 'karma' ).server;

var path            = require( '../../paths.js' );
var error           = require( '../../error-handler.js' );


gulp.task( 'unit-tests', function( done )
{
	karma.start( {

		configFile: path.to.tests.karmaConfig

	}, done );
} );
