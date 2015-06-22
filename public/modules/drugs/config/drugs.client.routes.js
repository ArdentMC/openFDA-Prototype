/**
 * Created by Eugene on 6/21/2015.
 */
'use strict';

// Setting up route
angular.module('drugs').config(['$stateProvider',
    function($stateProvider) {
        // Articles state routing
        $stateProvider.
            state('listEvents', {
                url: '/drugEvents',
                templateUrl: 'modules/drugs/views/list-drug-events.client.view.html'
            }).
            state('viewEvent', {
                url: '/drugEvents/:drugEventId',
                templateUrl: 'modules/drugs/views/view-drug-event.client.view.html'
            })
    }
]);