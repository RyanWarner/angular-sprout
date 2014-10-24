'use strict';

var state1 = angular.module( 'state1' );

state1.controller( 'State1Controller', function( $rootScope, $scope )
{
	$scope.stateName = 'state-1';

	console.log( 'State1Controller active!' );

} );
