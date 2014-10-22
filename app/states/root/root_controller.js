'use strict';

var root = angular.module( 'root' );

root.controller( 'RootController', function( $rootScope, $scope )
{

	// This is a controller.

	$scope.isControllerActive = 'yes';

	console.log( 'RootController active!' );

} );
