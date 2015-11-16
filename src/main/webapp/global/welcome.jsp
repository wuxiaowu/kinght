<%@page language="java" contentType="text/html; charset=UTF-8"%>
<%
/**
 *
 *打开弹出窗口
 *
 */
String url=request.getContextPath()+"/login.do?method=forwardLoginJsp";
%>
<HTML>
<HEAD>
<TITLE>居元素专卖POS系统</TITLE>
<%@ include file="/global/head.jsp"%>
<META http-equiv=Content-Type content="text/html; charset=UTF-8">
</HEAD>

<body>
<script>
<%
//if(false){

	if(true) {


			String msg = (String) request.getAttribute("msg");
			if (msg != null) {
		%>
    		spAlert('<%=msg%>');
		<%
		}
		%>

		x=screen.availWidth;
		y=screen.availHeight-32;
		if(window!=top) {
			top.location="<%=url%>";
		} else {
			var x=window.open("<%=url%>","","width="+x+",height="+y+",top=0,left=0,resizable=yes");
			opener=null;
			if(x) {
				window.close();
				}
			else {
				alert("浏览器禁用弹出窗口，系统不能在新窗口显示。");
				top.location="<%=url%>";
			}
		}
	<%} else {%>
		top.location="<%=url%>";
	<%}
//}
%>
</script>
</body>
  
</HTML>
