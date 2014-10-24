'use strict';

var grandparentState3 = angular.module( 'grandparentState3',
[
	'ui.router'
] );


grandparentState3.config( function( $stateProvider )
{
	$stateProvider.state( 'root.grandparent-state-3',
	{
		url: 'grandparent-state-3',
		views:
		{
			'content':
			{
				templateUrl: 'states/root/grandparent-state-3/grandparent-state-3_template.html',
				controller: 'GrandparentState3Controller as grandparentState3'
			}
		},
		activeTopNav: 'grandparent-state-3'
	} );
} );
