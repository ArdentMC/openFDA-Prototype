'use strict';


angular.module('core').controller('HomeController', ['$scope', 'Authentication',
	function($scope, Authentication) {
		$scope.isAuth = false;
		// This provides Authentication context.
		$scope.authentication = Authentication;
		$scope.isAuth = ($scope.authentication.user != null && $scope.authentication.user._id != null);
	}
]);