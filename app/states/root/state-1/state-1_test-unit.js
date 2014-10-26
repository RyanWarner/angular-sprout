'use strict';

describe( 'State 1', function(  )
{
	var scope;
	var controller;

	beforeEach( function(  )
	{
		module( 'angularSprout' );
	} );

	beforeEach( inject( function( $rootScope, $controller )
	{
		scope = $rootScope.$new(  );
		controller = $controller( 'State1Controller', { $scope: scope } );
	} ) );

	it( 'should have a scope variable', function(  )
	{
		expect( scope.stateName ).to.equal( 'state-1' );
	} );
} );
