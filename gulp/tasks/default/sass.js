var gulp            = require( 'gulp' );
var connect         = require( 'gulp-connect' );
var cache           = require( 'gulp-cached' );

var sass            = require( 'gulp-sass' );
var prefix          = require( 'gulp-autoprefixer' );



// Linting plugins.

var scsslint        = require( 'gulp-scss-lint' );
var csscomb         = require( 'gulp-csscomb' );
var eslint          = require( 'gulp-eslint' );



// Styles.

gulp.task( 'csscomb', function (  )
{
	return gulp.src( SASS_SRC_FILES )
		.pipe( cache( 'csscomb' ) )
		.pipe( csscomb(  ) )
		.on( 'error', handleError )
		.pipe( gulp.dest( './app' ) );
} );

gulp.task( 'scss-lint', [ 'csscomb' ], function(  )
{
	return gulp.src( SASS_SRC_FILES )
		.pipe( scsslint( { config: 'scss-linting-config.yml' } ) )
		.on( 'error', handleError );
} );

gulp.task( 'sass', [ 'scss-lint' ], function(  )
{
	return gulp.src( __dirname + '/app/app_styles.scss' )
		//.pipe( cache( 'sass' ) )
		.pipe( sass(  ) )
		.on( 'error', handleError )
		.pipe( prefix( 'last 2 versions', { cascade: true } ) )
		.on( 'error', handleError )
		.pipe( gulp.dest( BUILD_DIR ) )
		.pipe( connect.reload(  ) );
} );

