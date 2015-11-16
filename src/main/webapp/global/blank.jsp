<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <%@taglib uri="/WEB-INF/tlds/ext.tld" prefix="ext" %>
    <%@ include file="/global/head.jsp" %>
    <%
        String url = request.getParameter("openURL");
        String width = request.getParameter("openWidth");
        String height = request.getParameter("openHeight");
    %>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <ext:window width="<%=width%>" height="<%=height%>" name="openWindow" id="window" title="" url="<%=url%>"/>
    <script>
        var onloadHandle = function() {
            var url = "<%=request.getParameter("openURL")%>";
            if (url == "null")
                return;
            openWindow.show();
        }
    </script>
    <style media="screen" type="text/css">
        body {
            background: #f2f9ff url(images/bg_blankimage.jpg) no-repeat center center;
        }
    </style>
</head>
<body onload="onloadHandle()">
</body>
</html>
