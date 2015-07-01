'use strict';


angular.module('core').controller('HomeController', ['$scope', 'Authentication', '$location',
	function($scope, Authentication, $location) {
		// This provides Authentication context.
		if(Authentication.user == null || Authentication.user._id == null){
			Authentication.user = null;
		}
		$scope.authentication = Authentication;

		// If user is not signed in then redirect back to sign-up
		if ($scope.authentication.user){
			var foodpath = location.href + 'foodEnforcements';
			location.replace(foodpath);
		}
	}
]);