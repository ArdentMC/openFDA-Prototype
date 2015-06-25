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
            state : { CODE: '', DESC: 'State / Provence' }
        }

        var orderBy = $filter('orderBy');

        $scope.startDateOpened = false;
        $scope.endDateOpened = false;

        // Find a list of FoodEnforcements
        $scope.find = function() {
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
                });
                orderBy($scope.foodEnforcementList, 'recall_initiation_date', true);
                $scope.updateMap($scope.foodEnforcementList[0]);
            });
        };


        $scope.toggleMin = function () {
            var thedate = new Date();
            $scope.minDate = new Date(thedate.getTime() + (((-365.25) * 1000 * 60 * 60 * 24)) * 4);
            $scope.maxDate = thedate;
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

        $scope.format = 'yyyy-dd-MM';
        $scope.dateOptions = {
            format: 'yyyy-dd-MM',
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
            width: 700,
            height: 500,
            backgroundColor: "white",
            datalessRegionColor: "#E8FFD1",
            defaultColor: "red",
            resolution: "provinces"
        };

        $scope.initMap = function () {            
            $scope.mapData = new google.visualization.DataTable();
            $scope.mapData.addColumn('string', 'State');
            $scope.map = new google.visualization.GeoChart(document.getElementById('foodMap'));
            
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
            }
        }

        $scope.updateMap = function(item) {
            $scope.clearMapData();
            if (item) {
                var dis = item.distribution_pattern;
                if (dis) {
                    var disArray = dis.replace("and",",").replace(" ", "").split(",");
                    if (disArray.length > 0) {
                        angular.forEach(disArray, function (d) {
                            var state = d.trim();
                            if (state != "" && state.length == 2) {
                                var stateItem = "US-" + state;
                                $scope.mapData.addRow([stateItem]);
                            }
                        });
                        $scope.map.draw($scope.mapData, $scope.mapOptions);
                    }
                }
            }
        }
    }
]);

google.setOnLoadCallback(function () {
    try {
        angular.bootstrap(document, ['foods']);
    } catch (e) {
    }
});

google.load('visualization', '1', { packages: ['geochart'] });
