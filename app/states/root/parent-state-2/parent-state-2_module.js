'use strict';

var parentState2 = angular.module( 'parentState2',
[
	'ui.router',

	'childState1',
	'childState2'
] );


parentState2.config( function( $stateProvider )
{
	$stateProvider.state( 'root.parent-state-2',
	{
		url: 'parent-state-2/',
		views:
		{
			'content':
			{
				templateUrl: 'states/root/parent-state-2/parent-state-2_template.html',
				controller: 'ParentState2Controller as parentState2'
			}
		},
		activeTopNav: 'parent-state-2'
	} );
} );
