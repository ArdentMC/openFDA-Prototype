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

            var divwidth = ($(window).innerWidth() - 290);
            var divheight = 340;

            $scope.mapOptions.width = divwidth * .95;
            $scope.mapOptions.height = divheight * .95;

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
                    window.google.maps.event.trigger($scope.map, "resize");
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
