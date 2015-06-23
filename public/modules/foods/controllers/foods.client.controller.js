/**
 * Created by Eugene on 6/21/2015.
 */
'use strict';

// Articles controller
angular.module('foods').controller('FoodsController', ['$scope', '$stateParams', '$location', 'Authentication', 'FoodEnforcements',
    function($scope, $stateParams, $location, Authentication, FoodEnforcements) {
        $scope.authentication = Authentication;
        $scope.foodEnforcementList = [];

        // Find a list of FoodEnforcements
        $scope.find = function() {
            FoodEnforcements.query(25).then(function (response) {
                angular.forEach(response.results, function (value) {
                    var tempdate = value.recall_initiation_date;
                    value.recall_initiation_date = new Date(tempdate.substring(0, 4) + '-' + tempdate.substring(4, 6) + '-' + tempdate.substring(6, 8));
                    tempdate = value.report_date;
                    value.report_date = new Date(tempdate.substring(0, 4) + '-' + tempdate.substring(4, 6) + '-' + tempdate.substring(6, 8));
                    $scope.foodEnforcementList.push(value);
                });
            });
        };


       // $('.nav-pills a').click(function (e) {
      //      e.preventDefault();
    //       $(this).tab('show');
     //   });
    }
]);
