<%@page language="java" contentType="text/html; charset=UTF-8" import="com.bjhdf.framework.security.ClientSession"%>
<%@taglib uri="/tags/struts-html" prefix="html"%>
<%@taglib uri="/tags/struts-logic" prefix="logic"%>
<%
/**
*
*@deprecated since 2010-9-8
*
*/

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
<script>
	window.close();
</script>
</html>