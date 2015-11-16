<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<%@ taglib uri="/tags/struts-html" prefix="html" %>
<%
   	Object t = null;
   	//tomcat
   	if (t==null){
   		t = request.getAttribute("javax.servlet.error.exception");
   	}
    //weblogic
    if (t==null){
        t = request.getAttribute("javax.servlet.jsp.jspException");
    }
    if (t instanceof Throwable){
	    //Exception ex = com.accumulation.framework.util.ExceptionUtils.convertException((Throwable)t);
	    //update by wuc 2011-11-29
	    Exception ex = com.brainlong.framework.util.ExceptionUtils.convertException((Throwable)t);
	    request.setAttribute("FRAMEWORK.SERVICE.ERROR",ex);
    }else{
    	System.out.println(t.toString());
    }
%>
<jsp:forward page="/global/systemError.jsp"/>
