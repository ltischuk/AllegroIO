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
      ,templateUrl: '/scripts/modules/fileupload/partials/upload.html'
      ,link: function (scope, elem, attrs) {

        scope.buttonTitle = 'Upload a File';

        scope.handleFileButtonClick = function(id){

          document.getElementById(id).click();

        }

        scope.loadImageFile = function(file){
          var img = new Image();
          img.onload = function () {
            scope.uploadSuccess({image: img});
          }
          img.src = file;
        }

      }
    }
  });
