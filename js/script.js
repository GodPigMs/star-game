var temp_time=0;
var time=0;
var score=0;
var energy=15;
var music=false;
var pause=false;
var movestate=0;
var window_w,window_h;
var prepx=1;
var speed=0;
function get(id)
{//取得元素
  return document.getElementById(id);
}
function getX(doc)
{//取得X座標(css-left)
  return parseInt(doc.style["left"].replace("px",""));
}
function getY(doc)
{//取得Y座標(css-top)
  return parseInt(doc.style["top"].replace("px",""));
}
function getW(doc)
{//取得物件寬
  return parseInt(doc.dataset.size);
}
function getH(doc)
{//取得物件高
  return parseInt(doc.dataset.size);
}
function remove(jq)
{//移除+特效
  jq.removeClass("enemy");//先行移除屬性避免重複處理碰撞
  jq.toggle("explode");//juery-ui
  setTimeout(function()
  {
    jq[0].remove();//移除元素
  },500/*延遲*/);
}
function stop()
{//暫停
  pause=!pause;
  if(pause)
  {//按鈕顏色處理(BS)
    $("#stop_b").addClass("btn-success").removeClass("btn-danger");
  }
  else
  {
    $("#stop_b").removeClass("btn-success").addClass("btn-danger");
  }
}
function stop_music()
{//音效控制
  music=!music;
  if(music)
  {//按鈕顏色處理(BS)
    $("#music_b").addClass("btn-success").removeClass("btn-danger");
  }
  else
  {
    $("#music_b").removeClass("btn-success").addClass("btn-danger");
  }
}
function renew()
{//重新開始(重新整理)
  location.href=location.href;
}
function help()
{//顯示幫助文字
  $("#help").removeClass("hide");
}
function play_sound(id)
{
	if(music)
	{//播放音樂
		get(id).play();
	}
	else
	{//停止音樂
		get(id).pause();
	}
}
function init()
{//初始化
  window_h=$(window).height();//取得螢幕高(jq
  window_w=$(window).width();//取得螢幕寬(jq
  $("#me").addClass("hide");//先隱藏主艦
  setInterval(function()
  {
    play_sound("bgMusic");//開始循環撥放音樂
  },1000);
}
function update_state()
{//更新顯示數據
  var ui=Math.floor(100/30*energy);
  get("energy_ui").style["width"]=ui+"%";//燃料條處理(BS)
  get("energy_ui_t").innerHTML=energy;
  get("score_b").innerHTML="得分："+score;
  get("time_b").innerHTML="時間："+time+"秒";
  if(energy<=0)
  {
    end();//判斷結束
  }
}
function start()
{//開始
  $("#me").removeClass("hide");//移除隱藏類別
  $("#start_panel").addClass("hide");//移除隱藏類別
  spawn_planet();//先行生成5x行星
  spawn_planet();
  spawn_planet();
  spawn_planet();
  spawn_planet();
  setInterval(function()
  {//遊戲主架構(循環)
    if(!pause)
    {//非暫停時(遊戲)
      temp_time++;
      if(temp_time%100==0)
      {//每過1秒
        energy--;//減少能量
        time++;//增加時間
        spawn_planet();//生成行星
        if(time%5==0)
        {
          speed+=0.5;//每5秒速度提升
        }
      }
      if(temp_time%144==0)
      {
        spawn_enemy();//生成敵人
      }
      if(temp_time%177==0)
      {
        spawn_friend();//生成友艦
      }
      if(temp_time%400==0)
      {
        spawn_energy();//生成燃料
      }
      if(temp_time%60==0)
      {
        spawn_shoot();//生成敵方子彈
        animate();//動畫特效
      }
      move();//主艦移動
      objectmove();//其餘物件移動
      check();//檢測碰撞
    }
  },10);
}
function spawn_planet()
{//生成行星
  var img=["001-global","002-travel","003-science-2","005-science","006-mars","007-planet-earth-1","008-earth-globe","011-planet-earth","012-jupiter"];
  var src="./img/images/planets/"+img[Math.floor(Math.random()*img.length)]+".svg";
  var y=Math.floor(Math.random()*(window_h-30));
  var weight=Math.floor(Math.random()*7)+3;
  var h_w=Math.floor(window_h/weight);
  $("#planet").append("<img src='"+src+"' class='move planet rotate' data-move='1' data-size='"+h_w+"' data-speed='"+(1/(Math.floor(weight/2)+1))+"' width='"+h_w+"' height='"+h_w+"' style='top:"+y+"px;left:"+window_w+"px;'>");
}
function spawn_energy()
{//生成燃料
  var img=["energy"];
  var src="./img/images/"+img[Math.floor(Math.random()*img.length)]+".png";
  var x=Math.floor(Math.random()*(window_w-30));
  var h_w=50;
  $("#energy").append("<img data-me='energy' src='"+src+"' class='move enemy' data-move='2' data-size='"+h_w+"' data-speed='"+0.125+"' width='"+h_w+"' height='"+h_w+"' style='top:"+0+"px;left:"+x+"px;'>");
}
function spawn_friend()
{//生成友艦
  var img=["ship_2"];
  var src="./img/images/"+img[Math.floor(Math.random()*img.length)]+".png";
  var y=Math.floor(Math.random()*(window_h-30));
  var h_w=80;
  $("#friend").append("<div data-me='friend' class='move enemy animate' data-animate='1' data-move='1' data-size='"+h_w+"' data-speed='"+0.125+"' width=='"+h_w+"' height=='"+h_w+"' style='top:"+y+"px;left:"+window_w+"px;background-image:url("+src+")'>");
}
function spawn_enemy()
{//生成敵人
  if(Math.floor(Math.random()*100)>50)
  {//敵艦
    var img=["ship_1"];
    var src="./img/images/"+img[Math.floor(Math.random()*img.length)]+".png";
    var y=Math.floor(Math.random()*(window_h-30));
    var h_w=80;
    $("#enemy").append("<div data-me='enemy' class='move enemy animate' data-hp='1' data-animate='1' data-move='1' data-size='"+h_w+"' data-speed='"+0.125+"' width='"+h_w+"' height='"+h_w+"' style='top:"+y+"px;left:"+window_w+"px;background-image:url("+src+")'>");
  }
  else
  {//隕石
    var img=["aestroid_brown","aestroid_dark","aestroid_gray","aestroid_gray_2"];
    var src="./img/images/"+img[Math.floor(Math.random()*img.length)]+".png";
    var y=Math.floor(Math.random()*(window_h-30));
    var h_w=120;
    $("#enemy").append("<img data-me='enemy' src='"+src+"' class='move enemy' data-hp='2' data-move='1' data-size='"+h_w+"' data-speed='"+0.125+"' width='"+h_w+"' height='"+h_w+"' style='top:"+y+"px;left:"+window_w+"px;'>");
  }
}
function spawn_shoot()
{//生成敵方子彈
  $(".enemy").each(function(i)
  {
    var _this=$(".enemy")[i];
    if(_this!=undefined)
    {
      var isanimate=_this.dataset.animate!=undefined;
      var isenemy=_this.dataset.me=="enemy";
      if(isenemy && isanimate)
      {//判斷是否為敵艦
        if(Math.floor(Math.random()*100)>(50-speed))
        {//發射機率判斷
          var x=getX(_this)-5;
          var y=getY(_this);
          var img=["shoot2"];
          var src="./img/images/"+img[Math.floor(Math.random()*img.length)]+".png";
          var h_w=20;
          $("#shoot").append("<img data-me='shoot' src='"+src+"' class='move enemy' data-move='1' data-size='"+h_w+"' data-speed='"+0.5+"' width='"+h_w+"' height='"+h_w+"' style='top:"+y+"px;left:"+x+"px;'>");
        }
      }
    }
  });
}
function shoot()
{//主艦射擊
  var me=get("me");
  var w=me.width;
  var h=me.height;
  var x=getX(me)+5+w;
  var y=getY(me)+(h/2);
  var img=["shoot1"];
  var src="./img/images/"+img[Math.floor(Math.random()*img.length)]+".png";
  var h_w=20;
  play_sound("shootMusic");//射擊音效
  $("#shoot").append("<img src='"+src+"' class='move shoot' data-move='3' data-size='"+h_w+"' data-speed='"+0.5+"' width='"+h_w+"' height='"+h_w+"' style='top:"+y+"px;left:"+x+"px;'>");
}
function move()
{//主艦移動
  if(movestate==0)
  {//判別停止
    $("#me").attr("src","./img/images/spaceship-reference_5_stop.png");
  }
  else
  {//移動狀態
    $("#me").attr("src","./img/images/spaceship-reference_5.png");
    var me=get("me");
    var w=me.width;
    var h=me.height;
    var x=getX(me);
    var y=getY(me);
    if(movestate==1 && y>0)
    {//往上
      y-=(prepx*2+speed);
    }
    if(movestate==2 && x>0)
    {//往左
      x-=(prepx*2+speed);
    }
    if(movestate==3 && x+w<window_w)
    {//往右
      x-=-(prepx*2+speed);
    }
    if(movestate==4 && y+h<window_h)
    {//往下
      y-=-(prepx*2+speed);
    }
    me.style["left"]=x+"px";
    me.style["top"]=y+"px";
	//處理最後座標
  }
}
function objectmove()
{//物件移動處理
  $(".move").each(function(i)
  {//取得所有移動物件
    var _this=$(".move")[i];
    if(_this!=undefined)
    {
      var x=getX(_this);
      var y=getY(_this);
      var w=getW(_this);
      var h=getH(_this);
      var type=_this.dataset.move;//取得物體移動類別
      var weight=(_this.dataset.speed*6);//取得物體速度
      var del=false;
      if(type==1)
      {//往左移動類
        x-=(prepx*weight+speed);
        if(x+w<=0)
        {
          del=true;
        }
      }
      if(type==2)
      {//往下移動類
        y-=-(prepx*weight+speed);
        if(y>window_h)
        {
          del=true;
        }
      }
      if(type==3)
      {//往右移動類
        x-=-(prepx*weight+speed);
        if(x>window_w)
        {
          del=true;
        }
      }
      //console.log(x+","+y+"   w="+(prepx*weight+speed));
      _this.style["left"]=x+"px";
      _this.style["top"]=y+"px";
      if(del)
      {
        _this.remove();
      }
    }
  });
}
function check()
{//檢測碰撞
  var me=get("me");
  var me_w=me.width;
  var me_h=me.height;
  var me_x=getX(me);
  var me_y=getY(me);
  $(".enemy").each(function(index)
  {
    var _this=$(".enemy")[index];
    if(_this!=undefined)
    {
      var _this_w=getW(_this);
      var _this_h=getH(_this);
      var _this_x=getX(_this);
      var _this_y=getY(_this);
      var isenemy=_this.dataset.me=="enemy";
      var isenergy=_this.dataset.me=="energy";
      var isfriend=_this.dataset.me=="friend";
      var isShoot=_this.dataset.me=="shoot";
      var del=false;
      if(((me_x+me_w>_this_x && _this_x>me_x) || (_this_x+_this_w>me_x && me_x>_this_x)) &&
         ((me_y+me_h>_this_y && _this_y>me_y) || (_this_y+_this_h>me_y && me_y>_this_y)))
      {//檢測是否與主艦碰撞
        if(isenergy)
        {
          energy+=15;
          if(energy>30)
          {
            energy=30;
          }
          update_state();
          del=true;
        }
        if(isenemy||isfriend||isShoot)
        {
          play_sound("destroyedMusic");
          energy-=15;
          update_state();
          del=true;
        }
      }
      if(!del)
      {
        $(".shoot").each(function(i2)
        {
          var shoot=$(".shoot")[i2];
          if(shoot!=undefined && !del)
          {
            var shoot_w=getW(shoot);
            var shoot_h=getH(shoot);
            var shoot_x=getX(shoot);
            var shoot_y=getY(shoot);
            if(((shoot_x+shoot_w>_this_x && _this_x>shoot_x) || (_this_x+_this_w>shoot_x && shoot_x>_this_x)) &&
               ((shoot_y+shoot_h>_this_y && _this_y>shoot_y) || (_this_y+_this_h>shoot_y && shoot_y>_this_y)))
            {//檢測是否與我方子彈碰撞
              if(isfriend)
              {
                score-=10;
                play_sound("destroyedMusic");
                update_state();
                del=true;
                shoot.remove();
              }
              if(isenemy)
              {
                var hp=_this.dataset.hp;
                play_sound("destroyedMusic");
                if(hp<=1)
                {
                  del=true;
                  var isanimate=_this.dataset.animate!=undefined;
                  if(isanimate)
                  {
                    score+=5;
                  }
                  else
                  {
                    score+=10;
                  }
                  del=true;
                  update_state();
                  shoot.remove();
                }
                else
                {
                  hp--;
                  _this.dataset.hp=hp;
                  shoot.remove();
                }
              }
            }
          }
        });
      }
      if(del)
      {//需要刪除
        remove($(this));
      }
    }
  });
}
function animate()
{//動畫處理
  $(".animate").each(function(i)
  {
    var _this=$(".animate")[i];
    if(_this!=undefined)
    {
      var ani=_this.dataset.animate;
      var x=[0,80,160,240];
      var y=[0,0,0,0];
      _this.style["backgroundPosition"]="-"+x[ani-1]+"px "+y[ani-1]+"px";//處理顯示的範圍
      ani++;
      if(ani>4)
      {
        ani=1;
      }
      _this.dataset.animate=ani;
    }
  });
}
function end()
{//結束遊戲+顯示輸入名稱視窗
  $("#send_window").removeClass("hide");
  pause=true;
}
function sortA(a,b)
{//排列
  return a[2]-b[2];
}
function send()
{//送出資料並取得排名
  var name=get("name").value;
  if(name=="")
  {
    alert("請輸入名稱!");
    return;
  }
  $.ajax(
    {
      url:'register.php',//目標網址
      dataType:"json",//回傳資料格式
      method:"GET",//請求類型
      data://傳送的資料
      {
        'action':1,//check
        'name':name,//名稱
        'score':score,//分數
        'time':time//時間
      },
      success:function(data)
      {//成功回傳
        var rank=data["rank"].sort(sortA);//名次排列
		    var count=0;
        for(i=rank.length-1;i>=0;i--)
        {//印出前15
          count++;
          $("#table").append("<tr><td>"+(rank.length-i)+"</td><td>"+rank[i][1]+"</td><td>"+rank[i][2]+"</td><td>"+rank[i][3]+"</td></tr>");
          if(count>=15)
          {
            break;
          }
        }
        $("#rank_window").removeClass("hide");
      }
    }
  );
}
$(window).keydown(function(event)
{//鍵盤事件監聽
  switch(event.keyCode)
  {
    case 38://上
      movestate=1;
      break;
    case 37://左
      movestate=2;
      break;
    case 40://下
      movestate=4;
      break;
    case 39://右
      movestate=3;
      break;
    case 80://p
      stop();
      break;
    case 32://space
      shoot();
      break;
    case 77://m
      stop_music();
      break;
  }
});
