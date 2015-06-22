/**
 * Created by Eugene on 6/21/2015.
 */

'use strict';

//Articles service used for communicating with the articles REST endpoints
angular.module('foods').factory('FoodEnforcments', ['$http', '$q',
    function($http, $q) {
        var fdaFoodEnforcementApi = {};
        fdaFoodEnforcementApi.query = function(limit){
            var url = 'http://api.fda.gov/food/enforcement.json?limit=' + limit;
            var deferred = $q.defer();

            $http.get(url).success(function (response) {
                deferred.resolve(response);
            });

            return deferred.promise;
        }
        return fdaFoodEnforcementApi;
    }
]);
