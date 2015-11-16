<%@page language="java" contentType="text/html; charset=UTF-8"%>
<%@taglib uri="/tags/struts-html" prefix="html"%>
<%@taglib uri="/tags/struts-logic" prefix="logic"%>

<HTML><HEAD><TITLE>警告</TITLE>
<META http-equiv=Content-Type content="text/html; charset=UTF-8">
<META HTTP-EQUIV="Pragma" CONTENT="no-cache">
<META HTTP-EQUIV="Cache-Control" CONTENT="no-cache">
<META HTTP-EQUIV="Expires" CONTENT="0"> 
<link href="<%=request.getContextPath()%>/global/css/layout.css" rel="stylesheet" type="text/css">
<style>
div#message_content2{
	clear:both;
	font-size: 12px; color: #000;
	float: left;
	padding: 5px 0px 15px 0px;
	margin-left:30px;
	overflow:auto;
	width:300px;
	height:100%;
}
</style>
</head>

<body class="bodyspace" style="margin:0px;padding:0px;" onload="init()" topmargin="0">



<table width="100%"  height="100%" border="0" align="left"  valign="top" cellpadding="0" cellspacing="0" >

  <tr>
  	<td align="left"  style="height:40px;width:100%">
			<div>
				<div id="title_icon" style="margin-left:10px"><img src="<%=request.getContextPath()%>/global/images/message/icon_info.gif" width="24" height="24" /></div>
				<div id="title_txt"><span id="message_title" >错误</span></div>
			</div>
		</td>
  </tr>
  <tr>
  	<td align="left"  style="height:40px;width:100%">
			<div id="message_content2" style="">内容</div>
		</td>
  </tr>

  <tr>
  	<td align="left" valign="top" width="100%"> 
	  <!-- 内容部分 start -->
	<table align="center" style="width:99%;height:100%;padding:0px;margin:0px;" cellpadding="0" cellspacing="0">
		<tr onclick="collapse(this)" style="cursor:hand;">
		  <td align="left" valign="top" style="padding-top:5px">
		  	<img src="<%=request.getContextPath()%>/global/images/img_expand.gif"/>
		  	<span class="sy4-2">详细信息</span>
			</td>
		</tr>
		<tr style="display:none;">
			<td align="left" width="100%">
			<textarea rows="" id="stackTrace" style="width:100%;height:200px; overflow:auto;">
        		
			</textarea>
			</td>
		</tr>
	</table> 

  <!-- 内容部分 end -->
	</td>
  </tr>

  <tr>
    <td align="center" valign="top" style="height:50px" style="padding-top:5px;" width="100%">
	<input type="button" id="button1" class="bluebutton" value="  确 定  " onclick="onOK()" style="width:60px;">
	</td>
  </tr>
</table>

<script >
function init(){
	try{
		var args = window.dialogArguments;
		if(!args)return;
		oo("message_content2").innerHTML = args.text;
		oo("stackTrace").value = (args.stackTrace==null) ? "": args.stackTrace.replace(/<br>/g,"\n");
	}catch(e){
	}
}

function oo(id){
	return document.getElementById(id);
}

var result = {
	flag : false
};
window.returnValue = result;

function onOK(){
	result.flag = true;
	window.close();
}

function onCancel(){
	window.close();
}

document.onkeydown = function (e){
	e = e ? e : window.event;
	if(e.keyCode==27 || e.keyCode==13 || e.keyCode==10){
		window.close();
	}
}

function  collapse(row) {
	var nrow = row.parentNode.rows[1];
	if(nrow.style.display != "none"){
		nrow.style.display = "none";
		row.cells[0].childNodes[0].src = "<%=request.getContextPath()%>/global/images/img_expand.gif";
	}else{
		nrow.style.display = "";
		row.cells[0].childNodes[0].src = "<%=request.getContextPath()%>/global/images/img_expand-shrink.gif";
	}
}
</script>
</body>
</html>
