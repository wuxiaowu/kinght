<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=gb2313" />
    <title>KnightOnline Points Exchange</title>
    <meta name="content" content="stroe" />
    <meta name="description" content="2.0商城" />
    <meta name="keywords" content="2.0商城" />
    <meta name="author" content="Slleo,slleo@qq.com" />
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

        .info{text-align:left;margin:10px;line-height:160%;}
        .info span{color:green;font-weight:bold;}
        .info em{color:red;font-weight:bold;}

            /*分页*/
            /* pager */
        #pager table,
        #pager td{border:0;}
        #pager a{color:#ff0000;}
        #pager a:hover{text-decoration:underline;}


    </style>
    <script language="JavaScript">
        <!--
        function addCart(eid){
            if(eid){
                if(confirm('确定要兑换将该物吗？\n\n兑换后你的积分点值将被扣除\t')){
                    document.getElementById('eid').value=eid;
                    document.getElementById('ajaxForm').action='points.jsp?strAccountID=xx>&action=doexchange';
                    document.getElementById('ajaxForm').submit();
                }
            }
        }

        var message="";
        function clickIE() {if (document.all) {(message);return false;}}
        function clickNS(e) {if
                (document.layers||(document.getElementById&&!document.all)) {
            if (e.which==2||e.which==3) {(message);return false;}}}
        if (document.layers)
        {document.captureEvents(Event.MOUSEDOWN);document.onmousedown=clickNS;}
        else{document.onmouseup=clickNS;document.oncontextmenu=clickIE;}
        document.oncontextmenu=new Function("return false")

        -->
    </script>
    <style type="text/css">
        #btn-cart{height:30px;line-height:30px;width:150px;text-align:center;font-size:14px;font-weight:bold;background:#a56d10;display:block;text-decoration:none;color:#fff;}
    </style>
</head>
<body>
<div style="text-align:center;">
    <div class="hint" style="width:590px;">
        <%--<strong>欢迎<em>［<%=strUserID%>］</em>，你累计在线时间长<em>［<%=myPoint(strAccountID,1,AccountDB)%>］</em>/积分值为<em id="myPoint">［<%=myPoint(strAccountID,2,AccountDB)%>］</em>分/点。</strong><br />--%>
            <strong>欢迎<em>［xx］</em>，你累计在线时间长<em>［xx］</em>/积分值为<em id="myPoint">［xx］</em>分/点。</strong><br />
    </div>

    <table width="100%" border="0" cellspacing="0" cellpadding="0" class="listTbl">
        <tr>
            <th width="80" height="24">物品名称</th>
            <th align="left">相关说明</th>
            <th width="35">积分</th>
            <th width="35">贡限</th>
            <th width="35">时限</th>
            <th width="35">剩余</th>
            <th width="35">操作</th>
        </tr>
        <tr>
            <td height="23">itemName</td>
            <td style="text-align:left;">itemNote</td>
            <td>ItemPoint</td>
            <td>Loyalty</td>
            <td>TimeLimit</td>
            <td>ItemCount</td>
            <td><a onclick="addCart('1>')" href="###" class="a">兑换</a></td>
        </tr>
        <tr>
            <td colspan="7" id="pager">00</td>
        </tr>
    </table>
</div>
<form name="ajaxForm" id="ajaxForm" action="#" method="post" target="postFrm">
    <input type="hidden" name="eid" id="eid" value="">
</form>
<iframe id="postFrm" name="postFrm" height="0" width="0" scrolling="no" frameborder="0" src="about:blank"></iframe>
</body>
</html>