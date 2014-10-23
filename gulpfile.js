var gulp            = require( 'gulp' );
var gutil           = require( 'gulp-util' );
var connect         = require( 'gulp-connect' );

var rimraf          = require( 'rimraf' );

var runSequence     = require( 'run-sequence' );
var noHash          = require( 'connect-history-api-fallback' );
var sass            = require( 'gulp-sass' );
var prefix          = require( 'gulp-autoprefixer' );

var mainBowerFiles  = require( 'main-bower-files' );
var inject          = require( 'gulp-inject' );
var angularFilesort = require( 'gulp-angular-filesort' )

var jade            = require( 'gulp-jade' );

var scsslint        = require( 'gulp-scss-lint' );
var csscomb         = require( 'gulp-csscomb' );
var eslint          = require( 'gulp-eslint' );

var karma                 = require( 'karma' ).server;
var protractor            = require( 'gulp-protractor' ).protractor;
var webdriver_standalone  = require( 'gulp-protractor' ).webdriver_standalone;
var webdriver_update      = require( 'gulp-protractor' ).webdriver_update;



var BUILD_DIR = './build';

var JADE_SRC_FILES = './app/**/*.jade';
var HTML_OUTPUT = BUILD_DIR;

var SASS_SRC_FILES = './app/**/*.scss';
var CSS_DIR        = BUILD_DIR + '/css'
var CSS_FILES      = CSS_DIR + '/**/*.css';

var SCRIPTS_SRC_FILES    = [ './app/**/*.js', './app/*.js', '!./app/**/*_test*.js' ];
var SCRIPTS_OUTPUT_FILES = BUILD_DIR;

var BOWER_DIR       = BUILD_DIR + '/bower';
var BOWER_CSS_FILES = BOWER_DIR + '/**/*.css';
var BOWER_JS_FILES  = BOWER_DIR + '/**/*.js';

var LINTERS_DIR = './linters'

var E2E_TESTS = [ './app/**/*_test-e2e.js' ];


var handleError = function( err )
{
    console.log( err.toString(  ) );
    gutil.beep;
    this.emit( 'end' );
};

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

gulp.task( 'unit-tests', function( done )
{
    karma.start( {

        configFile: __dirname + '/tests/karma.config.js'

    }, done );
} );

gulp.task( 'update-webdriver', webdriver_update );

gulp.task( 'protractor', [ 'update-webdriver' ], function( done )
{
    gulp.src( E2E_TESTS )
        .pipe( protractor( {

            configFile: __dirname + '/tests/protractor.config.js'

        } ) )
        .on( 'error', handleError );
} );

// Jade.

gulp.task( 'jade', function( )
{
    return gulp.src( JADE_SRC_FILES )
        .pipe( jade( { pretty: true } ) )
        .on( 'error', handleError )
        .pipe( gulp.dest( HTML_OUTPUT ) );
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
        .pipe( inject( gulp.src( [ './build/app_styles.css' ], { read: false } ), injectOptions ) )
        
        .pipe( inject( gulp.src( [ BOWER_JS_FILES ], { read: false } ), bowerInjectOptions ) )
        .pipe( inject( 
                gulp.src(
                    [
                        BUILD_DIR + '/**/*.js',
                        '!' + BUILD_DIR + '/bower/**/*.*'
                    ],
                    {
                        read: false
                    } )
                .pipe( angularFilesort(  ) ), injectOptions ) )
        .on( 'error', handleError )
        
        .pipe( gulp.dest( BUILD_DIR ) );
} );




// Styles.

gulp.task( 'csscomb', function (  )
{
    return gulp.src( SASS_SRC_FILES )
        .pipe( csscomb(  ) );
} );

gulp.task( 'scss-lint', [ 'csscomb' ], function(  )
{
    return gulp.src( SASS_SRC_FILES )
        .pipe( scsslint( { config: 'scss-linting-config.yml' } ) )
        .on( 'error', handleError );
} );

gulp.task( 'sass', function(  )
{
    return gulp.src( './app/app_styles.scss' )
        .pipe( sass(  ) )
        .on( 'error', handleError )
        .pipe( prefix( 'last 2 versions', { cascade: true } ) )
        .on( 'error', handleError )
        .pipe( gulp.dest( BUILD_DIR ) )
        .pipe( connect.reload(  ) );
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
        .pipe( gulp.dest( BUILD_DIR ) );
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



// gulp.task( 'browser-sync', function(  )
// {
//     browserSync( {

//         server:
//         {
//             baseDir: BUILD_DIR
//         },
//         middleware: function (req, res, next)
//         {
//             return[ noHash ];
//         },
//         ghostMode: {
//                 links: false
//             },
//         port: 8080,
//         open: false

//     } );
// } );



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
