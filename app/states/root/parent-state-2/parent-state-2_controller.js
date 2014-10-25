'use strict';

var parentState2 = angular.module( 'parentState2' );

parentState2.controller( 'ParentState2Controller', function( $rootScope, $scope, $state )
{
	console.log( 'ParentState2Controller active!' );

	$scope.activeChildNav = $state.current.activeChildNav;

	$rootScope.$on( '$stateChangeSuccess', function(  )
	{
		// Redirect to child state.

		if ( $state.current.name === 'root.parent-state-2' )
		{
			$state.go( 'root.parent-state-2.child-state-1' );
		}

		$scope.activeChildNav = $state.current.activeChildNav;
	} );
} );
