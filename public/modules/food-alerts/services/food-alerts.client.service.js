'use strict';

//Food alerts service used to communicate Food alerts REST endpoints
angular.module('food-alerts').factory('FoodAlerts', ['$resource',
	function($resource) {
		return $resource('food-alerts/:foodAlertId', { foodAlertId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);