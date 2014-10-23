'use strict';

describe( 'My Root Controller', function(  )
{
	var scope;
	var controller;

	beforeEach( function(  )
	{
		module( 'appSeed' );
		module( 'pageOne' );
	} );

	beforeEach( inject( function( $rootScope, $controller )
	{
		scope = $rootScope.$new(  );
		controller = $controller( 'PageOneController', { $scope: scope } );
	} ) );

	it( 'should have a scope variable', function(  )
	{
		expect( scope.stateName ).to.equal( 'page-one' );
	} );
} );
