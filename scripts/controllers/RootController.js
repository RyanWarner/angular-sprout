'use strict';

var appSeed = angular.module( 'appSeed' );

appSeed.controller( 'RootController', function( $rootScope, $scope )
{

	// This is a controller.

	$scope.firstName = 'Ryan';

	console.log( 'Controller active!' );

} );
