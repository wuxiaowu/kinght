<%@page language="java" contentType="text/html; charset=UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
"http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<title>查找</title>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<META HTTP-EQUIV="Pragma" CONTENT="no-cache">
<META HTTP-EQUIV="Cache-Control" CONTENT="no-cache">
<META HTTP-EQUIV="Expires" CONTENT="0"> 
<link href="<%=request.getContextPath()%>/global/css/layout.css" rel="stylesheet" type="text/css">
<script src='<%=request.getContextPath()%>/global/scripts/contextPath.jsp'></script>
<script src='<%=request.getContextPath()%>/global/scripts/global.js'></script>
</head>

<body class="bodyspace" onload="init()">
<!--页面内容区域-->
<form onsubmit="return false;">
<table width="320px"   border="0" align="left"  valign="top" cellpadding="0" cellspacing="0" >
  <tr>
  	<td align="left" valign="top">
	  <!-- 表单内容 start -->
	
	<fieldset class="fieldset_first">
			    <table width="100%"  border="0" align="center" cellpadding="3" cellspacing="0" >
				  <tr align="left">
					<td width="100px"  align="right" class="fieldLabelNeeded">* 查找：</td>
					<td width="200"><input name="queryString"  type="text" class="textinput" style="width: 180px;"></td>
				  </tr>
				  <tr align="left">
					<td width="100px"  align="right" >
						<input id="byName" type="radio" name="infoName" value="searchName"></td>
					<td width="200"><label for="byName">按名称查找</label></td>
				  </tr>
				  <tr align="left">
					<td width="100px"  align="right" >
						<input id="byCode" type="radio" name="infoName" value="searchCode"></td>
					<td width="200"><label for="byCode">按编码查找</label></td>
					
				  </tr>
				 <tr align="left">
					<td width="100px"  align="right" >
						<input id="byPinyin" type="radio" disabled name="infoName" value="searchPinyin"></td>
					<td width="200" style="color:#cccccc"><label for="byPinyin">按汉字拼音首字母查找</label></td>
					
				  </tr>
 
				</table>
				
		</fieldset>
	</td>
  </tr>
  <tr>
      <td align="center" valign="top"> 
        <div id="buttongrouparea" >
	        <div id="div1" style="display:block;">
		        <input id="next" type="button" class="blueButtonCss" value=" 下一个 " onclick="onNext()" style="margin-right: 15px;"/>
				<input id="search" type="button" class="bluebutton" value="  确 定  " onclick="onOK()" style="margin-right: 15px;">
				<input type="button" class="cancelbutton" onclick="onCancel()" value="  取 消  ">
			</div>
	        <div id="div2" style="display:none;">
				<input id="search" type="button" class="bluebutton" value="  停止搜索  " onclick="onStop()" style="margin-right: 15px;">
				<input type="button" class="cancelbutton" onclick="onCancel()" value="  退 出  ">
			</div>
    	</div>
	</td>
  </tr>
</table>
 </form>

<script>
	var nameBtn = null;
	var codeBtn = null;
	var pinyinBtn = null;
	var tree = null;
	var callback = null;
	
	function init(){
		var f = document.forms[0];
		nameBtn = o("byName");
		codeBtn = o("byCode");
		pinyinBtn = o("byPinyin");
		
		var args = null;
		if(window.opener)
			args = opener.searchArgs;
		else
			args = window.dialogArguments;
		if(args){
			tree = args.tree;
			callback = args.callback;
			if(args.queryString != null)
				f.queryString.value = args.queryString;
			if(args.infoName == nameBtn.value)
				nameBtn.checked = true;
			else if(args.infoName == pinyinBtn.value)
				pinyinBtn.checked = true;
			else if(args.infoName == codeBtn.value)
				codeBtn.checked = true;
			else
				nameBtn.checked = true;
			if(args.found == true)
				o("next").focus();
			else
				f.queryString.focus();
		}else{
			nameBtn.checked = true;
			f.queryString.focus();
		}
	}
	
	var ret = {};
	window.returnValue = ret;
	
	function submit(){
		var f = document.forms[0];
		if(f.queryString.value==''){
			ret.flag = false;
			spAlert('请输入查找内容!');
			return;
		}
		ret.queryString = f.queryString.value;
		if(nameBtn.checked)
			ret.infoName = nameBtn.value;
		else if(codeBtn.checked)
			ret.infoName = codeBtn.value;
		else if(pinyinBtn.checked)
			ret.infoName = pinyinBtn.value;
		else{
			ret.flag = false;
			spAlert('请选择查找方式!');
			return;
		}
		//alert(ret.queryString + "\n" + ret.infoName + "\n" + ret.next + "\n" + ret.flag);
		op(ret);
		//window.close();		
	}
	
	function onOK(){
		ret.next = false;
		ret.flag = true;
		submit();
	}
		
	function onNext(){
		ret.next = true;
		ret.flag = true;
		submit();
	}
	
	function onCancel(){
		tree.stopSearch();
		window.returnValue = null;
		window.close();
	}
	function onStop(){
		o("div1").style.display = "";
		o("div2").style.display = "none";
		tree.stopSearch();
	}
	
	function o(id){
		return document.getElementById(id);
	}
	
	function op(ret){
		var node = null;
		var queryString  = ret.queryString;
		var infoName = ret.infoName;
		var next = ret.next;
		o("div1").style.display = "none";
		o("div2").style.display = "";
		if(next==true && queryString==tree.searchBean.queryString && infoName==tree.searchBean.infoName && tree.searchBean.current!=null){
	//		alert("next one!\n" + queryString + "\n" + infoName);
			tree.findNext(foundNotify);
		}else{
	//		alert("find first one!\n" + queryString + "\n" + infoName);
			tree.searchBean.queryString = queryString;
			tree.searchBean.infoName = infoName;
			tree.searchBean.searchWindow = window;
			tree.search(queryString, infoName, foundNotify);
		}
	}
	function foundNotify(node){
		o("div1").style.display = "";
		o("div2").style.display = "none";
		tree.searchBean.current = node;
		if(node!=null){
			if(typeof(callback)=='function')
				callback(node);
			else
				node.show();
		}else{
			try{
				spAlert('没有找到!');
			}catch(e){
				alert("没有找到!");
			}
		}
	}
	window.onunload = function(){
		try{
			tree.stopSearch();
		}catch(e){
		}
	}
</script> 
</body>
</html>