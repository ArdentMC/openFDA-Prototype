'use strict';

// Init the application configuration module for AngularJS application
var ApplicationConfiguration = (function() {
	// Init module configuration options
	var applicationModuleName = 'openfda-prototype';
	var applicationModuleVendorDependencies = ['ngResource', 'ngCookies',  'ngAnimate',  'ngTouch',  'ngSanitize',  'ui.router', 'ui.bootstrap', 'ui.utils'];

	// Add a new vertical module
	var registerModule = function(moduleName, dependencies) {
		// Create angular module
		angular.module(moduleName, dependencies || []);

		// Add the module to the AngularJS configuration file
		angular.module(applicationModuleName).requires.push(moduleName);
	};

	return {
		applicationModuleName: applicationModuleName,
		applicationModuleVendorDependencies: applicationModuleVendorDependencies,
		registerModule: registerModule
	};
})();
'use strict';

//Start by defining the main module and adding the module dependencies
angular.module(ApplicationConfiguration.applicationModuleName, ApplicationConfiguration.applicationModuleVendorDependencies);

// Setting HTML5 Location Mode
angular.module(ApplicationConfiguration.applicationModuleName).config(['$locationProvider',
	function($locationProvider) {
		$locationProvider.hashPrefix('!');
	}
]);

//Then define the init function for starting up the application
angular.element(document).ready(function() {
	//Fixing facebook bug with redirect
	if (window.location.hash === '#_=_') window.location.hash = '#!';
	
	// Fixing google+ bug with redirect
    	if (window.location.href[window.location.href.length - 1] === '#' &&
        	// for just the error url (origin + /#)
        	(window.location.href.length - window.location.origin.length) === 2) {
        	window.location.href = window.location.origin + '/#!';
    	}
    	
	//Then init the app
	angular.bootstrap(document, [ApplicationConfiguration.applicationModuleName]);
});

'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('core');
/**
 * Created by Eugene T. Staten II on 6/21/2015.
 */
'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('foods');

'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('users');
'use strict';

// Setting up route
angular.module('core').config(['$stateProvider', '$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {
		// Redirect to home view when route not found
		$urlRouterProvider.otherwise('/');

		// Home state routing
		$stateProvider.
		state('home', {
			url: '/',
			templateUrl: 'modules/core/views/home.client.view.html'
		});
	}
]);

if (!String.format) {
	String.format = function (format) {
		var args = Array.prototype.slice.call(arguments, 1);
		return format.replace(/{(\d+)}/g, function (match, number) {
			return typeof args[number] != 'undefined'
				? args[number]
				: match
				;
		});
	};
}
'use strict';

angular.module('core').controller('HeaderController', ['$scope', 'Authentication', 'Menus',
	function($scope, Authentication, Menus) {
		$scope.authentication = Authentication;
		$scope.isCollapsed = false;
		$scope.menu = Menus.getMenu('topbar');

		$scope.toggleCollapsibleMenu = function() {
			$scope.isCollapsed = !$scope.isCollapsed;
		};

		// Collapsing the menu after navigation
		$scope.$on('$stateChangeSuccess', function() {
			$scope.isCollapsed = false;
		});
	}
]);
'use strict';


angular.module('core').controller('HomeController', ['$scope', 'Authentication', '$location', '$anchorScroll',
	function($scope, Authentication, $location, $anchorScroll) {
		// This provides Authentication context.
		if(Authentication.user == null || Authentication.user._id == null){
			Authentication.user = null;
		}
		$scope.authentication = Authentication;

		// If user is not signed in then redirect back to sign-up
		//if ($scope.authentication.user){
		//	var foodpath = location.href + 'foodEnforcements';
		//	location.replace(foodpath);
		//}

		$scope.gotoMore = function(){
			$location.hash('moreinfo');
			// call $anchorScroll()
			$anchorScroll();
		}
		$('#faceLogin').attr("title", 'Login with Focebook.');
		$('#googleLogin').attr("title", 'Login with Google.');
		$('#linkLogin').attr("title", 'Login with LinkedIn.');
	}
]);
'use strict';

//Menu service used for managing  menus
angular.module('core').service('Menus', [

	function() {
		// Define a set of default roles
		this.defaultRoles = ['*'];

		// Define the menus object
		this.menus = {};

		// A private function for rendering decision 
		var shouldRender = function(user) {
			if (user) {
				if (!!~this.roles.indexOf('*')) {
					return true;
				} else {
					for (var userRoleIndex in user.roles) {
						for (var roleIndex in this.roles) {
							if (this.roles[roleIndex] === user.roles[userRoleIndex]) {
								return true;
							}
						}
					}
				}
			} else {
				return this.isPublic;
			}

			return false;
		};

		// Validate menu existance
		this.validateMenuExistance = function(menuId) {
			if (menuId && menuId.length) {
				if (this.menus[menuId]) {
					return true;
				} else {
					throw new Error('Menu does not exists');
				}
			} else {
				throw new Error('MenuId was not provided');
			}

			return false;
		};

		// Get the menu object by menu id
		this.getMenu = function(menuId) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Return the menu object
			return this.menus[menuId];
		};

		// Add new menu object by menu id
		this.addMenu = function(menuId, isPublic, roles) {
			// Create the new menu
			this.menus[menuId] = {
				isPublic: isPublic || false,
				roles: roles || this.defaultRoles,
				items: [],
				shouldRender: shouldRender
			};

			// Return the menu object
			return this.menus[menuId];
		};

		// Remove existing menu object by menu id
		this.removeMenu = function(menuId) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Return the menu object
			delete this.menus[menuId];
		};

		// Add menu item object
		this.addMenuItem = function(menuId, menuItemTitle, menuItemURL, menuItemType, menuItemUIRoute, isPublic, roles, position) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Push new menu item
			this.menus[menuId].items.push({
				title: menuItemTitle,
				link: menuItemURL,
				menuItemType: menuItemType || 'item',
				menuItemClass: menuItemType,
				uiRoute: menuItemUIRoute || ('/' + menuItemURL),
				isPublic: ((isPublic === null || typeof isPublic === 'undefined') ? this.menus[menuId].isPublic : isPublic),
				roles: ((roles === null || typeof roles === 'undefined') ? this.menus[menuId].roles : roles),
				position: position || 0,
				items: [],
				shouldRender: shouldRender
			});

			// Return the menu object
			return this.menus[menuId];
		};

		// Add submenu item object
		this.addSubMenuItem = function(menuId, rootMenuItemURL, menuItemTitle, menuItemURL, menuItemUIRoute, isPublic, roles, position) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Search for menu item
			for (var itemIndex in this.menus[menuId].items) {
				if (this.menus[menuId].items[itemIndex].link === rootMenuItemURL) {
					// Push new submenu item
					this.menus[menuId].items[itemIndex].items.push({
						title: menuItemTitle,
						link: menuItemURL,
						uiRoute: menuItemUIRoute || ('/' + menuItemURL),
						isPublic: ((isPublic === null || typeof isPublic === 'undefined') ? this.menus[menuId].items[itemIndex].isPublic : isPublic),
						roles: ((roles === null || typeof roles === 'undefined') ? this.menus[menuId].items[itemIndex].roles : roles),
						position: position || 0,
						shouldRender: shouldRender
					});
				}
			}

			// Return the menu object
			return this.menus[menuId];
		};

		// Remove existing menu object by menu id
		this.removeMenuItem = function(menuId, menuItemURL) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Search for menu item to remove
			for (var itemIndex in this.menus[menuId].items) {
				if (this.menus[menuId].items[itemIndex].link === menuItemURL) {
					this.menus[menuId].items.splice(itemIndex, 1);
				}
			}

			// Return the menu object
			return this.menus[menuId];
		};

		// Remove existing menu object by menu id
		this.removeSubMenuItem = function(menuId, submenuItemURL) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Search for menu item to remove
			for (var itemIndex in this.menus[menuId].items) {
				for (var subitemIndex in this.menus[menuId].items[itemIndex].items) {
					if (this.menus[menuId].items[itemIndex].items[subitemIndex].link === submenuItemURL) {
						this.menus[menuId].items[itemIndex].items.splice(subitemIndex, 1);
					}
				}
			}

			// Return the menu object
			return this.menus[menuId];
		};

		//Adding the topbar menu
		this.addMenu('topbar');
	}
]);
/**
 * Created by Eugene on 6/21/2015.
 */
'use strict';

// Configuring the Articles module
angular.module('foods').run(['Menus',
    function(Menus) {
        // Set top bar menu items
        Menus.addMenuItem('topbar', 'Foods', 'foodEnforcements', 'dropdown');
        Menus.addSubMenuItem('topbar', 'foodEnforcements', 'List Enforcements', 'foodEnforcements');
        //  Menus.addSubMenuItem('topbar', 'articles', 'New Article', 'articles/create');
    }
]);
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

/**
 * Created by Eugene on 6/21/2015.
 */
'use strict';

// Articles controller
angular.module('foods').controller('FoodsController', ['$scope', '$stateParams', '$location', 'Authentication', 'FoodEnforcements', '$filter',
    function($scope, $stateParams, $location, Authentication, FoodEnforcements, $filter) {
        $scope.authentication = Authentication;
        $scope.foodEnforcementList = [];
        $scope.stateList = [
            { CODE: 'AL', DESC: 'Alabama' },
            { CODE: 'AK', DESC: 'Alaska' },
            { CODE: 'AZ', DESC: 'Arizona' },
            { CODE: 'AR', DESC: 'Arkansas' },
            { CODE: 'CA', DESC: 'California' },
            { CODE: 'CO', DESC: 'Colorado' },
            { CODE: 'CT', DESC: 'Connecticut' },
            { CODE: 'DE', DESC: 'Delaware' },
            { CODE: 'DC', DESC: 'District of Columbia' },
            { CODE: 'FL', DESC: 'Florida' },
            { CODE: 'GA', DESC: 'Georgia' },
            { CODE: 'HI', DESC: 'Hawaii' },
            { CODE: 'ID', DESC: 'Idaho' },
            { CODE: 'IL', DESC: 'Illinois' },
            { CODE: 'IN', DESC: 'Indiana' },
            { CODE: 'IA', DESC: 'Iowa' },
            { CODE: 'KS', DESC: 'Kansas' },
            { CODE: 'KY', DESC: 'Kentucky' },
            { CODE: 'LA', DESC: 'Louisiana' },
            { CODE: 'ME', DESC: 'Maine' },
            { CODE: 'MD', DESC: 'Maryland' },
            { CODE: 'MA', DESC: 'Massachusetts' },
            { CODE: 'MI', DESC: 'Michigan' },
            { CODE: 'MN', DESC: 'Minnesota' },
            { CODE: 'MS', DESC: 'Mississippi' },
            { CODE: 'MO', DESC: 'Missouri' },
            { CODE: 'MT', DESC: 'Montana' },
            { CODE: 'NE', DESC: 'Nebraska' },
            { CODE: 'NV', DESC: 'Nevada' },
            { CODE: 'NH', DESC: 'New Hampshire' },
            { CODE: 'NJ', DESC: 'New Jersey' },
            { CODE: 'NM', DESC: 'New Mexico' },
            { CODE: 'NY', DESC: 'New York' },
            { CODE: 'NC', DESC: 'North Carolina' },
            { CODE: 'ND', DESC: 'North Dakota' },
            { CODE: 'OH', DESC: 'Ohio' },
            { CODE: 'OK', DESC: 'Oklahoma' },
            { CODE: 'OR', DESC: 'Oregon' },
            { CODE: 'PA', DESC: 'Pennsylvania' },
            { CODE: 'PR', DESC: 'Puerto Rico' },
            { CODE: 'RI', DESC: 'Rhode Island' },
            { CODE: 'SC', DESC: 'South Carolina' },
            { CODE: 'SD', DESC: 'South Dakota' },
            { CODE: 'TN', DESC: 'Tennessee' },
            { CODE: 'TX', DESC: 'Texas' },
            { CODE: 'UT', DESC: 'Utah' },
            { CODE: 'VT', DESC: 'Vermont' },
            { CODE: 'VA', DESC: 'Virginia' },
            { CODE: 'WA', DESC: 'Washington' },
            { CODE: 'WV', DESC: 'West Virginia' },
            { CODE: 'WI', DESC: 'Wisconsin' },
            { CODE: 'WY', DESC: 'Wyoming' },
            { CODE: 'AS', DESC: 'American Samoa' },
            { CODE: 'GU', DESC: 'Guam' },
            { CODE: 'MP', DESC: 'Northern Mariana Islands' },
            { CODE: 'UM', DESC: 'U. S. Minor Outlying Islands' },
            { CODE: 'VI', DESC: 'Vrgin Islands' },
        ];
        $scope.queryObject = {
            endDate : null,
            startDate: null,
            state : { CODE: '', DESC: 'State / Province' }//{ CODE: 'AR', DESC: 'Arkansas' }
        }

        var orderBy = $filter('orderBy');

        $scope.startDateOpened = false;
        $scope.endDateOpened = false;

        // Find a list of FoodEnforcements
        $scope.find = function() {
            var testing = false;
            if($scope.queryObject.startDate == null){
                testing = true;
                var thedate = new Date('2015/07/01');
                $scope['queryObject'] = {
                    endDate : thedate,
                    startDate: new Date('2015/01/01'),
                    state : { CODE: 'AR', DESC: 'Arkansas' }
                }
            }
            var startdate = $scope.queryObject.startDate.format('yyyymmdd');
            var endDate = $scope.queryObject.endDate.format('yyyymmdd');
            var stateCode = $scope.queryObject.state.CODE;
            $scope.foodEnforcementList.length = 0;
            FoodEnforcements.query(startdate, endDate, stateCode).then(function (response) {
                angular.forEach(response.results, function (value) {
                    var tempdate = value.recall_initiation_date;
                    value.recall_initiation_date = new Date(tempdate.substring(0, 4) + '-' + tempdate.substring(4, 6) + '-' + tempdate.substring(6, 8));
                    tempdate = value.report_date;
                    value.report_date = new Date(tempdate.substring(0, 4) + '-' + tempdate.substring(4, 6) + '-' + tempdate.substring(6, 8));
                    $scope.foodEnforcementList.push(value);
                    var dis = value.distribution_pattern.trim();
                    angular.forEach($scope.stateList, function (state) {
                        if(state.reportCount == null){
                            state.reportCount = 0;
                        }
                        if(dis.toLowerCase() == "nationwide"){
                            state.reportCount += 1;
                        }
                        else{
                            dis = dis.replace("in", "").replace(" and ", " ").trim();
                            dis = dis.replace(".", "").trim();
                            if (dis.indexOf(state.CODE) > (-1)  || dis.indexOf(state.DESC) > (-1)) {
                                state.reportCount += 1;
                            }
                        }
                    });
                });
                orderBy($scope.foodEnforcementList, 'recall_initiation_date', true);
                if(!testing){
                    $scope.updateMap($scope.foodEnforcementList[0]);
                }
            });
        };


        $scope.toggleMin = function () {
            var thedate = new Date();
            $scope.minDate = new Date(thedate.getTime() + (((-365.25) * 1000 * 60 * 60 * 24)) * 4);
            $scope.maxDate = $scope.queryObject.endDate = thedate;
        };
        $scope.toggleMin();

        $scope.startDateOpen = function ($event) {

            $scope.toggleMin();
            $event.preventDefault();
            $event.stopPropagation();

            $scope.startDateOpened = true;
        };

        $scope.endDateOpen = function ($event) {

            $scope.toggleMin();
            $event.preventDefault();
            $event.stopPropagation();

            $scope.endDateOpened = true;
        };

        $scope.format = 'yyyy-MM-dd';
        $scope.dateOptions = {
            format: 'yyyy-MM-dd',
            autoclose: true,
            startingDay: 1
        };


        $scope.setSelected = function (state) {
            $scope.queryObject.state = state;
        };
        $scope.isSelected = function (state) {
            return $scope.queryObject.state && state.CODE === $scope.queryObject.state.CODE;
        };

        /* Map related code */
        $scope.mapData = null;
        $scope.map = null;
        $scope.mapOptions = {
            region: "US",
            legend: "none",
            width: '100%',
            height: '100%',
            backgroundColor: "#DAD7DB",
            datalessRegionColor: "#C7C4C7",
            //  defaultColor: "red",
            colorAxis : {minvalue:0, colors:['#cd8b84', '#AD3E33']},
            resolution: "provinces",
            displayMode: 'regions'
        };

        $scope.initMap = function () {
            $scope.mapData = new google.visualization.DataTable();
            $scope.mapData.addColumn('string', 'State');
            $scope.mapData.addColumn('number');
            $scope.mapData.addColumn('number', 'Number of Reports');
            $scope.map = new google.visualization.GeoChart(document.getElementById('foodMap'));

            $scope.mapOptions.width = ($(window).innerWidth() - 250) * .90;
            $scope.mapOptions.height = 350;

            $scope.map.draw($scope.mapData, $scope.mapOptions);
        }

        $scope.clearMapData = function() {
            if ($scope.mapData) {
                var dataCount = $scope.mapData.getNumberOfRows();
                if (dataCount > 0) {
                    $scope.mapData.removeRows(0, dataCount);
                }
            } else {
                $scope.initMap();
                $(window).resize(function () {
                    google.maps.event.trigger($scope.map, "resize");
                    var item = $scope.foodEnforcementList[$scope.selectedItemIndex];
                    if(item){
                        $scope.updateMap(item);
                    }
                });
            }
        }

        $scope.updateMap = function(item) {
            $scope.clearMapData();
            if (item) {
                $scope.selectedItemIndex = $scope.foodEnforcementList.indexOf(item);
                var dis = item.distribution_pattern.trim();
                if (dis) {
                    var index = 0;
                    if(dis.toLowerCase() == "nationwide"){
                        angular.forEach($scope.stateList, function(state){
                            var stateItem = state.DESC;
                            var stateitemvalues = [stateItem, 0, state.reportCount];
                            if(state.CODE == $scope.queryObject.state.CODE){
                                stateitemvalues[1] = 1;
                            }

                            $scope.mapData.addRow(stateitemvalues);
                            $scope.mapData.setFormattedValue(index++, 1, '');
                        });
                        $scope.map.draw($scope.mapData, $scope.mapOptions);
                    }
                    else {
                        dis = dis.replace("in", "").replace(" and ", " ").trim();
                        dis = dis.replace(".", "").trim();

                        angular.forEach($scope.stateList, function (state) {
                            if (dis.indexOf(state.CODE) > (-1)  || dis.indexOf(state.DESC) > (-1)) {
                                var stateItem = state.DESC;
                                var stateitemvalues = [stateItem, 0, state.reportCount];
                                if(state.CODE == $scope.queryObject.state.CODE){
                                    stateitemvalues[1] = 1;
                                }

                                $scope.mapData.addRow(stateitemvalues);
                                $scope.mapData.setFormattedValue(index++, 1, '');
                            }
                        });
                        $scope.map.draw($scope.mapData, $scope.mapOptions);
                    }
                }
            }
        }

        $('#startDate').change(function () {
            var dateobj = $('#startDate');
            dateobj = angular.element(dateobj);
            var datestring = dateobj.val();
            if(!datestring || datestring === ''){
                return;
            }

            var theDate = new Date(datestring);
            if(theDate < $scope.minDate){
                dateobj.val('Invalid!!!')
            }
        });

        $('#endDate').change(function () {
            var dateobj = $('#endDate');
            dateobj = angular.element(dateobj);
            var datestring = dateobj.val();
            if(!datestring || datestring === ''){
                return;
            }
            var now = new Date();
            var endDate = new Date(datestring);
            if( $scope.maxDate < endDate){
                dateobj.val('Invalid!!!')
            }
        });
    }
]);

google.setOnLoadCallback(function () {
    try {
        angular.bootstrap(document, ['foods']);
    } catch (e) {
    }
});

google.load('visualization', '1', { packages: ['geochart'] });

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
            var url = String.format("http://api.fda.gov/food/enforcement.json?api_key=3mQQKK3ejZDKCKbd0g8tocBZtmn1fNUun966nq3Q&search=recall_initiation_date:[{0}+TO+{1}]+AND+distribution_pattern:{2}&limit=100", startdate, enddate, state);
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

'use strict';

// Config HTTP Error Handling
angular.module('users').config(['$httpProvider',
	function($httpProvider) {
		// Set the httpProvider "not authorized" interceptor
		$httpProvider.interceptors.push(['$q', '$location', 'Authentication',
			function($q, $location, Authentication) {
				return {
					responseError: function(rejection) {
						switch (rejection.status) {
							case 401:
								// Deauthenticate the global user
								Authentication.user = null;

								// Redirect to signin page
								$location.path('signin');
								break;
							case 403:
								// Add unauthorized behaviour 
								break;
						}

						return $q.reject(rejection);
					}
				};
			}
		]);
	}
]);
'use strict';

// Setting up route
angular.module('users').config(['$stateProvider',
	function($stateProvider) {
		// Users state routing
		$stateProvider.
		state('profile', {
			url: '/settings/profile',
			templateUrl: 'modules/users/views/settings/edit-profile.client.view.html'
		}).
		state('password', {
			url: '/settings/password',
			templateUrl: 'modules/users/views/settings/change-password.client.view.html'
		}).
		state('accounts', {
			url: '/settings/accounts',
			templateUrl: 'modules/users/views/settings/social-accounts.client.view.html'
		}).
		state('signup', {
			url: '/signup',
			templateUrl: 'modules/users/views/authentication/signup.client.view.html'
		}).
		state('signin', {
			url: '/',
			templateUrl: 'modules/core/views/home.client.view.html'
		}).
		state('forgot', {
			url: '/password/forgot',
			templateUrl: 'modules/users/views/password/forgot-password.client.view.html'
		}).
		state('reset-invalid', {
			url: '/password/reset/invalid',
			templateUrl: 'modules/users/views/password/reset-password-invalid.client.view.html'
		}).
		state('reset-success', {
			url: '/password/reset/success',
			templateUrl: 'modules/users/views/password/reset-password-success.client.view.html'
		}).
		state('reset', {
			url: '/password/reset/:token',
			templateUrl: 'modules/users/views/password/reset-password.client.view.html'
		});
	}
]);
'use strict';

angular.module('users').controller('AuthenticationController', ['$scope', '$http', '$location', 'Authentication',
	function($scope, $http, $location, Authentication) {
		$scope.authentication = Authentication;

		// If user is signed in then redirect back home
		if ($scope.authentication.user) $location.path('/');

		$scope.signup = function() {
			$http.post('/auth/signup', $scope.credentials).success(function(response) {
				// If successful we assign the response to the global user model
				$scope.authentication.user = response;

				// And redirect to the index page
				$location.path('/foodEnforcements');
			}).error(function(response) {
				$scope.error = response.message;
			});
		};

		$scope.signin = function() {
			$http.post('/auth/signin', $scope.credentials).success(function(response) {
				// If successful we assign the response to the global user model
				$scope.authentication.user = response;

				// And redirect to the index page
				$location.path('/foodEnforcements');
			}).error(function(response) {
				$scope.error = response.message;
			});
		};
	}
]);
'use strict';

angular.module('users').controller('PasswordController', ['$scope', '$stateParams', '$http', '$location', 'Authentication',
	function($scope, $stateParams, $http, $location, Authentication) {
		$scope.authentication = Authentication;

		//If user is signed in then redirect back home
		if ($scope.authentication.user) $location.path('/');

		// Submit forgotten password account id
		$scope.askForPasswordReset = function() {
			$scope.success = $scope.error = null;

			$http.post('/auth/forgot', $scope.credentials).success(function(response) {
				// Show user success message and clear form
				$scope.credentials = null;
				$scope.success = response.message;

			}).error(function(response) {
				// Show user error message and clear form
				$scope.credentials = null;
				$scope.error = response.message;
			});
		};

		// Change user password
		$scope.resetUserPassword = function() {
			$scope.success = $scope.error = null;

			$http.post('/auth/reset/' + $stateParams.token, $scope.passwordDetails).success(function(response) {
				// If successful show success message and clear form
				$scope.passwordDetails = null;

				// Attach user profile
				Authentication.user = response;

				// And redirect to the index page
				$location.path('/password/reset/success');
			}).error(function(response) {
				$scope.error = response.message;
			});
		};
	}
]);
'use strict';

angular.module('users').controller('SettingsController', ['$scope', '$http', '$location', 'Users', 'Authentication',
	function($scope, $http, $location, Users, Authentication) {
		$scope.user = Authentication.user;

		// If user is not signed in then redirect back home
		if (!$scope.user) $location.path('/');

		// Check if there are additional accounts 
		$scope.hasConnectedAdditionalSocialAccounts = function(provider) {
			for (var i in $scope.user.additionalProvidersData) {
				return true;
			}

			return false;
		};

		// Check if provider is already in use with current user
		$scope.isConnectedSocialAccount = function(provider) {
			return $scope.user.provider === provider || ($scope.user.additionalProvidersData && $scope.user.additionalProvidersData[provider]);
		};

		// Remove a user social account
		$scope.removeUserSocialAccount = function(provider) {
			$scope.success = $scope.error = null;

			$http.delete('/users/accounts', {
				params: {
					provider: provider
				}
			}).success(function(response) {
				// If successful show success message and clear form
				$scope.success = true;
				$scope.user = Authentication.user = response;
			}).error(function(response) {
				$scope.error = response.message;
			});
		};

		// Update a user profile
		$scope.updateUserProfile = function(isValid) {
			if (isValid) {
				$scope.success = $scope.error = null;
				var user = new Users($scope.user);

				user.$update(function(response) {
					$scope.success = true;
					Authentication.user = response;
				}, function(response) {
					$scope.error = response.data.message;
				});
			} else {
				$scope.submitted = true;
			}
		};

		// Change user password
		$scope.changeUserPassword = function() {
			$scope.success = $scope.error = null;

			$http.post('/users/password', $scope.passwordDetails).success(function(response) {
				// If successful show success message and clear form
				$scope.success = true;
				$scope.passwordDetails = null;
			}).error(function(response) {
				$scope.error = response.message;
			});
		};
	}
]);
'use strict';

// Authentication service for user variables
angular.module('users').factory('Authentication', [
	function() {
		var _this = this;

		_this._data = {
			user: window.user
		};

		return _this._data;
	}
]);
'use strict';

// Users service used for communicating with the users REST endpoint
angular.module('users').factory('Users', ['$resource',
	function($resource) {
		return $resource('users', {}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);