/**
 * Created by Eugene on 6/23/2015.
 */
'use strict';

(function() {
    // Foods controller Spec
    describe('FoodsController', function() {
        // Initialize global variables
        var FoodsController,
            scope,
            $httpBackend,
            $stateParams,
            $location,
            jsonValues = {
                "meta": {
                    "disclaimer": "openFDA is a beta research project and not for clinical use. While we make every effort to ensure that data is accurate, you should assume all results are unvalidated.",
                    "license": "http://open.fda.gov/license",
                    "last_updated": "2015-05-31",
                    "results": {
                        "skip": 0,
                        "limit": 100,
                        "total": 8016
                    }
                },
                "results": [
                    {
                        "recall_number": "F-0283-2013",
                        "reason_for_recall": "During an FDA inspection, microbiological swabs were collected and the results found that 21 sub samples in zones 1, 2 & 3 are positive for Listeria Monocytogenes (L.M.), Listeria innocua (L.I.) or Listeria seeligeri (L.S.).  The firm is voluntarily recalling all products manufactured from August 20th to September 10th 2012 due to the possible contamination.  All products with sell by dates on or before 11-OCT. No illnesses have been reported.",
                        "status": "Ongoing",
                        "distribution_pattern": "MI and OH only.",
                        "product_quantity": "520",
                        "recall_initiation_date": "20120910",
                        "state": "MI",
                        "event_id": "63159",
                        "product_type": "Food",
                        "product_description": "#011 Zucchini Stir,Fry      0.75 pounds",
                        "country": "US",
                        "city": "Grand Rapids",
                        "recalling_firm": "Spartan Central Kitchen",
                        "report_date": "20121024",
                        "@epoch": 1424553174.836488,
                        "voluntary_mandated": "Voluntary: Firm Initiated",
                        "classification": "Class II",
                        "code_info": "All with sell by dates on or before 15-Sep with UPC 0-11213-90380",
                        "@id": "00028a950de0ef32fc01dc3963e6fdae7073912c0083faf0a1d1bcdf7a03c44c",
                        "openfda": {},
                        "initial_firm_notification": "E-Mail"
                    },
                    {
                        "recall_number": "F-0924-2013",
                        "reason_for_recall": "The labels on two-liter batches of Regular and Diet Wild Cherry Pepsi were mistakenly swapped during production. This is potential safety issue for individuals who are sensitive to phenylalanine (i.e., phenylketonuric) or who are diabetic.",
                        "status": "Ongoing",
                        "distribution_pattern": "Massachusetts, Connecticut, Maine, New Hampshire and Vermont",
                        "product_quantity": "1064 - 8 pack cases",
                        "recall_initiation_date": "20121220",
                        "state": "NY",
                        "event_id": "63954",
                        "product_type": "Food",
                        "product_description": "Regular Wild Cherry Pepsi two liter plastic bottles\nUPC 1231100",
                        "country": "US",
                        "city": "Valhalla",
                        "recalling_firm": "Pepsi Cola North America",
                        "report_date": "20130130",
                        "@epoch": 1424553174.836488,
                        "voluntary_mandated": "Voluntary: Firm Initiated",
                        "classification": "Class III",
                        "code_info": "Best Before Date of Feb2513 and a Manufacturing Code of PF11282",
                        "@id": "00051a008281b984d492fc73132fd514042daaa8facd7657b98a5bc33cc7d017",
                        "openfda": {},
                        "initial_firm_notification": "Letter"
                    }
                ]
            };

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

        // Load the main application module
        beforeEach(module(ApplicationConfiguration.applicationModuleName));

        // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
        // This allows us to inject a service but then attach it to a variable
        // with the same name as the service.
        beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
            // Set a new global scope
            scope = $rootScope.$new();
            scope['foodEnforcementList'] = [];

            // Point global variables to injected services
            $stateParams = _$stateParams_;
            $httpBackend = _$httpBackend_;
            $location = _$location_;

            // Initialize the Authentication controller
            FoodsController = $controller('FoodsController', {
                $scope: scope
            });
        }));


        it('$scope.find () should get two food FoodEnforcement reports', function() {
            // Test expected GET request
            $httpBackend.when('GET', 'http://api.fda.gov/food/enforcement.json?api_key=3mQQKK3ejZDKCKbd0g8tocBZtmn1fNUun966nq3Q&limit=2').respond(200, jsonValues);

            scope.find();
            $httpBackend.flush();

            // Test scope value
            expect(scope.foodEnforcementList[0].recall_number).toEqual('F-0283-2013');
        });

    });
}());
