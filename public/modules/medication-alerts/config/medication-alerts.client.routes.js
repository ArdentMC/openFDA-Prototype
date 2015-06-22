'use strict';

//Setting up route
angular.module('medication-alerts').config(['$stateProvider',
	function($stateProvider) {
		// Medication alerts state routing
		$stateProvider.
		state('listMedicationAlerts', {
			url: '/medication-alerts',
			templateUrl: 'modules/medication-alerts/views/list-medication-alerts.client.view.html'
		}).
		state('createMedicationAlert', {
			url: '/medication-alerts/create',
			templateUrl: 'modules/medication-alerts/views/create-medication-alert.client.view.html'
		}).
		state('viewMedicationAlert', {
			url: '/medication-alerts/:medicationAlertId',
			templateUrl: 'modules/medication-alerts/views/view-medication-alert.client.view.html'
		}).
		state('editMedicationAlert', {
			url: '/medication-alerts/:medicationAlertId/edit',
			templateUrl: 'modules/medication-alerts/views/edit-medication-alert.client.view.html'
		});
	}
]);