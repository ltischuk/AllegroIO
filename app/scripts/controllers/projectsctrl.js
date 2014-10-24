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
                  ProjectSvc) {

            $scope.projectList = ProjectSvc.projectList;
        });