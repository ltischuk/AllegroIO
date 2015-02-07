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
                    drawImageOnCanvas( false);

                  }
                }
              );


              function drawImageOnCanvas(crop){

                ctx.clearRect(0, 0, element.width, element.height);

                var sX = crop ? (selector.x/selector.ratio) : 0;
                var sY = crop ? (selector.y/selector.ratio) : 0;
                var sWidth = crop ? (selector.length/selector.ratio) : scope.origImage.width;
                var sHeight = crop ? (selector.length/selector.ratio) : scope.origImage.height;
                var drawWidth = selector.scaledWidth;
                var drawHeight = selector.scaledHeight;

                //draw the image to the canvas this one is just for display
                ctx.drawImage(scope.origImage,sX,sY,sWidth,sHeight,0,0,drawWidth,drawHeight);

                if(!crop){

                  ctx.lineWidth = selector.lineWidth;
                  ctx.strokeStyle = '#ff0000';
                  ctx.strokeRect(selector.x,selector.y,selector.length,selector.length);

                }
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
              }

              cvs.on('mousedown', function(e) {
              //  if(scope.isReadyForCrop){

                  handleMouseDown(e);
              //  }
              });

              cvs.on('mouseup', function(e) {
              //  if(scope.isReadyForCrop) {

                  handleMouseUp(e);
                  cvs[0].style.cursor = 'default';

                //}
              });

              cvs.on('mousemove', function(e) {
              //  if(scope.isReadyForCrop){

                  handleMouseMove(e);

              //  }
              });

              cvs.on('mouseout', function(e){

                isSelecting = false;
                moveCorner = false;
                cvs[0].style.cursor = 'default';

              });


            }
        }
    });
