'use strict';

var grandparentState3 = angular.module( 'grandparent-state-3' );

grandparentState3.controller( 'PageOneController', function( $rootScope, $scope )
{

	// This is a controller.

	$scope.stateName = 'grandparentState3';

	console.log( 'PageOneController active!' );

} );
