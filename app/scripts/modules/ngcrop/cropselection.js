/**
 * Created by ltischuk on 2/7/15.
 */
angular.module('ngcrop')
  .factory('CropSelection', function CropSelectionFactory() {

    function CropSelection(maxWidth, maxHeight){

      this.x = 0;
      this.y = 0;
      this.length = 0;
      this.lineWidth = 2;
      this.paddedPixels = 10;
      this.ratio = 1;
      this.scaledWidth = 1;
      this.scaledHeight = 1;
      this.maxWidth = maxWidth;
      this.maxHeight = maxHeight;

    }

    CropSelection.prototype = {

      setScalesToImage : function(img){
        this.ratio = this.maxWidth && this.maxHeight ? Math.min ((this.maxWidth / img.width),(this.maxHeight/ img.height)): 1;
        this.scaledWidth = img.width * this.ratio;
        this.scaledHeight = img.height * this.ratio;
        this.maxWidth = this.scaledWidth - this.paddedPixels;
        this.maxHeight = this.scaledHeight - this.paddedPixels;
      },

      setDimensions : function(x,y,length) {

        this.x = x;
        this.y = y;
        this.length = length;

      },
      toJSON : function(){
        return{
          x: this.x,
          y : this.y,
          length: this.length,
          ratio : this.ratio,
          scaledWidth : this.scaledWidth,
          scaledHeight : this.scaledHeight
        }
      },
      isInMoveZone : function(pointX, pointY){

        var partial = this.length /6;
        var maxBound = this.length - partial;
        if(pointX >= (this.x + partial) && pointX <= (this.x + maxBound) &&
          pointY >= (this.y + partial) && pointY <= (this.y + maxBound)){

          return true;
        }
        return false;
      },
      allowedLengthMove: function(acc){
        if(this.x + (this.length + acc) < (this.maxWidth) &&
          this.y + (this.length + acc) < (this.maxHeight)){
          return true;
        }
        return false;
      },
      allowedXMove : function(acc){
        if((acc + this.x) < this.paddedPixels || (this.x + acc + this.length) > this.maxWidth){
          return false;
        }
        return true;
      },
      allowedYMove : function(acc){
        if((acc + this.y) < this.paddedPixels || (this.y + acc + this.length) > this.maxHeight){
          return false;
        }
        return true;
      },
      move : function(xMove,yMove,corner, cornerPosition){

        if(corner){
          if(cornerPosition == ImageCapturesEnumsService.canvasSection.TOP_LEFT){

            this.x = this.allowedXMove(xMove) ? this.x + xMove : this.x;
            this.y = this.allowedYMove(yMove) ? this.y + yMove : this.y;
            this.length = this.allowedLengthMove(-(xMove + yMove)) ? this.length - (xMove + yMove) : this.length;


          }else if(cornerPosition == ImageCapturesEnumsService.canvasSection.TOP_RIGHT){

            this.y = this.allowedYMove(yMove) ? this.y + yMove :  this.y;
            if(xMove > 0 || yMove < 0){
              this.length = this.allowedLengthMove((Math.abs(xMove) + Math.abs(yMove))) ? this.length + (Math.abs(xMove) + Math.abs(yMove)) : this.length;
            }else{
              this.length = this.allowedLengthMove(-(Math.abs(xMove) + Math.abs(yMove)))? this.length - (Math.abs(xMove) + Math.abs(yMove)) : this.length;
            }

          }else if(cornerPosition == ImageCapturesEnumsService.canvasSection.BOTTOM_LEFT){

            this.x = this.allowedXMove(xMove) ? (this.x + xMove) : this.x;
            if(xMove < 0 || yMove > 0){
              this.length = this.allowedLengthMove((Math.abs(xMove) + Math.abs(yMove))) ? this.length + (Math.abs(xMove) + Math.abs(yMove)) : this.length;
            }else{
              this.length = this.allowedLengthMove(-(Math.abs(xMove) + Math.abs(yMove))) ? this.length - (Math.abs(xMove) + Math.abs(yMove)) : this.length;
            }

          }else{

            this.length = (this.allowedLengthMove((xMove + yMove)) ? (this.length + (xMove + yMove)) : this.length);
          }

        }else{
          //console.log('move x :' + (this.x + xMove) + ' and len = ' + (this.x + xMove + this.length));
          //console.log('move y :' + (this.y + yMove)  + ' and len = ' + (this.y + yMove + this.length));
          this.x = this.allowedXMove(xMove) ? this.x + xMove : this.x;
          this.y = this.allowedYMove(yMove) ? this.y + yMove : this.y;
        }

      },
      nearestCorner: function(mouseX, mouseY){

        var pxFromXLeft = Math.abs(mouseX - this.x);
        var pxFromXRight = Math.abs(mouseX - (this.x + this.length));
        var pxFromYTop = Math.abs(mouseY - this.y);
        var pxFromYBottom = Math.abs(mouseY - (this.y + this.length));

        var topLeft = pxFromXLeft + pxFromYTop;
        var topRight = pxFromXRight + pxFromYTop;
        var bottomLeft = pxFromXLeft + pxFromYBottom;
        var bottomRight = pxFromXRight + pxFromYBottom;
        var chosen = Math.min(topLeft, topRight, bottomLeft, bottomRight);

        var corner = 0;

        if(chosen == topLeft){

          corner = 1;

        } else if(chosen == topRight){

          corner = 2;

        }else if(chosen == bottomLeft){

          corner = 3;

        }else{

          corner = 4;

        }
        return corner;

      }


    }

    return CropSelection;
  }
);
