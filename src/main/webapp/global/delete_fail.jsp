<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<%@ taglib uri="/tags/struts-html" prefix="html" %>
<%@ taglib uri="/tags/struts-bean" prefix="bean" %>
<%@ taglib uri="/tags/struts-logic" prefix="logic" %>
<html>
<head>
	<META http-equiv=Content-Type content="text/html; charset=UTF-8">
	<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/global/css/global.css" media="screen"/>
</head>

<table height="100%" width="100%">
<tr><td valign="top"  class="errors">
您不能删除该对象,因为在其它数据仍然有对它的引用.
</td></tr>
</table>
</html>
