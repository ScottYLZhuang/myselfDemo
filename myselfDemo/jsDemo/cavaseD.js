﻿// canvas 矩形框集合
var rects=[];

function rectar(x,y,width,height){
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.isSelected = false;
};
		
function drawRect() {
  // 清除画布，准备绘制
  context.clearRect(0, 0, canvas.width, canvas.height);

  // 遍历所有矩形框
  for(var i=0; i<rects.length; i++) {
	var rect = rects[i];

	// 绘制矩形
	context.strokeStyle="#FF0000";
	context.strokeRect(rect.x,rect.y,rect.width,rect.height,rect.color);

	if (rect.isSelected) {
	  context.lineWidth = 50;
	}
	else {
	  context.lineWidth = 10;
	}
  }
}
	
function addRandomRect() {
     var x=10;
     var y=10;
     var width=100;
     var height=100;
      // 创建一个新的矩形对象
     var rect=new rectar(x,y,width,height);

      // 把它保存在数组中
      rects.push(rect);
      // 重新绘制画布
     drawRect();
 };
 
var SelectedRect;
    var x1;
    var y1;
    var right=false;
    var widthstart,widthend;
    var heightstart,heightend;

function canvasClick(e) {
      // 取得画布上被单击的点
      var clickX = e.pageX - canvas.offsetLeft;
      var clickY = e.pageY - canvas.offsetTop;

      // 查找被单击的矩形框
      for(var i=rects.length-1; i>=0; i--) {
        var rect = rects[i];

            widthstart=rect.x;
            widthend=rect.x+rect.width;

            heightstart=rect.y;
            heightend=rect.y+rect.height;

        // 判断这个点是否在矩形框中
        if ((clickX>=widthstart&&clickX<(widthend-20))&&(clickY>=heightstart)&&(clickY<(heightend-20))) {
          console.log(clickX);
          // 清除之前选择的矩形框
          if (SelectedRect != null) SelectedRect.isSelected = false;
          SelectedRect = rect;
          x1=clickX-SelectedRect.x;
          y1=clickY-SelectedRect.y;
          //选择新圆圈
          rect.isSelected = true;

          // 使圆圈允许拖拽
          isDragging = true;

          //更新显示
          drawRect();
          //停止搜索
          return;
        };
        /*
          设置拉伸的界限。
          */
       // if ((clickX>=(widthend-20))&&(clickY>=(heightend-20)))
       // {
       //   SelectedRect = rect;
       //  right=true;
       //  }
          //18-02-01改

            if ((clickX>=(widthend-20)&&(clickX<=(widthend+20)))&&(clickY>=(heightend-20))&&(clickY>=(heightend+20))) 
             {
             SelectedRect = rect;
              right=true; 
              }
  } 
}

function dragRect(e) {
      // 判断矩形是否开始拖拽
      if (isDragging == true) {
        // 判断拖拽对象是否存在
        if (SelectedRect != null) {
          // 取得鼠标位置
          var x = e.pageX - canvas.offsetLeft;
          var y = e.pageY - canvas.offsetTop;
          // 将圆圈移动到鼠标位置
          SelectedRect.x= x-x1;
          SelectedRect.y= y-y1;

         // 更新画布
         drawRect();
        }
      }
      //判断是否开始拉伸
      if (right) {
      //设置拉伸最小的边界
        if ((e.pageX - canvas.offsetLeft-SelectedRect.x)>50) {
           SelectedRect.width=e.pageX - canvas.offsetLeft-SelectedRect.x;
        }
        else {
          SelectedRect.width=50;
        }
       console.log(SelectedRect.width);
       if((e.pageY - canvas.offsetTop-SelectedRect.y)>50){
         SelectedRect.height=e.pageY - canvas.offsetTop-SelectedRect.y;

       }
       else {
         SelectedRect.height=50;
       }
        drawRect();
      }
    };
	
	
	
	var isDragging = false;
    function stopDragging() {
      isDragging = false;
      right=false;
    };
   function clearCanvas() {
     // 去除所有矩形
      rects = [];
    // 重新绘制画布.
    drawCircles();
    }

  window.onload = function() {
      canvas = document.getElementById("canvas");
      context = canvas.getContext("2d");
      canvas.onmousedown = canvasClick;
      canvas.onmouseup = stopDragging;
      canvas.onmouseout = stopDragging;
      canvas.onmousemove =dragRect;
; };