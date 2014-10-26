'use strict';

var parentState2 = angular.module( 'parentState2' );

parentState2.controller( 'ParentState2Controller', function( $rootScope, $scope, $state )
{
	console.log( 'ParentState2Controller active!' );
	$scope.stateName = 'parent-state-2';

	$scope.activeChildNav = $state.current.activeChildNav;

	$rootScope.$on( '$stateChangeSuccess', function(  )
	{
		$scope.activeChildNav = $state.current.activeChildNav;
	} );
} );
