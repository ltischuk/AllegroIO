/**
 * Created by ltischuk on 10/19/14.
 */
angular
    .module('ngcrop')
    .directive('rectAreaSelector',
        function(){
            return {
                restrict: 'E',
                scope: {
                },
                templateUrl: '<div class="ic-crop-selection" id="sel"></div>',
                link: function (scope, element) {

                    /*Dashed-line selection div insert dynamically on the DOM*/
                    var sel = angular.element('<div class="ic-crop-selection" id="sel"></div>');
                    element.parent().append(sel);

                    var stylesForReset = {
                        display: 'none',
                        left : '0px',
                        top : '0px',
                        width: '0px',
                        height: '0px'
                    };

                    /*Starting base left/top position*/
                    var pos = [0,0];

                    /*variables to guide the selection*/
                    var isSelection,
                        isBottomRight,
                        isTopRight,
                        isTopLeft,
                        isBottomLeft = false;
                    var x1, y1, x2, y2, xDif, yDif =0;
                    var imgRectangle = {};
                    var canSelect = true;

                    /*events to fire based on mouse and parent controller*/
                    scope.$on('resetSelection', function(event, args) {
                        resetSelectionDiv();
                        canSelect = (angular.isDefined(args.canSelect) ? args.canSelect : true);
                    });

                    element.on('mousedown', function(e) {
                        if(canSelect){
                            handleMouseDown(e);
                        }
                    });

                    element.on('mouseup', function(e) {
                        if(canSelect) {
                            handleMouseUp(e);
                        }
                    });

                    element.on('mousemove', function(e) {
                        if(canSelect){
                            handleMouseMove(e);
                        }
                    });

                    /**
                     * function handleMouseDown
                     * handles the action of mouse on image canvas
                     * @param e event */
                    function handleMouseDown(e) {

                        //reset the style of the selection block
                        if(isSelection){
                            return;
                        }
                        element[0].style.cursor = 'crosshair';
                        resetSelectionDiv();

                        //turn on selection and set the top/left bounds of the selection
                        isSelection = true;
                        imgRectangle = element[0].getBoundingClientRect();
                        pos[0] = e.pageX -  imgRectangle.left;
                        pos[1] = imgRectangle.top;

                        x1 = pos[0];
                        y1 = e.pageY - pos[1];

                        var styles = {
                            display : 'block',
                            left : x1 + 'px',
                            top :  y1+ 'px',
                            width: '0px',
                            height : '0px'

                        }
                        //set the styles of the selection block and display
                        sel.css(styles);
                    }

                    /**
                     * Adjust the x2 and y2 points dynamically as rectangular selection is dragged
                     * @param e
                     * */
                    function handleMouseMove(e) {
                        /*find relative mouse points to image*/
                        var relPointX =  e.pageX - imgRectangle.left;
                        var relPointY = e.pageY - imgRectangle.top;

                        if(isSelection){
                            x2 = relPointX;
                            y2 = relPointY;

                            //only allow bottom right and top right movements (left to right)
                            if(x2>x1 && y2>y1){ //moving right bottom selection
                                isBottomRight = true;
                                isBottomLeft = false;
                                isTopLeft = false;
                                isTopRight = false;

                                xDif = Math.abs(x2 - x1);
                                yDif = Math.abs(y2 - y1);
                                var styles = {

                                    width: xDif + 'px',
                                    height : yDif + 'px'

                                }
                                //set the styles of the selection
                                sel.css(styles);


                            } else if(x2>x1 && y2<y1){ //moving top right selection
                                isTopRight = true;
                                isTopLeft = false;
                                isBottomLeft = false;
                                isBottomRight = false;

                                xDif = Math.abs(y1 - y2);
                                yDif = Math.abs(x2 - x1) ;
                                var styles = {
                                    top:  y2 + 'px',
                                    width: yDif + 'px',
                                    height: xDif + 'px'

                                }
                                //set the styles of the
                                sel.css(styles);


                            }
                        }

                    }

                    /**
                     * Adjust the x2 and y2 points dynamically as mouse up event occurs
                     * @param e
                     * */
                    function handleMouseUp(e) {
                        isSelection = false;
                        if(isBottomRight){
                            x2 = e.pageX - pos[0];
                            y2 = e.pageY - pos[1];
                            xDif = x2-x1;
                            yDif = y2-y1;
                        } else if (isBottomLeft){
                            y2 = e.pageY - pos[1];
                            yDif = y2 - y1 ;
                            xDif = x1 - x2;
                            x1 = x1 - xDif;

                        } else if(isTopRight){
                            x2 = e.pageX - pos[0];
                            xDif = x2 - x1 ;
                            yDif = y1 - y2;
                            y1 = y1 - yDif;
                        } else if (isTopLeft){
                            xDif = x1 - x2;
                            x1 = x1 - xDif;
                            yDif = y1 - y2;
                            y1 = y1 - yDif;
                        }

                        element[0].style.cursor = 'default';
                    }

                    /**
                     * Method to reset the selection div
                     */
                    function resetSelectionDiv(){
                        isSelection = false;
                        sel.css(stylesForReset);
                    }


                }

            }


        }

);