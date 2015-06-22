'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	FoodAlert = mongoose.model('FoodAlert');

/**
 * Globals
 */
var user, foodAlert;

/**
 * Unit tests
 */
describe('Food alert Model Unit Tests:', function() {
	beforeEach(function(done) {
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: 'username',
			password: 'password'
		});

		user.save(function() { 
			foodAlert = new FoodAlert({
				name: 'Food alert Name',
				user: user
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return foodAlert.save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without name', function(done) { 
			foodAlert.name = '';

			return foodAlert.save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) { 
		FoodAlert.remove().exec();
		User.remove().exec();

		done();
	});
});