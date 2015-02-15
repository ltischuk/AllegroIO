/**
 * Created by ltischuk on 11/8/14.
 */
angular.module('ngcrop').directive('cropImage',
  function(CropSelection,
           CropCanvas) {
      return {
          restrict: 'E',
          scope: {

            origImage: '=',
            width: '=',
            height: '=',
            croppedImgData: '=',
            selectorColor: '@',
            selectorLineWidth: '@'

          },
          template: '<canvas></canvas>',
          link: function (scope, element, attrs) {

            var cvs = element.find('canvas');
            cvs.width = angular.isDefined(scope.width) ? scope.width : 300;
            cvs.height = angular.isDefined(scope.height) ? scope.height : 300;
            scope.selectorColor = angular.isDefined(scope.selectorColor) ? scope.selectorColor : '#ff0000';
            scope.selectorLineWidth = angular.isDefined(scope.selectorLineWidth) && angular.isNumber(Number(scope.selectorLineWidth)) ? Number(scope.selectorLineWidth) : 2;
            var ctx = cvs[0].getContext('2d');
            var selector = new CropSelection();
            var cropCanvas = new CropCanvas();
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
                  cvs[0].height = scope.height ? scope.height : newImage.height;
                  selector.setScalesToImage(newImage, cvs[0].width);
                  drawImageOnCanvas( false);
                  calibrateCroppedImageData();

                }
              }
            );


            //figure out how to crop - maybe private canvas
            function drawImageOnCanvas(){

              ctx.clearRect(0, 0, element.width, element.height);

              var sX =  0;
              var sY =  0;
              var sWidth =  scope.origImage.width;
              var sHeight =  scope.origImage.height;
              var drawWidth = selector.scaledWidth;
              var drawHeight = selector.scaledHeight;

              //draw the image to the canvas
              ctx.drawImage(scope.origImage,sX,sY,sWidth,sHeight,0,0,drawWidth,drawHeight);
              ctx.lineWidth = selector.lineWidth;
              ctx.strokeStyle = scope.selectorColor;
              ctx.strokeRect(selector.x,selector.y,selector.length,selector.length);

            }

            function calibrateCroppedImageData(){

              scope.croppedImgData = cropCanvas.getDataUrl(scope.origImage,
                (selector.x/selector.ratio), (selector.y/selector.ratio), (selector.length/selector.ratio) ,
                (selector.length/selector.ratio),selector.scaledWidth, selector.scaledHeight);

            }

            function handleMouseDown(e){

              mouseX = e.offsetX;
              mouseY = e.offsetY;
              lastMouseX = mouseX;
              lastMouseY = mouseY;
              isSelecting = true;

            }

            function handleMouseMove(e){

              var corner = 0;
              mouseX = e.offsetX;
              mouseY = e.offsetY;

              if(selector.isInMoveZone(mouseX, mouseY)){
                cvs[0].style.cursor = 'move';
                moveCorner = false;
              }
              else{
                cvs[0].style.cursor = 'crosshair';
                corner =selector.nearestCorner(mouseX, mouseY);
                moveCorner = true;

              }

              if (isSelecting) {

                drawImageOnCanvas(false);

                var xdiff = mouseX - lastMouseX;
                var ydiff = mouseY - lastMouseY;

                selector.move(xdiff, ydiff, moveCorner, corner);
                lastMouseX = mouseX;
                lastMouseY = mouseY;
                drawImageOnCanvas(false);
              }

            }

            function handleMouseUp(e){
              isSelecting = false;
              drawImageOnCanvas(false);
              cvs[0].style.cursor = 'default';
              calibrateCroppedImageData();
            }

            function handleMouseOut(e){

              isSelecting = false;
              moveCorner = false;
              cvs[0].style.cursor = 'default';
              calibrateCroppedImageData();

            }

            cvs.on('mousedown', function(e) {

                handleMouseDown(e);

            });

            cvs.on('mouseup', function(e) {

                handleMouseUp(e);

            });

            cvs.on('mousemove', function(e) {

                handleMouseMove(e);

            });

            cvs.on('mouseout', function(e){

              handleMouseOut(e);

            });


          }
      }
  });
