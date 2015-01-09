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
            },
            templateUrl: '<div class="ic-crop-selection" id="sel"></div>',
            link: function (scope, element) {


            }
        }
    });