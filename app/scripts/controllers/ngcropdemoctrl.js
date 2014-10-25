'use strict';

/**
 * @ngdoc function
 * @name allegroIoApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the allegroIoApp
 */
angular.module('allegroIoApp')
    .controller('NgCropDemoCtrl',
    function ($scope) {

        $scope.image = undefined;
        $scope.headerTitle = 'Demo of NgCrop for Cropping Images';

    });
