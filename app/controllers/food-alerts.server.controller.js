'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	FoodAlert = mongoose.model('FoodAlert'),
	_ = require('lodash');

/**
 * Create a Food alert
 */
exports.create = function(req, res) {
	var foodAlert = new FoodAlert(req.body);
	foodAlert.user = req.user;

	foodAlert.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(foodAlert);
		}
	});
};

/**
 * Show the current Food alert
 */
exports.read = function(req, res) {
	res.jsonp(req.foodAlert);
};

/**
 * Update a Food alert
 */
exports.update = function(req, res) {
	var foodAlert = req.foodAlert ;

	foodAlert = _.extend(foodAlert , req.body);

	foodAlert.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(foodAlert);
		}
	});
};

/**
 * Delete an Food alert
 */
exports.delete = function(req, res) {
	var foodAlert = req.foodAlert ;

	foodAlert.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(foodAlert);
		}
	});
};

/**
 * List of Food alerts
 */
exports.list = function(req, res) { 
	FoodAlert.find().sort('-created').populate('user', 'displayName').exec(function(err, foodAlerts) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(foodAlerts);
		}
	});
};

/**
 * Food alert middleware
 */
exports.foodAlertByID = function(req, res, next, id) { 
	FoodAlert.findById(id).populate('user', 'displayName').exec(function(err, foodAlert) {
		if (err) return next(err);
		if (! foodAlert) return next(new Error('Failed to load Food alert ' + id));
		req.foodAlert = foodAlert ;
		next();
	});
};

/**
 * Food alert authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.foodAlert.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
