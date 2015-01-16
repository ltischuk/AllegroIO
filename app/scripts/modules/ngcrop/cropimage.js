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

              console.log(element);
              var x = element.parent().find('img');
              //var cropSelector = angular.element('<div id="ngcrop-selector"></div>');
              //element.append(cropSelector);

              x.on('load', function(){
                console.log('x is changing');
                element.css({

                  display: 'block',
                  width: 20 + 'px',
                  height: 20 + 'px'
                  //  height : e.target.height +'px'

                });
              })

            }
        }
    });
