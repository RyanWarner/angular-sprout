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
				templateUrl: 'states/page-one/page-one_template.html',
				controller: 'PageOneController'
			}
		}
	} );
} );
