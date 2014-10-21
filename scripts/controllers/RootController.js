'use strict';

var appSeed = angular.module( 'appSeed' );

appSeed.controller( 'RootController', function( $rootScope, $scope )
{

	// This is a controller.

	$scope.isControllerActive = 'yes';

	console.log( 'Controller active!' );

} );
