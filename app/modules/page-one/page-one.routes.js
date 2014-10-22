'use strict';

var pageOne = angular.module( 'pageOne',
[
	'ui.router'
] );


pageOne.config( function( $stateProvider )
{
	$stateProvider.state( 'root.page-one',
	{
		url: 'page-one',
		views:
		{
			'page':
			{
				templateUrl: 'modules/page-one/page-one.html',
				controller: 'PageOneController'
			}
		}
	} );
} );
