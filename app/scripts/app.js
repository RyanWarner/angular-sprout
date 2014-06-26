'use strict';

angular.module( 'appName', [
	'ngRoute'
] )

.config( function( $routeProvider, $locationProvider, $httpProvider, $compileProvider )
{	
	$routeProvider
		.when( '/',
		{
			templateUrl: 'partials/home.html',
			controller: 'MainCtrl'
		} )

		.when( '/page',
		{
			templateUrl: 'partials/page.html',
			controller: 'MainCtrl'
		} )

		.otherwise(
		{
			redirectTo: '/'
		} );

	$locationProvider.html5Mode( true );
} )

.run( function( $rootScope, $location, $routeParams )
{
	
} );
