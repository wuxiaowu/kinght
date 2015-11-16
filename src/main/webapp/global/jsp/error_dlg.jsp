<%@ page language="java" contentType="text/html; charset=UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
"http://www.w3.org/TR/html4/loose.dtd">
<%
	String baseUrl = request.getContextPath();
%>
<html>
<head>
<title>出错信息</title>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<link href="<%=baseUrl%>/global/css/layout.css" rel="stylesheet" type="text/css">
<script language="javascript">

</script>
</head>

<body class="bodyspace" >

<!--页面内容区域-->
<form action="" method="post" name="form1" id="form1" >			
		
<table width="400px"  height="100%" border="0" align="left"  valign="top" cellpadding="10" cellspacing="0" >

  <tr>
  	<td align="left" >
	  <!-- 标题部分 start -->
	<div id="icon_area" >
		<div id="title_icon"><img src="../images/message/icon_error.gif" width="24" height="24" /></div>
		<div id="title_txt"><span id="message_title" >出错信息</span></div>
	</div>

  <!-- 标题部分 end -->
	</td>
  </tr>
    <tr>
  	<td align="left" >
	  <!-- 内容部分 start -->
	<div id="message_content" >
	</div>

  <!-- 内容部分 end -->
	</td>
  </tr>

  <tr>
      <td align="center" valign="top"> 
        <div id="buttongrouparea" style="background-color:transparent">
		<input type="button" property="submit" class="bluebutton" value="  关 闭  " style="margin-right: 40px;" onclick="javascript:window.close();">
		
	</td>
  </tr>

</table>
 </form>
</body>
</html>
<script type="text/javascript">
var error = window.dialogArguments;
document.all["message_content"].innerHTML = error;
</script>
