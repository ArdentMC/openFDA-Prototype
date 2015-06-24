/**
 * Created by Eugene on 6/21/2015.
 */
'use strict';

// Configuring the Articles module
angular.module('foods').run(['Menus',
    function(Menus) {
        // Set top bar menu items
     //   Menus.addMenuItem('topbar', 'Foods', 'foodEnforcements', 'dropdown');
     //   Menus.addSubMenuItem('topbar', 'foodEnforcements', 'List Enforcements', 'foodEnforcements');
        //  Menus.addSubMenuItem('topbar', 'articles', 'New Article', 'articles/create');
    }
]);