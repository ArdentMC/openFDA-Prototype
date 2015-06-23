/**
 * Created by Eugene on 6/21/2015.
 */

'use strict';

//Articles service used for communicating with the articles REST endpoints
angular.module('foods').factory('FoodEnforcements', ['$http', '$q',
    function($http, $q) {
        var fdaFoodEnforcementApi = {};
        fdaFoodEnforcementApi.query = function(limit){
            var url = 'http://api.fda.gov/food/enforcement.json?api_key=3mQQKK3ejZDKCKbd0g8tocBZtmn1fNUun966nq3Q&limit=' + limit;
            var deferred = $q.defer();

            $http.get(url).success(function (response) {
                deferred.resolve(response);
            });

            return deferred.promise;
        }
        return fdaFoodEnforcementApi;
    }
]);
