'use strict';

describe( 'My Root Controller', function(  )
{
	var scope;
	var controller;

	beforeEach( function(  )
	{
		module( 'appSeed' );
		module( 'root' );
	} );

	beforeEach( inject( function( $rootScope, $controller )
	{
		scope = $rootScope.$new(  );
		controller = $controller( 'RootController', { $scope: scope } );
	} ) );

	it( 'should have a scope variable', function(  )
	{
		expect( scope.isControllerActive ).to.equal( 'yes' );
	} );
} );
