var width=1000;
var height=600;

$(function () {
    let model_id=localStorage.getItem("model_id");
    let tempW=localStorage.getItem("kuanValue");
    let tempH=localStorage.getItem("gaoValue");
    width=(tempW!=null||tempW!=undefined) ? tempW:width;
    height=(tempH!=null||tempH!=undefined) ? tempH:height;
    let divCvsDoc=document.getElementById("divCvs");
    divCvsDoc.style.width=parseInt(width)+'px';
    divCvsDoc.style.height=parseInt(height)+'px';
    if(model_id!=null && model_id!=undefined){
       //update message
    }else{
        initScale();
    }
    
})

function initModel(data){
    let templateContent=data.templateContent;
    let oldDivCvs=document.getElementById("divCvs");
    oldDivCvs.outerHTML=JSON.parse(templateContent);
    let templateCustomContent=JSON.parse(data.templateCustomContent);
    if(templateCustomContent.length>0){
        for (let i = 0; i < templateCustomContent.length; i++) {
             let customeContentDetail = templateCustomContent[i];
             if(customeContentDetail.type=="remove"){
                 $("#divCvs").append(JSON.parse(customeContentDetail.content));
             }
        }
    }

}


function initScale(){
       let xScaleDcount= Math.ceil(width/100);
       let yScaleDcount= Math.ceil(height/100);
       let xIndexList=[],yIndexList=[],xIndex=0,yIndex=0;
       let xRemainder=width%100,yRemainder=height%100;
        while(xIndex<xScaleDcount){
            xIndexList.push(xIndex*100);
            xIndex++;
        }
        while(yIndex<yScaleDcount){
            yIndexList.push(yIndex*100);
            yIndex++;
        }
        console.log(7%4);
        console.log("xIndexList: ",xIndexList);
        console.log("yIndexList: ",yIndexList)
    //    yScaleTemplate;
    //    xScaleTemplate;
    //    yScale
    //    xScale
        let xLastShow=4;
        if(xRemainder!=0){
            if(0<xRemainder && xRemainder<20){
                xLastShow=0
            }else if(20<=xRemainder && xRemainder<40){
                xLastShow=1
            }else if(40<=xRemainder && xRemainder<60){
                xLastShow=2
            }else if(60<=xRemainder&& xRemainder<80){
                xLastShow=3
            }else{
                xLastShow=4
            }
        }
        let yLastShow=4;
        if(yRemainder!=0){
            if(0<yRemainder && yRemainder<20){
                yLastShow=0
            }else if(20<=yRemainder  && yRemainder<40){
                yLastShow=1
            }else if(40<=yRemainder  && yRemainder<60){
                yLastShow=2
            }else if(60<=yRemainder && yRemainder<80){
                yLastShow=3
            }else{
                yLastShow=4
            }
        }
       let xScaleTemplate={
           "xIndexList":xIndexList,
           "xLastShow":xLastShow,
           "xRemainder":xRemainder-1+"px",
        }
        let yScaleTemplate={
            "yIndexList":yIndexList,
            "yLastShow":yLastShow,
            "yRemainder":yRemainder-1+"px",
         }
       let htmlx =template('xScaleTemplate',xScaleTemplate);
       document.getElementById('xScale').innerHTML = htmlx;
       let htmly =template('yScaleTemplate',yScaleTemplate);
       document.getElementById('yScale').innerHTML = htmly;


}



function saveScreenModel(e){
   //bao cun
}