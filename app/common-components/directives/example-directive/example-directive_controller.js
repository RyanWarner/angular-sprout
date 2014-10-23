'use strict';

var exampleDirective = angular.module( 'exampleDirective' );

exampleDirective.controller( 'ExampleDirectiveController', function( $rootScope, $scope )
{

	// This is a controller.

	$scope.stateName = 'page-one';

	console.log( 'PageOneController active!' );

} );
