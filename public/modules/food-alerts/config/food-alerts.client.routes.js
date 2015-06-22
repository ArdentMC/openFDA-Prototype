'use strict';

//Setting up route
angular.module('food-alerts').config(['$stateProvider',
	function($stateProvider) {
		// Food alerts state routing
		$stateProvider.
		state('listFoodAlerts', {
			url: '/food-alerts',
			templateUrl: 'modules/food-alerts/views/list-food-alerts.client.view.html'
		}).
		state('createFoodAlert', {
			url: '/food-alerts/create',
			templateUrl: 'modules/food-alerts/views/create-food-alert.client.view.html'
		}).
		state('viewFoodAlert', {
			url: '/food-alerts/:foodAlertId',
			templateUrl: 'modules/food-alerts/views/view-food-alert.client.view.html'
		}).
		state('editFoodAlert', {
			url: '/food-alerts/:foodAlertId/edit',
			templateUrl: 'modules/food-alerts/views/edit-food-alert.client.view.html'
		});
	}
]);