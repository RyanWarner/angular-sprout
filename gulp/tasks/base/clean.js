'use strict';

var gulp  = require( 'gulp' );
var del   = require( 'del' );

var path   = require( '../../paths.js' );

gulp.task( 'clean', function(  )
{
	del.sync( path.to.destination );
} );

