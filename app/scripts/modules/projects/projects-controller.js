'use strict';

/**
 * @ngdoc function
 * @name allegroIoApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the allegroIoApp
 */
angular.module('allegroIoApp')
    .controller('ProjectsController',
        function ($scope,
                  $state,
                  ProjectListService) {

            $scope.projectList = ProjectListService.projectList;

            $scope.goToState = function(stateName){
                $state.go('projects.' + stateName);
            };

        });
