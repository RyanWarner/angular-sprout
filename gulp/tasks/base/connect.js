var gulp            = require( 'gulp' );
var connect         = require( 'gulp-connect' );



gulp.task( 'connect', function(  )
{
	connect.server(
	{
		root: BUILD_DIR,
		hostname: '0.0.0.0',
		livereload: true,
		middleware: function( connect, opt )
		{
			// This get's rid of the # symbol in the URL
			return[ noHash ];
		}
	} );
} );
