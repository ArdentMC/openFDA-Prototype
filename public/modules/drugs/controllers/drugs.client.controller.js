/**
 * Created by Eugene on 6/21/2015.
 */
'use strict';

// Articles controller
angular.module('drugs').controller('DrugsController', ['$scope', '$stateParams', '$location', 'Authentication', 'DrugEvents',
    function($scope, $stateParams, $location, Authentication, DrugEvents) {
        $scope.authentication = Authentication;
        $scope.drugEventList = [];
        // Find a list of DrugEvents
        $scope.find = function() {
            DrugEvents.query(5).then(function (response) {
                angular.forEach(response.results, function (value) {
                    $scope.drugEventList.push(value);
                });
            });
        };
    }
]);