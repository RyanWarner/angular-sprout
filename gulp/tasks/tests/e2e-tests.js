'use strict';

var gulp             = require( 'gulp' );
var protractor       = require( 'gulp-protractor' ).protractor;
var webdriver_update = require( 'gulp-protractor' ).webdriver_update;

var path             = require( '../../paths.js' );
var error            = require( '../../error-handler.js' );


gulp.task( 'update-webdriver', webdriver_update );

gulp.task( 'e2e-tests', [ 'update-webdriver' ], function( done )
{
	gulp.src( path.to.tests.e2e )
		.pipe( protractor( {

			configFile: path.to.tests.protractorConfig

		} ) )
		.on( 'error', error.handler );
} );
