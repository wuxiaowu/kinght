/*********Ϊ��������ר���JS***********/
//========������ͨ���ڣ��������
function PopWinOpener(url,name,title,width,height) {
var top,left;
   top=(screen.height-height)/2;
   left=(screen.width-width)/2;
   PopWindow=window.open(url,name,"width="+width+",height="+height+",top="+top+",left="+left);
}
//========����Main����

/*function PopMainWinOpener(url,name,title,width,height) {
   width=screen.width-10;
   if(screen.height > 768 ){ height=screen.height-70;}
	  else{ height=screen.height-36;}
   PopWindow=window.open(url,name,"width="+width+",height="+height+",top=0,left=0");
}*/
function PopMainWinOpener(url,name) {
   PopWindow=window.open(url,name,"top=0,left=0,resizable=yes");
}
//========������ģʽ�Ի���
function PopModelessDialogOpener(url,name,title,width,height) {
   showModelessDialog(url,name,"dialogWidth:"+width+";dialogHeight:"+height+"; center:yes;status:no;scroll:no") 
}
//========����ģʽ�Ի���
function PopModeDialogOpener(url,name,title,width,height) {
   showModeDialog(url,name,"dialogWidth:"+width+";dialogHeight:"+height+"; center:yes;status:no;scroll:no") 
}
//=========��̬�ı䵯�����ڴ�С
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
