<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
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
        /**
         * 登录
         */
        function login(){
        	if(validateUserInfo()){
				  document.forms[0].submit(); 
			}
        }
		//验证用户名和密码是否输入
		function validateUserInfo(){
			var userName=document.getElementById("username").value;
			var password=document.getElementById("password").value;
			if(userName.trim().length==0){
				spAlert("请输入用户名！");
				return false;
			}
			if(password.trim().length==0){
				spAlert("请输入密码！");
				return false;
			}
			return true;
		}
        //回车登陆
        function keyLogin(e){
        	var password=document.getElementById("password").value;
			if (e==13 && password.trim().length>0)   //回车键的键值为13
        		login(); //调用登录按钮的登录事件
		}
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
												<form method="post" action="<%=baseUrl%>/login.do?method=login">
												<table width="100%" border="0" cellspacing="0"
													cellpadding="0">
													<tr>
														<td height="194" colspan="3">&nbsp;</td>
													</tr>
													<tr>
														<td width="15%" height="30">&nbsp;</td>
														<td width="20%">用户名</td>
														<td width="65%" height="30">
															<input type="text" id="username" name="username"
																value=""
																style="height: 18px; width: 130px; border: solid 2px #CACEDB; font-size: 12px;">
														</td>
													</tr>
													<tr>
														<td height="30">
															&nbsp;

														</td>
														<td height="30">
															密&nbsp;&nbsp;&nbsp;&nbsp;码
														</td>
														<td height="30">
															<input type="password" id="password" name="password"
																value=""
																style="height: 18px; width: 130px; border: solid 2px #CACEDB; font-size: 12px;">
														</td>
													</tr>
													<tr>
														<td height="154" colspan="3" align="center">
															<a href="#" onClick="login();" style="cursor: pointer;"><img
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