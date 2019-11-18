
var xGl1=document.getElementById("Xguidelines1");
var yGl1=document.getElementById("Yguidelines1");
var xGl2=document.getElementById("Xguidelines2");
var yGl2=document.getElementById("Yguidelines2");
var index=0;
var apexdoc = document.getElementById('apex');
var centredoc = document.getElementById('centre');
var leftRe=0;
var topRe=0;
var gl1=document.getElementById("gl1");
var gl2=document.getElementById("gl2");
var gl3=document.getElementById("gl3");
var gl4=document.getElementById("gl4");
var gl5=document.getElementById("gl5");
var gl6=document.getElementById("gl6");
var gl7=document.getElementById("gl7");
var gl8=document.getElementById("gl8");

var isDrop = false;//移动状态的判断鼠标按下才能移动
var isZoom = false;
var isZoomKey="";
var ax,ay,//移动时移动位置变化
    x,y,//相对于容器位置
    w = 150,h=150 ,timeOutEvent=0;
var divCvs=document.getElementById("divCvs");
var divCvsPa=document.getElementById("divCvsPa");

 width = divCvs.clientWidth;
 height = divCvs.clientHeight;
var marginTop = 0;
var marginLeft = 0;
document.addEventListener('mouseup', function(e) {
    isDrop = false;
    isZoom=false
    xGl1.className="guidelines xa";
    yGl1.className="guidelines ya";
    xGl2.className="guidelines xa";
    yGl2.className="guidelines ya";
    apexdoc.style.display="none";
});

divCvsPa.addEventListener('mousemove', function(e) {
    if(isZoom){//&& e.target.id==isZoomKey
        let eGl=document.getElementById(isZoomKey);
        let paDom=document.getElementById(eGl.getAttribute("data-tochart-id"));
        w=paDom.clientWidth;
        h=paDom.clientHeight;
        let offLeft=divCvs.offsetLeft,
            offTop=divCvs.offsetTop,//绘制容器距浏览器上座距离     包含容器marg    　
            pOffLeft=divCvsPa.offsetLeft,
            pOffTop=divCvsPa.offsetTop;
        var scrollLeft=divCvsPa.scrollLeft,
                scrollTop=divCvsPa.scrollTop;
        var pageX=e.pageX,//鼠标位置page坐标
            pageY=e.pageY;
        let x = pageX+scrollLeft-offLeft-pOffLeft,
            y = pageY+scrollTop-offTop-pOffTop;//当前鼠标坐标
        let apex=$("#apex").text();
        let apexArray=apex.split(",");
        let dijiaoRightX=parseFloat(apexArray[0])+w,dijiaoRightY=parseFloat(apexArray[1])+h;
        let dijiaoLeftX=parseFloat(apexArray[0]),dijiaoLeftY=parseFloat(apexArray[1])+h;
        let dingjiaoLeftX=parseFloat(apexArray[0]),dingjiaoLeftY=parseFloat(apexArray[1]);
        let dingjiaoRightX=parseFloat(apexArray[0])+w,dingjiaoRightY=parseFloat(apexArray[1]);
        //默认右下角计gl5
        let xRange=x-dijiaoRightX,
        yRange=y-dijiaoRightY;//线宽度
        let left=paDom.offsetLeft,
        top=paDom.offsetTop;
        let newW=xRange+w,newH=yRange+h;
        let rangeJson={},flag=false;

        switch(eGl.id){
            case 'gl1':
                    xRange=dijiaoRightX-x;
                    yRange=dijiaoRightY-y;
                    newW=xRange;
                    newH=yRange;
                    left=dijiaoRightX-newW;
                    top=dijiaoRightY-newH;
                    if(left<dijiaoRightX-22 && top<dijiaoRightY-22 && newW>0 && newH>0){
                        rangeJson=borderlineValidate(left,top,newW,newH);
                        flag=true;
                    }
                break;
            case 'gl2':
                    xRange=dijiaoRightX-x;
                    yRange=0;
                    newW=xRange;
                    newH=h;
                    left=dijiaoRightX-newW;
                    top=dingjiaoLeftY;
                    if(left<dijiaoRightX-22 && newW>0 && newH>0){
                        rangeJson=borderlineValidate(left,top,newW,newH);
                        flag=true;
                    }
                break;
            case 'gl3':
                    xRange=dingjiaoRightX-x;
                    yRange=y-dingjiaoRightY;
                    newW=xRange;
                    newH=yRange;
                    left=dingjiaoRightX-newW;
                    top=dingjiaoRightY;
                    if(left<dingjiaoRightX-22 && top>dingjiaoRightY-22 && newW>0 && newH>0){
                        rangeJson=borderlineValidate(left,top,newW,newH);
                        flag=true;
                    }
                    // flag=true;
                break;
            case 'gl4':
                    xRange=0;
                    yRange=y-dingjiaoLeftY;
                    newW=w;
                    newH=yRange;
                    left=dingjiaoLeftX;
                    top=dingjiaoLeftY;
                    if(newW>0 && newH>0 && top > (dingjiaoRightY-22)){
                        rangeJson=borderlineValidate(left,top,newW,newH);
                        flag=true;
                    }
                break;
            case 'gl5':
                if(left+newW-22>dingjiaoLeftX && top+newH-22>dingjiaoLeftY && newW>0 && newH>0){
                    rangeJson=borderlineValidate(left,top,newW,newH);
                    flag=true;
                }
                break;
            case 'gl6':
                    xRange=x-dijiaoLeftX;
                    yRange=0;
                    newW=xRange;
                    newH=h;
                    left=x-newW;
                    top=dingjiaoLeftY;
                    if(left>dingjiaoLeftY+22 && newW>0 && newH>0){
                        rangeJson=borderlineValidate(left,top,newW,newH);
                        flag=true;
                    }
                    // flag=true;
                break;
            case 'gl7':
                    xRange=x-dijiaoLeftX
                    yRange=dijiaoLeftY-y;
                    newW=xRange;
                    newH=yRange;
                    left=dijiaoLeftX;
                    top=dijiaoLeftY-newH;
                    if(left<dingjiaoRightX-22 && top<dijiaoRightY-22 && newW>0 && newH>0){
                        rangeJson=borderlineValidate(left,top,newW,newH);
                        flag=true;
                    }
                    // flag=true;
                break;
            case 'gl8':
                    xRange=0;
                    yRange=dijiaoLeftY-y;
                    newW=w;
                    newH=yRange;
                    left=dingjiaoLeftX;
                    top=dijiaoLeftY-newH;
                    if(newW>0 && newH>0 && top < (dijiaoLeftY-22)){
                        rangeJson=borderlineValidate(left,top,newW,newH);
                        flag=true;
                    }
                break;

        }
        if(flag){
            apexdoc.innerText=rangeJson.left+","+rangeJson.top;
            centredoc.innerText=paDom.id+" : "+rangeJson.left+","+rangeJson.top;
            apexdoc.style.left=rangeJson.left-80+"px";
            apexdoc.style.top=rangeJson.top-30+"px";
            apexdoc.style.display="block";
            createDiv(rangeJson.left,rangeJson.top,rangeJson.newW,rangeJson.newH,paDom,paDom.id);
            resetGlines(rangeJson.left,rangeJson.top,rangeJson.left,rangeJson.top,rangeJson.newW,rangeJson.newH,width,height,paDom.id);
        }

    }
    // console.log("divCvsPa x y",e.x,e.y)

})
function divCvsKeyDown (event) {
    index++;
    var e = event || window.event;
    let id=e.target.id;

    let tempTarget=document.getElementById(id);
    let flag=false;
    let rangeJson={};
    let newW=tempTarget.clientWidth,
    newH=tempTarget.clientHeight;
    if(isZoomKey==id){
   }else{
        leftRe=tempTarget.offsetLeft;
        topRe=tempTarget.offsetTop;
   }
    console.log("divCvsKeyDown start key x"+leftRe+" y:"+topRe);
    console.log("divCvsKeyDown index"+index);
    console.log("divCvsKeyDown key e"+e);
    console.log("divCvsKeyDown key w"+newW+" h:"+newH);
    //ctrlKey altKey shiftKey
    //二次验证操作对象offsetLeft
    if(id.indexOf("docDivMode_")>-1){
        switch(e.keyCode){
            case 37:
                //left
                leftRe=leftRe-1;
                rangeJson=borderlineValidate(leftRe,topRe,newW,newH);
                flag=true;
                break;
            case 38:
                //up
                topRe=topRe-1;
                rangeJson=borderlineValidate(leftRe,topRe,newW,newH);
                flag=true;
                break;
            case 39:
                //Right
                leftRe=leftRe+1;
                rangeJson=borderlineValidate(leftRe,topRe,newW,newH);
                flag=true;
                break;
            case 40:
                //down
                topRe=topRe+1;
                rangeJson=borderlineValidate(leftRe,topRe,newW,newH);
                flag=true;
                break;
            case 46:
                //delete
                e.target.remove();
                deleteModel(e.target.id);
                break;    
        }
        if(flag){
            console.log("divCvsKeyDown keyup"+rangeJson.left+" y:"+rangeJson.top);
            apexdoc.innerText=rangeJson.left+","+rangeJson.top;
            centredoc.innerText=id+" : "+rangeJson.left+","+rangeJson.top;
            apexdoc.style.left=rangeJson.left-80+"px";
            apexdoc.style.top=rangeJson.top-30+"px";
            apexdoc.style.display="block";
            isZoomKey=id;
            createDiv(rangeJson.left,rangeJson.top,rangeJson.newW,rangeJson.newH,tempTarget,id);
            resetGlines(rangeJson.left,rangeJson.top,rangeJson.left,rangeJson.top,rangeJson.newW,rangeJson.newH,width,height,id);
        }else if(e.keyCode==46){
            apexdoc.style.display="none";
            xGl1.className="guidelines xa";
            yGl1.className="guidelines ya";
            xGl2.className="guidelines xa";
            yGl2.className="guidelines ya";
            $(".glshow").addClass("glnone");
            $(".glshow").removeClass("glshow");

        }
    }
};
function divCvsMouseDown(e){
    e = e || window.event;
    x = e.clientLeft;
    y = e.clientTop;
    timeOutEvent = setTimeout(longPress(),500);
    // e.preventDefault();
    isDrop = true; 
    console.log("点击鼠标位置x："+x+" y:"+y);
}
function divCvsMouseUp(e){
        e = e || window.event;
        x = e.clientLeft;
        y = e.clientTop;
    console.log("松开鼠标位置x："+x+" y:"+y)
    clearTimeout(timeOutEvent);
    if(timeOutEvent!=0){
        console.log("你这是点击，不是拖拽");
    }else{
        xGl1.className="guidelines xa";
        yGl1.className="guidelines ya";
        xGl2.className="guidelines xa";
        yGl2.className="guidelines ya";
        apexdoc.style.display="none";
        // $(".glshow").addClass("glnone");
        // $(".glshow").removeClass("glshow");
    }
    isDrop=false;
} 
function divCvsMouseMove(e){
    console.log("点击鼠标移动位置x："+e.offsetLeft+" y:"+e.offsetTop);
    //是否为可移动状态       
    let offLeft=divCvs.offsetLeft;
    let offTop=divCvs.offsetTop;//绘制容器距浏览器上座距离     包含容器marg    　
    let pOffLeft=divCvsPa.offsetLeft
    let pOffTop=divCvsPa.offsetTop
    let id=e.id;
    //window.event.movementX 相对上次的移动距离
    //window.event.movementY 　　　　　　　　　　 　　　　　　　
    if(isDrop) {　
        e = e||window.event;
        let event=window.event//鼠标位置
        let offsetLeft=e.offsetLeft//div到顶点距离现在的位置
        let offsetTop=e.offsetTop//
        var movementX=event.movementX;
        var movementY=event.movementY;
        var scrollLeft=divCvsPa.scrollLeft;
        var scrollTop=divCvsPa.scrollTop;
        var pageX=window.event.pageX;//鼠标位置page坐标
        var pageY=window.event.pageY;
        console.log("DIV置movementX："+movementX+" movementY:"+movementY);
        var clientRangeX=offLeft+pOffLeft;
        var clientRangeY=offTop+pOffTop;
        w=e.clientWidth;
        h=e.clientHeight;
        ax = pageX+scrollLeft-offLeft-pOffLeft;//移动中鼠标对应坐标值（假定为中心点）
        ay = pageY+scrollTop-offTop-pOffTop;//
        clearTimeout(timeOutEvent);
        timeOutEvent = 0;
        if((ax+w/2)>=(width) && (ay+h/2)>=(height)){
            //超出边界
        }else{
            let left=ax-w/2;//左顶点计算偏移量
            let top=ay-h/2;
            if((ax+w/2)>=(width)){
                ax=width-w;
                left=ax;//绝对偏移量
            }
            if((ay+h/2)>=(height)){
                ay=height-h;
                top=ay;
            }
            if(ax-w/2<=0){
                ax=w/2;
                left=0;
            }
            if(ay-h/2<=0){
                ay=h/2;
                top=0;
            }
            left= Math.round((left)*100)/100;
            top= Math.round((top)*100)/100;
            // w== Math.round((w)*100)/100;
            // h== Math.round((h)*100)/100;
            // width== Math.round((width)*100)/100;
            // height== Math.round((height)*100)/100;
            createDiv(left,top,w,h,e,id);
            resetGlines(left,top,left,top,w,h,width,height,id);
            apexdoc.innerText=Math.round((ax-w/2)*100)/100+","+Math.round((ay-h/2)*100)/100;
            centredoc.innerText=id+" : "+Math.round((ax-w/2)*100)/100+","+Math.round((ay-h/2)*100)/100;
            apexdoc.style.left=left-80+"px";
            apexdoc.style.top=top-30+"px";
            apexdoc.style.display="block";
            console.log("DIV置left："+left+" top:"+top);
            console.log("DIV置x："+ax+" y:"+ay);
            
        }
    }
}

function longPress(){
    timeOutEvent = 0;
}


function createDiv(x,y,w,h,e,id){
    console.log("createDiv x: "+x+" y: "+y+" w: "+w+" h: "+h+"e: "+e.outerHTML);
    e.style.left=x+"px";
    e.style.top=y+"px";
    e.style.width=w+"px";
    e.style.height=h+"px";
    console.log("createDiv end e:"+e.outerHTML);
}

function resetGlines(left,top,mLeft,mtop,Gwidth,Gheight,width,height,id){
    xGl1.className="guidelines xaShow";
    yGl1.className="guidelines yaShow";
    xGl2.className="guidelines xaShow";
    yGl2.className="guidelines yaShow";

    xGl1.style.width=width+"px";
    yGl1.style.height=height+"px";
    xGl2.style.width=width+"px";
    yGl2.style.height=height+"px";

    ///左半边
    xGl1.style.left=left+"px";
    yGl1.style.left=left+"px";
    xGl1.style.top=top+"px";
    yGl1.style.top=top+"px";
    xGl1.style.marginLeft="-"+mLeft+"px";
    yGl1.style.marginTop="-"+mtop+"px";
    

    //右半边
    xGl2.style.left=(left+Gwidth)+"px";
    yGl2.style.left=(left+Gwidth)+"px";
    xGl2.style.top=(top+Gheight)+"px";
    yGl2.style.top=(top+Gheight)+"px";
    xGl2.style.marginLeft="-"+(mLeft+Gwidth)+"px";
    yGl2.style.marginTop="-"+(mtop+Gheight)+"px";  


    gl1.setAttribute("data-tochart-id",id);
    gl2.setAttribute("data-tochart-id",id);
    gl3.setAttribute("data-tochart-id",id);
    gl4.setAttribute("data-tochart-id",id);
    gl5.setAttribute("data-tochart-id",id);
    gl6.setAttribute("data-tochart-id",id);
    gl7.setAttribute("data-tochart-id",id);
    gl8.setAttribute("data-tochart-id",id);

    //border 4宽 Gwidth Gheight

    gl1.style.left=left-6+"px";
    gl1.style.top=top-6+"px";
    

    gl2.style.left=left-6+"px";
    gl2.style.top=top-6+Gheight/2+"px";
    

    gl3.style.left=left-6+"px";
    gl3.style.top=top-5+Gheight+"px";//Gheight/10+4


    gl4.style.left=left-6+Gwidth/2+"px";
    gl4.style.top=top-5+Gheight+"px";


    gl5.style.left=left-5+Gwidth+"px";
    gl5.style.top=top-5+Gheight+"px";


    gl6.style.left=left-5+Gwidth+"px";
    gl6.style.top=top-6+Gheight/2+"px";


    gl7.style.left=left-5+Gwidth+"px";
    gl7.style.top=top-6+"px";


    gl8.style.left=left-5+Gwidth/2+"px";
    gl8.style.top=top-5+"px";

    $(".glnone").addClass("glshow");
    $(".glnone").removeClass("glnone");


}


//放大缩小

function zoomInDown(e){
    isZoom=true;
    isZoomKey=e.id
}

function zoomInMove(e){
    if(isZoom){
        isZoomKey=e.id
    }
    console.log("进入zoom小标");
    switch(e.id){
            case 'gl1':
                    e.style.cursor="nw-resize"
                break;
            case 'gl2':
                    e.style.cursor="w-resize"
                break;
            case 'gl3':
                    e.style.cursor="ne-resize" 
                break;
            case 'gl4':
                    e.style.cursor="s-resize" 
                break;
            case 'gl5':
                    e.style.cursor="nw-resize"
                break;
            case 'gl6':
                    e.style.cursor="e-resize"
                break;
            case 'gl7':
                    e.style.cursor="ne-resize"
                break;
            case 'gl8':
                    e.style.cursor="n-resize"
                break;

        }
}

function zoomInUp(e){
    isZoom=false;
    console.log("放开zoom小标");
}



function borderlineValidate(left,top,w,h){
    console.log("borderlineValidate left"+left+" top:"+top+" w"+w+" h:"+h);
    let rangeJson={}
        if(left>=0 && top>=0 && left+w<=width && top+h<=height){
            rangeJson={
                left:left,
                top:top,
                newW:w,
                newH:h
            }
        }else{
            if(left<0){
                left=0
            }
            if(top<0){
                top=0
            }
            if(left+w>width){
                w=width-left;
            }
            if(top+h>height){
                h=height-top;
            }
            rangeJson={
                left:left,
                top:top,
                newH:h,
                newW:w
            }
        }
        return rangeJson;
}



function deleteModel(id){
    var modelList=document.getElementsByName("docDivMode");
    for (let index = 0; index < modelList.length; index++) {
        modelList[index].id="docDivMode_"+index;
        modelList[index].setAttribute("tabindex",index)
    }
}