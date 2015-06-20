(function (angular) {
    'use strict';

    angular.module('ng.slideout', []);

    angular.module('ng.slideout').directive('ngSlideout', ['$animate', '$q', '$timeout', function ($animate, $q, $timeout) {

        return {
            // element only
            restrict: 'AEC',

            // isolate scope
            scope: {
                title: '=?'
            },
            transclude: true,
            template: '<div class="slide-out-div" style="position:absolute;top:100px;left:0px;background-color:white">' +
                '<div class="handle handle-left" style="background-color:white"><a href="">{{title}}</a></div>' +
                '<div ng-transclude style="position:absolute; top:0px; left:0px; width:100%; height:100%"></div>' +
                '</div>',

            // replace tag with div with same id
            compile: function ($element, $attrs) {


                return function(scope, element, attrs, controller) {
                    var id = attrs['id'];
                    scope.title = attrs['title'];
                    scope.location = attrs['location'];
                    scope.sliderSpeed = 300;

                    var slideout = angular.element(element.children()[0]);
                    slideout.css({
                        width: attrs['width'],
                        height: attrs['height']
                    });
                    var handle = angular.element(slideout.children()[0]);
                    if (scope.location == 'left') {
                        controller.prepareLeftSlideout(slideout, handle);
                    }


                    handle.click(function (event) {
                        if (slideout.hasClass('open')) {
                            controller.slideIn(slideout, handle);
                        } else {
                            controller.slideOut(slideout, handle);
                        }
                    });

                    var scopedefer = $q.defer();
                    scopedefer.resolve(scope);
                    scope.$parent['get' + id + 'Scope'] = function () { return scopedefer.promise; }
                };
            },

            // directive api
            controller: function ($scope, $element, $attrs) {
                var self = this;
                this.prepareLeftSlideout = function(slideout, handle) {
                    var slideoutWidth = slideout.outerWidth();
                    var handleHeight = handle.outerHeight();
                    var handleTop = parseInt(handleHeight - 2, 10) + 'px';
                    var handleLeft = parseInt(slideoutWidth - handleHeight - 4, 10) + 'px';
                    var hcss = handle.css({
                        'top': handleTop,
                        'left': handleLeft
                    });

                    slideout.css({ left: parseInt((slideoutWidth + 4 - (handleHeight/2)) * (-1)) + 'px' });
                }
                this.prepareTopSlideout = function (slideout, handle) {
                    var slideoutWidth = slideout.outerWidth();
                    var slideoutHeight = slideout.outerHeight();
                    var handleHeight = handle.outerHeight();
                    var handleWidth = handle.outerWidth();
                    var handleTop = parseInt(slideoutHeight * (-1) - 2, 10) + 'px';
                    var handleLeft = parseInt(slideoutWidth - handleHeight - 4, 10) + 'px';
                    var hcss = handle.css({
                        'top': handleTop,
                        'left': handleLeft
                    });

                    slideout.css({ left: parseInt((slideoutWidth + 4 - (handleHeight / 2)) * (-1)) + 'px' });
                }
                this.prepareBottomSlideout = function (slideout, handle) {
                    var slideoutWidth = slideout.outerWidth();
                    var handleHeight = handle.outerHeight();
                    var handleTop = parseInt(handleHeight - 2, 10) + 'px';
                    var handleLeft = parseInt(slideoutWidth - handleHeight - 4, 10) + 'px';
                    var hcss = handle.css({
                        'top': handleTop,
                        'left': handleLeft
                    });

                    slideout.css({ left: parseInt((slideoutWidth + 4 - (handleHeight / 2)) * (-1)) + 'px' });
                }
                this.prepareRightSlideout = function (slideout, handle) {
                    var slideoutWidth = slideout.outerWidth();
                    var handleHeight = handle.outerHeight();
                    var handleTop = parseInt(handleHeight - 2, 10) + 'px';
                    var handleLeft = parseInt(slideoutWidth - handleHeight - 4, 10) + 'px';
                    var hcss = handle.css({
                        'top': handleTop,
                        'left': handleLeft
                    });

                    slideout.css({ left: parseInt((slideoutWidth + 4 - (handleHeight / 2)) * (-1)) + 'px' });
                }

                this.slideIn = function (slideout, handle) {

                    var slideoutWidth = slideout.outerWidth();
                    var slideoutHeight = slideout.outerHeight();

                    
                    var handleWidth = handle.outerWidth();
                    var handleHeight = handle.outerHeight();

                    if ($scope.location === 'top') {
                        slideout.animate({ top: '-' + slideoutHeight }, $scope.speed).removeClass('open');
                    } else if ($scope.location === 'left') {
                        slideout.animate({ left: parseInt((slideoutWidth + 4 - (handleHeight / 2)) * (-1)) + 'px'}, $scope.speed).removeClass('open');
                    } else if ($scope.location === 'right') {
                        slideout.animate({ right: '-' + properties.containerWidth }, $scope.speed).removeClass('open');
                    } else if ($scope.location === 'bottom') {
                        slideout.animate({ bottom: '-' + properties.containerHeight }, $scope.speed).removeClass('open');
                    }
                }

                this.slideOut = function (slideout, handle) {

                    var slideoutWidth = slideout.outerWidth();
                    var slideoutHeight = slideout.outerHeight();


                    var handleWidth = handle.outerWidth();
                    var handleHeight = handle.outerHeight();

                    if ($scope.location === 'top') {
                        slideout.animate({ top: slideoutHeight }, $scope.speed).addClass('open');
                    } else if ($scope.location === 'left') {
                        slideout.animate({ left: '0px' }, $scope.speed).addClass('open');
                    } else if ($scope.location === 'right') {
                        slideout.animate({ right: parseInt((slideoutWidth + 4 - (handleHeight / 2))) + 'px' }, $scope.speed).addClass('open');
                    } else if ($scope.location === 'bottom') {
                        slideout.animate({ bottom: properties.containerHeight }, $scope.speed).addClass('open');
                    }
                }

            }
        }
    }]);

})(angular);