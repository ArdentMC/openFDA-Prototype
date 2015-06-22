'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var medicationAlerts = require('../../app/controllers/medication-alerts.server.controller');

	// Medication alerts Routes
	app.route('/medication-alerts')
		.get(medicationAlerts.list)
		.post(users.requiresLogin, medicationAlerts.create);

	app.route('/medication-alerts/:medicationAlertId')
		.get(medicationAlerts.read)
		.put(users.requiresLogin, medicationAlerts.hasAuthorization, medicationAlerts.update)
		.delete(users.requiresLogin, medicationAlerts.hasAuthorization, medicationAlerts.delete);

	// Finish by binding the Medication alert middleware
	app.param('medicationAlertId', medicationAlerts.medicationAlertByID);
};
