<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=gb2312"/>
    <title>阿尔德林武士</title>
    <meta name="keywords" content=" www.201374.com, ">
    <meta name="description" content=" www.201374.com, ">
    <link href="style.css" rel="stylesheet" type="text/css">
    <%@ include file="common/analytics.jsp"%>
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
                        <td align="center"><img src="images/top_gongxian.gif"/></td>
                    </tr>
                    <tr>
                        <td align="center">
                            <div id="subnav">
                                <a target="_self" href="./gongxian.jsp?stype=total">总贡榜</a><a target="_self"
                                                                                              href="./gongxian.jsp?stype=human">人族月贡</a><a
                                    target="_self" href="./gongxian.jsp?stype=karus">兽族月贡</a><a target="_self"
                                                                                                href="./gongxian.jsp?stype=human">人族总贡</a><a
                                    target="_self" href="./gongxian.jsp?stype=karus">兽族总贡</a><a target="_self"
                                                                                                href="./gongxian.jsp?stype=clanmloyalty">军团总贡榜</a><a
                                    target="_self" href="./gongxian.jsp?stype=clanmloyalty">军团月贡榜</a>
                            </div>

                            <style>
                                .loyalTbl {
                                    border-top: 1px #d2c6b0 solid;
                                    border-left: 1px #d2c6b0 solid;
                                    margin: 8px auto;
                                }

                                .loyalTbl th,
                                .loyalTbl td {
                                    border-right: 1px #d2c6b0 solid;
                                    border-bottom: 1px #d2c6b0 solid;
                                    text-align: center;
                                }

                                .loyalTbl th {
                                    font-weight: bold;
                                    background: #f0e7d5;
                                }
                            </style>
                            <!--#include file="config1.jsp"-->
                        <td class="txt">
                            <table width="90%" border="0" cellspacing="0" cellpadding="0" class="list">
                                <tr>

                                    <th height="25" width="60">N</th>
                                    <th width="30">标志</th>
                                    <th width="200">军团名称</th>
                                    <th>团长</th>
                                    <th width="80">人数</th>
                                    <th width="80">总贡</th>
                                </tr>
                                <tr bgcolor='#e1dbce'>
                                    <td height="23"></td>
                                    <td height="23">
                                        <img src="images/top-1.gif"/>
                                    </td>
                                    <td>q</td>
                                    <td>w</td>
                                    <td>w</td>
                                    <td>k</td>
                                </tr>
                            </table>
                            <table width="90%" border="0" cellspacing="0" cellpadding="0" class="list">
                                <tr>


                                    <th height="25" width="62">N</th>
                                    <th width="364">人物名称</th>
                                    <th width="102">国家</th>
                                    <th width="421">经验值</th>
                                    <th width="149">声望值</th>
                                    <th width="101">总贡献</th>
                                </tr>
                                <tr bgcolor='#FFFFFF'>
                                    <td height="23">q</td>
                                    <td>struserid</td>
                                    <td><img src="images/race-.gif"/></td>
                                    <td>exp</td>
                                    <td>MannerPoint</td>
                                    <td>loyalty</td>
                                </tr>
                            </table>
                            <table width="90%" border="0" cellspacing="0" cellpadding="0" class="list">
                                <tr>
                                    <th height="25" width="60">N</th>
                                    <th width="30">标志</th>
                                    <th width="150">军团名称</th>
                                    <th>团长</th>
                                    <th width="50">人数</th>
                                    <th width="80">月贡</th>
                                    <th width="80">总贡</th>
                                </tr>
                                <tr bgcolor='#d8d7d5'>
                                    <td height="23">1</td>
                                    <td height="23">
                                        <img src="images/.gif"/>
                                    </td>
                                    <td>1%></td>
                                    <td>2</td>
                                    <td>3</td>
                                    <td>4</td>
                                    <td>5</td>
                                </tr>
                            </table>
                            <table width="90%" border="0" cellspacing="0" cellpadding="0" class="list">
                                <tr>


                                    <th height="25" width="60">N</th>
                                    <th width="364">人物名称</th>
                                    <th width="102">国家</th>
                                    <th width="100">月贡</th>
                                    <th width="100">总贡</th>
                                </tr>
                                <tr bgcolor='#d8d7d5'>
                                    <td height="23">1</td>
                                    <td>struserid</td>
                                    <td>Nation</td>
                                    <td>loyaltymonthly</td>
                                    <td>nloyalty</td>
                                </tr>
                            </table>
                            <table width="90%" border="0" cellspacing="0" cellpadding="0" class="list">
                                <tr>


                                    <th height="25" width="40">N</th>
                                    <th width="30">标志</th>
                                    <th>角色名称</th>
                                    <th>所属军团</th>
                                    <th width="40">国家</th>
                                    <th width="40">级别</th>
                                    <th width="80">月贡</th>
                                    <th width="80">总贡</th>
                                </tr>
                                <tr bgcolor='#d8d7d5'>
                                    <td height="23">1</td>
                                    <td height="23">
                                        <img src="images/royal-top-1.gif"/>
                                    </td>
                                    <td>strUserId</td>
                                    <td>IDName</td>
                                    <td>Nation</td>
                                    <td>Level</td>
                                    <tdLoyaltyMonthly
                                    </td>
                                    <td>Loyalty</td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td height="20"></td>
                    </tr>
                </table>

        <tr>
            <td height="20"></td>
        </tr>
    </table>
    <div style="display:none;">
        <script src="http://s3.cnzz.com/stat.php?id=2020027&web_id=2020027" language="JavaScript"></script>
    </div>
</div>
</body>
</html>