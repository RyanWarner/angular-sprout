var gulp 		= require( 'gulp' );
var jade 		= require( 'gulp-jade' );
var sass 		= require( 'gulp-sass' );
var connect 	= require( 'gulp-connect' );
var gutil 		= require( 'gulp-util' );
var open 		= require( 'gulp-open' );
var clean 		= require( 'gulp-clean' );
var historyApiFallback = require('connect-history-api-fallback');
var runSequence = require('run-sequence');

var OUTPUT_DIR = 'build/';

var onError = function ( err )
{  
  gutil.beep(  );
  console.log( err );
};

gulp.task( 'watch', function(  )
{
	gulp.watch( 'app/views/**/*.jade', [ 'jade' ] );
	gulp.watch( 'app/styles/**/*.scss', [ 'sass' ] );
	gulp.watch( 'app/scripts/**/*.js', [ 'js' ] );
	gulp.watch( 'app/images/**/*.*', [ 'images' ] );
} );

gulp.task( 'clean', function(  )
{
	return gulp.src( OUTPUT_DIR,
		{
			read: false
		} )
		.pipe( clean(  ) );
} );

gulp.task( 'jade', function(  )
{
	return gulp.src( 'app/views/**/*.jade' )
		.pipe( jade(  ) )
		.on( 'error', gutil.log )
		.on( 'error', gutil.beep )
		.pipe( gulp.dest( OUTPUT_DIR ) )
		.pipe( connect.reload(  ) );
} );

gulp.task( 'sass', function(  )
{
	return gulp.src( 'app/styles/main.scss' )
		.pipe( sass(  ) )
		.on( 'error', gutil.log )
		.on( 'error', gutil.beep )
		.pipe( gulp.dest( OUTPUT_DIR + 'css' ) )
		.pipe( connect.reload(  ) );
} );

gulp.task( 'js', function(  )
{
	return gulp.src( 'app/**/*.js/' )
		.pipe( gulp.dest( OUTPUT_DIR ) )
		.pipe( connect.reload(  ) );
} );

gulp.task( 'images', function(  )
{
	return gulp.src( 'app/images/*' )
		.pipe( gulp.dest( OUTPUT_DIR + '/images/' ) )
		.pipe( connect.reload(  ) );
} );

gulp.task( 'connect', function(  )
{
		connect.server({
			root: OUTPUT_DIR,
			hostname: '0.0.0.0',
			livereload: true,
			middleware: function( connect, opt )
			{
				// This get's rid of the # symbol in the URL
				return[ historyApiFallback ];
			}
		} );
} );

gulp.task( 'open', function(  )
{
	var options = 
	{
		app: "google chrome"
		//app: "safari"
	};
	return gulp.src("build/index.html")
		.pipe( open( "http://localhost:8080", options ) );
} );

gulp.task( 'default', function(  )
{
	runSequence(
		'clean', 
		[ 
			'jade', 
			'sass', 
			'js',
			'images',
		],
		'watch',
		'connect',
		'open'
	);
} );
