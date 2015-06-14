absoluteThem();
$("#container").bind("mousedown", clickNum);
$("body").bind("selectstart", function  (e) {
  return false;
});//防止选中文字
function absoluteThem(e) {
  $($(".box").toArray().reverse()).each(function(index, el) {
    $(this).css({
      "left": $(this).position().left,
      "top": $(this).position().top,
      "float": "none",
      "position": "absolute"
    });
  });
}

function clickNum(e) {//点击数字
  var targetEle = e.target,
        targetEleJQ = $(targetEle),
    oriX = e.clientX - targetEle.offsetLeft, //光标按下时相对本身的坐标
    oriY = e.clientY - targetEle.offsetTop;
  if (targetEleJQ.hasClass("undraggable")) {
    return;
  }
  $(document).bind("mousemove", moveIt);
  $(document).bind("mouseup", mouseUp);

  function moveIt(e2) {//移动
    var newX = e2.clientX - oriX,
      newY = e2.clientY - oriY,
      maxX = 400 - targetEle.offsetWidth - 10,
      maxY = 400 - targetEle.offsetHeight - 10;
      if (newX < 100) {
        newX = 100;
      } else if (newX > maxX) {
        newX = maxX;
      }
      if (newY < 100) {
        newY = 100;
      } else if (newY > maxY) {
        newY = maxY;
      }
      if(targetEleJQ.hasClass("num")){//如果是数字
        targetEle.style.left = newX + "px";
        targetEle.style.top = newY + "px";
      }
      else if(targetEleJQ.hasClass("group1")){//如果是ABC栏
        targetEle.style.left = newX + "px";
        //targetEle.style.top = newY + "px";
      }
      else if(targetEleJQ.hasClass("group2")){//如果是XYZ栏
        //targetEle.style.left = newX + "px";
        targetEle.style.top = newY + "px";
      }
  }

  function mouseUp(e3) {
    var boxLocX = Math.floor(e3.clientY/100),//放下光标时，所在的方格坐标
          boxLocY = Math.floor(e3.clientX/100),
          oriBoxLocX = parseInt(targetEle.id.substr(4,1)),//原来的方格坐标
          oriBoxLocY = parseInt(targetEle.id.substr(6,1)),
          boxNow = "box-" + boxLocX + "-" + boxLocY,//放下处的盒子id
          boxOri = "box-" + oriBoxLocX + "-" + oriBoxLocY;

    if(targetEleJQ.hasClass("group1")) {
      if(!$("#" + boxNow).hasClass("letter") || $("#" + boxNow).hasClass("group2")){//点击的是字母而释放的是非字母
        resetLoc(boxOri);
        return; 
      }
      changeLoc(boxNow, boxOri);
      for(var i = 1; i < 4; i++){
        boxLocX ++;
        oriBoxLocX ++;
        boxNow = "box-" + boxLocX + "-" + boxLocY;//放下处的盒子id
        boxOri = "box-" + oriBoxLocX + "-" + oriBoxLocY;
        changeLoc(boxNow, boxOri);
      }
    }
    else if (targetEleJQ.hasClass("group2")) {
      if(!$("#" + boxNow).hasClass("letter")  || $("#" + boxNow).hasClass("group1")){//点击的是字母而释放的是非字母
        resetLoc(boxOri);
        return; 
      }
      changeLoc(boxNow, boxOri);
      for(var j = 1; j < 4; j++){
        boxLocY ++;
        oriBoxLocY ++;
        boxNow = "box-" + boxLocX + "-" + boxLocY;//放下处的盒子id
        boxOri = "box-" + oriBoxLocX + "-" + oriBoxLocY;
        changeLoc(boxNow, boxOri);
      }
    }
    else{
      if(!$("#" + boxNow).hasClass("num")){
        resetLoc(boxOri);
        return; 
      }
      changeLoc(boxNow, boxOri);
    }
    $(document).unbind("mousemove", moveIt);
    $(document).unbind("mouseup", mouseUp);
    function changeLoc (boxNow, boxOri) {
      var boxNowJQ = $("#" + boxNow),
            boxOriJQ = $("#" + boxOri);
      boxNowJQ.animate({//调换位置
        left: oriBoxLocY * 100,
        top: oriBoxLocX * 100},
        150,function  () {
          boxNowJQ.attr("id", boxOri);//交换id
        });
      boxOriJQ.animate({//调换位置
        left: boxLocY * 100,
        top: boxLocX * 100},
        150,function  () {
          boxOriJQ.attr("id", boxNow);//交换id
        });
    }
    function resetLoc (boxOri) {
      var  boxOriJQ = $("#" + boxOri);
      $(document).unbind("mousemove", moveIt);
      $(document).unbind("mouseup", mouseUp);
      boxOriJQ.animate({//回归位置
        left: oriBoxLocY * 100,
        top: oriBoxLocX * 100},
        150);
    }
  }
}