/**
 * Created by Eugene on 6/21/2015.
 */

'use strict';

//Articles service used for communicating with the articles REST endpoints
angular.module('foods').factory('FoodEnforcements', ['$http', '$q',
    function($http, $q) {
        var fdaFoodEnforcementApi = {};
        fdaFoodEnforcementApi.query = function(startdate, enddate, state){
            //String.format("{0},{1},{2},{3}", map.extent.xmin, map.extent.xmax, map.extent.ymin, map.extent.ymax);
            var url = String.format("http://api.fda.gov/food/enforcement.json?api_key=3mQQKK3ejZDKCKbd0g8tocBZtmn1fNUun966nq3Q&search=recall_initiation_date:[{0}+TO+{1}]+AND+distribution_pattern:{2}&limit=30", startdate, enddate, state);
            //var url = 'http://api.fda.gov/food/enforcement.json?api_key=3mQQKK3ejZDKCKbd0g8tocBZtmn1fNUun966nq3Q&limit=100';
            var deferred = $q.defer();

            $http.get(url).success(function (response) {
                deferred.resolve(response);
            });

            return deferred.promise;
        }
        return fdaFoodEnforcementApi;
    }
]);
