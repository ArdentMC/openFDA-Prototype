'use strict';


angular.module('core').controller('HomeController', ['$scope', 'Authentication', '$location', '$anchorScroll',
	function($scope, Authentication, $location, $anchorScroll) {
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

		$scope.gotoMore = function(){
			$location.hash('moreinfo');
			// call $anchorScroll()
			$anchorScroll();
		}
	}
]);