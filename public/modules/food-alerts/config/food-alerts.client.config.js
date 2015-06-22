'use strict';

// Configuring the Articles module
angular.module('food-alerts').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Food alerts', 'food-alerts', 'dropdown', '/food-alerts(/create)?');
		Menus.addSubMenuItem('topbar', 'food-alerts', 'List Food alerts', 'food-alerts');
		Menus.addSubMenuItem('topbar', 'food-alerts', 'New Food alert', 'food-alerts/create');
	}
]);