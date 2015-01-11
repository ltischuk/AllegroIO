'use strict';

/**
 * @ngdoc function
 * @name allegroIoApp.controller:NgCropDemoController
 * @description
 * # NgCropDemoController
 * Controller of the allegroIoApp
 */
angular.module('allegroIoApp')
    .controller('NgCropDemoController',
    function ($scope) {

      $scope.headerTitle = 'Demo of NgCrop for Cropping Images';
      $scope.uploadFileInstructions = 'Click the button to upload an image.';
      $scope.image = undefined;
      $scope.cropViewActivated = false;


      $scope.imageUploadSuccess = function(img){
        $scope.$apply(
          function(){
            $scope.origImageFile = img;
            $scope.image = img;  //save it in the imageFile as well

          });
      }





    });
