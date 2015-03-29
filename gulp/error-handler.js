var gulp            = require( 'gulp' );
var gutil           = require( 'gulp-util' );



var handleError = function( err )
{
	console.log( err.toString(  ) );
	gutil.beep;
	this.emit( 'end' );
};
