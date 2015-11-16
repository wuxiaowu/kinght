<%@page language="java" contentType="text/html; charset=UTF-8" import="com.bjhdf.framework.security.ClientSession"%>
<%@taglib uri="/tags/struts-html" prefix="html"%>
<%@taglib uri="/tags/struts-logic" prefix="logic"%>
<%
/**
 *
 *@deprecated since 2010-9-8
 *
 */
ClientSession clientSession = (ClientSession)session.getAttribute("CLIENT_SESSION");
%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>top</title>
<jsp:include page="/global/head.jsp"/>
<link href="<%=request.getContextPath()%>/global/css/top.css" rel="stylesheet" type="text/css">
<script type="text/javascript" src="<%=request.getContextPath()%>/global/js/openPopWin.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/global/js/setFont.js"></script>
<script src="<%=request.getContextPath()%>/global/scripts/contextPath.jsp"></script>
<script src="<%=request.getContextPath()%>/global/scripts/global.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/global/js/top.js"></script>
<link href="<%=request.getContextPath()%>/global/css/top.css" rel="stylesheet" type="text/css">
<script>
function exit() {
	if(spConfirm('您确定要退出吗?')) {
		window.parent.location = "<%=request.getContextPath()%>/logout.do";
	}
}
function loginout(){
     window.parent.location="<%=request.getContextPath()%>/signin.do";
}

function about(){
	window.showModalDialog('<%=request.getContextPath()%>/global/about.jsp',"关于","dialogWidth=540px;dialogHeight=330px; center:yes;status:no;scroll:no;help:no");
}

function changePassword() {
	window.showModalDialog('<%=request.getContextPath()%>/changePassword.do?type=1&userType=noNeed','修改密码',"dialogWidth:320px;dialogHeight:196px; center:yes;status:no;scroll:no"); 
}
</script>
</head>

<body onLoad="MM_preloadImages('<%=request.getContextPath()%>/global/images/menu_01-over.gif','<%=request.getContextPath()%>/global/images/menu_02-over.gif','<%=request.getContextPath()%>/global/images/menu_03-over.gif','<%=request.getContextPath()%>/global/images/menu_04-over.gif','<%=request.getContextPath()%>/global/images/menu_05-over.gif','<%=request.getContextPath()%>/global/images/menu_06-over.gif','<%=request.getContextPath()%>/global/images/menu_07-over.gif','<%=request.getContextPath()%>/global/images/menu-new-over.gif','<%=request.getContextPath()%>/global/images/menu-delete-over.gif','<%=request.getContextPath()%>/global/images/menu-modify-over.gif','<%=request.getContextPath()%>/global/images/up-over.gif','<%=request.getContextPath()%>/global/images/view-over.gif','<%=request.getContextPath()%>/global/images/export-over.gif','<%=request.getContextPath()%>/global/images/order-over.gif')">
<table width="100%" height="65"  border="0" cellpadding="0" cellspacing="0" background="images/top-bg.gif">
  <tr>
    <td width="43%" height="65"><img src="images/top-left.gif" width="329" height="65"></td>
    <td width="25%"><table width="100%" height="100%"  border="0" align="right" cellpadding="0" cellspacing="0">
      <tr>
        <td width="21%"><a href="#" onMouseOut="MM_swapImgRestore()" onMouseOver="MM_swapImage('Image4','','<%=request.getContextPath()%>/global/images/menu_01-over.gif',1)"><img src="<%=request.getContextPath()%>/global/images/menu_01.gif" alt="主页" name="Image4" width="44" height="65" border="0"></a></td>
        <td width="19%" onClick="loginout();"><a href="#" onMouseOut="MM_swapImgRestore()" onMouseOver="MM_swapImage('Image5','','<%=request.getContextPath()%>/global/images/menu_02-over.gif',1)"><img src="<%=request.getContextPath()%>/global/images/menu_02.gif" alt="注销" name="Image5" width="40" height="65" border="0"></a></td>
        <td width="20%"><a href="#" onMouseOut="MM_swapImgRestore()" onMouseOver="MM_swapImage('Image6','','<%=request.getContextPath()%>/global/images/menu_03-over.gif',1)"><img src="<%=request.getContextPath()%>/global/images/menu_03.gif" alt="登录" name="Image6" width="42" height="65" border="0"></a></td>
        <td width="12%" onClick="exit();"><a href="#" onMouseOut="MM_swapImgRestore()" onMouseOver="MM_swapImage('Image7','','<%=request.getContextPath()%>/global/images/menu_04-over.gif',1)"><img src="<%=request.getContextPath()%>/global/images/menu_04.gif" alt="退出" name="Image7" width="41" height="65" border="0"></a></td>
        <td width="9%"><a href="#" onMouseOut="MM_swapImgRestore()" onMouseOver="MM_swapImage('Image8','','<%=request.getContextPath()%>/global/images/menu_05-over.gif',1)"><img src="<%=request.getContextPath()%>/global/images/menu_05.gif" alt="技术支持" name="Image8" width="42" height="65" border="0"></a></td>
        <td width="9%" onClick="changePassword()"><a href="#" onMouseOut="MM_swapImgRestore()" onMouseOver="MM_swapImage('Image9','','<%=request.getContextPath()%>/global/images/menu_06-over.gif',1)"><img src="<%=request.getContextPath()%>/global/images/menu_06.gif" alt="修改密码" name="Image9" width="42" height="65" border="0"></a></td>
        <td width="10%" onClick="about();"><a href="#" onMouseOut="MM_swapImgRestore()" onMouseOver="MM_swapImage('Image10','','<%=request.getContextPath()%>/global/images/menu_07-over.gif',1)"><img src="<%=request.getContextPath()%>/global/images/menu_07.gif" alt="系统简介" name="Image10" width="45" height="65" border="0"></a></td>
      </tr>
    </table></td>
    <td width="32%"><div align="right"><img src="images/top-right.gif" width="336" height="65"></div></td>
  </tr>
</table>
<table width="100%" height="30"  border="0" align="center" cellpadding="0" cellspacing="0" background="images/menu-bg.gif">
  <tr>
    <td width="4%" height="30"><img src="images/menu-left.gif" width="35" height="30"></td>
    <td><div id="content"><span>版本:V3.05.01</span><span>用户名:<%=clientSession.getUserName()%></span><span>登录帐套:<%=clientSession.getAccSetName()%> &nbsp; <%=clientSession.getAccountYear()%></span></div></td>
  </tr>
</table>


</body>
</html>

<script language="javascript">
 function alterCss(type){//added by dgc
    var fontType=getFontCookie();
    if(fontType==type) return;
	
    alterCssType(parent,type);
	setFontCookie(type);
 }
</script>
