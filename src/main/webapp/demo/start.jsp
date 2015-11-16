<%@ page import="java.util.HashMap" %>
<%@ page import="com.kinght.web.security.RSAUtils" %>
<%@ page import="java.security.interfaces.RSAPublicKey" %>
<%@ page import="java.security.interfaces.RSAPrivateKey" %>
<%--
  Created by IntelliJ IDEA.
  User: Administrator
  Date: 15-10-8
  Time: 下午8:01
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title></title>
    <script src="../js/security.js" type="text/javascript"></script>
</head>
<%
    HashMap<String, Object> map = RSAUtils.getKeys();
    //生成公钥和私钥
    RSAPublicKey publicKey = (RSAPublicKey) map.get("public");
    RSAPrivateKey privateKey = (RSAPrivateKey) map.get("private");

    session.setAttribute("privateKey", privateKey);//私钥保存在session中，用于解密

    //公钥信息保存在页面，用于加密
    String publicKeyExponent = publicKey.getPublicExponent().toString(16);
    String publicKeyModulus = publicKey.getModulus().toString(16);
    request.setAttribute("publicKeyExponent", publicKeyExponent);
    request.setAttribute("publicKeyModulus", publicKeyModulus);
%>
<script>
    function test(){
    RSAUtils.setMaxDigits(256);
    var key = new RSAUtils.getKeyPair("${publicKeyExponent}", "", "${publicKeyModulus}");
    var pwd1="加密测试";
    pwd1 = encodeURIComponent(pwd1);
    alert(pwd1);
    var encrypedPwd = RSAUtils.encryptedString(key,pwd1);
    window.location.href="http://localhost:8088/kinght/api/kinght/demo/test2?p1="+encrypedPwd
    }
</script>
<body onload="test()">

   hello !
  <%=request.getParameter("p1")%>

</body>
</html>