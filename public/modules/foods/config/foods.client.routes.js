/**
 * Created by Eugene on 6/21/2015.
 */
'use strict';

// Setting up route
angular.module('foods').config(['$stateProvider',
    function($stateProvider) {
        // Articles state routing
        $stateProvider.
            state('listEnforcements', {
                url: '/foodEnforcements',
                templateUrl: 'modules/foods/views/list-food-enforcements.client.view.html'
            }).
            state('viewEnforcement', {
                url: '/foodEnforcements/:foodEnformentId',
                templateUrl: 'modules/foods/views/view-food-enforment.client.view.html'
            })
    }
]);
