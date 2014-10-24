'use strict';

var parentState2 = angular.module( 'parentState2' );

parentState2.controller( 'ParentState2Controller', function( $rootScope, $scope, $state )
{
	// This is a controller.
	$state.go( 'root.parent-state-2.child-state-1' );

	$scope.activeChildNav = $state.current.activeChildNav;

	$rootScope.$on( '$stateChangeSuccess', function(  )
	{
		$scope.activeChildNav = $state.current.activeChildNav;
	} );

	$scope.isControllerActive = 'yes';

	console.log( 'ParentState2Controller active!' );

} );
