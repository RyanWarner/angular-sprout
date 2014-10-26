'use strict';

describe( 'Child State 2', function(  )
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
		controller = $controller( 'ChildState2Controller', { $scope: scope } );
	} ) );

	it( 'should have a scope variable', function(  )
	{
		expect( scope.stateName ).to.equal( 'parentState2.child-state-2' );
	} );
} );
