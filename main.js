var yyy = document.getElementById('xxx');
var context = yyy.getContext('2d');

autoSetCanvasSzize(yyy)

listenToUser(yyy)

//橡皮擦

var eraserEnable  =  false
eraser.onclick = function(){
    eraserEnable = true
    actions.className = 'actions x'
}
brush.onclick = function(){
    eraserEnable = false
    actions.className = 'actions'
}
/******/
function autoSetCanvasSzize (canvas){
    setCanvasSize()

    window.onresize = function(){
        setCanvasSize()
    }

    function setCanvasSize(){
        var pageWidth = document.documentElement.clientWidth
        var pageHeight = document.documentElement.clientHeight

        canvas.width = pageWidth
        canvas.height = pageHeight
    }
}
/****** */
function listenToUser(canvas){
    var using = false;
    var lastPoint={x:undefined,y:undefined}
    //点击鼠标
    if (document.documentElement.ontouchstart !==undefined){
        ontouchstart = function(aaa){
            var x=aaa.touches[0].clientX
            var y=aaa.touches[0].clientY
            using = true
            if(eraserEnable){
                context.clearRect(x,y,10,10)
            }
            else{
                lastPoint = {x:x,y:y}
            }
        }
        ontouchmove = function(aaa){
            var x=aaa.touches[0].clientX
            var y=aaa.touches[0].clientY
            if(!using){return}
            else{
                if(eraserEnable){
                    context.clearRect(x-5,y-5,10,10)     
                }
                else{
                    var newPoint = {x:x,y:y}
                    drawLine(lastPoint.x,lastPoint.y,newPoint.x,newPoint.y)
                    lastPoint = newPoint
                }            
            }
        }
        ontouchend = function(){
            using = false
        }
    }else{
        canvas.onmousedown = function(aaa){
            var x=aaa.clientX
            var y=aaa.clientY
            using = true
            if(eraserEnable){
                context.clearRect(x,y,10,10)
            }
            else{
                lastPoint = {x:x,y:y}
            }
        }
        //移动鼠标
        canvas.onmousemove = function(aaa){
            var x=aaa.clientX
            var y=aaa.clientY
            if(!using){return}
            else{
                if(eraserEnable){
                    context.clearRect(x-5,y-5,10,10)     
                }
                else{
                    var newPoint = {x:x,y:y}
                    drawLine(lastPoint.x,lastPoint.y,newPoint.x,newPoint.y)
                    lastPoint = newPoint
                }            
            }
        }
        //松开鼠标
        canvas.onmouseup=function(){
            using = false
        }
    
    }

    /**********/
    function drawCircle(x,y,radius){
        context.beginPath();
        context.arc(x,y,radius,0,2*Math.PI);
        context.fill();  
    }
    function drawLine(x1,y1,x2,y2){
        context.beginPath()
        context.moveTo(x1,y1)   //起点
        context.lineWidth = 5   //线的宽度
        context.lineTo(x2,y2)
        context.stroke()
        context.closePath()
    }
}





