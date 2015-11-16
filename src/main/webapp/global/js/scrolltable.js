/***************************************************************************
 * ScrollTable
 * Copyright(c) 2007
 * 
 * 用法：
 *    var stables=ScrollTable.install([
 *              {tableId:"id1",lockedCols:2,footerRows:2},
 *              {tableId:"id2",lockedCols:2},
 *              {tableId:"id3",footerRows:1},
 *              {tableId:"id4"}
 *         ]);
 *
 *    或
 *    var stable=ScrollTable.setup({tableId:"id1",lockedCols:2,footerRows:2});
 * 
 * 参数说明：
 * 1. tableId:被处理的表格id(必选)
 * 2. lockedCols:需要锁定的列数(可选)
 * 3. footerRows:底部固定的行数(可选)
 * 
 * 4. containerBgColor:容器背景颜色(可选)
 * 5. lockedColsBgColor:锁定列单元格背景颜色(可选)
 * 6. cellBgColor:主表单元格背景颜色(可选)
 * 7. cellPadding:单元格边距(可选)
 * 8. cellBorderColor:单元格边框颜色(可选)
 * 9. cellBorderWidth:单元格边框宽度(可选)
 *10. hideTextOverflow:是否隐藏单元格溢出的字符(可选)
 *11. widthResizable：是否可改变列宽(可选)
 *
 * 返回值：生成的ScrollTable对象数组
 *
 * 可能用到的属性说明(被拆分成的几个表格)：
 *                 cornerTopTable:
 *                 headerTable:头部表格对象
 *                 leftTable:被锁定列的表格对象
 *                 centerTable:主表格对象
 *                 cornerBottomTable:
 *                 footerTable:固定底部的表格对象
 *  ________________________________________________________
 *  | cornerTopTable     |            headerTable          |
 *  |--------------------|---------------------------------|
 *  |                    |                                 |
 *  |                    |                                 |
 *  |                    |                                 |
 *  |  leftTable         |            centerTable          |
 *  |                    |                                 |
 *  |                    |                                 |
 *  |                    |                                 |
 *  |--------------------|---------------------------------|
 *  |_cornerBottomTable__|____________footerTable__________|
 * 
 * 
 * 注意：1. a.必须在colgroup中设定每列的宽度.
 *          b.列宽度用数值表示时，表格中不需要设宽度
 *          c.列宽度用百分比表示时，如果表格中未设宽度，则默认为100%
 *      2.colgroup必须放在table标签的下面，thead标签的上面
 *      3.去掉html文档头部"http://www.w3.org/TR/html4/loose.dtd"
 *      4.表格中的标签之间不能添加注释<!-- -->以及其它非表格元素
 *      5.浏览器：IE6.0
 *      6.初始化ScrollTable时须将被处理的表格显示出来,否则最后显示效果会出现问题
 *
 *
 * Dai.G.C 2006-12-31
 * 修改记录:
 *    2007-5-9,解决:表格超过10列时,列宽度拖动时出错的问题
 *    2007-5-10,增加锁定列部分可以合并列功能
 ***************************************************************************/
 
ScrollTable=function(param){
  this.tableId=param.tableId;
  this.lockedCols=param.lockedCols;
  this.footerRows=param.footerRows;
  
  this.containerBgColor=param.containerBgColor;
  this.lockedColsBgColor=param.lockedColsBgColor;
  this.cellBgColor=param.cellBgColor;
  this.cellPadding=param.cellPadding;
  this.cellBorderColor=param.cellBorderColor;
  this.cellBorderWidth=param.cellBorderWidth;
  this.hideTextOverflow=param.hideTextOverflow;
  this.widthResizable=param.widthResizable;
  
  
  with(this){
 //=======初始化========
  if(!init()){return;}

//=======创建各部分====
   //createWinForWait();
   createContainer();
   createHeader();
   createCornerTop();
   createFooterAndCornerBottom();
   createCenterAndLeft();    

//====窗口大小改变时改变滚动条的显示====
   attachEvent("onresize",function(){
						   configOnResize();
						});
  }
}

//======属性=======
ScrollTable.prototype={
  tableId:null,
  table:null,
  tableWidthType:null,//table宽度类型
  tablePercentWidthNum:null,
  NUMBER:1,
  PERCENT:2,
  colsArray:[], 
  
  tableClassName:null,
  containerBgColor:null,
  lockedColsBgColor:null,
  cellPadding:null,
  cellBorderColor:null,
  cellBorderWidth:null,
  
  lockedCols:null,//锁定的列数
  footerRows:null,//底部固定的行数
  
  hideTextOverflow:null,//是否隐藏溢出的字符(true|false)
  widthResizable:null,//是否可以改变列宽(true|false)
  
  parent:null,//
  container:null,
  
  header:null,
  headerTD:null,
  headerTable:null,
  
  center:null,
  centerTD:null,
  centerTable:null,
  
  cornerTop:null,
  cornerTopTD:null,
  cornerTopTable:null,
  
  left:null,
  leftTD:null,
  leftTable:null,
  
  cornerBottom:null,  
  cornerBottomTD:null,  
  cornerBottomTable:null,  
  
  footer:null,
  footerTD:null,
  footerTable:null,
  
  blankHeader:null,
  blankLeft:null,
  blankFooter:null,

  winForWait:null,
  
  doc:null//document对象
    
 }

/*
 * init
 */
ScrollTable.prototype.init=function(){
  with(this){
  //==doc==
  doc=document;
  //===table===
  table=doc.getElementById(this.tableId);
  if(!table){alert("ScrollTable: no table with id <"+tableId+"> found!");return false;}
  if(table.align==""){
     table.align="left";
  }

  //==parent=====
  parent=table.parentNode;
  
  //===width=====
  if(!calculateWidth()){return false;}
  
  return true;
  }
}

/*
 *calculateWidth判断宽度设置的正确与否
 */
ScrollTable.prototype.calculateWidth=function(){
  with(this){
	var colgroup=table.firstChild;
	var cols=colgroup.childNodes;
	var length=cols.length;
	var percentPat=/^[1-9]\d*%$/;
	var numberPat=/^[1-9]\d*$/;
	var getNumPat=/^[1-9]\d*/;
	var percentNumTotal=0;
	var prevWidthType=null;
	var currWidthType=null;
    var tableWidth=table.currentStyle.width;
    var tableWidthNew=null;

    for(var i=0;i<length;i++){
		var col=cols[i];
		var width=col.width;
		var pencentNum=null;
		//==判断宽度设置是否正确===
		if(percentPat.test(width)){
			currWidthType=PERCENT;//当前是百分比型
		}else if(numberPat.test(width)){
			currWidthType=NUMBER; //当前是数值型
		}else{
			alert("ScrollTable:列宽度设置错误！");
			return false;//两者都不是
		}
		if(prevWidthType&&currWidthType!=prevWidthType){
			alert("ScrollTable:列宽度只能全部设为数值或全部设为百分比！");
			return false;//当前类型和前一个不同，说明设置有误
		}
		//==================
		prevWidthType=currWidthType;
		if(currWidthType==NUMBER){continue;}//如果是数值型，则不需要执行下列语句
		//===============
	    //===计算百分比总和是否正确====
		pencentNum=width.replace("%","");
        percentNumTotal+=pencentNum*1;
		if(percentNumTotal>100){
			alert("ScrollTable:列宽度百分比总和不能超过100%！");
			return false;
		}
		
	    //=====复制col=========
		colsArray[i]=pencentNum;

        //通过百分比计算宽度
		if(!tableWidthNew){
		   if(tableWidth=="auto"){table.width="100%";tableWidth="100%";}
		   if(percentPat.test(tableWidth)){
			   tableWidthType=PERCENT;
			   tablePercentWidthNum=tableWidth.replace("%","");
               tableWidthNew=table.clientWidth;
		    }else{
			   tableWidthType=NUMBER;
			   tableWidthNew=tableWidth.match(getNumPat);
			}
		}
		//重新设定每列宽度
		col.width=parseInt(tableWidthNew*pencentNum/100);
	}
	if(currWidthType==PERCENT&&percentNumTotal!=100){//最后再计算一次百分比是否正确
			alert("ScrollTable:列宽度百分比总和不能低于100%！");
			return false;
	}
	return true;
  }
}


/*
 * createWinForWait
 */
ScrollTable.prototype.createWinForWait=function(){
  with(this){
	  winForWait=doc.createElement("DIV");
	  winForWait.style.position="absolute";
	  winForWait.style.width=244;
	  winForWait.style.height=99;
	  winForWait.style.left=(parent.clientWidth-244)/2;
	  winForWait.style.top=(parent.clientHeight-99)/2;
	  var img=new Image();
	  img.src="../global/images/bg_fixedtableloading2.gif";
	  winForWait.style.background='url("'+img.src+'")';
      ScrollTable.addChild(parent,winForWait);
  }
}


/*
 * createContainer
 */
ScrollTable.prototype.createContainer=function(){
with(this){
var containerHTML=
"<table width=\"100%\" height=\"100%\" bgcolor=\""+containerBgColor+"\"  border=\"0\" cellspacing=\"0\" cellpadding=\"0\">"+
      "<tr><td id=\""+this.tableId+"_1\" width=\"1\"></td><td id=\""+this.tableId+"_2\"></td></tr>"+
      "<tr><td id=\""+this.tableId+"_3\"  height=\"100%\"></td><td id=\""+this.tableId+"_4\" height=\"100%\"></td></tr>"+
      "<tr><td id=\""+this.tableId+"_5\"></td><td id=\""+this.tableId+"_6\"></td></tr>"+
"</table>";

  parent.insertAdjacentHTML("AfterBegin",containerHTML);
  container=parent.firstChild;

  if(hideTextOverflow)
     setupHideTextOverflow();
  
  cornerTopTD=eval(this.tableId+"_1");
  headerTD=eval(this.tableId+"_2");
  leftTD=eval(this.tableId+"_3");
  centerTD=eval(this.tableId+"_4");
  cornerBottomTD=eval(this.tableId+"_5");
  footerTD=eval(this.tableId+"_6");
 }
}

/*
 * createHeader
 */
ScrollTable.prototype.createHeader=function(){
with(this){
	var header=doc.createElement("DIV");
	header=header;
	header.style.width="100%";
	header.style.overflow="hidden";
	ScrollTable.addChild(headerTD,header);//append
	
	//===hederTable===
	headerTable=doc.createElement("TABLE");
	setCommTableAttris(headerTable)//设置共同属性
	headerTable.height="100%";
	headerTable.align="left";
	ScrollTable.addChild(header,headerTable);//append
	
	//==colgroup===
	var sourceColgroup=table.firstChild;
	var colgroup=sourceColgroup.cloneNode(true);
	ScrollTable.addChild(headerTable,colgroup);//append
	
	//=====thead=====
	var thead=table.childNodes[1];
	ScrollTable.addChild(headerTable,thead);//append
}//end with(this)
}
	/***************************
	 * createCornerTop
	 **************************/
	 
ScrollTable.prototype.createCornerTop=function(){
with(this){
	if(lockedCols==0){return;}
	
	//===get elements from hederTable====
	var sourceTable=headerTable;
	
	//===cornerTop====
	cornerTop=doc.createElement("DIV");
	cornerTop.style.overflow="hidden";
	ScrollTable.addChild(cornerTopTD,cornerTop);
	
	//===cornerTopTable====  
	cornerTopTable=doc.createElement("TABLE");
	setCommTableAttris(cornerTopTable)//设置共同属性
	cornerTopTable.height="100%";
	ScrollTable.addChild(cornerTop,cornerTopTable);
	
	//==colgroup===
	var sourceColgroup=sourceTable.firstChild;
	var colgroup=doc.createElement("colgroup");
	ScrollTable.addChild(cornerTopTable,colgroup);
	for(var i=0;i<lockedCols;i++){
	ScrollTable.addChild(colgroup,sourceColgroup.firstChild);
	}
	
	//=====thead=====
	var thead=doc.createElement("thead");
	ScrollTable.addChild(cornerTopTable,thead);
	
	var sourceThead=sourceTable.childNodes[1];
	var sourceTrs=sourceThead.childNodes;
	var trsLength=sourceTrs.length;
	
	var paraRowSpans=[];
	for(var i=0;i<trsLength;i++){paraRowSpans[i]=0;}

	for(var i=0;i<trsLength;i++){
	  var sourceTr=sourceTrs[i];
	  var tr=sourceTr.cloneNode(false);
	  if(sourceTr.currentStyle.height=="auto"){	
		  tr.height=sourceTr.offsetHeight;
	  }

      ScrollTable.addChild(thead,tr);
	  var paraRowSpan=paraRowSpans[i];
		for(var j=0;j<lockedCols-paraRowSpan;j++){
			 var th=sourceTr.firstChild;
			 var colSpan=th.colSpan;
			 var rowSpan=th.rowSpan;
			 ScrollTable.addChild(tr,th);
	
			if(rowSpan>1){
			   for(var k=i+1;k<i+rowSpan;k++){
				paraRowSpans[k]+=1;
				paraRowSpans[k]+=(colSpan-1);
			   }
			 }
		 j+=(colSpan-1);
		}
	}
}//end with(this)
}//end createCornerTop()


/***************************
 * createFooterAndCornerBottom
 **************************/
ScrollTable.prototype.createFooterAndCornerBottom=function(){
 with(this){
 if(footerRows==0){return;}
 
 //===get elements from hederTable====
   var sourceTable=table;

 //===create footer===
 footer=doc.createElement("DIV");
 footer.style.width="100%";
 ScrollTable.addChild(footerTD,footer);
 
 //===footerTable===
 footerTable=doc.createElement("TABLE");
 setCommTableAttris(footerTable)//设置共同属性
 footerTable.align="left";
 ScrollTable.addChild(footer,footerTable);
 
//==colgroup===
var footerColgroup=sourceTable.firstChild.cloneNode(true);
ScrollTable.addChild(footerTable,footerColgroup);

//=====tbody=====
var tbodyFooter=doc.createElement("tbody");
ScrollTable.addChild(footerTable,tbodyFooter);

//===create cornerBottom
 if(lockedCols!=0){
	   //===cornerBottom====
   cornerBottom=doc.createElement("DIV");
   ScrollTable.addChild(cornerBottomTD,cornerBottom);

   //===cornerBottomTable====
   cornerBottomTable=doc.createElement("TABLE");
   setCommTableAttris(cornerBottomTable)//设置共同属性
   cornerBottomTable.height="100%";
   ScrollTable.addChild(cornerBottom,cornerBottomTable);
   
   //==colgroup===
   var sourceColgroup=footerColgroup;
   colgroup=doc.createElement("colgroup");
   ScrollTable.addChild(cornerBottomTable,colgroup);
   for(var i=0;i<lockedCols;i++){
      ScrollTable.addChild(colgroup,sourceColgroup.firstChild);
   }

   //=====tbody=====
   var tbodyCornerBottom=doc.createElement("tbody");
   ScrollTable.addChild(cornerBottomTable,tbodyCornerBottom);
   
}//end cteate cornerBottom

 //===move data=========
var sourceTbody=sourceTable.lastChild;

 for(var i=0;i<footerRows;i++){
  var sourceTr=sourceTbody.lastChild;
  if(sourceTr.currentStyle.backgroundColor=="transparent"){
	  sourceTr.bgColor=cellBgColor;
  }
	 if(cornerBottom){
	  var trCornerBottom=sourceTr.cloneNode(false);
      tbodyCornerBottom.insertAdjacentElement("AfterBegin",trCornerBottom);
      for(var j=0;j<lockedCols;j++){
		var td=sourceTr.firstChild;
        ScrollTable.addChild(trCornerBottom,td);
		var colSpan=td.colSpan;  
		j+=(colSpan-1);
      }
	 }
	 
  tbodyFooter.insertAdjacentElement("AfterBegin",sourceTr);
 }
}
}

/*
 * createCenterLeft
 */
ScrollTable.prototype.createCenterAndLeft=function(){
with(this){
//===get elements from hederTable====
var sourceTable=table;
	
//create center====
center=doc.createElement("DIV");
center.style.width="100%";
center.style.height="100%";
center.style.overflowX=footer?"hidden":"auto";
center.style.overflowY="auto";
ScrollTable.addChild(centerTD,center);

//===centerTable===
  centerTable=doc.createElement("TABLE");
  setCommTableAttris(centerTable)//设置共同属性
  centerTable.align="left";
  ScrollTable.addChild(center,centerTable);

//==colgroup===
 var colgroup=sourceTable.firstChild;
 ScrollTable.addChild(centerTable,colgroup);

//=====tbody=====
 var tbodyCenter=null;
		   
//==============create left=============
if(lockedCols!=0){
  //===left====
   left=doc.createElement("DIV");
   left.style.height="100%";
   left.style.overflow="hidden";
   ScrollTable.addChild(leftTD,left);
  
   //===leftTable====
   leftTable=doc.createElement("TABLE");
   setCommTableAttris(leftTable)//设置共同属性
   ScrollTable.addChild(left,leftTable);
   
   //==colgroup===
   var colgroup=doc.createElement("colgroup");
   ScrollTable.addChild(leftTable,colgroup);
   
   var sourceColgroup=centerTable.firstChild;
   for(var i=0;i<lockedCols;i++){
    var col=sourceColgroup.firstChild;
    ScrollTable.addChild(colgroup,col);
    }
//=====tbody=====
   var tbodyLeft=doc.createElement("tbody");
   ScrollTable.addChild(leftTable,tbodyLeft);
}//end create left


//====移动数据====
//setTimeout(function(){//异步
    var sourceTbody=sourceTable.firstChild;
	   if(left){//有锁定列	
		  var sourceTr=sourceTbody.firstChild;
		  while(sourceTr){
	         var trLeft=sourceTr.cloneNode(false); 
			 trLeft.style.backgroundColor=lockedColsBgColor;
			 //删除事件
			 trLeft.onclick=null;
			 trLeft.ondblclick=null;
			 //其它事件...
			 ScrollTable.addChild(tbodyLeft,trLeft);
             for(var j=0;j<lockedCols;j++){
			   var td=sourceTr.firstChild;
               ScrollTable.addChild(trLeft,td);
			   var colSpan=td.colSpan;  
		       j+=(colSpan-1);
             }	
			sourceTr=sourceTr.nextSibling; 
		  }
	   }
		  tbodyCenter=sourceTbody;
          ScrollTable.addChild(centerTable,tbodyCenter);//没有合并行时放这里
        //====设置单元格背景颜色====
			var trCenter=tbodyCenter.firstChild;
			for(var i=0;i<50;i++){
				if(!trCenter) break;
				if(!trCenter.bgColor&&!trCenter.style.backgroundColor){
					 trCenter.bgColor=cellBgColor;					 
				}
			  trCenter=trCenter.nextSibling;				
			}

          setTimeout(function(){
			while(trCenter){
				if(!trCenter.bgColor&&!trCenter.style.backgroundColor){
					 trCenter.bgColor=cellBgColor;
				}
			trCenter=trCenter.nextSibling;
			}
			//ScrollTable.addChild(centerTable,tbodyCenter);有合并行时放在这里
		   },100);
        //============================
        
        setTimeout(function(){
           endConfig();
        },1);
  //},1);
//==================
}
}


ScrollTable.prototype.setCommTableAttris=function(thisTable){
	with(this){
		thisTable.border=0;
		thisTable.cellPadding=cellPadding;
		thisTable.bgColor=cellBorderColor;
		thisTable.cellSpacing=cellBorderWidth;
		thisTable.style.tableLayout="fixed";
	}
}

ScrollTable.prototype.endConfig=function(){
 with(this){

//隐藏提示层
  if(winForWait&&winForWait.style.visibility==""){
   winForWait.style.visibility="hidden";
   }
   
  //设置可改变列宽
 if(widthResizable)
   setupWidthResizable(); 
 
//===跟有无left和footer有关的设置
	if(footer){
	   footer.onscroll=function(){
	      header.scrollLeft= footer.scrollLeft;
		  center.scrollLeft= footer.scrollLeft;
	   };
	}else{
	   center.attachEvent("onscroll",function(){
          header.scrollLeft=center.scrollLeft;
       });
	}
	if(left){
	   center.attachEvent("onscroll",function(){
          left.scrollTop=center.scrollTop;		  
       });
	 }
    if(cornerBottom){
	    leftTD.style.paddingBottom=0;
     }
  //==================

//跟宽度高度有关的设置
  configForSize();

//复制table事件
configTableEvent();
 }
}

ScrollTable.prototype.setupHideTextOverflow=function(){
 with(this){
   var span_tmp = '<span style="display:none">hahaha...</span>';
   var style = "<STYLE>table.scrolltable{}"+
                "table.scrolltable th,table.scrolltable td{"+
                "white-space:nowrap;"+
		        "word-break:keep-all;"+
                "text-overflow:ellipsis;"+
                "overflow:hidden;"+
				"}</STYLE>";
   var html  = span_tmp+style;
   document.body.insertAdjacentHTML("BeforeEnd",html);
   container.className="scrolltable";
 }
}

ScrollTable.prototype.setupWidthResizable=function(){
with(this){
	//cornerTopTable
	if(cornerTop){
		setup(cornerTopTable,"LEFT");
	}
	//headerTable
		setup(headerTable,"RIGHT");
	

  function setup(thisTb,position){
		var trs=thisTb.lastChild.childNodes;
	    var paraRowSpans=[];
	    for(var i=0;i<trs.length;i++){paraRowSpans[i]={cellIndexs:[],colSpans:[],prevObjAtCols:[]};}
		
		for(var i=0;i<trs.length;i++){
			var tr=trs[i];			
			var cellIndex=0;
            var th=tr.firstChild;
			while(th){
				var cellIndexs=paraRowSpans[i].cellIndexs;
				var colSpans=paraRowSpans[i].colSpans;
				var prevObjAtCols=paraRowSpans[i].prevObjAtCols;
				for(var itmp in cellIndexs){
					if(cellIndexs[itmp]==cellIndex){
					   cellIndex+=colSpans[itmp];
					   th.prevObjAtCols=prevObjAtCols[itmp];
					}
				}
				
				var thisCellIndex=cellIndex;
				var atCols=thisCellIndex+",";
				var colSpan=th.colSpan;
				for(var j=1;j<colSpan;j++){
					cellIndex++;
					atCols+=cellIndex+","
				}
				
				var rowSpan=th.rowSpan;
				if(rowSpan>1){
			      for(var k=i+1;k<i+rowSpan;k++){
					  paraRowSpans[k].cellIndexs.push(thisCellIndex);
					  paraRowSpans[k].colSpans.push(colSpan);
					  paraRowSpans[k].prevObjAtCols.push(atCols);
			       }
				}
				
				th.position=position;
				th.atCols=atCols;
				th.onmousemove=function(){mouseMoveToResize(this);};
				th.onmousedown=function(){mouseDownToResize(this);};
				th.onmouseup=function(){mouseUpToResize(this);};
				cellIndex++;
			 th=th.nextSibling;
			}
        }  
  }
//mouseMove
   function mouseMoveToResize(obj){	
	if(obj.capture){
	  _dragLine.style.left=event.clientX+_dragLine.mouseOffset;
	  return;
	}
	var x=ScrollTable.getAbsolutePosX(obj);
	var width=obj.offsetWidth;
	var mouseX=event.clientX;
	if(x+width-mouseX<8){
	 obj.style.cursor="e-resize";
	 obj.mouseOnPoint=true;
	 obj.mousePosition="RIGHT";
	 }else if(mouseX-x<8&&obj.cellIndex!=0){
	 obj.style.cursor="e-resize";
	 obj.mouseOnPoint=true;
	 obj.mousePosition="LEFT";
	}else{
	obj.style.cursor="";
	obj.mouseOnPoint=false;
	}
   }
   
   //mouseDown
   var _dragLine=this.dragLine;
   var _parent=parent;
   var _container=container;
   var _cellBorderColor=cellBorderColor;
   var _footer=footer;
   var _center=center;
   function mouseDownToResize(obj){
	if(!obj.mouseOnPoint) return;
	
	obj.mouseDownX=event.clientX;
	obj.oldWidth=obj.offsetWidth;
	obj.capture=true;
	obj.setCapture();
    if(!_dragLine){
		_dragLine=document.createElement("DIV");
		ScrollTable.addChild(document.body,_dragLine);
		_dragLine.style.visibility="hidden";
		_dragLine.style.width=3;
		_dragLine.style.backgroundColor=_cellBorderColor;
		_dragLine.style.zIndex=99;
		_dragLine.style.position="absolute";	
	}
	    var lineHeight=_container.offsetHeight-1;
		if(_footer&&_footer.scrollWidth>_footer.clientWidth)
		  lineHeight-=17;
		if(!_footer&&_center.scrollWidth>_center.clientWidth)
		  lineHeight-=17;
		_dragLine.style.height=lineHeight;
		if(obj.mousePosition=="LEFT"){
			_dragLine.style.left=ScrollTable.getAbsolutePosX(obj);
		}else{
		    _dragLine.style.left=ScrollTable.getAbsolutePosX(obj)+obj.offsetWidth;
		}
		_dragLine.style.top=ScrollTable.getAbsolutePosY(_container)+2;
		_dragLine.style.visibility="";
		_dragLine["mouseOffset"]=_dragLine.style.left.match(/^[1-9]\d*/)-obj.mouseDownX;

   }
  
  //mouseUp
  var cornerTopTb=cornerTopTable;
  var leftTb=leftTable;
  var cornerBottomTb=cornerBottomTable;
  
  var headerTb=headerTable;
  var centerTb=centerTable;
  var footerTb=footerTable;
  
  var scrolltable=this;
  function mouseUpToResize(obj){

    if(!obj.capture) return;

   var atCols=obj.atCols;
   if(obj.mousePosition=="LEFT"){
	atCols=obj.prevObjAtCols?obj.prevObjAtCols:obj.previousSibling.atCols;
   }
   
    var offsetWidth=event.clientX*1-obj.mouseDownX;
	var atCols=atCols.split(",");
    var colsCount=atCols.length-1;
	var position=obj.position;
	if(offsetWidth!=0)
    {
	  var offsetWidth=offsetWidth/colsCount;
	  for(var i=0;i<colsCount;i++){
		if(position=="LEFT"){
		   var cornerTopCols=cornerTopTb.firstChild.childNodes;
		   var newWidth=parseInt(cornerTopCols[atCols[i]].width*1+offsetWidth);
		   if(newWidth<10) newWidth=10;
		   cornerTopCols[atCols[i]].width=newWidth;
		   
		   var leftCols=leftTb.firstChild.childNodes;
		   leftCols[atCols[i]].width=newWidth;
		   
		   if(cornerBottomTb){
			   var cornerBottomCols=cornerBottomTb.firstChild.childNodes;
		       cornerBottomCols[atCols[i]].width=newWidth;
		   }
		   
		}else{
		   var headerCols=headerTb.firstChild.childNodes;
		   var newWidth=parseInt(headerCols[atCols[i]].width*1+offsetWidth);
		   if(newWidth<10) newWidth=10;
		   headerCols[atCols[i]].width=newWidth;
		   
		   var centerCols=centerTb.firstChild.childNodes;
		   centerCols[atCols[i]].width=newWidth;
		   
		   if(footerTb){
			   var footerCols=footerTb.firstChild.childNodes;
		       footerCols[atCols[i]].width=newWidth;
		   }
		}
	  }
     }
    obj.capture=false; 
    obj.releaseCapture();
	_dragLine.style.visibility="hidden";
	scrolltable.configForSize();
   }
  
}
}

//复制table事件
ScrollTable.prototype.configTableEvent=function(){
  with(this){
   var value=null;
    for(var name in table){
	  if((/^on/.test(name))&&(value=table[name])){
	     centerTable[name]=value;
	 }
	}
  }
}

ScrollTable.prototype.configForSize=function(){
with(this){

var headerClientWidth=header.clientWidth;
var centerClientHeight=center.clientHeight;
var headerScrollWidth=header.scrollWidth;
var centerScrollHeight=center.scrollHeight;	

if(headerClientWidth>=headerScrollWidth){
	if(footer){
		footer.style.overflowX="hidden";
	}
	if(!footer&&left){
		leftTD.style.paddingBottom=0;
	}
	if(cornerBottom){
		cornerBottomTD.style.paddingBottom=0;
	}
}else{
	if(footer){
		footer.style.overflowX="scroll";
	}
	if(!footer&&left){
		leftTD.style.paddingBottom=17;
	}
	if(cornerBottom){
		cornerBottomTD.style.paddingBottom=17;
	}
}

if(centerClientHeight>=centerScrollHeight){
	headerTD.style.paddingRight=0;
	if(footer){
		footerTD.style.paddingRight=0;
	}
}else{
    headerTD.style.paddingRight=17;
	if(footer){
		footerTD.style.paddingRight=17;
	}
}
}//end with(this)
}

ScrollTable.prototype.configForPercentType=function(){
	with(this){
		if(tableWidthType!=PERCENT){return;}
			if(cornerTop){
				changeColgroup(cornerTopTable,"left");
			 }
			 if(left){
				changeColgroup(leftTable,"left");
			 }
			 if(cornerBottom){
				changeColgroup(cornerBottomTable,"left");
			 }
             if(footer){
				changeColgroup(footerTable,"right");
			 }
			 changeColgroup(headerTable,"right");
			 changeColgroup(centerTable,"right");
  }
}

ScrollTable.prototype.changeColgroup=function(thisTable,leftOrRight){
		
	with(this){
	//fast========
	var newTableWidth=parseInt(container.clientWidth*tablePercentWidthNum/100);
	var colgroup=doc.createElement("colgroup");
	if(leftOrRight=="left"){
			for(var i=0;i<lockedCols;i++){
				var col=doc.createElement("col");
				col.width=parseInt(newTableWidth*colsArray[i]/100);
				ScrollTable.addChild(colgroup,col);
			}
	}else if(leftOrRight=="right"){
			 for(var i=lockedCols;i<colsArray.length;i++){
			  var col=doc.createElement("col");
			  col.width=parseInt(newTableWidth*colsArray[i]/100);
			  ScrollTable.addChild(colgroup,col);
			 } 
	}
	thisTable.removeChild(thisTable.firstChild);
	thisTable.insertAdjacentElement("afterBegin",colgroup);
   //slow========
  /*var newTableWidth=parseInt(container.clientWidth*tablePercentWidthNum/100);
	var colgroup=thisTable.firstChild;
	var cols=colgroup.childNodes;
	if(leftOrRight=="left"){
		for(var i=0;i<lockedCols;i++){
			var col=cols[i];
			col.width=parseInt(newTableWidth*colsArray[i]/100);
		}
	}else if(leftOrRight=="right"){
		var length=colsArray.length-lockedCols;
		for(var i=0;i<length;i++){
			var col=cols[i];
			col.width=parseInt(newTableWidth*colsArray[i+lockedCols]/100);
		} 
	  }*/
    }
};

ScrollTable.prototype.configOnResize=function(){
with(this){
	var prevResizeTime=this["prevResizeTime"];
	if(!prevResizeTime){
		this["prevResizeTime"]=(new Date()).getTime();
	    //=====
		configForPercentType();
        configForSize();
	    //=====
	    return;
		}
	 var currentResizeTime=(new Date()).getTime();
	 if(currentResizeTime-prevResizeTime<100){return;}
	 //=====
     configForPercentType();
     configForSize();
	 //=====
	 this["prevResizeTime"]=currentResizeTime;
}
};

ScrollTable.prototype.refresh=function(){
	this.configForSize();
}

//===============================================

ScrollTable.getAbsolutePosX=function(el) {
	var SL = 0;
	var is_div = (el.tagName=="DIV");
	if (is_div && el.scrollLeft)
		SL = el.scrollLeft;
	var x = el.offsetLeft - SL;
	if (el.offsetParent) {
		var tmp = ScrollTable.getAbsolutePosX(el.offsetParent);
        x+=tmp;
 	}
	return x;
};

ScrollTable.getAbsolutePosY=function(el) {
	var ST = 0;
	var is_div = (el.tagName=="DIV");
	if (is_div && el.scrollTop)
		ST = el.scrollTop;
	var y = el.offsetTop - ST;
	if (el.offsetParent) {
		var tmp = ScrollTable.getAbsolutePosY(el.offsetParent);
        y+=tmp;
 	}
	return y;
};

ScrollTable.getAbsolutePos=function(el) {
	var SL = 0, ST = 0;
	var is_div = (el.tagName=="DIV");
	if (is_div && el.scrollLeft)
		SL = el.scrollLeft;
	if (is_div && el.scrollTop)
		ST = el.scrollTop;
	var r = { x: el.offsetLeft - SL, y: el.offsetTop - ST };
	if (el.offsetParent) {
		var tmp = this.getAbsolutePos(el.offsetParent);
		r.x += tmp.x;
		r.y += tmp.y;
	}
	return r;
};
ScrollTable.copyAttributes=function(fromObj,toObj,namesArray){
	for(var i=0;i<namesArray.length;i++){
	   var name=namesArray[i];
	   if(value=fromObj[name]){
		  toObj[name]=value;
	   }
	}
};

ScrollTable.addChild=function(parent,child){
parent.appendChild(child);
};



//==============================================
var defParam={//默认参数值
	 lockedCols:0,
	 footerRows:0,
	 containerBgColor:"#ffffff",
	 lockedColsBgColor:"#edf5fa",
	 cellBgColor:"#FFFFFF",
	 cellPadding:3,
	 cellBorderColor:"#cccccc",
	 cellBorderWidth:1,
     hideTextOverflow:false,
     widthResizable:false
}
   
ScrollTable.setup=function(param){
   	var tableId=param.tableId;
	if(!tableId){alert("ScrollTable: the parameter <tableId> is required!");return null;}
	
	for(var i in defParam){
		if(!param[i]) param[i]=defParam[i];
	}

	var scrollTable=new ScrollTable(param);
	return scrollTable;
}

ScrollTable.install=function(params){
 var scrollTables=[];//返回值
 
 for(var i=0;i<params.length;i++){
  var param=params[i];
  var scrollTable=ScrollTable.setup(param);
  scrollTables.push(scrollTable);
 }
  return scrollTables;
}