
<link rel="stylesheet" type="text/css" href="<%=baseUrl%>/global/scripts/ext/resources/css/ext-all.css"/><!-- ext用的CSS -->
<link rel="stylesheet" type="text/css" href="<%=baseUrl%>/global/scripts/ext/resources/css/xtheme-orange.css"/><!-- ext用的CSS -->
<link rel="stylesheet" type="text/css" href="<%=baseUrl%>/global/themes/default/styles/ext/ext-main.css"/> <!-- 针对ext的CSS的一些修改使页面更美观符合要求 -->

<script type="text/javascript" src="<%=baseUrl%>/global/js/global.js"></script><!-- 一些公用的JS方法，里面的一些方法没有经过该框架的设计者的验证，不建议使用，后期会扩展 TODO by aijs 扩展后删除该行注释！-->

<script src="<%=baseUrl%>/global/scripts/ext/adapter/ext/ext-base.js"></script><!-- ext的基础包 -->
<script src="<%=baseUrl%>/global/scripts/ext/ext-all.js"></script><!-- ext包 -->
<script src="<%=baseUrl%>/global/scripts/ext/src/locale/ext-lang-zh_CN.js"></script><!-- ext中文支持扩展 -->


<link rel="stylesheet" type="text/css" href="<%=baseUrl%>/global/scripts/extux/form/css/MultiSelect.css"/>
<script src="<%=baseUrl%>/global/scripts/extux/form/MultiSelect.js"></script>
<script src="<%=baseUrl%>/global/scripts/extux/form/ItemSelector.js"></script>

<script src="<%=baseUrl%>/global/scripts/ext/src/widgets/form/CheckboxGroup.js"></script><!-- 扩展一些Grid方法，如增加行，删除行…… -->
<script src="<%=baseUrl%>/global/scripts/ext/src/widgets/form/RadioGroup.js"></script><!-- 扩展一些Grid方法，如增加行，删除行…… -->

<script src="<%=baseUrl%>/global/scripts/extux/grid/PropertyGridUx.js"></script><!-- 扩展PropertyGrid -->
<script src="<%=baseUrl%>/global/scripts/extux/grid/EpiiGroupHeaderPlugin.js"></script><!-- 提供Ext多表头支持 -->
<script src="<%=baseUrl%>/global/scripts/extux/grid/CheckColumn.js"></script><!-- 提供ext grid checkboxColumn 支持 -->
<script src="<%=baseUrl%>/global/js/dateFormat.js"></script><!-- 日期格式化JS -->
<script src="<%=baseUrl%>/global/js/currencyFormat.js"></script><!-- 金额格式化JS -->
<script src="<%=baseUrl%>/global/js/validator.js"></script><!-- 验证框架 不建议使用 TODO by aijs 找到适合的验证方法后 去掉 -->
<script src="<%=baseUrl%>/global/js/IFrameComponent.js"></script>

<!-- treeGrid js 及 CSS -->
<link rel="stylesheet" type="text/css" href="<%=baseUrl%>/global/scripts/extux/treegrid/TreeGrid.css"/>
<script src="<%=baseUrl%>/global/scripts/extux/treegrid/TreeGrid.js"></script>
<script src="<%=baseUrl%>/global/scripts/extux/treeEditorGrid/TreeEditorGrid.js"></script>
<script src="<%=baseUrl%>/global/scripts/extux/treegrid/TreeGridPagingToolbar.js"></script>
<script src="<%=baseUrl%>/global/scripts/extux/treegrid/CheckboxSelectionModelForRelative.js"></script><!-- 该JS用于复选框的级联选择，还未验证 TODO by aijs 验证后去掉注释 -->

<script src="<%=baseUrl%>/global/scripts/extux/tree/TreeCheckNodeUI.js"></script><!-- tree的复选框 -->

<!-- 一些Ext的扩展方法 -->
<script src="<%=baseUrl%>/global/scripts/extux/ExtendGridMethod.js"></script><!-- 扩展一些Grid方法，如增加行，删除行…… -->
<script src="<%=baseUrl%>/global/scripts/extux/ExtendTreeGridMethod.js"></script><!-- 扩展一些TreeGrid方法，如增加行，删除行…… -->
<script src="<%=baseUrl%>/global/scripts/extux/ExtendTreeMethod.js"></script><!-- 扩展一些Tree方法，如增加行，删除行…… -->
<script src="<%=baseUrl%>/global/scripts/extux/ExtendAjax.js"></script><!-- 扩展ajax方法，进行错误处理…… -->

<script src="<%=baseUrl%>/global/scripts/extux/ext-extend-override.js"></script><!-- ext的一些方法的覆盖、扩展以及bug的修正。 -->


<script src="<%=baseUrl%>/global/scripts/extux/MultiComboBox.js"></script><!-- ext的一些方法的覆盖、扩展以及bug的修正。 -->


<script src="<%=baseUrl%>/global/scripts/checktree/Validate.js"></script><!-- ext的一些方法的覆盖、扩展以及bug的修正。 -->
<script src="<%=baseUrl%>/global/scripts/ext/examples/ux/DateTimeFieldNoSecond.js"></script><!-- ext的一些方法的覆盖、扩展以及bug的修正。 -->



<link rel="stylesheet" type="text/css" href="<%=baseUrl%>/global/scripts/extux/form/css/Spinner.css"/>
<script type="text/javascript" src="<%=baseUrl%>/global/scripts/ext/examples/ux/Spinner.js"></script>
<script type="text/javascript" src="<%=baseUrl%>/global/scripts/ext/examples/ux/SpinnerField.js"></script>
<script type="text/javascript" src="<%=baseUrl%>/global/scripts/extux/DateTimeField.js"></script>
<script src="<%=baseUrl%>/global/js/infodialog.js"></script>
<script type="text/javascript">
    Ext.BLANK_IMAGE_URL = '<%=baseUrl%>/global/scripts/ext/resources/images/default/s.gif';
    Ext.Ajax.timeout=300000;
    Ext.QuickTips.init();
</script>