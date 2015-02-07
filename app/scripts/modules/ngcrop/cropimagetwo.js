/**
 * Created by ltischuk on 11/8/14.
 */
angular
    .module('ngcrop')
    .directive('cropImageTwo',
    function(CropSelection) {
        return {
            restrict: 'E',
            scope: {

              origImage: '=',
              width: '=',
              height: '=',
              croppedImage: '='

            },
            template: '<canvas></canvas>', //new idea is to use a canvas
            link: function (scope, element, attrs) {


              scope.cropViewActivated = true;
              var cvs = element.find('canvas');
              cvs.width = scope.width ? scope.width : 300;
              cvs.height = scope.height ? scope.height : 300;
              var ctx = cvs[0].getContext('2d');
              var selector = new CropSelection();
              var isSelecting = false;
              var moveCorner = false;
              var lastMouseX = 0;
              var lastMouseY = 0;
              var mouseX = 0;
              var mouseY = 0;

              scope.$watch(function(scope) { return scope.origImage },
                function(newImage) {

                  if(angular.isDefined(newImage)){

                    cvs[0].width = scope.width ? scope.width : newImage.width;
                    cvs[0].height = scope.width ? scope.width : newImage.height;
                    selector.setScalesToImage(newImage);
                    var dim = Math.min(selector.scaledWidth,selector.scaledHeight);
                    var topleft = (cvs[0].width / 2) - (dim/4);
                    selector.setDimensions(topleft, dim/4, dim/2);
                    drawImageOnCanvas(newImage, false);

                  }
                }
              );


              function drawImageOnCanvas(img, crop){

                ctx.clearRect(0, 0, element.width, element.height);

                var sX = crop ? (selector.x/selector.ratio) : 0;
                var sY = crop ? (selector.y/selector.ratio) : 0;
                var sWidth = crop ? (selector.length/selector.ratio) : img.width;
                var sHeight = crop ? (selector.length/selector.ratio) : img.height;
                var drawWidth = selector.scaledWidth;
                var drawHeight = selector.scaledHeight;

                //draw the image to the canvas this one is just for display
                ctx.drawImage(img,sX,sY,sWidth,sHeight,0,0,drawWidth,drawHeight);

                if(!crop){

                  ctx.lineWidth = selector.lineWidth;
                  ctx.strokeStyle = '#ff0000';
                  ctx.strokeRect(selector.x,selector.y,selector.length,selector.length);

                }
              }


            }
        }
    });
