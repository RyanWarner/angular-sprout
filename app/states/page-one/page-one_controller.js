'use strict';

var pageOne = angular.module( 'pageOne' );

pageOne.controller( 'PageOneController', function( $rootScope, $scope )
{

	// This is a controller.

	$scope.stateName = 'page-one';

	console.log( 'PageOneController active!' );

} );
