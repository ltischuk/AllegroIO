/**
 * Created by ltischuk on 2/7/15.
 */
angular.module('ngcrop')
  .factory('CropSelection', function CropSelectionFactory(ngCropConstants) {

    function CropSelection(maxWidth, maxHeight){

      this.x = 0;
      this.y = 0;
      this.length = 0;
      this.paddedPixels = 2;
      this.ratio = 1;
      this.scaledWidth = 1;
      this.scaledHeight = 1;
      this.maxWidth = angular.isDefined(maxWidth) ? maxWidth : 0;
      this.maxHeight = angular.isDefined(maxHeight) ? maxHeight : 0;

    }

    CropSelection.prototype = {

      setScalesToImage : function(img, newWidth){

        this.ratio = (this.maxWidth > 0 && this.maxHeight > 0) ? Math.min ((this.maxWidth / img.width),(this.maxHeight/ img.height)): 1;
        this.scaledWidth = img.width * this.ratio;
        this.scaledHeight = img.height * this.ratio;
        this.maxWidth = this.scaledWidth - this.paddedPixels;
        this.maxHeight = this.scaledHeight - this.paddedPixels;
        var dim = Math.min(this.scaledWidth,this.scaledHeight);
        this.x = (newWidth / 2) - (dim/4);
        this.y = dim/4;
        this.length = dim/2;

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

          var move = 0;
          var len = 0;

          if(cornerPosition == ngCropConstants.POSITIONS.TOP_LEFT){

            move = Math.max(xMove, yMove) > 0 ? Math.max(xMove, yMove) : Math.min(xMove,yMove);
            len = -(move * 2);
            this.x = this.allowedXMove(move) ? this.x + move : this.x;
            this.y = this.allowedYMove(move) ? this.y + move :  this.y;
            this.length = (this.allowedLengthMove(len) ? (this.length + len) : this.length);

          }else if(cornerPosition == ngCropConstants.POSITIONS.TOP_RIGHT){

            this.x = this.allowedXMove(-xMove) ? this.x - xMove : this.x;
            this.y = this.allowedYMove(yMove) ? this.y + yMove :  this.y;

            if(xMove > 0 || yMove < 0){

              this.length = this.allowedLengthMove((Math.abs(xMove) + Math.abs(yMove))) ? this.length + (Math.abs(xMove) + Math.abs(yMove)) : this.length;

            }else{

              this.length = this.allowedLengthMove(-(Math.abs(xMove) + Math.abs(yMove)))? this.length - (Math.abs(xMove) + Math.abs(yMove)) : this.length;

            }

          }else if(cornerPosition == ngCropConstants.POSITIONS.BOTTOM_LEFT){

            this.x = this.allowedXMove(xMove) ? (this.x + xMove) : this.x;

            if(xMove < 0 || yMove > 0){

              this.length = this.allowedLengthMove((Math.abs(xMove) + Math.abs(yMove))) ? this.length + (Math.abs(xMove) + Math.abs(yMove)) : this.length;

            }else{

              this.length = this.allowedLengthMove(-(Math.abs(xMove) + Math.abs(yMove))) ? this.length - (Math.abs(xMove) + Math.abs(yMove)) : this.length;

            }

          }else{

            move = Math.max(xMove, yMove) > 0 ? Math.max(xMove, yMove) : Math.min(xMove,yMove);
            len = move * 2;
            this.x = this.allowedXMove(-move) ? this.x - move : this.x;
            this.y = this.allowedYMove(-move) ? this.y - move :  this.y;
            this.length = (this.allowedLengthMove(len) ? (this.length + len) : this.length);
          }

        }else{
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
