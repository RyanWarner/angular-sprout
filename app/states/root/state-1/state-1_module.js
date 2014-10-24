'use strict';

var state1 = angular.module( 'state1',
[
	'ui.router'
] );


state1.config( function( $stateProvider )
{
	$stateProvider.state( 'root.state-1',
	{
		url: 'state-1',
		views:
		{
			'page':
			{
				templateUrl: 'states/state-1/state-1_template.html',
				controller: 'State1Controller as state1'
			}
		}
	} );
} );
