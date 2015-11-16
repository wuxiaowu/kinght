<%@ page language="java" pageEncoding="UTF-8"%>
<%@taglib uri="/WEB-INF/tlds/ext.tld" prefix="ext" %>
<html>
	<head>
		<%@ include file="/global/head.jsp"%>
		<style type="text/css">
		.x-btn button {
			color:#000000;
			}
		</style>
		<script type="text/javascript">
			function onready(){
				//为修改密码窗口添加show处理事件
				parent.changePassword.addListener("show",afterShow);
			}
			//修改密码窗口的现实后方法
			function afterShow(){
				//清空form内容
				changePasswordPanel.getForm().reset();
			}
			//确认修改密码操作
			function okSubmit(){
				var oldPwd = userInfDetail.get("oldPwd").getValue().trim();
				var newPwd = userInfDetail.get("newPwd").getValue().trim();
				var conformPwd = userInfDetail.get("conformPwd").getValue().trim();
				if(oldPwd==null || oldPwd==""){
					spAlert("请输入原密码!");
					return;
				}
				else if(newPwd==null || newPwd==""){
					spAlert("请输入新密码!");
					return;
				}
				else if(newPwd.length<4){
					spAlert("密码长度不能小于4位!");
					return;
				}
				else if(oldPwd==newPwd){
					spAlert("新密码与原密码相同,请确认!");
					return;
				}
				else if(conformPwd==null || conformPwd==""){
					spAlert("请再输入一次确认新密码!");
					return;
				}
				else if(newPwd!=conformPwd){
					spAlert("新密码与确认新密码不一致，请重输!");
					changePasswordPanel.getForm().setValues(
					{
						newPwd:"",
						conformPwd:""
					});
					return;
				}
				var operateCallback = function(jsonResult){
					if(jsonResult.success == true){
						if(jsonResult.domainInfo==null){
							spAlert("密码修改成功!");
						}else{
							spAlert("登录超时，请重新登录！");
							window.location.href="<%=baseUrl%>/login/login.jsp";
						}
						parent.changePassword.hide();
					}else{
						spAlert("密码修改失败，失败原因：" + jsonResult.errorMsg);
						return;
					}
				}
				var cond = {};
				cond.oldPwd = oldPwd;
				cond.newPwd = newPwd;
				<ext:ajaxRequest action="/sys/performUserManager.do?method=changePassword" baseParams="cond" callback="operateCallback"/>  
			}
			//关闭修改密码窗口
			function close(){
				parent.changePassword.hide();
			}
		</script>
	</head>
	
	<body></body>
	<ext:toolbar name="topToolbar" id="topToolbar">
		<ext:toobarItem iconCls="ok" text="确定" click="okSubmit"/>
		<ext:toobarItem iconCls="close" text="关闭" click="close"/>
   	</ext:toolbar>
   	
   	<ext:form name="changePasswordPanel"  id="changePasswordPanel"
						region="center" 
						height="80" 
						labelWidth="100" 
						collapsible="false" 
   						split="false"
   						buttonAlign="center"
   						width="200" 
   						>
   		<ext:fieldSet id="userInfDetail" name="userInfDetail" title="" height="150" bodyStyle="padding:10px;">
			<ext:field name="oldPwd" id="oldPwd" fieldLabel="原  密  码"   inputType="password"></ext:field>
			<ext:field name="newPwd" id="newPwd" fieldLabel="新  密  码"   inputType="password"></ext:field>
			<ext:field name="conformPwd" id="conformPwd" fieldLabel="确认新密码" inputType="password"></ext:field>
			<ext:array parentConfigOptionKey="buttons">
                <ext:config text="确定" click="okSubmit"/>
                <ext:config text="取消" click="close"/>
            </ext:array>
		</ext:fieldSet>
	</ext:form>
	
	<ext:borderViewport items="changePasswordPanel" onready="onready"/>
	
	<script src="<%=baseUrl%>/global/scripts/footExt.js"></script>
</html>