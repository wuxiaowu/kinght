<%@ page language="java" pageEncoding="utf-8"%>
<%@page import="com.dc.sys.domain.SysUser;"%>
<%@taglib uri="/WEB-INF/tlds/ext.tld" prefix="ext"%>
<%
	String svnVersion="4492";
	String lastUpdate="2010-11-01 16:29";
%>
<html>
	<TITLE>数据中心</TITLE>
	<head>
		<%@ include file="/global/head.jsp"%><!-- ext用的CSS -->
		<link rel="stylesheet" type="text/css" href="<%=baseUrl%>/global/css/MyTree.css"/><!-- 个性化的tree使用的gif -->
		<script type="text/javascript">
    
    	function onready(){
    	sysFunctionDemoTree.on("beforeload",beforeload);
    	centerContentTab.on("tabchange",tabchange);
    	}
    	function tabchange(tab,tabchange){

				if(tabchange.title=="最近使用的报表")
				{
					var url=""+getContextPath();
					url=url+"/report/showReport.do?method=showRecentlyUsedReportListJsp";
					var wid=document.getElementById(tabchange.id+"Frame");
					if(wid){
						wid.src=url;
					}
				}
				if(tabchange.title=="所有报表")
				{
					var url=""+getContextPath();
					url=url+"/report/showReport.do?method=showAllReportListJsp";
					var wid=document.getElementById(tabchange.id+"Frame");
					if(wid){
						wid.src=url;
					}
				}
				
				
		}
    	
    
    	function beforeload(node){
    		
			var nodeId=node.attributes.functionId;
			var tempCond={};
			tempCond.functionId=nodeId;
			sysFunctionDemoTree.getLoader().baseParams=tempCond;
    	}
    
        function  showFunctionPageOnCenterContent(node,event){
            if(node.hasChildNodes()) return;
            //document.getElementById("centerContentIframe").src = '<%=baseUrl%>' + node.attributes.url;
            var newTabSrc =  '<%=baseUrl%>' + node.attributes.url;
            var newTabId =  node.attributes.functionId;
            var title = node.attributes.functionName;
            centerContentTab.add({
                xtype:'panel',
                html:'<iframe src ="'+ newTabSrc +'" height="100%" width="100%"></iframe>',
                id:newTabId,
                title:title,
                labelSeparator:'',
                closable:true
            });
            centerContentTab.activate(Ext.getCmp(newTabId));
        }
        //用户注销
        function logout(){
        	var operateCallback = function(jsonResult){
					if(jsonResult.success == true){
						spAlert("用户注销成功!");
						window.location.href="<%=baseUrl%>/login/login.jsp";
					}else{
						spAlert("用户注销失败，失败原因：" + jsonResult.errorMsg);
						return;
					}
				}
			cond={};
			if(spConfirm('您确定要退出吗?')) {
        		<ext:ajaxRequest action="/login.do?method=logout" baseParams="cond" callback="operateCallback"/>  
        	}
        }
        //修改密码
        function changePassword(){
        	//现实修改密码窗口
        	changePassword.show();
        }
        
	/**
	 * fileUrl panel的url地址
	 * extWindowConfig的参数，以{
					            id: 'busDistrictsTypePanel_iframe',
					            layout:"fit",
					            title:fname,
					            width:800,
					            height:600,
					            modal:true,
					            shim:false,
					            animCollapse:false,
					            constrainHeader:true
					           }
					    的方式填写
		return 返回生成的window对象			    
	 */
	 var tmpWindow;
	 function getWindow(){
	 	return tmpWindow;
	 }

	 var desktopLoadHTML=function(fileUrl,extWindowConfig,window) {
	 	tmpWindow = window;
		var panel = new Ext.Panel({
			closable : true,
			autoScroll : false,
			autoShow:true,
		    layout:'fit',
		     // add iframe as the child component
		    items: [ new Ext.ux.IFrameComponent({ id: extWindowConfig.id, url: fileUrl }) ]
		});
		var win =new Ext.Window(extWindowConfig);
		win.add(panel);
		win.show();
		panel.show();
		return win;
	}
	
	
        
    
    </script>

	</head>
	<body
		style="background: url(<%=baseUrl%>/global/images/beijing.jpg); margin: 0px; padding: 0px;">
		<div id="topLogo" >
			<table width="100%" border="0" cellpadding="0" cellspacing="0"
				height="100%" >
				<tr>
					<td align="left">
						<img src="<%=baseUrl%>/global/images/bannerLeft.jpg">
					</td>
					<td align="center">
						<img src="<%=baseUrl%>/global/images/bannerCenter.jpg">
					</td>
					<td align="right">
						<img src="<%=baseUrl%>/global/images/bannerRight.jpg">
					</td>
				</tr>
			</table>
		</div>
	</body>


	<%
		String navigatorURL = "/sys/showFunction.do?method=queryRoleFunctionTree";
		SysUser userInfo = (SysUser) session.getAttribute("userInfo");
		String chineseName = "";
		String englishName = "";
		if (userInfo != null) {
			chineseName = userInfo.getCn();
			englishName = userInfo.getEn();
		}
		if (null == englishName) {
			englishName = "";
		}
		
	%>

	
<ext:tree name="sysFunctionDemoTree"
          action="<%= navigatorURL %>"
          region="west"
          rootId="0"
          rootName="菜单功能树"
          rootVisible="false"
          split="true"
          width="200"
          collapsible="true"
          click="showFunctionPageOnCenterContent"
          title="数据管理中心"
          bodyStyle="padding:10px;"
          autoScroll="true"/>

	<ext:toolbar id="mainToolbar" name="mainToolbar" buttonAlign="right"
		>
		<ext:toobarItem text='<%="用户：" + chineseName%>' itemType="label"></ext:toobarItem>
		<ext:split />
		<ext:toobarItem
			text='&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'
			itemType="label"></ext:toobarItem>
		<ext:toobarItem text="注销" iconCls="choose" click="logout"></ext:toobarItem>
		<ext:toobarItem text="修改密码" iconCls="change" click="changePassword"></ext:toobarItem>
	</ext:toolbar>

	<ext:panel id="top" name="top" region="north" height="90"
		contentEl="topLogo" bodyStyle="background-color:white;"
		bbar="mainToolbar"></ext:panel>
	<ext:tab id="centerContentTab" name="centerContentTab" region="center"
		split="true">
		<%if((Boolean)request.getAttribute("HomePageFlag")){ %>
			<ext:panel id="storeChart" hidden="true" iframeId="storeChartFrame" name="storeChart" title="门店期间分析" url="/sys/chartParameter.do?method=showStoreChartMainJsp"/>
			<ext:panel id="productChart" hidden="true" iframeId="productChartFrame" name="productChart" title="产品期间分析" url="/sys/chartParameter.do?method=showProductChartMainJsp"/>
			<ext:panel id="areaSellChart" hidden="true" iframeId="areaSellChartFrame" name="areaSellChart" title="门店" url="/sys/chartParameter.do?method=showChartMainJsp"/>
			<ext:panel id="goodSellChart" hidden="true" iframeId="goodSellChartFrame" name="goodSellChart" title="产品" url="/sys/chartParameter.do?method=showChartGoodsJsp"/>
		<%}%>
		<ext:panel id="recentlyUsedReport" name="recentlyUsedReport" iframeId="recentlyUsedReportFrame"
			title="最近使用的报表"
			url="/report/showReport.do?method=showRecentlyUsedReportListJsp" />
		<ext:panel id="allReport" name="allReport" title="所有报表" iframeId="allReportFrame"
			url="/report/showReport.do?method=showAllReportListJsp" />
	</ext:tab>
	

		
	<script type="text/javascript">
		var bottomPanel = new Ext.Panel(
		 {
		 html:'<div align="center" style="background-color: #B4D7EA;height:20px;text-align:center;padding-top:10px; ">'
		 	+'COPYRIGHT (C) 2010-2015 上海智龙'
		 	+' 版本:<%=svnVersion%> 最后更新:<a href="<%=baseUrl%>/help/readme.html" target="_blank" alt="察看更新历史"><%=lastUpdate%></a>'
		 	+'</div>',
		  region:'south',
		  id:'bottomPanel',
		  height:'20px'    
		 }
		);
	</script> 

	
	<ext:panel id="contentPanel" name="contentPanel" layout="border"  region="center" split="true" bodyStyle="background: url(global/images/beijing.jpg);">
		<ext:panel id="LcontentPanel" name="LcontentPanel" region="west" width="50"  bodyStyle="background: url(global/images/beijing.jpg);"></ext:panel>
		<ext:panel id="CcontentPanel" name="CcontentPanel" region="center" layout="border" items="sysFunctionDemoTree,top,centerContentTab,bottomPanel"  bodyStyle="background: url(global/images/beijing.jpg);"></ext:panel>
		<ext:panel id="RcontentPanel" name="RcontentPanel" region="east" width="50" bodyStyle="background: url(global/images/beijing.jpg);"></ext:panel>
	</ext:panel>
	<ext:borderViewport items="contentPanel"
		onready="onready">
		
		</ext:borderViewport>
	<ext:window name="changePassword" id="changePassword"
		url="/global/changePassword.jsp" title="密码修改" width="350" height="160"></ext:window>
	<script src="<%=baseUrl%>/global/scripts/footExt.js"></script>
</html>
