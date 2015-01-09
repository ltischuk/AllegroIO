'use strict';

/**
 * @ngdoc function
 * @name allegroIoApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the allegroIoApp
 */
angular.module('allegroIoApp')
    .controller('NgCropDemoController',
    function ($scope) {

        $scope.headerTitle = 'Demo of NgCrop for Cropping Images';
        $scope.image = undefined;
        $scope.ngCropActivated = false;

    });
