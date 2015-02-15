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
      $scope.cropBtnLabel = 'Crop Image';
      $scope.revertBtnLabel = 'Revert Crop';
      $scope.cropViewActivated = false;
      $scope.origImageFile = undefined;
      $scope.croppedImageDataUrl = undefined;
      $scope.cropImage = undefined;

      $scope.updateImageView = function(imageFileSrc){

        var img = new Image();
        img.onload = function () {

          $scope.origImageFile = this;
          $scope.$apply(function(){

            $scope.cropViewActivated = true;
            $scope.isReadyForCrop = true;

          });

        }
        img.src = imageFileSrc;

      }

      $scope.crop = function(){

        $scope.isReadyForCrop = false;

      }

      $scope.revertCrop = function(){

        $scope.isReadyForCrop = true;

      }


    });
