/**
 * Created by ltischuk on 2/10/15.
 */
angular.module('ngcrop')
  .factory('CropCanvas', function CropCanvasFactory() {

    function CropCanvas(){

      this.cropCanvas = document.createElement('canvas');
      this.context = this.cropCanvas.getContext('2d');

    }

    CropCanvas.prototype = {

      getDataUrl: function (img, x, y, sLength,drawWidth, drawHeight) {

        //draw the image to the canvas this one is just for display
        this.cropCanvas.height = drawHeight;
        this.cropCanvas.width = drawWidth;
        this.context.drawImage(img, x, y, sLength, sLength, 0, 0, drawWidth, drawHeight);
        return this.cropCanvas.toDataURL('image/jpeg');
      }

    }

    return CropCanvas;

  }
);
