<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=gb2312" />
    <title>PowerUP Store Of KnightOnline 2.0</title>
    <style type="text/css">
        body{margin:0;padding:0;font-family:arial;font-size:12px;}
        img{border:0;}
        a{text-decoration:none;}
        .a{background:#9b600c;color:#432a06;width:36px;height:21px;line-height:21px;display:block;text-align:center;}
        .a:hover{font-weight:bold;background:#73480a;color:#c9a978;}

        #nav{text-align:left;padding-left:40px;}
        #nav a{color:#fff;margin-right:1px;}

            /* hint */
        .hint{margin:0 auto;padding:5px 0;text-align:left;font-weight:bold;color:#250d01;}

            /* item list tbl */
        .listTbl{border-top:1px #9b600c solid;border-left:1px #9b600c solid;}
        .listTbl th,
        .listTbl td{border-bottom:1px #9b600c solid;border-right:1px #9b600c solid;color:#250d01;padding:3px 5px;text-align:center;}
        .listTbl th{font-weight:bold;background:#9b600c;}
        .listTbl .itemNote{text-align:left;padding-left:8px;line-height:130%;}

        .btn{width:71px;height:23px;line-height:23px;font-weight:bold;color:#d8bb8f;font-size:12px;font-family:arial;text-align:center;border:0;background:url(./images/btn.gif) no-repeat;margin:4px;}

            /* pager */
        #page table,
        #pager td{border:0;}
        #pager a{color:#ff0000;}
        #pager a:hover{text-decoration:underline;}

            /*userInfo */
        #pusInfo,
        #userInfo{color:#9b600c;text-align:left;}

            /* copyrights */
        #footer{font-size:10px;color:#9b600c;text-align:right;padding-right:20px;margin:0 auto;}
        #footer a{color:#9b600c;}
        #footer a:hover{text-decoration:underline;}
    </style>
    <script type="text/javascript">
        function addCart(itemid){
            if(itemid==''){
                return;
            }else{
                document.getElementById('ItemID').value=itemid;
                document.getElementById('ajaxForm').action='index.jsp?action=addcart';
                document.getElementById('ajaxForm').submit();
            }
        }
        function doPay(){
            var warehousePWD=prompt('请输入你仓库密码以继续操作：','');
            //if(warehousePWD!='undefined'&&warehousePWD!=''&&warehousePWD.length>=3){
            if(warehousePWD!=null&&warehousePWD!='undefined'&&warehousePWD!=''&&warehousePWD.length>=3){
                document.getElementById('warehousePWD').value=warehousePWD;
                document.getElementById('doBuy').disabled=true;
                document.getElementById('doBuy').value='请稍等…';
                document.getElementById('ajaxForm').action='index.jsp?action=dopay';
                document.getElementById('ajaxForm').submit();
            }else{
                alert('请输入正确的密码！');
                return false;
            }
        }
        function clickIE() {if (document.all) {(message);return false;}}
        function clickNS(e) {if
                (document.layers||(document.getElementById&&!document.all)) {
            if (e.which==2||e.which==3) {(message);return false;}}}
        if (document.layers)
        {document.captureEvents(Event.MOUSEDOWN);document.onmousedown=clickNS;}
        else{document.onmouseup=clickNS;document.oncontextmenu=clickIE;}
        document.oncontextmenu=new Function("return false")

    </script>
</head>
<body>
<div style="background:#000 url(./images/bg.jpg) left top no-repeat;">
    <table width="1024" border="0" cellspacing="0" cellpadding="0">
        <tr>
            <td height="115" colspan="4"></td>
        </tr>
        <tr>
            <td align="left" id="nav">
                <a href="index.jsp?sframe=mypus&itemtype=1" target="mypus"><img src="images/m_pusitem.gif" /></a><a href="index.jsp?sframe=mypus&itemtype=3" target="mypus"><img src="images/m_weapon.gif" /></a><a href="index.jsp?sframe=mypus&itemtype=4" target="mypus"><img src="images/m_accessories.gif" /></a><a href="points.jsp?strAccountID=strAccountID" target="mypus"><img src="images/m_points.gif" /></a><a href="shoppay.jsp?strAccountID=strAccountID" target="mypus"><img src="images/m_sb.gif" /></a>
            </td>
            <td align="left" width="300" id="userInfo" style="background:url(./images/userinfo_l.gif) center left no-repeat;"><span style="font-weight:bold;margin-left:10px;height:29px;line-height:28px;padding:8px 10px 5px 0;background:url(./images/userinfo.gif) center right no-repeat;">strAccountID / strUserID 的购物车</span></td>
        <tr>
        <tr>
            <td colspan="2" height="20"></td>
        </tr>
        <tr>
            <td height="495" align="center" valign="top" style="padding-top:25px;">
                <iframe id="mypus" name="mypus" height="515" width="615" scrolling="no" frameborder="0" allowTransparency="true" src="index.jsp?sframe=mypus"></iframe>
            </td>
            <td align="left" valign="top" style="padding:25px 0 0 40px;">
                <iframe id="mycart" name="mycart" height="500" width="195" scrolling="no" frameborder="0" allowTransparency="true" src="index.jsp?sframe=mycart"></iframe>
            </td>
        </tr>
        <tr>
            <td colspan="2" height="10"></td>
        </tr>
        <tr>
            <td colspan="2" id="footer">KnightOnline PowerUP Store</td>
        </tr>
    </table>
</div>

<div class="hint" style="width:590px;">声明：购买前请确定你身上有足够的空位，否则丢失物品概不负责！</div>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="listTbl" style="margin:0 auto;">
    <tr>
        <th height="20" width="50">图标</th>
        <th width="110">物品名称</th>
        <th width="350">相关说明</th>
        <th width="40">购点</th>
        <th width="40">操作</th>
    <tr>
    <tr>
        <td><img src="images/item/ItemImg.gif" onerror="javascript:this.src='images/item/nopic.gif';" width="46" height="46" /></td>
        <td>itemNote</td>
        <td class="itemNote">ItemNote</td>
        <td>ItemPoint</td>
        <td><a class="a" href="###" name="btnBuy" onclick="javascript:addCart(ItemID);">加入</a></td>
        </td>
    </tr>
    <tr>
        <td colspan="5" height="25" id="pager" style="text-align:right;padding-right:10px;"></td>
    </tr>
</table>
<table width="100%" border="0" cellspacing="0" cellpadding="0">
    <tr>
        <td height="450" valign="top">
            <div class="hint" style="width:190px;">
            </div>
            <table width="190" border="0" cellspacing="0" cellpadding="0" class="listTbl">
                <tr>
                    <th height="20" width="120">物品名称</th>
                    <th width="40">价格</th>
                    <th width="30">操作</th>
                </tr>
                <tr>
                    <td height="20">ItemName</td>
                    <td>ItemPoint</td>
                    <td><a class="a" href="index.jsp?action=delcart&id=ID">移除</a></td>
                </tr>
                <tr>
                    <td colspan="3" style="text-align:right;">购物车累计额：totalPrice</td>
                </tr>
            </table>
            <div style="text-align:right;width:120px;"><span style="text-align:left;width:100px;float:left;margin:8px auto;">您的余额：0</span><input type="button" class="btn" id="doBuy" value="确定购买" onclick="javascript:doPay();" /></div>
        </td>
    </tr>
    <tr>
        <td id="pusInfo">有任何问题，请与GMQQ联系。</td>
    </tr>
</table>
<form name="ajaxForm" id="ajaxForm" action="#" method="post" target="mycart">
    <input type="hidden" name="ItemID" id="ItemID" value="">
    <input type="hidden" name="warehousePWD" id="warehousePWD" value="">
</form>
</body>
</html>