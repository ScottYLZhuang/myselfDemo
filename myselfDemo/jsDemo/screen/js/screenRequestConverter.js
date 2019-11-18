function saveScreenModelRequestCoverter(templateContent){
    let fblw=localStorage.getItem("kuanValue"),
     fblh=localStorage.getItem("gaoValue"),
     name=localStorage.getItem("layoutCtnName");
    let model_id=localStorage.getItem("model_id");
    let templateSize=fblw+"x"+fblh;
    let remark="kuaifabuxiangliuxiarenhedongxi";
    let logo="nalaidelogo";
    let nowDate=new Date();
    let code="createScreenModel_"+nowDate.getTime();
    let request={
        id:(model_id!=null && model_id!=undefined)? model_id:"",
        code:code,	
        logo:logo,	
        name:name,
        remark:remark,
        templateContent:JSON.stringify(templateContent),
        templateCustomContent:[],
        state:"1",
        templateSize:templateSize,
        templateType:"1",
        sortNum:"1",
    }
    return request
}