<%@page language="java" contentType="text/html; charset=UTF-8" %>
<%@taglib uri="/tags/struts-logic" prefix="logic" %>
<%@ page import="com.brainlong.framework.exception.ServiceException" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <%@ include file="/global/head.jsp" %>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <style media="screen" type="text/css">
        body {
            background: #f2f9ff url(<%=baseUrl%>/global/images/bg_blankimage.jpg) no-repeat center center;
        }
    </style>
</head>
<body>
<logic:present name="BJHDF.SERVICE.ERROR">
    <script>
        <%
            ServiceException ex = (ServiceException)request.getAttribute("BJHDF.SERVICE.ERROR");
            String message = null;
            String stackMessage = null;
            if(ex!=null){
            	//update by wuc 2011-11-29
            	message = com.brainlong.framework.util.ExceptionUtils.translateBreakLine(ex.getMessage());
                stackMessage = com.brainlong.framework.util.ExceptionUtils.translateBreakLine( ex.getStackTraceMessage());
            }
            if(message!=null){
                if (stackMessage!=null){
                    out.println("setTimeout(\"spError('"+message+"','"+stackMessage+"')\",500)");
                }else{
                    out.println("setTimeout(\"spAlert('"+message+"')\",500)");
                }
            }
        %>
    </script>
</logic:present>
</body>
</html>
