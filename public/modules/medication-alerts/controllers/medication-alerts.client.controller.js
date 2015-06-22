'use strict';

// Medication alerts controller
angular.module('medication-alerts').controller('MedicationAlertsController', ['$scope', '$stateParams', '$location', 'Authentication', 'MedicationAlerts',
	function($scope, $stateParams, $location, Authentication, MedicationAlerts) {
		$scope.authentication = Authentication;

		// Create new Medication alert
		$scope.create = function() {
			// Create new Medication alert object
			var medicationAlert = new MedicationAlerts ({
				name: this.name
			});

			// Redirect after save
			medicationAlert.$save(function(response) {
				$location.path('medication-alerts/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Medication alert
		$scope.remove = function(medicationAlert) {
			if ( medicationAlert ) { 
				medicationAlert.$remove();

				for (var i in $scope.medicationAlerts) {
					if ($scope.medicationAlerts [i] === medicationAlert) {
						$scope.medicationAlerts.splice(i, 1);
					}
				}
			} else {
				$scope.medicationAlert.$remove(function() {
					$location.path('medication-alerts');
				});
			}
		};

		// Update existing Medication alert
		$scope.update = function() {
			var medicationAlert = $scope.medicationAlert;

			medicationAlert.$update(function() {
				$location.path('medication-alerts/' + medicationAlert._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Medication alerts
		$scope.find = function() {
			$scope.medicationAlerts = MedicationAlerts.query();
		};

		// Find existing Medication alert
		$scope.findOne = function() {
			$scope.medicationAlert = MedicationAlerts.get({ 
				medicationAlertId: $stateParams.medicationAlertId
			});
		};
	}
]);