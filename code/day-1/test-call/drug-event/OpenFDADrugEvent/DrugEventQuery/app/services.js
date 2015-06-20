'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', []).
  value('version', '0.1');

angular.module('myApp.services').factory('OpenFdaApiService', ['$http', '$q',
    function ($http, $q) {
        var fdaApiService = {};
        var _getDrugEvents = function() {
            var url = 'http://api.fda.gov/drug/event.json?limit=5';
            var deferred = $q.defer();

            $http.get(url).success(function (response) {
                deferred.resolve(response);
            });

            return deferred.promise;
        }

        var _getFoodEvents = function () {
            var url = 'http://api.fda.gov/food/enforcement.json?limit=5';
            var deferred = $q.defer();

            $http.get(url).success(function (response) {
                deferred.resolve(response);
            });

            return deferred.promise;
        }

        fdaApiService.getDrugEvents = _getDrugEvents;
        fdaApiService.getFoodEvents = _getFoodEvents;

        return fdaApiService;
    }
]);
