<%@page language="java" contentType="text/html; charset=UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
"http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<title>记录删除确认</title>
<META HTTP-EQUIV="Pragma" CONTENT="no-cache">
<META HTTP-EQUIV="Cache-Control" CONTENT="no-cache">
<META HTTP-EQUIV="Expires" CONTENT="0"> 
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<%
	String baseUrl = request.getContextPath();
%>
<link href="<%=baseUrl%>/global/css/layout.css" rel="stylesheet" type="text/css">

</head>

<body class="bodyspace" >

<!--页面内容区域-->
<form action="" method="post" name="form1" id="form1" >			
		
<table width="400px"  height="100%" border="0" align="left"  valign="top" cellpadding="10" cellspacing="0" >

  <tr>
  	<td align="left" >
	  <!-- 标题部分 start -->
	<div id="icon_area" >
		<div id="title_icon"><img src="<%=baseUrl%>/global/images/message/icon_question.gif" width="24" height="24" /></div>
		<div id="title_txt"><span id="message_title" >记录删除确认</span></div>
	</div>

  <!-- 标题部分 end -->
	</td>
  </tr>
    <tr>
  	<td align="left" >
	  <!-- 内容部分 start -->
	<div id="message_content" >请确认您删除的记录！</div>

  <!-- 内容部分 end -->
	</td>
  </tr>

  <tr>
      <td align="center" valign="top"> 
        <div id="buttongrouparea" style="background-color:transparent">
		<input type="button" property="submit" class="bluebutton" value="  删 除  " style="margin-right: 40px;" onclick="okClick();">
		<input type="button" property="submit" class="graybutton" value="  取 消  " onclick="cancel();">
    </div>
	</td>
  </tr>

</table>
 </form>
</body>
</html>
<script>
function okClick(){
window.returnValue = true;
window.close();
}
function cancel(){
window.returnValue = false;
window.close();
}
</script>
