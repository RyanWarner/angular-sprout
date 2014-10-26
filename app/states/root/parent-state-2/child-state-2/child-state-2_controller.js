'use strict';

var childState2 = angular.module( 'childState2' );

childState2.controller( 'ChildState2Controller', function( $rootScope, $scope )
{

	// This is a controller.

	$scope.stateName = 'parentState2.child-state-2';

	console.log( 'ChildState2Controller active!' );

} );
