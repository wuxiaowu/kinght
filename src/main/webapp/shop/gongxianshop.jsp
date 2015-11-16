<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=gb2312" />
    <title>续忆骑士贡献商城</title>

    <%--<%@ include file="/global/head.jsp"%>--%>
    <script type="text/javascript" src="<%=basePath%>global/jquery/jquery-1.3.2.min.js"></script>
    <script type="text/javascript" src="<%=basePath%>global/jquery/jquery-ajax.js"></script>
    <script type="text/javascript" src="<%=basePath%>global/jquery/json2.js"></script>

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

        .btn{width:71px;height:23px;line-height:23px;font-weight:bold;color:#d8bb8f;font-size:12px;font-family:arial;text-align:center;border:0;background:url(images/btn.gif) no-repeat;margin:4px;}

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
        function loadItemList(){
            jQuery.ajax({
                type : "POST",
                async : false,
                cache : false,
                url : "<%=basePath%>api/kinght/gongxian/list.json",
                dataType:'json',
                success : function(obj){
                    if(obj.success){
                      var list=obj.result.list;
                        var itemListHtml = "";
                        for (var i = 0; i < list.length; i++) {
                            itemListHtml += "<tr>";
                            itemListHtml += " <td> <img src='images/item/" + list[i].ItemID + ".gif' onerror=\"javascript:this.src='images/item/nopic.gif';\" width='46' height='46' /></td>";
                            itemListHtml += "<td>" + list[i].ItemName + "</td>";
                            itemListHtml += "<td class='itemNote'>" + list[i].ItemNote + "</td>"
                            itemListHtml += "<td>100</td>"
                            itemListHtml += "<td><input type='button' class='btn' id='doBuy' value='确定购买' onclick='javascript:doPay();' /></td>";
                            itemListHtml += "</td>";
                            itemListHtml += "</tr>";
                        }
                        jQuery("#itemsTbody").html(itemListHtml);
                    }
                  console.log(obj);
                }

              });
        }
        function addCart(itemid){
            if(itemid==''){
                return;
            }else{
                document.getElementById('ItemID').value=itemid;
                document.getElementById('ajaxForm').action='index.asp?action=addcart';
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
                document.getElementById('ajaxForm').action='index.asp?action=dopay';
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
<body onload="loadItemList()">
<div class="hint" style="width:590px;">声明：购买前请确定你身上有足够的空位，否则丢失物品概不负责！有任何问题，请及时与GM联系。</div>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="listTbl" style="margin:0 auto;">
    <tr>
        <th height="20" width="50">图标</th>
        <th width="110">物品名称</th>
        <th width="350">相关说明</th>
        <th width="40">贡献</th>
        <th width="40">操作</th>
    <tr>

    <tr>
        <%--<td><img src="images/item/119101101.gif" onerror="javascript:this.src='images/item/nopic.gif';" width="46" height="46" /></td>--%>
        <%--<td>小刀</td>--%>
        <%--<td class="itemNote">可以砍人</td>--%>
        <%--<td>100</td>--%>
        <%--<td><input type="button" class="btn" id="doBuy" value="确定购买" onclick="javascript:doPay();" /></td>--%>
        <%--</td>--%>

    </tr>
    <tbody id="itemsTbody">
    <tr>
        <td colspan="5" height="25" id="pager" style="text-align:right;padding-right:10px;"></td>
    </tr>
</table>

<form name="ajaxForm" id="ajaxForm" action="#" method="post" target="mycart">
    <input type="hidden" name="ItemID" id="ItemID" value="">
    <input type="hidden" name="warehousePWD" id="warehousePWD" value="">
</form>
</body>
</html>