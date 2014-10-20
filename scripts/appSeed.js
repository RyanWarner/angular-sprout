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

	$stateProvider.state( 'root.page-one',
	{
		url: 'page-one',
		views:
		{
			'page':
			{
				templateUrl: 'partials/page-one.html'
			}
		}
	} );

	$stateProvider.state( 'root.page-two',
	{
		url: 'page-two',
		views:
		{
			'page':
			{
				templateUrl: 'partials/page-two.html'
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
