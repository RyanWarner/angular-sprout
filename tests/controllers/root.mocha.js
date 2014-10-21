describe( 'My Root Controller', function(  )
{
	var scope;
	var controller;

	beforeEach( module('appSeed') );

	beforeEach( inject( function( $rootScope, $controller )
	{
		scope = $rootScope.$new(  );
		controller = $controller( 'RootController', { $scope: scope } );
	} ) );

	it( 'should have be active', function(  )
	{
		expect( scope.isControllerActive ).to.equal( 'yes' );
	} );
} );