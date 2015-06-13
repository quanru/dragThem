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
  $(document).bind("mousemove", moveNum);
  $(document).bind("mouseup", mouseUp);

  function moveNum(e2) {//移动数字
    var newX = e2.clientX - oriX,
      newY = e2.clientY - oriY,
      maxX = 400 - targetEle.offsetWidth - 10,
      maxY = 400 - targetEle.offsetHeight - 10;

    if (targetEleJQ.hasClass("group1")) {
      $(".group1").each(function(index, el) {
        //this.style.left = newX + index*100 + "px";
        this.style.top = newY + "px";
      });
    }
    else if (targetEleJQ.hasClass("group2")) {
      $(".group2").each(function(index, el) {
        this.style.left = newX + "px";
        //this.style.top = newY + index*100 + "px";
      });
    }
    else{
      if (newX < 0) {
        newX = 0;
      } else if (newX > maxX) {
        newX = maxX;
      }
      if (newY < 0) {
        newY = 0;
      } else if (newY > maxY) {
        newY = maxY;
      }
      targetEle.style.left = newX + "px";
      targetEle.style.top = newY + "px";
  }
  }

  function mouseUp(e3) {
    var boxLocX = Math.floor(e3.clientY/100),//放下光标时，所在的方格坐标
          boxLocY = Math.floor(e3.clientX/100),
          oriBoxLocX = parseInt(targetEle.id.substr(4,1)),//原来的方格坐标
          oriBoxLocY = parseInt(targetEle.id.substr(6,1));
    if(targetEleJQ.hasClass("group1")) {
      //oriBoxLocY = parseInt($(".group1Head").attr("id").substr(6,1));
      $(".group1").each(function(index, el) {
        var boxNow = "box-" + boxLocX + "-" + (index + boxLocY),//放下处的盒子id
        boxOri = "box-" + oriBoxLocX + "-" + (index + oriBoxLocY);
        $("#" + boxNow).animate({//调换位置
          left: (index + oriBoxLocY) * 100,
          top: oriBoxLocX * 100},
          150*(index + 1),function  () {
            $("#" + boxNow).attr("id", boxOri);//交换id
          });
        $("#" + boxOri).animate({//调换位置
          left: (index + boxLocY) * 100,
          top: boxLocX * 100},
          150*(index + 1),function  () {
            $("#" + boxOri).attr("id", boxNow);//交换id
          });
      });
    }
    else if (targetEleJQ.hasClass("group2")) {
      $(".group2").each(function(index, el) {
        var boxNow = "box-" + (index + boxLocX) + "-" +  boxLocY,//放下处的盒子id
        boxOri = "box-" + (index + oriBoxLocX) + "-" + oriBoxLocY;
        $("#" + boxNow).animate({//调换位置
          left: oriBoxLocY * 100,
          top: (index + oriBoxLocX) * 100},
          150*(index + 1),function  () {
            $("#" + boxNow).attr("id", boxOri);//交换id
          });
        $("#" + boxOri).animate({//调换位置
          left: boxLocY * 100,
          top: (index + boxLocX) * 100},
          150*(index + 1),function  () {
            $("#" + boxOri).attr("id", boxNow);//交换id
          });
      });
    }
    else{
      var boxNow = "box-" + boxLocX + "-" + boxLocY,//放下处的盒子id
      boxOri = "box-" + oriBoxLocX + "-" + oriBoxLocY;
      $("#" + boxNow).animate({//调换位置
        left: oriBoxLocY * 100,
        top: oriBoxLocX * 100},
        150,function  () {
          $("#" + boxNow).attr("id", boxOri);//交换id
        });
      targetEleJQ.animate({//调换位置
        left: boxLocY * 100,
        top: boxLocX * 100},
        150,function  () {
          targetEleJQ.attr("id", boxNow);//交换id
        });
    }
    $(document).unbind("mousemove", moveNum);
    $(document).unbind("mouseup", mouseUp);
  }
}