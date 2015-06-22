'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	MedicationAlert = mongoose.model('MedicationAlert'),
	_ = require('lodash');

/**
 * Create a Medication alert
 */
exports.create = function(req, res) {
	var medicationAlert = new MedicationAlert(req.body);
	medicationAlert.user = req.user;

	medicationAlert.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(medicationAlert);
		}
	});
};

/**
 * Show the current Medication alert
 */
exports.read = function(req, res) {
	res.jsonp(req.medicationAlert);
};

/**
 * Update a Medication alert
 */
exports.update = function(req, res) {
	var medicationAlert = req.medicationAlert ;

	medicationAlert = _.extend(medicationAlert , req.body);

	medicationAlert.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(medicationAlert);
		}
	});
};

/**
 * Delete an Medication alert
 */
exports.delete = function(req, res) {
	var medicationAlert = req.medicationAlert ;

	medicationAlert.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(medicationAlert);
		}
	});
};

/**
 * List of Medication alerts
 */
exports.list = function(req, res) { 
	MedicationAlert.find().sort('-created').populate('user', 'displayName').exec(function(err, medicationAlerts) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(medicationAlerts);
		}
	});
};

/**
 * Medication alert middleware
 */
exports.medicationAlertByID = function(req, res, next, id) { 
	MedicationAlert.findById(id).populate('user', 'displayName').exec(function(err, medicationAlert) {
		if (err) return next(err);
		if (! medicationAlert) return next(new Error('Failed to load Medication alert ' + id));
		req.medicationAlert = medicationAlert ;
		next();
	});
};

/**
 * Medication alert authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.medicationAlert.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
