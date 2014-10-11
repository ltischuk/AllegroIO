/**
 * Created by ltischuk on 10/11/14.
 */
'use strict';

/**
 * @ngdoc function
 * @name allegroIoApp.directive:NavigationDir
 * @description
 * # NavigationDir
 * Directive for navigation of the allegroIoApp
 */
angular.module('allegroIoApp')
    .directive('navigationDir', function (NavigationSrv) {

        return {
            restrict: 'AE',
            scope: {
            },
            templateUrl: '/views/navigation.html',
            link: function (scope) {
                scope.mainAppName = NavigationSrv.mainAppName;
                scope.menuItems = NavigationSrv.menuItems;
                scope.activeMenuItem = scope.menuItems[0];

                scope.isActiveMenuItem = function($index){
                    return (scope.menuItems[$index] === scope.activeMenuItem);
                };
            }
        };

    }
);