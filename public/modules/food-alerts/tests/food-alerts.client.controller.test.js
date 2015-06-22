'use strict';

(function() {
	// Food alerts Controller Spec
	describe('Food alerts Controller Tests', function() {
		// Initialize global variables
		var FoodAlertsController,
		scope,
		$httpBackend,
		$stateParams,
		$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Food alerts controller.
			FoodAlertsController = $controller('FoodAlertsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Food alert object fetched from XHR', inject(function(FoodAlerts) {
			// Create sample Food alert using the Food alerts service
			var sampleFoodAlert = new FoodAlerts({
				name: 'New Food alert'
			});

			// Create a sample Food alerts array that includes the new Food alert
			var sampleFoodAlerts = [sampleFoodAlert];

			// Set GET response
			$httpBackend.expectGET('food-alerts').respond(sampleFoodAlerts);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.foodAlerts).toEqualData(sampleFoodAlerts);
		}));

		it('$scope.findOne() should create an array with one Food alert object fetched from XHR using a foodAlertId URL parameter', inject(function(FoodAlerts) {
			// Define a sample Food alert object
			var sampleFoodAlert = new FoodAlerts({
				name: 'New Food alert'
			});

			// Set the URL parameter
			$stateParams.foodAlertId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/food-alerts\/([0-9a-fA-F]{24})$/).respond(sampleFoodAlert);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.foodAlert).toEqualData(sampleFoodAlert);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(FoodAlerts) {
			// Create a sample Food alert object
			var sampleFoodAlertPostData = new FoodAlerts({
				name: 'New Food alert'
			});

			// Create a sample Food alert response
			var sampleFoodAlertResponse = new FoodAlerts({
				_id: '525cf20451979dea2c000001',
				name: 'New Food alert'
			});

			// Fixture mock form input values
			scope.name = 'New Food alert';

			// Set POST response
			$httpBackend.expectPOST('food-alerts', sampleFoodAlertPostData).respond(sampleFoodAlertResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Food alert was created
			expect($location.path()).toBe('/food-alerts/' + sampleFoodAlertResponse._id);
		}));

		it('$scope.update() should update a valid Food alert', inject(function(FoodAlerts) {
			// Define a sample Food alert put data
			var sampleFoodAlertPutData = new FoodAlerts({
				_id: '525cf20451979dea2c000001',
				name: 'New Food alert'
			});

			// Mock Food alert in scope
			scope.foodAlert = sampleFoodAlertPutData;

			// Set PUT response
			$httpBackend.expectPUT(/food-alerts\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/food-alerts/' + sampleFoodAlertPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid foodAlertId and remove the Food alert from the scope', inject(function(FoodAlerts) {
			// Create new Food alert object
			var sampleFoodAlert = new FoodAlerts({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Food alerts array and include the Food alert
			scope.foodAlerts = [sampleFoodAlert];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/food-alerts\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleFoodAlert);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.foodAlerts.length).toBe(0);
		}));
	});
}());