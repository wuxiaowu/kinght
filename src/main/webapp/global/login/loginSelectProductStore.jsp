<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%> 
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<title>系统登录</title>
		<%@ include file="/global/head.jsp"%>
		<style type="text/css">
<!--
body {
	margin-left: 0px;
	margin-top: 0px;
	margin-right: 0px;
	margin-bottom: 0px;
	overflow: hidden;
}
-->
</style>	
		<script type="text/javascript" src="<%=basePath%>global/jquery/jquery-1.3.2.min.js"></script>
		<%
			String msg = (String) request.getAttribute("msg");
			if (msg != null) {
		%>
		<script type="text/javascript">
    		spAlert('<%=msg%>');
    	</script>
		<%
		}
		%>
		<script type="text/javascript">
        //回车登陆
        function keyLogin(e){
        	var proStoId=$('#proStoId option[selected]').val();
			if (e==13)   //回车键的键值为13
				document.forms[0].submit();
		}
        function submitForm(){
        	document.forms[0].submit();
        }
        $(function(jqObj){
        	$('#proStoId').focus();  
        	$('#proStoId').select();  
        });
    </script>

	</head>

	<body onkeydown="keyLogin(event.keyCode);">
			<table width="100%" height="100%" border="0" cellpadding="0"
				cellspacing="0">
				<tr>
					<td colspan="3" bgcolor="#1C4A89">
						&nbsp;
					</td>
				</tr>
				<tr>
					<td height="756"
						background="<%=baseUrl%>/pos/themes/image/login/login_side.png">
					</td>
					<td width="1285" height="756"
						background="<%=baseUrl%>/pos/themes/image/login/login_main.jpg">
						<table width="1285" border="0" height="100%" align="center"
							cellpadding="0" cellspacing="0">
							<tr>
								<td>
									<table width="100%" height="100%" border="0" cellpadding="0"
										cellspacing="0">
										<tr>
											<td width="478" height="338">
												&nbsp;
											</td>
											<td width="310">
												<form method="post" action="<%=baseUrl%>/login.do?method=posSetSelectProductStore">
												<table width="100%" border="0" cellspacing="0"
													cellpadding="0">
													<tr>
														<td height="194" colspan="3">&nbsp;</td>
													</tr>
													<tr>
														<td width="10%" height="30">&nbsp;</td>
														<td width="20%">门店:</td>
														<td width="65%" height="30">
															<select style="width:150px; " id="proStoId" name="proStoId">
																<c:forEach var="proStoList" items="${proStos}" varStatus="proSto" >
																	<option value="${proStoList.productStoreId}">
																		${proStoList.storeName}
																	</option>
																</c:forEach>
															</select>
														</td>
													</tr>
													<tr>
														<td height="154" colspan="3" align="center">
															<a href="#" onClick="submitForm();" style="cursor: pointer;"><img
																	src="<%=baseUrl%>/global/images/button.gif" border="0">
															</a>
														</td>
													</tr>
												</table>
											</form>
											</td>
											<td width="497">&nbsp;	</td>
										</tr>
									</table>
								</td>
							</tr>
						</table>
					</td>
					<td height="756"
						background="<%=baseUrl%>/themes/image/login/login_side.png">
					</td>
				</tr>
				<tr>
					<td bgcolor="#BCEDFA" colspan="3" height="100%">&nbsp;</td>
				</tr>
			</table>
		
	</body>
</html>