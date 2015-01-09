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
    .directive('navigationDir',
        function (NavigationService,
                  $state) {

        return {
            restrict: 'AE',
            scope: {
            },
            templateUrl: '/scripts/modules/navigation/partials/navigation.html',
            link: function (scope) {
                scope.mainAppName = NavigationService.mainAppName;
                scope.menuItems = NavigationService.menuItems;
                scope.activeMenuItem = scope.menuItems[0];

                scope.isActiveMenuItem = function($index){
                    return (scope.menuItems[$index] === scope.activeMenuItem);
                };

                scope.goToState = function($index){
                    scope.activeMenuItem = scope.menuItems[$index];
                    $state.go(scope.menuItems[$index].stateName);
                };

            }
        };

    }
);
