'use strict';

var childState1 = angular.module( 'childState1',
[
	'ui.router'
] );


childState1.config( function( $stateProvider )
{
	$stateProvider.state( 'root.parent-state-2.child-state-1',
	{
		url: 'child-state-1/',
		views:
		{
			'child-content':
			{
				templateUrl: 'states/root/parent-state-2/child-state-1/child-state-1_template.html',
				controller: 'ChildState1Controller as childState1'
			}
		},
		activeTopNav: 'parent-state-2',
		activeChildNav: 'child-state-1'
	} );
} );
