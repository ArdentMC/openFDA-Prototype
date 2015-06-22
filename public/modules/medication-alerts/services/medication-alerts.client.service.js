'use strict';

//Medication alerts service used to communicate Medication alerts REST endpoints
angular.module('medication-alerts').factory('MedicationAlerts', ['$resource',
	function($resource) {
		return $resource('medication-alerts/:medicationAlertId', { medicationAlertId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);