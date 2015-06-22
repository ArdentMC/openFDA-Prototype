'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	FoodAlert = mongoose.model('FoodAlert'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, foodAlert;

/**
 * Food alert routes tests
 */
describe('Food alert CRUD tests', function() {
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

		// Save a user to the test db and create new Food alert
		user.save(function() {
			foodAlert = {
				name: 'Food alert Name'
			};

			done();
		});
	});

	it('should be able to save Food alert instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Food alert
				agent.post('/food-alerts')
					.send(foodAlert)
					.expect(200)
					.end(function(foodAlertSaveErr, foodAlertSaveRes) {
						// Handle Food alert save error
						if (foodAlertSaveErr) done(foodAlertSaveErr);

						// Get a list of Food alerts
						agent.get('/food-alerts')
							.end(function(foodAlertsGetErr, foodAlertsGetRes) {
								// Handle Food alert save error
								if (foodAlertsGetErr) done(foodAlertsGetErr);

								// Get Food alerts list
								var foodAlerts = foodAlertsGetRes.body;

								// Set assertions
								(foodAlerts[0].user._id).should.equal(userId);
								(foodAlerts[0].name).should.match('Food alert Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Food alert instance if not logged in', function(done) {
		agent.post('/food-alerts')
			.send(foodAlert)
			.expect(401)
			.end(function(foodAlertSaveErr, foodAlertSaveRes) {
				// Call the assertion callback
				done(foodAlertSaveErr);
			});
	});

	it('should not be able to save Food alert instance if no name is provided', function(done) {
		// Invalidate name field
		foodAlert.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Food alert
				agent.post('/food-alerts')
					.send(foodAlert)
					.expect(400)
					.end(function(foodAlertSaveErr, foodAlertSaveRes) {
						// Set message assertion
						(foodAlertSaveRes.body.message).should.match('Please fill Food alert name');
						
						// Handle Food alert save error
						done(foodAlertSaveErr);
					});
			});
	});

	it('should be able to update Food alert instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Food alert
				agent.post('/food-alerts')
					.send(foodAlert)
					.expect(200)
					.end(function(foodAlertSaveErr, foodAlertSaveRes) {
						// Handle Food alert save error
						if (foodAlertSaveErr) done(foodAlertSaveErr);

						// Update Food alert name
						foodAlert.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Food alert
						agent.put('/food-alerts/' + foodAlertSaveRes.body._id)
							.send(foodAlert)
							.expect(200)
							.end(function(foodAlertUpdateErr, foodAlertUpdateRes) {
								// Handle Food alert update error
								if (foodAlertUpdateErr) done(foodAlertUpdateErr);

								// Set assertions
								(foodAlertUpdateRes.body._id).should.equal(foodAlertSaveRes.body._id);
								(foodAlertUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Food alerts if not signed in', function(done) {
		// Create new Food alert model instance
		var foodAlertObj = new FoodAlert(foodAlert);

		// Save the Food alert
		foodAlertObj.save(function() {
			// Request Food alerts
			request(app).get('/food-alerts')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Food alert if not signed in', function(done) {
		// Create new Food alert model instance
		var foodAlertObj = new FoodAlert(foodAlert);

		// Save the Food alert
		foodAlertObj.save(function() {
			request(app).get('/food-alerts/' + foodAlertObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', foodAlert.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Food alert instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Food alert
				agent.post('/food-alerts')
					.send(foodAlert)
					.expect(200)
					.end(function(foodAlertSaveErr, foodAlertSaveRes) {
						// Handle Food alert save error
						if (foodAlertSaveErr) done(foodAlertSaveErr);

						// Delete existing Food alert
						agent.delete('/food-alerts/' + foodAlertSaveRes.body._id)
							.send(foodAlert)
							.expect(200)
							.end(function(foodAlertDeleteErr, foodAlertDeleteRes) {
								// Handle Food alert error error
								if (foodAlertDeleteErr) done(foodAlertDeleteErr);

								// Set assertions
								(foodAlertDeleteRes.body._id).should.equal(foodAlertSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Food alert instance if not signed in', function(done) {
		// Set Food alert user 
		foodAlert.user = user;

		// Create new Food alert model instance
		var foodAlertObj = new FoodAlert(foodAlert);

		// Save the Food alert
		foodAlertObj.save(function() {
			// Try deleting Food alert
			request(app).delete('/food-alerts/' + foodAlertObj._id)
			.expect(401)
			.end(function(foodAlertDeleteErr, foodAlertDeleteRes) {
				// Set message assertion
				(foodAlertDeleteRes.body.message).should.match('User is not logged in');

				// Handle Food alert error error
				done(foodAlertDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		FoodAlert.remove().exec();
		done();
	});
});