(function(){
    var xGlines1=document.getElementById("Xcav1");
    var yGlines1=document.getElementById("Ycav1");
    var xGlines2=document.getElementById("Xcav2");
    var yGlines2=document.getElementById("Ycav2");
    var c = document.getElementById("canvas2");
    var ctx = c.getContext("2d");
    //创建图形
    var width = document.documentElement.clientWidth*0.45;
    var height = document.documentElement.clientHeight*0.5;
    var timeOutEvent = 0;//区分拖拽和点击的参数
    c.width=width;
    c.height=height;
    console.log("宽为："+c.width+"高为："+c.height);
    var ax,ay,w = 150,h=75,num=1;
    createRect(200,200,w,h);
    function createRect(x,y,w,h){
        // ctx.strokeStyle='red';
        // ctx.strokeRect(x,y,w,h); 
        ctx.beginPath();	
        ctx.fillStyle = "red";	
        ctx.fillRect(x,y,w,h); 	
    
    }

    c.onmousedown = function(ev){
        var e = ev||event;
        var x = e.layerX;
        var y = e.layerY;
        timeOutEvent = setTimeout(longPress(),500);
        e.preventDefault();
        drag(x,y,w,h);
        console.log("x为："+x+"为："+y);
    };
    //缩放
    c.onmousewheel = function(ev){
        var e = ev||event;
        num += e.wheelDelta/1200;
        w = 150*num;
        h = 75*num;
        ctx.clearRect(0,0,c.width,c.height);
        if(ax == null || ay == null){
            createRect(200,200,w,h);
        }else{
            if(w>0){
                createRect(ax,ay,w,h);
            }
        }
    };

    //拖拽函数
    function drag(x,y,w,h){
        // 按下鼠标判断鼠标位置是否在圆上，当画布上有多个路径时，isPointInPath只能判断最后那一个绘制的路径
        // if(ctx.isPointInPath(x,y)){
            //路径正确，鼠标移动事件
            c.onmousemove = function(ev){
                var e = ev||event;
                ax = e.layerX;
                ay = e.layerY;
                var clientRangeX=e.pageX-e.layerX
                var clientRangeY=e.pageY-e.layerY
                clearTimeout(timeOutEvent);
                timeOutEvent = 0;
                if((ax+w/2)>=width && (ay+h/2)>=height){
                   //超出边界
               }else{
                   let left=e.pageX-w/2;
                   let top=e.pageY-h/2;    
                   if((ax+w/2)>=width){
                       ax=width-w/2;
                       left=ax-w/2+clientRangeX;
                   }
                   if((ay+h/2)>=height){
                       ay=height-h/2;
                       top=ay-h/2+clientRangeY;
                   }
                   if(ax-w/2<=0){
                       ax=w/2;
                       left=0+clientRangeX;
                   }
                   if(ay-h/2<=0){
                       ay=h/2;
                       top=0+clientRangeY;
                   }
                   ctx.clearRect(0,0,c.width,c.height);
                   createRect(ax-w/2,ay-h/2,w,h);
                   resetGlines(left,top,left,top,w,h);
                   var apex = document.getElementById('cavapex');
                   apex.innerText=(ax-w/2)+","+(ay-h/2)
                   apex.style.left=(ax-w/2-120+clientRangeX)+"px";
                   apex.style.top=(ay-h/2-30+clientRangeY)+"px";
               }
            };
            //鼠标移开事件
            c.onmouseup = function(){
                c.onmousemove = null;
                c.onmouseup = null;
                clearTimeout(timeOutEvent);
                if(timeOutEvent!=0){
                    alert("你这是点击，不是拖拽");
                }else{
                    xGlines1.className="cav xa";
                    yGlines1.className="cav ya";
                    xGlines2.className="cav xa";
                    yGlines2.className="cav ya";
                }
            }
        // }
    }
    function longPress(){
        timeOutEvent = 0;
    }
    function resetGlines(left,top,mLeft,mtop,Gwidth,Gheight){
        xGlines1.className="cav xaShow";
        yGlines1.className="cav yaShow";
        xGlines2.className="cav xaShow";
        yGlines2.className="cav yaShow";

        xGlines1.style.width=width+"px";
        yGlines1.style.height=height+"px";
        xGlines2.style.width=width+"px";
        yGlines2.style.height=height+"px";

        ///左半边
        xGlines1.style.left=left+"px"
        yGlines1.style.left=left+"px"
        xGlines1.style.top=top+"px"
        yGlines1.style.top=top+"px"
        xGlines1.style.marginLeft="-"+mLeft+"px"
        yGlines1.style.marginTop="-"+mtop+"px"

        //右半边
        xGlines2.style.left=(left+Gwidth)+"px"
        yGlines2.style.left=(left+Gwidth)+"px"
        xGlines2.style.top=(top+Gheight)+"px"
        yGlines2.style.top=(top+Gheight)+"px"
        xGlines2.style.marginLeft="-"+(mLeft+Gwidth)+"px"
        yGlines2.style.marginTop="-"+(mtop+Gheight)+"px"  
    }
})()

