'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Food alert Schema
 */
var FoodAlertSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Food alert name',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('FoodAlert', FoodAlertSchema);