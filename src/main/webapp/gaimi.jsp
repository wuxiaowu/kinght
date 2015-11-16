<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=gb2312"/>
    <title>阿尔德林武士</title>
    <link href="style.css" rel="stylesheet" type="text/css">
    <%@ include file="common/analytics.jsp"%>
    <script type="text/javascript">
        function setDisplay(obj) {
            if (document.getElementById(obj).style.display == 'none') {
                document.getElementById(obj).style.display = 'block';
            } else {
                document.getElementById(obj).style.display = 'none';
            }
        }
    </script>
    <script type="text/javascript">
        function doCheck() {
            if (document.getElementById('strAccountID').value != '' && document.getElementById('strPassWD').value != '' && document.getElementById('newPassWD').value != '' && document.getElementById('validator').value != '') {
                if (document.getElementById('strAccountID').value.length >= 4 && document.getElementById('strPassWD').value.length >= 4 && document.getElementById('newPassWD').value.length >= 4) {
                    if (document.getElementById('strPassWD').value != document.getElementById('rePassWD').value) {
                        alert('两次输入的密码不一致或长度不符！');
                        return false;
                    } else {
                        if (document.getElementById('newPassWD').value == document.getElementById('strAccountID').value) {
                            alert('安全起见，请不要把密码和ID设成一样！');
                            return false;
                        } else {
                            document.getElementById('theForm').action = 'gaimi.jsp?action=do';
                            return true;
                        }
                    }
                } else {
                    alert('检测到表单内容填写不完整或太短,请重新填写！');
                    return false;
                }
            } else {
                alert('检测到表单内容填写不完整！');
                return false;
            }
        }
        function reloadcode() {
            document.getElementById('vcode').src = 'validator.jsp?' + Math.floor(Math.random() * 100);
        }

        var message = "";
        function clickIE() {
            if (document.all) {
                (message);
                return false;
            }
        }
        function clickNS(e) {
            if
                    (document.layers || (document.getElementById && !document.all)) {
                if (e.which == 2 || e.which == 3) {
                    (message);
                    return false;
                }
            }
        }
        if (document.layers) {
            document.captureEvents(Event.MOUSEDOWN);
            document.onmousedown = clickNS;
        }
        else {
            document.onmouseup = clickNS;
            document.oncontextmenu = clickIE;
        }
        document.oncontextmenu = new Function("return false")
    </script>
</head>
<body>
<div id="main">
    <table width="978" border="0" cellspacing="0" cellpadding="0" style="border:1px #a1a1a1 solid;border-top:0;">
        <tr>
            <td width="218" align="center" valign="top"
                style="background:url(images/leftbg.gif) center bottom no-repeat;">
                <table width="100%" border="0" cellspacing="0" cellpadding="0"
                       style="background:url(images/lefttop.jpg) 10px top no-repeat;">
                    <tr>
                        <td height="130">&nbsp;</td>
                    </tr>
                    <tr>
                        <td id="leftnav" align="center" valign="top">
                            <a href="./" title="首页">网站首頁<span>Home of KO</span></a>
                            <a href="./zhuce.jsp" title="账号注册">账号注册<span>Register Now</span></a>
                            <a href="./gaimi.jsp" title="修改密码">修改密码<span>Change PWD</span></a>
                            <a href="./gongxian.jsp" title="贡献排行">贡献排行<span>Loyalty Rank</span></a>
                            <a href="./chongzhi.jsp" title="自助充值">自助充值<span>Rechange</span></a>
                            <a target="_blank" href="http://wpa.qq.com/msgrd?v=1&uin=2375044853&site=qq&menu=yes"
                               title="联系GM">联系GM<span>Contact GM</span></a>
                        </td>
                    </tr>
                </table>
            </td>
            <td rowspan="2" align="center" valign="top">
                <table width="760" border="0" cellspacing="0" cellpadding="0">
                    <tr>
                        <td align="center"><img src="images/top.gif"></td>
                    </tr>
                    <tr>
                        <td id="subnav">
                            <a href="" target="_blank" style="border-left:1px #cdcdcd solid;">客户端网盘下载</a><a href=""
                                                                                                            target="_blank">登陆器网盘下载</a><a
                                href="" target="_blank">多核必打补丁</a><a href="" target="_blank">新披风补丁</a>
                        </td>
                    </tr>
                    <tr>
                        <td align="center"><img src="images/index.jpg" title="" alt=""/></td>
                    </tr>
                    <tr>
                        <td id="page" height="492" align="center" valign="top">
                            <table width="100%" border="0" cellspacing="0" cellpadding="0" id="mailTbl">
                                <tr>
                                    <td class="txt">

                                        <form id="theForm" name="theForm" method="post" action="gaimi.jsp?action=do"
                                              onsubmit="return doCheck()">
                                            <table width="100%" border="0" cellspacing="0" cellpadding="0" id="theTbl">
                                                <tr>
                                                    <td colspan="3" height="45" class="note">
                                                        提示：为防账号被盗，请不要使用类似123456的简单密码，经常改密码是个好习惯。
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td colspan="3" height="1" bgcolor="#bcbdc1"></td>
                                                </tr>
                                                <tr>
                                                    <td height="45" width="80">用户账号：</td>
                                                    <td width="256"><input type="text" name="strAccountID"
                                                                           id="strAccountID" class="input"/></td>
                                                    <td width="354" class="hint"></td>
                                                </tr>
                                                <tr>
                                                    <td colspan="3" height="1" bgcolor="#bcbdc1"></td>
                                                </tr>
                                                <tr>
                                                    <td height="45" width="80">原始密码：</td>
                                                    <td><input type="password" name="strPassWD" id="strPassWD"
                                                               class="input"/></td>
                                                    <td class="hint">长度12字符以内</td>
                                                </tr>
                                                <tr>
                                                    <td colspan="3" height="1" bgcolor="#bcbdc1"></td>
                                                </tr>
                                                <tr>
                                                    <td height="45" width="80">新的密码：</td>
                                                    <td><input type="password" name="newPassWD" id="newPassWD"
                                                               class="input"/></td>
                                                    <td class="hint">长度12字符以内</td>
                                                </tr>
                                                <tr>
                                                    <td colspan="3" height="1" bgcolor="#bcbdc1"></td>
                                                </tr>
                                                <tr>

                                                    <td height="45" width="80">验证之码：</td>
                                                    <td><input type="text" name="validator" id="validator" class="input"
                                                               maxlength="5" style="width:50px;"/> <img
                                                            onClick="JavaScript:reloadcode();" style="cursor:hand;"
                                                            id="vcode" src="validator.jsp?.7055475" border="0"
                                                            alt="如看不清,请点击刷新." align="absmiddle"/></td>
                                                </tr>
                                                <tr>
                                                    <td colspan="3" height="1" bgcolor="#bcbdc1"></td>
                                                </tr>
                                                <tr>
                                                    <td height="45">&nbsp;</td>
                                                    <td width="170"><input type="image" src="images/btn-gaimi.gif"
                                                                           style="cursor:pointer;"/></td>
                                                    <td>&nbsp;</td>
                                                </tr>
                                            </table>
                                        </form>
                                        <%--<div id='msg' style="text-align:left;font-weight:bold;padding:10px 50px;"><%=msg%></div>--%>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</div>
</form>
</body>
</html>

