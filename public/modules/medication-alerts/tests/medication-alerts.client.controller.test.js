'use strict';

(function() {
	// Medication alerts Controller Spec
	describe('Medication alerts Controller Tests', function() {
		// Initialize global variables
		var MedicationAlertsController,
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

			// Initialize the Medication alerts controller.
			MedicationAlertsController = $controller('MedicationAlertsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Medication alert object fetched from XHR', inject(function(MedicationAlerts) {
			// Create sample Medication alert using the Medication alerts service
			var sampleMedicationAlert = new MedicationAlerts({
				name: 'New Medication alert'
			});

			// Create a sample Medication alerts array that includes the new Medication alert
			var sampleMedicationAlerts = [sampleMedicationAlert];

			// Set GET response
			$httpBackend.expectGET('medication-alerts').respond(sampleMedicationAlerts);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.medicationAlerts).toEqualData(sampleMedicationAlerts);
		}));

		it('$scope.findOne() should create an array with one Medication alert object fetched from XHR using a medicationAlertId URL parameter', inject(function(MedicationAlerts) {
			// Define a sample Medication alert object
			var sampleMedicationAlert = new MedicationAlerts({
				name: 'New Medication alert'
			});

			// Set the URL parameter
			$stateParams.medicationAlertId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/medication-alerts\/([0-9a-fA-F]{24})$/).respond(sampleMedicationAlert);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.medicationAlert).toEqualData(sampleMedicationAlert);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(MedicationAlerts) {
			// Create a sample Medication alert object
			var sampleMedicationAlertPostData = new MedicationAlerts({
				name: 'New Medication alert'
			});

			// Create a sample Medication alert response
			var sampleMedicationAlertResponse = new MedicationAlerts({
				_id: '525cf20451979dea2c000001',
				name: 'New Medication alert'
			});

			// Fixture mock form input values
			scope.name = 'New Medication alert';

			// Set POST response
			$httpBackend.expectPOST('medication-alerts', sampleMedicationAlertPostData).respond(sampleMedicationAlertResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Medication alert was created
			expect($location.path()).toBe('/medication-alerts/' + sampleMedicationAlertResponse._id);
		}));

		it('$scope.update() should update a valid Medication alert', inject(function(MedicationAlerts) {
			// Define a sample Medication alert put data
			var sampleMedicationAlertPutData = new MedicationAlerts({
				_id: '525cf20451979dea2c000001',
				name: 'New Medication alert'
			});

			// Mock Medication alert in scope
			scope.medicationAlert = sampleMedicationAlertPutData;

			// Set PUT response
			$httpBackend.expectPUT(/medication-alerts\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/medication-alerts/' + sampleMedicationAlertPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid medicationAlertId and remove the Medication alert from the scope', inject(function(MedicationAlerts) {
			// Create new Medication alert object
			var sampleMedicationAlert = new MedicationAlerts({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Medication alerts array and include the Medication alert
			scope.medicationAlerts = [sampleMedicationAlert];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/medication-alerts\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleMedicationAlert);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.medicationAlerts.length).toBe(0);
		}));
	});
}());