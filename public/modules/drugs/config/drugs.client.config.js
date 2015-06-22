/**
 * Created by Eugene on 6/21/2015.
 */
'use strict';

// Configuring the Articles module
angular.module('drugs').run(['Menus',
    function(Menus) {
        // Set top bar menu items
        Menus.addMenuItem('topbar', 'Drugs', 'drugEvents', 'dropdown');
        Menus.addSubMenuItem('topbar', 'drugEvents', 'List Events', 'drugEvents');
      //  Menus.addSubMenuItem('topbar', 'articles', 'New Article', 'articles/create');
    }
]);