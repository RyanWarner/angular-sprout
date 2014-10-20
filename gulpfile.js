var gulp            = require( 'gulp' );
var gutil           = require( 'gulp-util' );
var connect         = require( 'gulp-connect' );
var browserSync     = require( 'browser-sync' );
var reload          = browserSync.reload;
var rimraf          = require( 'rimraf' );

var runSequence     = require( 'run-sequence' );
var noHash          = require( 'connect-history-api-fallback' );
var sass            = require( 'gulp-sass' );
var prefix          = require( 'gulp-autoprefixer' );

var mainBowerFiles  = require( 'main-bower-files' );
var inject          = require( 'gulp-inject' );

var jade            = require( 'gulp-jade' );

var scsslint        = require( 'gulp-scss-lint' );
var csscomb         = require( 'gulp-csscomb' );
var eslint          = require( 'gulp-eslint' );





var BUILD_DIR = './build';

var JADE_SRC_FILES = './jade/**/*.jade';

var SASS_SRC_DIR   = './sass';
var SASS_SRC_FILES = './sass/**/*.scss';
var CSS_DIR        = BUILD_DIR + '/css'
var CSS_FILES      = CSS_DIR + '/**/*.css';

var SCRIPTS_SRC_DIR      = './scripts/';
var SCRIPTS_SRC_FILES    = './scripts/**/*.js';
var SCRIPTS_OUTPUT_FILES = BUILD_DIR + '/scripts/**/*.js';

var BOWER_DIR       = BUILD_DIR + '/scripts/bower';
var BOWER_CSS_FILES = BOWER_DIR + '/**/*.css';
var BOWER_JS_FILES  = BOWER_DIR + '/**/*.js';



var handleError = function( err )
{
    console.log( err.toString(  ) );
    gutil.beep;
    this.emit( 'end' );
};



// Jade.

gulp.task( 'jade', function( )
{
    return gulp.src( JADE_SRC_FILES )
        .pipe( jade( { pretty: true } ) )
        .on( 'error', handleError )
        .pipe( gulp.dest( BUILD_DIR ) );
} );

gulp.task( 'inject', function( )
{
    var injectOptions = 
    {
      relative: true,
      addRootSlash: false
    };

    var bowerInjectOptions =
    {
      relative: true,
      addRootSlash: false,
      starttag: '<!-- inject:bower:{{ext}} -->'
    };
    
    var target = gulp.src( BUILD_DIR + '/index.html' );

    return target
        .pipe( inject( gulp.src( [ BOWER_CSS_FILES ], { read: false } ), bowerInjectOptions ) )
        .pipe( inject( gulp.src( [ './www/css/main.css' ], { read: false } ), injectOptions ) )
        
        .pipe( inject( gulp.src( [ BOWER_JS_FILES ], { read: false } ), bowerInjectOptions ) )
        .pipe( inject( gulp.src( [ SCRIPTS_OUTPUT_FILES ], { read: false } ), injectOptions ) )
        .on( 'error', handleError )
        
        .pipe( gulp.dest( BUILD_DIR ) );
} );




// Styles.

gulp.task( 'csscomb', function (  )
{
    return gulp.src( SASS_SRC_FILES )
        .pipe( csscomb(  ) )
        .pipe( gulp.dest( './sass' ) );
} );

gulp.task( 'scss-lint', [ 'csscomb' ], function(  )
{
    return gulp.src( SASS_SRC_FILES )
        .pipe( scsslint( { 'config': 'scss-linting-config.yml' } ) )
        .on( 'error', handleError );
} );

gulp.task( 'sass', [ 'scss-lint' ], function(  )
{
    return gulp.src( SASS_SRC_DIR + '/main.scss' )
        .pipe( sass(  ) )
        .on( 'error', handleError )
        .pipe( prefix( 'last 2 versions', { cascade: true } ) )
        .on( 'error', handleError )
        .pipe( gulp.dest( BUILD_DIR + '/css' ) )
        .pipe( reload( { stream: true } ) );
} );



// Scripts.

gulp.task( 'bower-files', function( )
{
    // Copy bower components

    return gulp.src( mainBowerFiles(
        {
            paths:
            {
                bowerDirectory: './bower_components',
                bowerrc: './.bowerrc',
                bowerJson: './bower.json'
            } 
        } ),
        {
            base: './bower_components'
        } )
        .pipe( gulp.dest( BOWER_DIR ) );
} );

gulp.task( 'eslint', function(  )
{
    return gulp.src( SCRIPTS_SRC_FILES )
        .pipe( eslint(  ) )
        .pipe( eslint.format(  ) );
} );

gulp.task( 'scripts', [ 'eslint', 'bower-files' ], function( )
{   
    // Copy scripts

    return gulp.src( SCRIPTS_SRC_FILES )
        .pipe( gulp.dest( BUILD_DIR + '/scripts' ) );
} );



// Images.

gulp.task( 'images', function(  )
{
    return gulp.src( 'images/**/*' )
        .pipe( gulp.dest( BUILD_DIR + '/images/' ) );
} );


gulp.task( 'clean', function( callback )
{
    rimraf( './' + BUILD_DIR, callback );
} );

gulp.task( 'watch', function(  )
{
    gulp.watch( SASS_SRC_FILES, [ 'sass' ] );

    gulp.watch( JADE_SRC_FILES, function(  )
    {
        runSequence(
            'jade',
            'inject'
        );
    } );

    gulp.watch( SCRIPTS_SRC_FILES, function(  )
    {
        runSequence(
            'scripts',
            'jade',
            'inject'
        );
    } );
} );

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

gulp.task( 'browser-sync', function(  )
{
    browserSync( {

        server:
        {
            baseDir: BUILD_DIR
        },
        middleware: function (req, res, next)
        {
            return[ noHash ];
        },
        ghostMode: {
                links: false
            },
        port: 8080,
        open: false

    } );
} );



gulp.task( 'default', function(  )
{
    runSequence(
        'clean',
        [
            'sass',
            'scripts',
            'jade',
            'images'
        ],
        'inject',
        'connect',
        'watch'
    );   
} );
