/**
 * Created by ltischuk on 10/23/14.
 */
angular.module('ngcrop')
    .factory('SelectorGuide',function(){
        var factory = {};

            factory.SelectorGuide = function(boundingRectangle){
                this.startingPoint = [0,0];
                this.boundingRectangle = boundingRectangle;
                this.isBottomRight = false;
                this.isBottomLeft = false;
                this.isTopLeft = false;
                this.isTopRight = false;
                this.x1 = 0;
                this.y1 = 0;
                this.x2 = 0;
                this.y2 = 0;
                this.xDiff = 0;
                this.yDiff = 0;

            }


            factory.SelectorGuide.prototype.generateMouseDownStyle = function(mouseDownEvent ){
                this.startingPoint[0] = mouseDownEvent.pageX - this.boundingRectangle.left;
                this.startingPoint[1] = this.boundingRectangle.top;
                this.x1 = angular.copy(this.startingPoint[0]);
                this.y1 = mouseDownEvent.pageY - this.startingPoint[1];
            };

            factory.SelectorGuide.prototype.generateMouseMoveStyle = function(mouseMoveEvent){
                /*find relative mouse points to image*/

                this.x2 = mouseMoveEvent.pageX - this.boundingRectangle.left;;
                this.y2 = mouseMoveEvent.pageY - this.boundingRectangle.top;

                //only allow bottom right and top right movements (left to right)
                if(this.x2>this.x1 && this.y2>this.y1){ //moving right bottom selection
                    this.isBottomRight = true;
                    this.isBottomLeft = false;
                    this.isTopLeft = false;
                    this.isTopRight = false;

                    this.xDiff = Math.abs(this.x2 - this.x1);
                    this.yDif = Math.abs(this.y2 - this.y1);

                    return {
                        width: this.xDiff + 'px',
                        height: this.ydiff + 'px'
                    };
                } else if(this.x2 > this.x1 && this.y2 < this.y1) { //moving top right selection
                    this.isTopRight = true;
                    this.isTopLeft = false;
                    this.isBottomLeft = false;
                    this.isBottomRight = false;

                    this.xDiff = Math.abs(this.y1 - this.y2);
                    this.yDif = Math.abs(this.x2 - this.x1);

                    return {
                        top: this.y2 + 'px',
                        width: this.yDiff + 'px',
                        height: this.xDiff + 'px'

                    }
                }

            }

            factory.generateMouseUpStyle = function(mouseUpEvent){
                if(this.isBottomRight){
                    this.x2 = mouseUpEvent.pageX - this.startingPoint[0];
                    this.y2 = mouseUpEvent.pageY - this.startingPoint[1];
                    this.xDiff = this.x2 - this.x1;
                    this.yDiff = this.y2 - this.y1;
                } else if (this.isBottomLeft){
                    this.y2 = mouseUpEvent.pageY - this.startingPoint[1];
                    this.yDiff = this.y2 - this.y1 ;
                    this.xDiff = this.x1 - this.x2;
                    this.x1 = this.x1 - this.xDif;

                } else if(this.isTopRight){
                    this.x2 = mouseUpEvent.pageX - this.startingPoint[0];
                    this.xDiff = this.x2 - this.x1 ;
                    this.yDiff = this.y1 - this.y2;
                    this.y1 = this.y1 - this.yDiff;
                } else if (this.isTopLeft){
                    this.xDiff = this.x1 - this.x2;
                    this.x1 = this.x1 - this.xDiff;
                    this.yDiff = this.y1 - this.y2;
                    this.y1 = this.y1 - this.yDiff;
                }
            }


        return factory;
    });