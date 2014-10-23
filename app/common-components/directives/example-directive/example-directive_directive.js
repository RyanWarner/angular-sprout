'use strict';

var exampleDirective = angular.module( 'exampleDirective', [] );

exampleDirective.directive( 'exampleDirective', function(  )
{
	return {

		restrict: 'E',
		controller: 'ExampleDirectiveController',
		templateUrl: 'common-components/directives/example-directive/example-directive_template.html'

	};
} );
