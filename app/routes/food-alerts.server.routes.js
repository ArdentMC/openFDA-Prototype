'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var foodAlerts = require('../../app/controllers/food-alerts.server.controller');

	// Food alerts Routes
	app.route('/food-alerts')
		.get(foodAlerts.list)
		.post(users.requiresLogin, foodAlerts.create);

	app.route('/food-alerts/:foodAlertId')
		.get(foodAlerts.read)
		.put(users.requiresLogin, foodAlerts.hasAuthorization, foodAlerts.update)
		.delete(users.requiresLogin, foodAlerts.hasAuthorization, foodAlerts.delete);

	// Finish by binding the Food alert middleware
	app.param('foodAlertId', foodAlerts.foodAlertByID);
};
