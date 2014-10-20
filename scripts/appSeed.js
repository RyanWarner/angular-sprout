'use strict';

var appSeed = angular.module( 'appSeed',
[
	'ui.router'
] );

appSeed.config( function( $stateProvider, $locationProvider )
{
	$stateProvider.state( 'root',
	{
		url: '/',
		views:
		{
			'root':
			{
				templateUrl: 'partials/root.html',
				controller: 'RootController'
			}
		}
	} );

	$locationProvider.html5Mode( true );
} );




appSeed.run( [ '$rootScope', function( $rootScope )
{
	$rootScope.$on( '$stateChangeSuccess', function( toState, toParams, fromState, fromParams )
	{
		$rootScope.fromState = fromState;
		$rootScope.fromParams = fromParams;

		$rootScope.toState = toState;
		$rootScope.toParams = toParams;
	} );

} ] );
