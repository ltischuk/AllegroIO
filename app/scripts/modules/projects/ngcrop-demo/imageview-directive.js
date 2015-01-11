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

        var canvasElem = elem.find('canvas')[0];
        var ctx = canvasElem.getContext("2d");

        scope.drawImageOnCanvas = function(imageFileSrc){

          var img = new Image();
          img.onload = function () {

            scaleCanvas(img.width, img.height);
            ctx.drawImage(img,0, 0);
            scope.$apply(function(){
              scope.cropViewActivated = true;
            });

          }
          img.src = imageFileSrc;

        }

        function scaleCanvas(w, h){
          var factor = Math.min(1,(300/w),(300/h));
          canvasElem.height = (w * factor)-3;
          canvasElem.width = (h * factor)-3;
        }

      }
    }
  });
