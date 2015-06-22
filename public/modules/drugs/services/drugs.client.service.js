/**
 * Created by Eugene on 6/21/2015.
 */

'use strict';

//Articles service used for communicating with the articles REST endpoints
angular.module('drugs').factory('DrugEvents', ['$http', '$q',
    function($http, $q) {
        var fdaDrugEnforcementApi = {};
        fdaDrugEnforcementApi.query = function(limit){
            var url = 'http://api.fda.gov/drug/event.json?limit=' + limit;
            var deferred = $q.defer();

            $http.get(url).success(function (response) {
                deferred.resolve(response);
            });

            return deferred.promise;
        }
        return fdaDrugEnforcementApi;
    }
]);
