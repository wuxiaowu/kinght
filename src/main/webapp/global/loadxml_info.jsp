<%@ page language="java" contentType="text/html; charset=UTF-8"%>
<%@ page import="java.util.*,com.bjhdf.domain.*"%>
<%@ taglib uri="/tags/struts-bean" prefix="bean" %>
<%@ taglib uri="/tags/struts-logic" prefix="logic" %>
<%@taglib uri="/tags/struts-html" prefix="html"%>
<%@taglib uri="/tags/spsoft" prefix="sp" %>
<%
/**
*
*@deprecated since 2010-9-8
*
*/
	String baseUrl = request.getContextPath();
    response.setHeader("Cache-Control", "no-cache");
    response.setDateHeader("Expires", 0);
    response.setHeader("Pragma", "No-cache");
%>
<html>

<head>

<title>选取保存过的过滤xml文件</title>
<META http-equiv=Content-Type content="text/html; charset=UTF-8">
<META HTTP-EQUIV="pragma" CONTENT="no-cache">
<META HTTP-EQUIV="Cache-Control" CONTENT="no-cache, must-revalidate">
<link href="<%= baseUrl%>/global/css/layout.css" rel="stylesheet" type="text/css">
<base target="_self"/>
</head>

<body>
   <center>
<%
  List fieldList =(List)request.getAttribute("fieldList");
  List sqlValueList=(List)request.getAttribute("sqlValueList");
  List viewValueList=(List)request.getAttribute("viewValueList");
  if (fieldList ==null || sqlValueList == null || viewValueList == null){
%>
<script>
function fnreturn(){
   document.forms[0].submit();
}
</script>
     您选得是无效的过滤条件文件，<br/>
    请选择保存有效的过滤条件xml文件！
    <form method="post" action="<%=baseUrl%>/currencySearchAction.do?method=selfile">
    <input type="button" onclick="fnreturn()" value="返回"/>
    </form>
     

<%}else{%>
<script>
var returnObj=new Array();
var fieldArr=new Array();
var titleArr=new Array();
var typeArr=new Array();
var jsArr=new Array();
var jsCodeArr=new Array();
var sqlArr=new Array();
var viewArr=new Array();
<%
for (int i=0;i<fieldList.size();i++){
  TableField temp=(TableField)fieldList.get(i);
  out.println("fieldArr["+i+"]=\""+temp.getId()+"\";");
  out.println("titleArr["+i+"]=\""+temp.getTitle()+"\";");
  out.println("typeArr["+i+"]=\""+temp.getDataType()+"\";");
  out.println("jsArr["+i+"]=\""+temp.getDataJS()+"\"");
  out.println("jsCodeArr["+i+"]=\""+temp.getJsCode()+"\";");
}
for (int i=0;i<sqlValueList.size();i++){
 out.println("sqlArr["+i+"]=\""+((String)sqlValueList.get(i))+"\";");
}
for (int i=0;i<viewValueList.size();i++){
  out.println("viewArr["+i+"]=\""+((String)viewValueList.get(i))+"\";");
}
%>
returnObj[0]=fieldArr;
returnObj[1]=titleArr;
returnObj[2]=typeArr;
returnObj[3]=jsArr;
returnObj[4]=jsCodeArr;

returnObj[5]=sqlArr;
returnObj[6]=viewArr;
//function fnsubmit(){
  window.returnValue=returnObj;
  self.close();
//}
</script>
    <input type="button" onclick="fnsubmit()" value="关闭"/>
<%}%>
   </center>
</body>

</html>
