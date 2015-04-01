'use strict';

var gulp            = require( 'gulp' );
var connect         = require( 'gulp-connect' );

var mainBowerFiles  = require( 'main-bower-files' );
var inject          = require( 'gulp-inject' );
var angularFilesort = require( 'gulp-angular-filesort' );

var ngAnnotate      = require( 'gulp-ng-annotate' );
var uglify          = require( 'gulp-uglify' );
var order           = require( 'gulp-order' );
var concat          = require( 'gulp-concat' );
var streamqueue     = require( 'streamqueue' );
var filter          = require( 'gulp-filter' );

var path            = require( '../../paths.js' );



// Build process.

gulp.task( 'build-scripts', [ 'eslint' ], function(  )
{
	return streamqueue( { objectMode: true },

		// Select and order bower components.

		gulp.src( mainBowerFiles(
		{
			paths:
			{
				bowerDirectory: path.to.bower.source,
				bowerrc: path.to.bower.config,
				bowerJson: path.to.bower.manifest
			}
		} ),
		{
			base: path.to.bower.source
		} )
		.pipe( order(
		[
			'angular/angular.js',
			'*'
		] ) )
		.pipe( filter( '**/*.js' ) ),



		// Select and order source scripts.

		gulp.src( path.to.scripts.source )
		.pipe( ngAnnotate(
		{
			remove: true,
			add: true,
			single_quotes: true
		} ) )
		.pipe( angularFilesort(  ) ) )



	// Then concatenate and uglify them.

	.pipe( concat( path.to.main.script.file ) )
	.pipe( uglify(  ) )
	.pipe( gulp.dest( path.to.destination ) );
} );
