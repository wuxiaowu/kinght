<%@page language="java" contentType="text/html; charset=UTF-8"%>

<HTML>
<HEAD>
    <TITLE>提示</TITLE>
    <%@ include file="/global/head.jsp" %>
<META http-equiv=Content-Type content="text/html; charset=UTF-8">
<META HTTP-EQUIV="Pragma" CONTENT="no-cache">
<META HTTP-EQUIV="Cache-Control" CONTENT="no-cache">
<META HTTP-EQUIV="Expires" CONTENT="0"> 
<link href="<%=baseUrl%>/global/css/layout.css" rel="stylesheet" type="text/css">
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
  	<td align="left" height="40" style="height:40px">
			<div>
				<div id="title_icon" style="margin-left:10px"><img src="<%=request.getContextPath()%>/global/images/message/icon_info.gif" width="24" height="24" /></div>
				<div id="title_txt"><span id="message_title" >信息提示</span></div>
			</div>
		</td>
  </tr>
  <tr>
  	<td align="left" style="height:150">
			<div id="message_content2" style="width:340px" ondblclick="selectText(this)">　　</div>
		</td>
  </tr>

  <tr>
    <td align="center" valign="top" style="height:50px" style="padding-top:5px;">
				<input type="button" id="button1" class="bluebutton" value="  确 定  " onclick="onOK()" style="width:60px;">
		</td>
  </tr>
</table>

<script >
function selectText(o){
	try{
		document.execCommand("SelectAll");
	}catch(e){
	}
}
function init(){
	try{
		var args = window.dialogArguments;
		if(!args)return;
		oo("message_content2").innerHTML = args.text;
		document.all["button1"].focus();
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
	if(e.keyCode==27  || e.keyCode==10){
		window.close();
	}
}
</script>
</body>
</html>
