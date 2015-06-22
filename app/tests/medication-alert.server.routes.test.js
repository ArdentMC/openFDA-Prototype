'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	MedicationAlert = mongoose.model('MedicationAlert'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, medicationAlert;

/**
 * Medication alert routes tests
 */
describe('Medication alert CRUD tests', function() {
	beforeEach(function(done) {
		// Create user credentials
		credentials = {
			username: 'username',
			password: 'password'
		};

		// Create a new user
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: credentials.username,
			password: credentials.password,
			provider: 'local'
		});

		// Save a user to the test db and create new Medication alert
		user.save(function() {
			medicationAlert = {
				name: 'Medication alert Name'
			};

			done();
		});
	});

	it('should be able to save Medication alert instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Medication alert
				agent.post('/medication-alerts')
					.send(medicationAlert)
					.expect(200)
					.end(function(medicationAlertSaveErr, medicationAlertSaveRes) {
						// Handle Medication alert save error
						if (medicationAlertSaveErr) done(medicationAlertSaveErr);

						// Get a list of Medication alerts
						agent.get('/medication-alerts')
							.end(function(medicationAlertsGetErr, medicationAlertsGetRes) {
								// Handle Medication alert save error
								if (medicationAlertsGetErr) done(medicationAlertsGetErr);

								// Get Medication alerts list
								var medicationAlerts = medicationAlertsGetRes.body;

								// Set assertions
								(medicationAlerts[0].user._id).should.equal(userId);
								(medicationAlerts[0].name).should.match('Medication alert Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Medication alert instance if not logged in', function(done) {
		agent.post('/medication-alerts')
			.send(medicationAlert)
			.expect(401)
			.end(function(medicationAlertSaveErr, medicationAlertSaveRes) {
				// Call the assertion callback
				done(medicationAlertSaveErr);
			});
	});

	it('should not be able to save Medication alert instance if no name is provided', function(done) {
		// Invalidate name field
		medicationAlert.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Medication alert
				agent.post('/medication-alerts')
					.send(medicationAlert)
					.expect(400)
					.end(function(medicationAlertSaveErr, medicationAlertSaveRes) {
						// Set message assertion
						(medicationAlertSaveRes.body.message).should.match('Please fill Medication alert name');
						
						// Handle Medication alert save error
						done(medicationAlertSaveErr);
					});
			});
	});

	it('should be able to update Medication alert instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Medication alert
				agent.post('/medication-alerts')
					.send(medicationAlert)
					.expect(200)
					.end(function(medicationAlertSaveErr, medicationAlertSaveRes) {
						// Handle Medication alert save error
						if (medicationAlertSaveErr) done(medicationAlertSaveErr);

						// Update Medication alert name
						medicationAlert.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Medication alert
						agent.put('/medication-alerts/' + medicationAlertSaveRes.body._id)
							.send(medicationAlert)
							.expect(200)
							.end(function(medicationAlertUpdateErr, medicationAlertUpdateRes) {
								// Handle Medication alert update error
								if (medicationAlertUpdateErr) done(medicationAlertUpdateErr);

								// Set assertions
								(medicationAlertUpdateRes.body._id).should.equal(medicationAlertSaveRes.body._id);
								(medicationAlertUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Medication alerts if not signed in', function(done) {
		// Create new Medication alert model instance
		var medicationAlertObj = new MedicationAlert(medicationAlert);

		// Save the Medication alert
		medicationAlertObj.save(function() {
			// Request Medication alerts
			request(app).get('/medication-alerts')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Medication alert if not signed in', function(done) {
		// Create new Medication alert model instance
		var medicationAlertObj = new MedicationAlert(medicationAlert);

		// Save the Medication alert
		medicationAlertObj.save(function() {
			request(app).get('/medication-alerts/' + medicationAlertObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', medicationAlert.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Medication alert instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Medication alert
				agent.post('/medication-alerts')
					.send(medicationAlert)
					.expect(200)
					.end(function(medicationAlertSaveErr, medicationAlertSaveRes) {
						// Handle Medication alert save error
						if (medicationAlertSaveErr) done(medicationAlertSaveErr);

						// Delete existing Medication alert
						agent.delete('/medication-alerts/' + medicationAlertSaveRes.body._id)
							.send(medicationAlert)
							.expect(200)
							.end(function(medicationAlertDeleteErr, medicationAlertDeleteRes) {
								// Handle Medication alert error error
								if (medicationAlertDeleteErr) done(medicationAlertDeleteErr);

								// Set assertions
								(medicationAlertDeleteRes.body._id).should.equal(medicationAlertSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Medication alert instance if not signed in', function(done) {
		// Set Medication alert user 
		medicationAlert.user = user;

		// Create new Medication alert model instance
		var medicationAlertObj = new MedicationAlert(medicationAlert);

		// Save the Medication alert
		medicationAlertObj.save(function() {
			// Try deleting Medication alert
			request(app).delete('/medication-alerts/' + medicationAlertObj._id)
			.expect(401)
			.end(function(medicationAlertDeleteErr, medicationAlertDeleteRes) {
				// Set message assertion
				(medicationAlertDeleteRes.body.message).should.match('User is not logged in');

				// Handle Medication alert error error
				done(medicationAlertDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		MedicationAlert.remove().exec();
		done();
	});
});