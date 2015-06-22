/**
 * Created by Eugene on 6/21/2015.
 */
'use strict';

// Articles controller
angular.module('foods').controller('FoodsController', ['$scope', '$stateParams', '$location', 'Authentication', 'FoodEnforcments',
    function($scope, $stateParams, $location, Authentication, FoodEnforcments) {
        $scope.authentication = Authentication;
        $scope.foodEnforcementList = [];

        // Find a list of FoodEnforments
        $scope.find = function() {
            FoodEnforcments.query(5).then(function (response) {
                angular.forEach(response.results, function (value) {
                    $scope.foodEnforcementList.push(value);
                });
            });
        };
    }
]);
