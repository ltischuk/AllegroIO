/**
 * Created by ltischuk on 1/10/15.
 */
angular.module('allegroIoApp')
  .directive('fileupload',
  function () {

    return {
      restrict: 'E'
      ,scope : {
        uploadSuccess: '&'
      }
      ,templateUrl: '/scripts/modules/projects/ngcrop-demo/partials/upload.html'
      ,link: function (scope, elem, attrs) {

        scope.buttonTitle = 'Upload a File';

        scope.handleFileButtonClick = function(id){

          document.getElementById(id).click();

        }

        scope.loadImageFile = function(file){
          scope.uploadSuccess({imageFileSrc: file});

        }

      }
    }
  });
