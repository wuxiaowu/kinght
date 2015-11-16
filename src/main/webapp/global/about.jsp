<%@page language="java" contentType="text/html; charset=UTF-8"%>
<%@taglib uri="/tags/struts-html" prefix="html"%>
<%@taglib uri="/tags/struts-logic" prefix="logic"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
"http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<title>关于 FMIS3</title>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<link href="css/layout.css" rel="stylesheet" type="text/css">


</head>

<body class="about" >

<!--页面内容区域-->

<div class="about_txt1" >
<span class="txt_blue_02" style="float:left;">江苏省电力公司 | 北京数源信息有限公司</span><span class="txt_gray" >版权所有</span>
<br>
<span class="txt_gray">版本信息：</span>&nbsp;&nbsp; <span class="txt_blue_02">V3.05  内部测试版本： <%=application.getAttribute("buildDate")%>(最后编译)</span>
</div>
 
<div class="about_button"><input type="button" class="bluebutton" value="  关 闭  " onclick="window.close();"></div>

</body>
</html>