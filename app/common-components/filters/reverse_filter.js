'use strict';

var reverseFilter = angular.module( 'reverseFilter', [  ] );

reverseFilter.filter( 'reverse', function(  )
{
	return function( items )
	{
		if( items )
		{
			return items.slice(  ).reverse(  );
		}
		else
		{
			return;
		}
	};
} );
