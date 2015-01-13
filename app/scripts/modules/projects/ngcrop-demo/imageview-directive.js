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

        imgElem.bind("load" , function(e){

          console.log('in load');
          scope.$apply(function() {

            container.css(
              {
               width: e.target.width +'px',
               height : e.target.height +'px'
             });
            scope.cropViewActivated = true;
          });
        });

       // var canvasElem = elem.find('canvas')[0];
       // var imgElem = elem.find('img')[0];
        //var ctx = canvasElem.getContext("2d");

        scope.updateImageView = function(imageFileSrc){

          //var img = new Image();
         // img.onload = function () {

          //  scaleCanvas(img.width, img.height);
         //   ctx.drawImage(img,0, 0);
            scope.$apply(function(){

              scope.origImageFile = imageFileSrc;

            });

          //}
          //img.src = imageFileSrc;

        }

       scope.onImgLoad = function(event){

         console.log('here');
         /**
         scope.$apply(function(){

           container.css(
             {
               width: imageFileSrc.width,
               height : '0px'
             }
           );
           scope.cropViewActivated = true;

         });*/
       }

        function scaleCanvas(w, h){
        //  var factor = Math.min(1,(300/w),(300/h));
         // canvasElem.height = (w * factor)-3;
         // canvasElem.width = (h * factor)-3;
        }

      }
    }
  });
