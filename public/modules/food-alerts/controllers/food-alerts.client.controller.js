'use strict';

// Food alerts controller
angular.module('food-alerts').controller('FoodAlertsController', ['$scope', '$stateParams', '$location', 'Authentication', 'FoodAlerts',
	function($scope, $stateParams, $location, Authentication, FoodAlerts) {
		$scope.authentication = Authentication;

		// Create new Food alert
		$scope.create = function() {
			// Create new Food alert object
			var foodAlert = new FoodAlerts ({
				name: this.name
			});

			// Redirect after save
			foodAlert.$save(function(response) {
				$location.path('food-alerts/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Food alert
		$scope.remove = function(foodAlert) {
			if ( foodAlert ) { 
				foodAlert.$remove();

				for (var i in $scope.foodAlerts) {
					if ($scope.foodAlerts [i] === foodAlert) {
						$scope.foodAlerts.splice(i, 1);
					}
				}
			} else {
				$scope.foodAlert.$remove(function() {
					$location.path('food-alerts');
				});
			}
		};

		// Update existing Food alert
		$scope.update = function() {
			var foodAlert = $scope.foodAlert;

			foodAlert.$update(function() {
				$location.path('food-alerts/' + foodAlert._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Food alerts
		$scope.find = function() {
			$scope.foodAlerts = FoodAlerts.query();
		};

		// Find existing Food alert
		$scope.findOne = function() {
			$scope.foodAlert = FoodAlerts.get({ 
				foodAlertId: $stateParams.foodAlertId
			});
		};
	}
]);