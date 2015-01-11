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
        var width = elem.find('canvas').parent()[0].clientWidth-3;
        var height = elem.find('canvas').parent()[0].clientHeight-3;

        scope.drawImageOnCanvas = function(imageFileSrc){

          var img = new Image();
          img.onload = function () {
            canvasElem.height = img.width;
            canvasElem.width = img.height;
            ctx.drawImage(img,0, 0);
            scope.$apply(function(){
              scope.cropViewActivated = true;
            });

          }
          img.src = imageFileSrc;

        }

        function scaleCanvas(w, h){

        }

      }
    }
  });
