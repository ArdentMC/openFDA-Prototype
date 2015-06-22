'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	MedicationAlert = mongoose.model('MedicationAlert');

/**
 * Globals
 */
var user, medicationAlert;

/**
 * Unit tests
 */
describe('Medication alert Model Unit Tests:', function() {
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
			medicationAlert = new MedicationAlert({
				name: 'Medication alert Name',
				user: user
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return medicationAlert.save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without name', function(done) { 
			medicationAlert.name = '';

			return medicationAlert.save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) { 
		MedicationAlert.remove().exec();
		User.remove().exec();

		done();
	});
});