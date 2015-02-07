/**
 * Created by ltischuk on 1/10/15.
 */
angular.module('allegroIoApp')
  .directive('imageview',
  function () {

    return {
      restrict: 'E'
      ,scope : {

      }
      ,templateUrl: '/scripts/modules/projects/ngcrop-demo/partials/imageview.html'
      ,link: function (scope, elem, attrs) {

        scope.uploadFileInstructions = 'Click the button to upload an image.';
        scope.cropViewActivated = false;
        scope.origImageFile = undefined;
        scope.image = undefined;

        var imgElem = elem.find('img');
        var container = imgElem.parent();

       // var canvasElem = elem.find('canvas')[0];
       // var imgElem = elem.find('img')[0];
        //var ctx = canvasElem.getContext("2d");

        scope.updateImageView = function(imageFileSrc){

          var img = new Image();
          img.onload = function () {

          //  scaleCanvas(img.width, img.height);
         //   ctx.drawImage(img,0, 0);
            scope.origImageFile = this;
            scope.$apply(function(){

              scope.cropViewActivated = true;

            });

          }
          img.src = imageFileSrc;

        }


      }
    }
  });
