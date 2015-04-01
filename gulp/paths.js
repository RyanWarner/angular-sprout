'use strict';

var path = require( 'path' );

var pathToThisFile = __dirname;

var root = path.dirname( pathToThisFile );

var destination = root + '/build';
var bowerDir = destination + '/bower';

module.exports =
{
	to:
	{
		destination: destination,
		main:
		{
			css:
			{
				source: destination + '/app_styles.css',
				file: 'angular-sprout.css'
			},
			script:
			{
				file: 'angular-sprout.js'
			}
		},
		jade:
		{
			source: root + '/app/**/*.jade',
			destination: destination
		},
		scripts:
		{
			source:
			[
				'./app/**/*.js',
				'./app/*.js',
				'!./app/**/*_test*.js'
			],
			destination: destination
		},
		sass:
		{
			source: root + '/app/**/*.scss',
			main: root + '/app/app_styles.scss',
			destination: destination
		},
		images:
		{
			source: root + '/images/**/*.*',
			destination: destination + '/images'
		},
		favicon:
		{
			source: root + '/favicon.png',
			destination: destination
		},
		bower:
		{
			source: root + '/bower_components',
			manifest: root + '/bower.json',
			config: root + '/.bowerrc',
			destination: bowerDir,
			css: bowerDir + '/**/*.css',
			scripts: bowerDir + '/**/*.js'
		},
		tests:
		{
			source: root + '/app/**/*_test*.js',
			e2e: root + '/app/**/*_test-e2e.js'
		},
		gulp:
		{
			source:
			[
				root + '/gulp/**/*.js',
				root + 'gulpfile.js'
			]
		}
	}
};
