'use strict';

var root = angular.module( 'root' );

root.controller( 'RootController', function( $rootScope, $scope, $state )
{
	// This is a controller.

	$state.go( 'root.state-1' );

	$scope.activeTopNav = $state.current.activeTopNav;

	$rootScope.$on( '$stateChangeSuccess', function(  )
	{
		$scope.activeTopNav = $state.current.activeTopNav;

		if ( $state.current.name === 'root' )
		{
			$state.go( 'root.state-1' );
		}
	} );



	console.log( 'RootController active!' );

} );
