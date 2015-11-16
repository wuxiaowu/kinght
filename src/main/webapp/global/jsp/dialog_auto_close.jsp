<%@page language="java" contentType="text/html; charset=UTF-8"%>
<META HTTP-EQUIV="Pragma" CONTENT="no-cache">
<META HTTP-EQUIV="Cache-Control" CONTENT="no-cache">
<META HTTP-EQUIV="Expires" CONTENT="0"> 
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<script>
var result = {
		flag : true,
		value : <%=request.getParameter("result")%>
};
window.returnValue = result;
window.close();
</script>