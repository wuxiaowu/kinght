/*********为弹出窗口专设的JS***********/
//========弹出普通窗口，中央居中
function PopWinOpener(url,name,title,width,height) {
var top,left;
   top=(screen.height-height)/2;
   left=(screen.width-width)/2;
   PopWindow=window.open(url,name,"width="+width+",height="+height+",top="+top+",left="+left);
}
//========弹出Main窗口

/*function PopMainWinOpener(url,name,title,width,height) {
   width=screen.width-10;
   if(screen.height > 768 ){ height=screen.height-70;}
	  else{ height=screen.height-36;}
   PopWindow=window.open(url,name,"width="+width+",height="+height+",top=0,left=0");
}*/
function PopMainWinOpener(url,name) {
   PopWindow=window.open(url,name,"top=0,left=0,resizable=yes");
}
//========弹出非模式对话框
function PopModelessDialogOpener(url,name,title,width,height) {
   showModelessDialog(url,name,"dialogWidth:"+width+";dialogHeight:"+height+"; center:yes;status:no;scroll:no") 
}
//========弹出模式对话框
function PopModeDialogOpener(url,name,title,width,height) {
   showModeDialog(url,name,"dialogWidth:"+width+";dialogHeight:"+height+"; center:yes;status:no;scroll:no") 
}
//=========动态改变弹出窗口大小
  function setSize(width,height) {
	if (window.outerWidth) {
		window.outerWidth = width;
		window.outerHeight = height;
	}
	else if (window.resizeTo) {
		window.resizeTo(width,height);
	}
	else {
		alert("Not supported.");
	}
  }
