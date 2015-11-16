<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=gb2313" />
    <title>KnightOnline pay</title>
    <meta name="content" content="ko" />
    <meta name="description" content="骑士2.0商城" />
    <meta name="keywords" content="骑士2.0商城" />
    <meta name="author" content="ko" />
    <style type="text/css">
            /*全局*/
        body{margin:0;padding:0;font-family:arial;font-size:12px;}
        img{border:0;}
        a{text-decoration:none;}
        .a{background:#9b600c;color:#432a06;width:36px;height:21px;line-height:21px;display:block;text-align:center;}
        .a:hover{font-weight:bold;background:#73480a;color:#c9a978;}

            /* hint */
        .hint{margin:0 auto;padding:5px 0;text-align:left;font-weight:bold;color:#250d01;}
        .info{text-align:left;}
        .info em{color:green;}

            /* item list tbl */
        .listTbl{border-top:1px #9b600c solid;border-left:1px #9b600c solid;}
        .listTbl th,
        .listTbl td{border-bottom:1px #9b600c solid;border-right:1px #9b600c solid;color:#250d01;padding:3px 5px;text-align:center;}
        .listTbl th{font-weight:bold;background:#9b600c;}

        #intro{text-align:left;padding:30px;line-height:200%;}
        #intro strong{color:green;}

        #lnk{padding:20px;}
        #lnk a{color:#865328;padding:8px 50px;background:#fffae5;border:3px #c15811 solid;}
        #lnk a:hover{background:#a24100;color:#fff;}

        .info{text-align:left;margin:10px;line-height:160%;}
        .info span{color:green;font-weight:bold;}
        .info em{color:red;font-weight:bold;}

    </style>

</head>
<body>
<div style="text-align:center;">
    <div class="hint" style="width:590px;">
        <strong>欢迎<em>［strUserID］</em>，你当前的购点余额为<em id="cp">［xxx］</em>。</strong><br />
    </div>

    <table width="98%" border="0" cellspacing="0" cellpadding="0" class="listTbl">
        <tr>
            <th width="180" height="24">在线充值</th>
        </tr>
        <tr>
            <td id="intro"><strong>充值说明：</strong><br />
                《骑士》是一个免费的网络游戏，运营小组不会强制性收取任何费用，我们本着免费的精神为大家提供一个良好的游戏环境，
                同时我们也接受来自玩家朋友们的赞助，由此产生的收益将主要用于游戏的运营和维护以及日常开销。
                玩家的每一笔赞助都会让游戏更久远！<br />
                <br />目前支持网上银行（包括信用卡），中国移动神州行充值卡，淘宝支付宝以及人工汇款方式充值。
                <br />如果您在充值过程中产生错误或已付款未能及时收到购点等情况，请联系客服<br />

        </tr>
        <tr>
            <td height="50">


                <strong style="color:green;">当前充值比例为：1人民币＝1购点

                </strong>

            </td>
        </tr>
        <tr>
            <td id="lnk">
                <a href="" target="_blank">联系客服充值</a>
            </td>
        </tr>
    </table>
    <form id="theForm" name="theForm" method="post">
        <input type="hidden" name="action" value="do" />
    </form>
</div>
<%--<%response.write("<script>alert('"&msg&"');</script>")%>--%>
<script>
    <%--document.getElementById('cp').innetHTML='<%=userPoint(strAccountID,AccountDB)%>';--%>
    document.getElementById('CJ').style.display='';
</script>
</body>
</html>