'use strict';

var angularSprout = angular.module( 'angularSprout',
[
	'exampleDirective',

	'reverseFilter',

	'root',

	'state1',
	'parentState2',
	'grandparentState3'

] );

angularSprout.config( function( $urlRouterProvider, $locationProvider )
{
	$urlRouterProvider.otherwise( '/' );
	$locationProvider.html5Mode( true );
} );




angularSprout.run( [ '$rootScope', function( $rootScope )
{
	$rootScope.$on( '$stateChangeSuccess', function( toState, toParams, fromState, fromParams )
	{
		$rootScope.fromState = fromState;
		$rootScope.fromParams = fromParams;

		$rootScope.toState = toState;
		$rootScope.toParams = toParams;
	} );

} ] );
