	
/*
 *===========下拉菜单 by dgc=============
 */
 
var backLayer;
var dataLayer;
var ifrm;
var AnyMenuBlocked=false;//当前是否有菜单被弹出

function createLayers(){
// 放iframe的层
backLayer=document.createElement("DIV");
backLayer.id="BackLayer";
backLayer.style.position="absolute";
backLayer.style.zIndex=99;

// iframe
ifrm=document.createElement("IFRAME");
ifrm.id="Ifrm";
backLayer.appendChild(ifrm);

// 显示数据的层
dataLayer=document.createElement("DIV");
dataLayer.id="DataLayer";
dataLayer.style.position="absolute";
dataLayer.style.border="1px solid #1895bb";
dataLayer.style.background="#ffffff url('../global/images/bg_submenu.gif') left top repeat-x";
dataLayer.style.zIndex=100;

document.body.appendChild(backLayer);
document.body.appendChild(dataLayer);
}
	

	function showSubMenu(obj){
		if(backLayer==null){//需要时再生成相关对象
		   createLayers();
		   document.body.attachEvent("onclick",hideSubMenu); 
		}

		AnyMenuBlocked=true;
		var currMenu=obj.getElementsByTagName("div")[1];//子菜单的层
	    currMenu.style.display='block';
		
		backLayer=document.all("BackLayer");
		backLayer.style.visibility="";
		var pos=getAbsolutePos(currMenu);
        backLayer.style.left=pos.x;
        backLayer.style.top=pos.y;
        backLayer.style.width=currMenu.clientWidth+2;
        backLayer.style.height=currMenu.clientHeight;
		
		ifrm=document.all("Ifrm");
		ifrm.width=backLayer.style.width;
        ifrm.height=backLayer.style.height;

		dataLayer=document.all("DataLayer");
		dataLayer.style.visibility="";
        dataLayer.style.left=backLayer.style.left;
        dataLayer.style.top=backLayer.style.top;
        dataLayer.style.width=backLayer.style.width;
        dataLayer.style.height=backLayer.style.height;
		
        currMenu.style.display='none';//隐藏子菜单层
        dataLayer.innerHTML=currMenu.innerHTML;//将菜单层的内容填充进dataLayer
	}
	
	function hideSubMenu(){
		if(!AnyMenuBlocked)
		{
			backLayer.style.visibility="hidden";
		    dataLayer.style.visibility="hidden";
		}
		AnyMenuBlocked=false;
	}
	
	
 //变换菜单项的背景色
    function ChangeBG()
    { 
      oEl=event.srcElement; //获得发生事件的对象
      //以下为更改背景色
      if(oEl.style.background!="#d9f5ff") 
      { 
        oEl.style.background="#d9f5ff"; 
      } 
      else 
      { 
        oEl.style.background=""; 
      } 
    } 

 //点击菜单项的处理函数
    function ItemClick()
    { 
      oEl=event.srcElement; //获得发生事件的对象
      oLink=oEl.all.tags("A"); //获得对象中的链接标签对象
      if(oLink.length) //如果链接标签对象存在
      { 
        oLink[0].click(); //则打开此链接
      } 
    }

	

//======old====================
	
//状态变量：是否有菜单对象打开
    var AnyMenuBlocked=false;
 //记录当前打开的菜单对象ID
	var BlockMenuId=0;
 //打开菜单项
    function GradientShow(Id)
    { 
	  AnyMenuBlock=true;
	  BlockMenuId=Id;
	  var obj = document.getElementById('LayerMenu'+Id);
	  if (obj) {
		  eval('LayerMenu'+Id).style.display='block';
		  hideShowCovered(eval('LayerMenu'+Id));
		}
	}
    
 //关闭菜单项
    function GradientClose(menuCount){ 
	  var oEl,toEl;
	  oEl=event.srcElement; //获得发生事件的对象
      for(var Id=1;Id<=menuCount;Id++){
	    toEl=oEl; //获得发生事件的对象
		var objMenu=document.getElementById('LayerMenu'+Id);
	    if (!toEl.id||toEl.id.toUpperCase()!=("MAINMENU"+Id)) {
		  if(objMenu.currentStyle.display!="none"){
            objMenu.style.display="none"; //不再显示菜单项
		  }
		}
	  }
	  if(!AnyMenuBlocked&&BlockMenuId)
		hideShowCovered(eval('LayerMenu'+BlockMenuId));
 } 
    
 //变换菜单项的背景色
    function ChangeBG()
    { 
      oEl=event.srcElement; //获得发生事件的对象
      //以下为更改背景色
      if(oEl.style.background!="#d9f5ff") 
      { 
        oEl.style.background="#d9f5ff"; 
      } 
      else 
      { 
        oEl.style.background=""; 
      } 
    } 

 //点击菜单项的处理函数
    function ItemClick()
    { 
      oEl=event.srcElement; //获得发生事件的对象
      oLink=oEl.all.tags("A"); //获得对象中的链接标签对象
      if(oLink.length) //如果链接标签对象存在
      { 
        oLink[0].click(); //则打开此链接
      } 
    }
 //取得对象的可见度
	function getVisib(obj){
	  var value = obj.style.visibility;
	  if (!value) {
	    value = obj.currentStyle.visibility;
	  } 
	  else  value = '';
	  return value;
    }
 //取得对象的绝对位置
    function getAbsolutePos(obj) {
      var SL = 0, ST = 0;
	  if (obj.scrollLeft)
        SL = obj.scrollLeft;
	  if (obj.scrollTop)
        ST = obj.scrollTop;
	  var r = { x: obj.offsetLeft - SL, y: obj.offsetTop - ST };
      if (obj.offsetParent) {
        var tmp = this.getAbsolutePos(obj.offsetParent);
        r.x += tmp.x;
        r.y += tmp.y;
      }
	  return r;
    }
 //当下拉菜单打开/收回时隐藏/显示被起遮挡的块级元素
  	function hideShowCovered(objADivMenu) {
		//add "a" element on 061016 by yc
		var tags = new Array("applet", "iframe", "select","a");
		var el = objADivMenu;

		var objPos = getAbsolutePos(el);
		var EX1 = objPos.x;
		var EX2 = el.offsetWidth + EX1;
		var EY1 = objPos.y;
		var EY2 = el.offsetHeight + EY1;

		for (var k = tags.length; k > 0; ) {
			var arrEle = document.getElementsByTagName(tags[--k]);
			var tempEle = null;

			for (var i = arrEle.length; i > 0;) {
				tempEle = arrEle[--i];

				tempElePos = getAbsolutePos(tempEle);
				var CX1 = tempElePos.x;
				var CX2 = tempEle.offsetWidth + CX1;
				var CY1 = tempElePos.y;
				var CY2 = tempEle.offsetHeight + CY1;

				if (this.hidden || (CX1 > EX2) || (CX2 < EX1) || (CY1 > EY2) || (CY2 < EY1)) {
					if (!tempEle.__msh_save_visibility) {
						tempEle.__msh_save_visibility = getVisib(tempEle);
					}
					tempEle.style.visibility = tempEle.__msh_save_visibility;
				} 
				else {
					if (!tempEle.__msh_save_visibility) {
						tempEle.__msh_save_visibility = getVisib(tempEle);
					}
					tempEle.style.visibility = "hidden";
				}
			}
		}
    }	
	