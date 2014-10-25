'use strict';

/**
 * @ngdoc function
 * @name allegroIoApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the allegroIoApp
 */
angular.module('allegroIoApp')
    .controller('ProjectsCtrl',
        function ($scope,
                  $state,
                  ProjectListSvc) {

            $scope.projectList = ProjectListSvc.projectList;

            $scope.goToState = function(stateName){
                $state.go(stateName);
            };

        });