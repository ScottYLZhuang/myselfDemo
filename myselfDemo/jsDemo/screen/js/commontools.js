
function createModel(e){
    if($('#createModel').hasClass("overlayHide")){
        $('#createModel').removeClass("overlayHide");
        $('#divCvs').addClass("hiddenStyle");
    }
}

function changePaintSize(e){
    console.log("changePaintSize",height);
    if($('#paintSize').hasClass("overlayHide")){
        $('#paintSize').removeClass("overlayHide");
        $('#divCvs').addClass("hiddenStyle");
    }
 
}


function closeOverLay(flag,commitId){
    $('#'+commitId).addClass("overlayHide");
    $('#divCvs').removeClass("hiddenStyle");
    $('#screenListBox').removeClass("hiddenStyle");
    $('#layoutSelected').addClass("overlayHide")
    if(flag && commitId=='paintSize'){
        let divCvsDoc=document.getElementById("divCvs");
        let resizeWValue= $('#resizeW').val();
        let resizeHValue= $('#resizeH').val();
        if(resizeWValue!=undefined&& resizeWValue!=null && parseInt(resizeWValue)>0 &&
            resizeHValue!=undefined&& resizeHValue!=null && parseInt(resizeHValue)>0){
                divCvsDoc.style.width=parseInt(resizeWValue)+'px';
                divCvsDoc.style.height=parseInt(resizeHValue)+'px';
                width=resizeWValue;
                height=resizeHValue;
                localStorage.setItem("kuanValue",width);
                localStorage.setItem("gaoValue",height);
                initScale()
        }
    }else if(flag && commitId=='createModel'){
            // modelH modelX modelY
        let modelW= $('#modelW').val();
        let modelH= $('#modelH').val();
        let modelX= $('#modelX').val();
        let modelY= $('#modelY').val();
        let docDivMode=document.getElementsByName('docDivMode');
        let html=`<div id="docDivMode_${docDivMode.length}" name="docDivMode" ></div>`
        $('#divCvs').append(html);
        let newModel=document.getElementById(`docDivMode_${docDivMode.length-1}`);
        newModel.style.width=modelW+"px";
        newModel.style.height=modelH+"px";
        newModel.style.left=modelX+"px";
        newModel.style.top=modelY+"px";
        newModel.style.cursor="move";
        newModel.setAttribute("onmousedown","divCvsMouseDown(this)");
        newModel.setAttribute("onmouseup","divCvsMouseUp(this)");
        newModel.setAttribute("onmousemove","divCvsMouseMove(this)");
        newModel.setAttribute("onkeydown","divCvsKeyDown(event)");
        newModel.setAttribute("draggable","false");
        newModel.setAttribute("tabindex",`${docDivMode.length-1}`);
    }else if(flag && commitId=='createLayoutModel'){
        let layoutCtnName=$("#layoutCtnName").text().trim();
        let kuanValue=$("#kuanValue").text().trim();
        let gaoValue=$("#gaoValue").text().trim();
        if(layoutCtnName==null || layoutCtnName==undefined || layoutCtnName==''){
            alert("布局名称未填写！");
            $('#createLayoutModel').removeClass("overlayHide");
        }else if(kuanValue==null || kuanValue==undefined || kuanValue==''){
            alert("分辨率宽度未填写！");
            $('#createLayoutModel').removeClass("overlayHide");
        }else if(gaoValue==null || gaoValue==undefined || gaoValue==''){
            alert("分辨率高度未填写！");
            $('#createLayoutModel').removeClass("overlayHide");
        }else{
            localStorage.setItem("layoutCtnName",layoutCtnName);
            localStorage.setItem("kuanValue",kuanValue);
            localStorage.setItem("gaoValue",gaoValue);
            localStorage.removeItem("model_id");
            location.href="./screen/createScreen.html"
        }
    }
}