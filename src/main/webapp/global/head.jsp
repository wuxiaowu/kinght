<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
<!-- 下面三个属性是否要设定需要深入了解并验证  验证后去掉注释-->
<META HTTP-EQUIV="Pragma" CONTENT="no-cache">
<META HTTP-EQUIV="Cache-Control" CONTENT="no-cache">
<META HTTP-EQUIV="Expires" CONTENT="0">

<%String baseUrl = request.getContextPath();%>
<link rel="stylesheet" type="text/css" href="<%=baseUrl%>/global/themes/default/base.css"/><!-- 基本的CSS -->
<script type="text/javascript" src="<%=baseUrl%>/global/contextPath.jsp"></script><!--取得当前的context路径用于js中的一些普通请求 或 ajax 请求路径的构建 -->
<script type="text/javascript" src="<%=baseUrl%>/global/js/global.js"></script><!-- 一些公用的JS方法，里面的一些方法没有经过该框架的设计者的验证，不建议使用，后期会扩展 TODO by aijs 扩展后删除该行注释！-->
<script src="<%=baseUrl%>/global/scripts/jquery/jquery.pack.js"></script><!-- jquery js包 -->
<script type="text/javascript" src="<%=baseUrl%>/global/scripts/jquery/plugins/jquery.dimensions.pack.js"></script><!-- jquery的扩展包 用于取得窗口的宽度 或 高度 -->

<script src="<%=baseUrl%>/global/js/dateFormat.js"></script><!-- 日期格式化JS -->
<script src="<%=baseUrl%>/global/js/currencyFormat.js"></script><!-- 金额格式化JS -->
<script src="<%=baseUrl%>/global/scripts/checktree/Validate.js"></script><!-- ext的一些方法的覆盖、扩展以及bug的修正。 -->
<script type="text/javascript">
</script>
