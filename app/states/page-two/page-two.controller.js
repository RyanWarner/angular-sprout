'use strict';

var pageTwo = angular.module( 'pageTwo' );

pageTwo.controller( 'PageTwoController', function( $rootScope, $scope )
{

	// This is a controller.

	$scope.isControllerActive = 'yes';

	console.log( 'PageTwoController active!' );

} );
