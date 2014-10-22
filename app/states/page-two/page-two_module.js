'use strict';

var pageTwo = angular.module( 'pageTwo',
[
	'ui.router'
] );


pageTwo.config( function( $stateProvider )
{
	$stateProvider.state( 'root.page-two',
	{
		url: 'page-two',
		views:
		{
			'page':
			{
				templateUrl: 'states/page-two/page-two_template.html',
				controller: 'PageTwoController'
			}
		}
	} );
} );
