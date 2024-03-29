var gwidth=1000;
var gheight=800;
$(function () {
    initScale();
})

function initScale(){

       let xScaleDcount= Math.ceil(gwidth/100);
       let yScaleDcount= Math.ceil(gheight/100);
       let xIndexList=[],yIndexList=[],xIndex=0,yIndex=0;
        while(xIndex<xScaleDcount){
            xIndexList.push(xIndex*100);
            xIndex++;
        }
        while(yIndex<yScaleDcount){
            yIndexList.push(yIndex*100);
            yIndex++;
        }
        console.log("xIndexList: ",xIndexList);
        console.log("yIndexList: ",yIndexList)
    //    yScaleTemplate;
    //    xScaleTemplate;
    //    yScale
    //    xScale
       let htmlx =template('xScaleTemplate',{"xIndexList":xIndexList});
       document.getElementById('xScale').innerHTML = htmlx;
       let htmly =template('yScaleTemplate',{"yIndexList":yIndexList});
       document.getElementById('yScale').innerHTML = htmly;
}



function allowDrop(ev)
{
    ev.preventDefault();
}

var srcdiv = null;
function drag(ev,divdom)
{
    srcdiv=divdom;
    // ev.dataTransfer.setData("text/html",divdom.innerText);
}

function drop(ev,divdom)
{
    ev.preventDefault();
    let left=ev.offsetX;
    let top=ev.offsetY;
    if(srcdiv != divdom){
        let dragflag=srcdiv.getAttribute("draggable");
        if(dragflag){
            let outerHTML="";
            let width=srcdiv.clientWidth*1.5,
            height=srcdiv.clientHeight*1.5
            if(divdom.children.length>0){
                let chidrenDom=divdom.children;
    
                for (let index = 0; index < chidrenDom.length; index++) {
                    outerHTML+=chidrenDom[index].outerHTML;
                }
                srcdiv.style.left=(left-width/2)+"px";
                srcdiv.style.top=(top-height/2)+"px";
                srcdiv.style.width=width+"px";
                srcdiv.style.height=height+"px";
                srcdiv.style.position="absolute";
                srcdiv.style.zIndex="2";
                srcdiv.id=`screenChart_${chidrenDom.length}`;
                srcdiv.style.cursor="move";
                //srcdiv.setAttribute("data-toChart-id",`screenChart_${chidrenDom.length}`);
                srcdiv.removeAttribute("ondrop");
                srcdiv.removeAttribute("ondragover");
                srcdiv.removeAttribute("ondragstart");
                srcdiv.removeAttribute("draggable");
                srcdiv.setAttribute("onmousedown","divCvsMouseDown(this)");
                srcdiv.setAttribute("onmouseup","divCvsMouseUp(this)");
                srcdiv.setAttribute("onmousemove","divCvsMouseMove(this)");
                srcdiv.setAttribute("onkeydown","divCvsKeyDown(event)");
                srcdiv.setAttribute("draggable","false");
                srcdiv.setAttribute("tabindex",`${chidrenDom.length}`);
            
                outerHTML+=srcdiv.outerHTML;
            }else{
                 srcdiv.style.left=(left-width/2)+"px";
                 srcdiv.style.top=(top-height/2)+"px";
                 srcdiv.style.width=width+"px";
                 srcdiv.style.height=height+"px";
                 srcdiv.style.position="absolute";
                 srcdiv.style.zIndex="2";
                 srcdiv.style.cursor="move";
                 srcdiv.removeAttribute("ondrop");
                 srcdiv.removeAttribute("ondragover");
                 srcdiv.removeAttribute("ondragstart");
                 srcdiv.removeAttribute("draggable");
                 srcdiv.setAttribute("onmousedown","divCvsMouseDown(this)");
                 srcdiv.setAttribute("onmouseup","divCvsMouseUp(this)");
                 srcdiv.setAttribute("onmousemove","divCvsMouseMove(this)");
                 srcdiv.setAttribute("onkeydown","divCvsKeyDown(event)");
                 srcdiv.setAttribute("draggable","false");
                 srcdiv.setAttribute("tabindex",0);
                 srcdiv.id=`screenChart_0`;
                
                //  srcdiv.setAttribute("data-toChart-id","screenChart_0");
                 outerHTML=srcdiv.outerHTML;
            }
            divdom.innerHTML=outerHTML;
            //back srvdiv
            srcdiv.setAttribute("ondrop","drop(event,this)");
            srcdiv.setAttribute("ondragover","allowDrop(event)");
            srcdiv.setAttribute("ondragstart","drag(event, this)");
            srcdiv.setAttribute("draggable","true");
            srcdiv.removeAttribute("onmousedown");
            srcdiv.removeAttribute("onmouseup");
            srcdiv.removeAttribute("onmousemove");
            srcdiv.removeAttribute("data-toChart-id");
            srcdiv.removeAttribute("style");
        }
    }
}