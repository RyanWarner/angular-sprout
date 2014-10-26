'use strict';

var childState2 = angular.module( 'childState2',
[
	'ui.router'
] );


childState2.config( function( $stateProvider )
{
	$stateProvider.state( 'root.parent-state-2.child-state-2',
	{
		url: 'child-state-2/',
		views:
		{
			'child-content':
			{
				templateUrl: 'states/root/parent-state-2/child-state-2/child-state-2_template.html',
				controller: 'ChildState2Controller as childState2'
			}
		},
		activeTopNav: 'parent-state-2',
		activeChildNav: 'child-state-2'
	} );
} );
