<%@page language="java" contentType="text/html; charset=UTF-8"%>
<%@taglib uri="/tags/struts-html" prefix="html"%>
<%@taglib uri="/tags/struts-logic" prefix="logic"%>

<HTML><HEAD><TITLE>确认</TITLE>
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
  	<td align="left" height="40" style="height:40px">
			<div>
				<div id="title_icon" style="margin-left:10px"><img src="<%=request.getContextPath()%>/global/images/message/icon_question.gif" width="24" height="24" /></div>
				<div id="title_txt"><span id="message_title" >信息确认</span></div>
			</div>
		</td>
  </tr>
  <tr>
  	<td align="left" height="110" style="height:110px">
			<div id="message_content2" style="">内容</div>
		</td>
  </tr>

  <tr>
    <td align="center" valign="top" style="height:50px" style="padding-top:5px;">
				<input type="button" id="button1" class="bluebutton" value="  确 定  " onclick="onOK()" style="width:60px;margin-right: 40px;">
				<input type="button" id="button2" class="graybutton" value="  取 消  " onclick="onCancel()" style="width:60px;">
		</td>
  </tr>
</table>

<script >
function init(){
	try{
		var args = window.dialogArguments;
		if(!args)return;
		oo("message_content2").innerHTML = args.text;
		if(args.button1Text){
			oo("button1").value = args.button1Text;
		}
		if(args.button2Text){
			oo("button2").value = args.button2Text;
		}
		document.getElementById("button1").focus();
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
	document.getElementById('button1').disabled = true;
	result.flag = true;
	window.close();
}

function onCancel(){
	result.flag = false;
	window.close();
}

document.onkeydown = function (e){
	e = e ? e : window.event;
	if(e.keyCode==27){
		window.close();
	}
}
</script>
</body>
</html>
