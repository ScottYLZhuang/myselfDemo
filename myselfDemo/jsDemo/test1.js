(function(){
    var xGlines1=document.getElementById("Xcav1");
    var yGlines1=document.getElementById("Ycav1");
    var xGlines2=document.getElementById("Xcav2");
    var yGlines2=document.getElementById("Ycav2");
    var c = document.getElementById("canvas");
    var ctx = c.getContext("2d");
    var width = document.documentElement.clientWidth*0.45;
    var height = document.documentElement.clientHeight*0.5;
    var ax,ay,r = 30,num=1;//绘制图形的参数
    var timeOutEvent = 0;//区分拖拽和点击的参数
    c.width=width;
    c.height=height;
    console.log("宽为："+c.width+"高为："+c.height);
    // ctx.
    function createBlock(a,b,r){
        ctx.beginPath();
        ctx.fillStyle = "red";
        ctx.arc(a,b,r,0,Math.PI*2);
        ctx.fill();
    }
    createBlock(200,200,30);
    c.onmousedown = function(ev){
        var e = ev||event;
        var x = e.layerX;
        var y = e.layerY;
        timeOutEvent = setTimeout(longPress(),500);
        e.preventDefault();
        drag(x,y,r);
    };
    //缩放
    c.onmousewheel = function(ev){
        var e = ev||event;
        num += e.wheelDelta/1200;
        r = 30*num;
        ctx.clearRect(0,0,c.width,c.height);
        if(ax == null || ay == null){
            createBlock(200,200,r);
        }else{
            if(r>0){
                createBlock(ax,ay,r);
            }
        }
    };
    //拖拽函数
    function drag(x,y,r){
        // 按下鼠标判断鼠标位置是否在圆上，当画布上有多个路径时，isPointInPath只能判断最后那一个绘制的路径
        // if(ctx.isPointInPath(x,y)){
            //路径正确，鼠标移动事件
            c.onmousemove = function(ev){
                var e = ev||event;
                var clientRangeX=e.pageX-e.layerX
                var clientRangeY=e.pageY-e.layerY
                ax = e.layerX;
                ay = e.layerY;
                clearTimeout(timeOutEvent);
                timeOutEvent = 0;
                if((ax+r)>=width && (ay+r)>=height){
                      //超出边界
                }else{
                    let left=e.pageX-r;
                    let top=e.pageY-r;    
                    if((ax+r)>=width){
                        ax=width-r;
                        left=ax-r+clientRangeX;
                    }
                    if((ay+r)>=height){
                        ay=height-r;
                        top=ay-r+clientRangeY;
                    }
                    if(ax-r<=0){
                        ax=r;
                        left=0+clientRangeX;;
                    }
                    if(ay-r<=0){
                        ay=r;
                        top=0+clientRangeY;
                    }

                    ctx.clearRect(0,0,c.width,c.height);
                    resetGlines(left,top,left,top,2*r,2*r);
                    createBlock(ax,ay,r);
                    var apex = document.getElementById('cavapex');
                    apex.innerText=ax+","+ay
                    apex.style.left=(ax-r-120)+"px";
                    apex.style.top=(ay-r-30)+"px";
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