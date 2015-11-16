<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
Long time = System.currentTimeMillis();
%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%> 
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<title>系统门店选择</title>
		<meta http-equiv="Pragma" content="no-cache"/> 
	    <meta http-equiv="Cache-Control" content="no-cache"/> 
	    <meta http-equiv="Expires" content="0"/> 
		<%@ include file="/global/head.jsp"%>
		<style type="text/css">
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
        	var proStoId=$('#proStoId').val();
			if (e==13)   //回车键的键值为13
			selectProductStore(proStoId);
		}
		
        function submitForm(){
        	var proStoId=$('#proStoId').val();
        	selectProductStore(proStoId);
        }
        
        function selectProductStore(proStoId){
        	var url = '<%=baseUrl%>/login.do?method=psiToPosOrderSaveProductStore&proStoId='+proStoId+"&time="+<%=time%>;
			window.open(url,"","left=0,top=0,height=1000px,width=1300px,toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, status=no");
			window.close();
        }
        
      	function selectProductStoreCallBack(json){
			window.showModalDialog('<%=baseUrl%>/pos/sinoglass/order/showPosOrderHeaderForSG.do?method=loadPosOrderHeaderQueryParameters',"","dialogLeft=0;dialogTop=0;dialogHeight=1000px;dialogWidth=1300px");
			window.close();
		}
        $(function(jqObj){
        	$('#proStoId').focus();  
        	$('#proStoId').select();  
        });

    </script>

	</head>

	<body onkeydown="keyLogin(event.keyCode);">
		<form method="post" action="<%=baseUrl%>/login.do?method=posSetSelectProductStore">
			<center>
			<table width="100%;" height="300px" border="0" cellspacing="0" cellpadding="0" >
				<tr>
					<td>请选择门店</td>
				</tr>
				<tr>
					<td>
						门店 :<select style="width:150px; " id="proStoId" name="proStoId">
							<c:forEach var="proStoList" items="${proStos}" varStatus="proSto" >
								<option value="${proStoList.productStoreId}">
									${proStoList.storeName}
								</option>
							</c:forEach>
						</select>
					</td>
				</tr>
				<tr>
					<td>
						<a href="#" onClick="submitForm();" style="cursor: pointer;"><img
								src="<%=baseUrl%>/global/images/button.gif" border="0">
							</a>
						</td>
					</tr>
			</table>
			</center>
		</form>
	</body>
</html>