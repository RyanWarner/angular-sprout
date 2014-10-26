'use strict';

var childState1 = angular.module( 'childState1' );

childState1.controller( 'ChildState1Controller', function( $rootScope, $scope )
{

	// This is a controller.

	$scope.stateName = 'parentState2.child-state-1';

	console.log( 'ChildState1Controller active!' );

} );
