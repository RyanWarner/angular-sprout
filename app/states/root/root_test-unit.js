'use strict';

describe( 'Root', function(  )
{
	beforeEach( function(  )
	{
		var scope;
		var controller;

		module( 'angularSprout' );
	} );

	beforeEach( inject( function( $rootScope, $controller )
	{
		scope = $rootScope.$new(  );
		controller = $controller( 'RootController', { $scope: scope } );
	} ) );

	it( 'should have a scope variable', function(  )
	{
		expect( scope.stateName ).to.equal( 'root' );
	} );
} );
