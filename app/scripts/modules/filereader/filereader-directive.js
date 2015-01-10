/**
 * Created by ltischuk on 1/10/15.
 */
angular.module('allegroIoApp')
  .directive('filereader',
  function () {

    return {

      restrict: 'A'
      ,scope : {
        onFileUpload: '&'
      }
      ,link: function (scope, elem, attrs) {

        var reader = new FileReader();
        reader.onload = function (e) {

          if (scope.onFileUpload) {
            scope.onFileUpload({file: e.target.result});
          }
        }

        elem.on('change', function () {
          var file = elem[0].files[0];

          if (!isValidFile(file)) {

            //show a modal

          } else {

            reader.readAsDataURL(file);
          }

        });

        /**
         * isValidFile - method to determine if a file is valid
         * @param file
         * @returns {boolean}
         */
        function isValidFile(file) {
          if (!file || !file.size || !file.type) {
            return false;
          }
          return true;
        }

      }

    }


  });
