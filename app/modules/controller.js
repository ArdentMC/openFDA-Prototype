'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('MyCtrl1', ['$scope', 'OpenFdaApiService', function ($scope, OpenFdaApiService) {
        $scope.drugList = [];
        OpenFdaApiService.getDrugEvents().then(function(response) {
            angular.forEach(response.results, function (value) {
                $scope.drugList.push(value);
            });
        });
    }])
  .controller('MyCtrl2', ['$scope', 'OpenFdaApiService', function ($scope, OpenFdaApiService) {
      $scope.foodList = [];
      OpenFdaApiService.getFoodEvents().then(function (response) {
          angular.forEach(response.results, function (value) {
              $scope.foodList.push(value);
          });
      });
}]);