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

              scope.$watch(
                // This function returns the value being watched. It is called for each turn of the $digest loop
                function() { return scope.origImage; },
                // This is the change listener, called when the value returned from the above function changes
                function(newValue, oldValue) {
                  if ( newValue !== oldValue ) {
                    // Only increment the counter if the value changed

                  }
                }
              );

            }
        }
    });
