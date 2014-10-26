'use strict';

describe( 'Parent State 2', function(  )
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
		controller = $controller( 'ParentState2Controller', { $scope: scope } );
	} ) );

	it( 'should have a scope variable', function(  )
	{
		expect( scope.stateName ).to.equal( 'parent-state-2' );
	} );
} );
