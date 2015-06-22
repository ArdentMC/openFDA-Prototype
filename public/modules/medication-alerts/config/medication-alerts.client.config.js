'use strict';

// Configuring the Articles module
angular.module('medication-alerts').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Medication alerts', 'medication-alerts', 'dropdown', '/medication-alerts(/create)?');
		Menus.addSubMenuItem('topbar', 'medication-alerts', 'List Medication alerts', 'medication-alerts');
		Menus.addSubMenuItem('topbar', 'medication-alerts', 'New Medication alert', 'medication-alerts/create');
	}
]);