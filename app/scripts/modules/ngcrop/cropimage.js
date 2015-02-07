/**
 * Created by ltischuk on 11/8/14.
 */
angular
    .module('ngcrop')
    .directive('cropImage',
    function() {
        return {
            restrict: 'E',
            scope: {

              origImage: '=',
              croppedImage: '='

            },
            template: '<div id="ngcrop-selector"></div>',
            link: function (scope, element, attrs) {

              var imgElement = element.parent().find('img');
              var cropSelectorElement = element.children();

              imgElement.on('load', function(e){

                var dimension = (Math.min(e.target.width, e.target.height))/2;
                console.log('x is changing');
                cropSelectorElement.css({

                  display: 'block',
                  width: dimension + 'px',
                  height: dimension + 'px'

                });
              });

              cropSelectorElement.on('mousedown', function(e){
                e.preventDefault();

              });

            }
        }
    });
