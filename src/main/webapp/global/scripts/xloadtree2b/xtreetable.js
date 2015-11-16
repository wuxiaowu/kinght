
function TableColumn(_title, _flag, _width, _editable, _template, _align, _loadCallback, _changeCallback, _collect, _display){
	this.title = _title;								//表格标题
	this.flag = (_flag==null ? 0 : _flag);				//
	this.width = (_width==null ? 100 : _width);			//宽度
	this.editable = _editable ? true : false;			//可否可编辑
	this.template = _template;							//单元生成模板
	this.align = _align==null?"center":_align;			//对齐方式
	this.loadCallback = _loadCallback;					//模板生成后回调
	this.changeCallback = _changeCallback;				//修改时回调
//	this.isNumber = _number ? true : false;				//是否为数值
//	this.isAmount = _amount ? true : false;				//是否为金额
	this.collect = _collect ? true : false;				//汇总
	this.display = _display ? true : false;
	this.isCollect = function(){
		return this.collect && (this.flag==1 || this.flag==2);
	}
}

function RowColumn(_value){
	this.value = (_value!=null ? _value : '');
	this.editable = false;
}

//
// WebFXTreePersisitance
function WebFXTreeTablePersistence() {}
var _p = WebFXTreeTablePersistence.prototype;
_p.getExpanded = function (oNode) { return false; };
_p.setExpanded = function (oNode, bOpen) {};



// Cookie handling
function WebFXTableCookie() {}

_p = WebFXTableCookie.prototype;

_p.setCookie = function (sName, sValue, nDays) {
	var expires = "";
	if (typeof nDays == "number") {
		var d = new Date();
		d.setTime(d.getTime() + nDays * 24 * 60 * 60 * 1000);
		expires = "; expires=" + d.toGMTString();
	}

	document.cookie = sName + "=" + escape(sValue) + expires + "; path=/";
};

_p.getCookie = function (sName) {
	var re = new RegExp("(\;|^)[^;]*(" + sName + ")\=([^;]*)(;|$)");
	var res = re.exec(document.cookie);
	return res != null ? unescape(res[3]) : null;
};

_p.removeCookie = function (name) {
	this.setCookie(name, "", -1);
};


//
// persistence using cookies
//
// This is uses one cookie with the ids of the expanded nodes separated using '+'
//
function WebFXTreeTableCookiePersistence() {
	this._openedMap = {};
	this._cookies = new WebFXTableCookie;
	var s = this._cookies.getCookie(this.cookieName);
	if (s) {
		var a = s.split("+");
		for (var i = a.length - 1; i >= 0; i--)
			this._openedMap[a[i]] = true;
	}
}

_p = WebFXTreeTableCookiePersistence.prototype = new WebFXTreeTablePersistence;

_p.cookieName = "webfx-tree-cookie-persistence"

_p.getExpanded = function (oNode) {
	return oNode.id in this._openedMap;
};

_p.setExpanded = function (oNode, bOpen) {
	var old = this.getExpanded(oNode);
	if (old != bOpen) {
		if (bOpen) {
			this._openedMap[oNode.id] = true;
		} else {
			delete this._openedMap[oNode.id];
		}

		var res = [];
		var i = 0;
		for (var id in this._openedMap)
			res[i++] = id;
		this._cookies.setCookie(this.cookieName, res.join("+"));
	}
};



// this object provides a few useful methods when working with arrays
var arrayHelper = {
	indexOf: function (a, o) {
		for (var i = 0; i < a.length; i++) {
			if (a[i] == o) {
				return i;
			}
		}
		return -1;
	},

	insertBefore: function (a, o, o2) {
		var i = this.indexOf(a, o2);
		if (i == -1) {
			a.push(o);
		} else {
			a.splice(i, 0, o);
		}
	},

	remove: function (a, o) {
		var i = this.indexOf(a, o);
		if (i != -1) {
			a.splice(i, 1);
		}
	}
};

///////////////////////////////////////////////////////////////////////////////
// WebFX Tree Config object                                                  //
///////////////////////////////////////////////////////////////////////////////
var webFXTreeTableConfig = {
//	rootIcon        : "../global/images/xloadtree2b/folder.png",
//	openRootIcon    : "../global/images/xloadtree2b/openfolder.png",
	rootIcon        : "../global/images/xloadtree2b/base.gif",
	openRootIcon    : "../global/images/xloadtree2b/base.gif",
	folderIcon      : "../global/images/xloadtree2b/folder.png",
	openFolderIcon  : "../global/images/xloadtree2b/openfolder.png",
	fileIcon        : "../global/images/xloadtree2b/file.png",
	iIcon           : "../global/images/xloadtree2b/I.png",
	lIcon           : "../global/images/xloadtree2b/L.png",
	lMinusIcon      : "../global/images/xloadtree2b/Lminus.png",
	lPlusIcon       : "../global/images/xloadtree2b/Lplus.png",
	tIcon           : "../global/images/xloadtree2b/T.png",
	tMinusIcon      : "../global/images/xloadtree2b/Tminus.png",
	tPlusIcon       : "../global/images/xloadtree2b/Tplus.png",
	plusIcon        : "../global/images/xloadtree2b/plus.png",
	minusIcon       : "../global/images/xloadtree2b/minus.png",
	blankIcon       : "../global/images/xloadtree2b/blank.png",
	loadingIcon 	: "../global/images/xloadtree2b/loading.gif",
	defaultText     : "Tree Item",
	defaultAction   : null,
	defaultBehavior : "classic",
	usePersistence	: false
};

///////////////////////////////////////////////////////////////////////////////
// WebFX Tree Handler object                                                 //
///////////////////////////////////////////////////////////////////////////////

var webFXTreeTableHandler = {
	ie: /msie/i.test(navigator.userAgent),
	opera: /opera/i.test(navigator.userAgent),
	idCounter: 0,
	idPrefix: "jude-",
	hasError : false,
	getUniqueId: function () {
		return this.idPrefix + this.idCounter++;
	},
	all: {},
	getNodeById: function (sId) {
		return this.all[sId];
	},
	addNode: function (oNode) {
/*
		var old = this.all[oNode.id];
		if(old!=null && this.hasError==false && old.getTree()!=null){
			var root = old.getTree();
			root.setText(root.getText() + "(内部错误)");
			var str = "     内部错误, 重复ID: \n\n";
			str += old.getText() + "(ID: " + old.id + ")\n";
			str += oNode.getText() + "(ID: " + old.id + ")";
			str += "\n" + (old.parentNode ? old.parentNode.getText() : "");
			str += "\n" + root.getText();
			alert(str);
			this.hasError = true;
			return ;
		}
*/
		this.all[oNode.id] = oNode;
	},
	removeNode:	function (oNode) {
		delete this.all[oNode.id];
	},

	handleEvent: function (e) {
		var el = e.target || e.srcElement;
		if(!/webfx-tree-expand-icon/.test(el.className))
			return;
		while (el != null && !this.all[el.id]) {
			if(el.tagName=='INPUT' && el.type=='checkbox'){
//				alert("checkbox");
				return true;
			}
			el = el.parentNode;
		}
//		alert(el.tagName + "\n" + e.type);
		if (el == null) {
			return false;
		}
//		alert(e.type + "\n" + el.tagName + "\n" + el.id);
		var node = this.all[el.id];
		if (typeof node["_on" + e.type] == "function") {
			return node["_on" + e.type](e);
		}
		return false;
	},
	
	handleTableEvent:function(e){
		e = e || window.event;
		var el = e.target || e.srcElement;
		var tag = el.tagName;
		if(tag == 'TABLE'){
			alert();
			e.cancelBubble = true;
			return true;
		}else if(tag == 'TR'){
			if(/tree-table-row/.test(el.className)){
				var o = this.getTreeTableObject(el);
				if(o){
					o.setSelectedRow(el);
					return true;
				}
			}else{
				return false;
			}
		}else if(tag == 'TD'){
			if(/tree-table-row-/.test(el.className)){
				var o = this.getTreeTableObject(el);
//				alert(o);
				if(o){
					o.setSelectedRow(el.parentNode);
					o.setSelectedCell(el);
					return true;
				}
				return true;				
			}else{
				return false;
			}
		}
		return false;
	},
	
	getTreeTableObject : function(trtd){
		if(!trtd)return null;
		var table = trtd.parentNode;
		while(table!=null && table.tagName!='TABLE'){
			table = table.parentNode;
		}
		if(!table)return null;
		var ttname = table.varName;
		if(!ttname)return null;
		return eval(ttname);
	},
	
	dispose: function () {
		if (this.disposed) return;
		for (var id in this.all) {
			this.all[id].dispose();
		}
		this.disposed = true;
	},

	htmlToText: function (s) {
		return String(s).replace(/\s+|<([^>])+>|&amp;|&lt;|&gt;|&quot;|&nbsp;/gi, this._htmlToText);
	},

	_htmlToText: function (s) {
		switch (s) {
			case "&amp;":
				return "&";
			case "&lt;":
				return "<";
			case "&gt;":
				return ">";
			case "&quot;":
				return "\"";
			case "&nbsp;":
				return String.fromCharCode(160);
			default:
				if (/\s+/.test(s)) {
					return " ";
				}
				if (/^<BR/gi.test(s)) {
					return "\n";
				}
				return "";
		}
	},

	textToHtml: function (s) {
		return String(s).replace(/&|<|>|\n|\"\u00A0/g, this._textToHtml);
	},

	_textToHtml: function (s) {
		switch (s) {
			case "&":
				return "&amp;";
			case "<":
				return "&lt;";
			case ">":
				return "&gt;";
			case "\n":
				return "<BR>";
			case "\"":
				return "&quot;";	// so we can use this in attributes
			default:
				return "&nbsp;";
		}
	},
	
	toggle : function(e){
		var el = e.target || e.srcElement;
		while (el != null && !this.all[el.id]) {
			if(el.tagName=='INPUT' && el.type=='checkbox'){
//				alert("checkbox");
				return true;
			}
			el = el.parentNode;
		}
//		alert(el.tagName + "\n" + e.type);

		if (el == null) {
			return false;
		}
		var node = this.all[el.id];
		if (typeof node["_on" + e.type] == "function") {
			return node["_on" + e.type](e);
		}
		return false;
	},
	DC :function(el,c){			//delete className
		if(el){
			var a=el.className.split(" "),
				i=a.length;
			while(--i>=0)
				if(a[i]==c)
					a.splice(i,1);
			el.className=a.join(" ");
		}
	},
	AC : function(el,ac,dc){	//add className
		if(el){
			if(dc)
				this.DC(el,dc);
			this.DC(el,ac);
			el.className+=" "+ac;
		}
	},
	

	persistenceManager: new WebFXTreeTableCookiePersistence()
};


///////////////////////////////////////////////////////////////////////////////
// WebFXTreeTableAbstractNode
///////////////////////////////////////////////////////////////////////////////

function WebFXTreeTableAbstractNode(sText, oAction) {
	this.childNodes = [];
	if (sText) this.text = sText;
	if (oAction) this.action = oAction;
	this.id = webFXTreeTableHandler.getUniqueId();
	if (webFXTreeTableConfig.usePersistence) {
		this.open = webFXTreeTableHandler.persistenceManager.getExpanded(this);
	}
	this.info = null;
	webFXTreeTableHandler.addNode(this);
	
	this.level = -1;
	this.columns = [];
	this.editable = false;
}


_p = WebFXTreeTableAbstractNode.prototype;
_p._selected = false;
_p.indentWidth = 19;
_p.open = false;
_p.text = webFXTreeTableConfig.defaultText;
_p.action = null;
_p.target = null;
_p.toolTip = null;
_p._focused = false;

/* begin tree model */
_p.addColumn = function(column){
//	if(this.getTree().rendered){
//		return ;
//	}
	this.columns[this.columns.length] = column;
}
_p.getColumn = function(index){
	if(index > this.columns.length)
		return null;
	return this.columns[index];
}

_p.getColumns = function(){
	return this.columns;
}

_p.isEditable = function(){
	return (this.editable==true) ? true : false;
}

_p.setEditable = function(b){
	this.editable = b ? true : false;
}

_p.setColumns = function(cols){
	this.columns = cols;
}


_p.selectById = function(sId){
	var jsNode = webFXTreeTableHandler.all[sId];
	if(jsNode)
		jsNode.focus();
}
_p.addInfo = function(key,value){
	if(this.info==null)
		this.info={};
	this.info[key] = value;
}
_p.getInfo = function(key){
	if(this.info==null)
		return null;
	return this.info[key];
}

_p.add = function (oChild, oBefore) {
	var oldLast;
	var emptyBefore = this.childNodes.length == 0;
	var p = oChild.parentNode;

	if (oBefore == null) { // append
		if (p != null)
			p.remove(oChild);
		oldLast = this.getLastChild();
		this.childNodes.push(oChild);
	} else { // insertBefore
		if (oBefore.parentNode != this) {
			throw new Error("Can only add nodes before siblings");
			return;
		}
		if (p != null) {
			p.remove(oChild);
		}

		arrayHelper.insertBefore(this.childNodes, oChild, oBefore);
	}

	if (oBefore) {
		if (oBefore == this.firstChild) {
			this.firstChild = oChild;
		}
		oChild.previousSibling = oBefore.previousSibling;
		oBefore.previousSibling = oChild;
		oChild.nextSibling = oBefore;
	} else {
		if (!this.firstChild) {
			this.firstChild = oChild;
		}
		if (this.lastChild) {
			this.lastChild.nextSibling = oChild;
		}
		oChild.previousSibling = this.lastChild;
		this.lastChild = oChild;
		this.lastChild.nextSibling = null;
	}

	oChild.parentNode = this;
	var t = this.getTree();
	if (t) {
		oChild.tree = t;
	}
	var d = this.getDepth();
	if (d != null) {
		oChild.depth = d + 1;
	}

	if (this.getCreated() && !t.getSuspendRedraw()) {
		var el = this.getChildrenElement();
		var newEl = oChild.create();
		var refEl = oBefore ? oBefore.getElement() : null;
		el.insertBefore(newEl, refEl);

		if (oldLast) {
			oldLast.updateExpandIcon();
		}
		if (emptyBefore) {
			this.setExpanded(this.getExpanded());
			// if we are using classic expand will not update icon
			if (t && t.getBehavior() != "classic")
				this.updateIcon();
		}
	}

	return oChild;
};



_p.remove = function (oChild) {
	// backwards compatible. If no argument remove the node
	if (arguments.length == 0) {
		if (this.parentNode) {
			var o = this.parentNode.remove(this);
			this.parentNode = null;
			return o;
		}
		return null;
	}

	// if we remove selected or tree with the selected we should select this
	var t = this.getTree();
	var si = t ? t.getSelected() : null;
	if (si == oChild || oChild.contains(si)) {
		if (si.getFocused()) {
			this.select();
			window.setTimeout("WebFXTreeTableAbstractNode._onTimeoutFocus(\"" + this.id + "\")", 10);
		} else {
			this.select();
		}
	}

	if (oChild.parentNode != this) {
		throw new Error("Can only remove children");
	}
	arrayHelper.remove(this.childNodes, oChild);
	//

	if (this.lastChild == oChild) {
		this.lastChild = oChild.previousSibling;
	}
	if (this.firstChild == oChild) {
		this.firstChild = oChild.nextSibling;
	}
	if (oChild.previousSibling) {
		oChild.previousSibling.nextSibling = oChild.nextSibling;
	}
	if (oChild.nextSibling) {
		oChild.nextSibling.previousSibling = oChild.previousSibling;
	}

	var wasLast = oChild.isLastSibling();

	oChild.parentNode = null;
	oChild.tree = null;
	oChild.depth = null;

	if (t && this.getCreated() && !t.getSuspendRedraw()) {
		var el = this.getChildrenElement();
		var childEl = oChild.getElement();
		el.removeChild(childEl);
		if (wasLast) {
			var newLast = this.getLastChild();
			if (newLast) {
				newLast.updateExpandIcon();
			}
		}
		if (!this.hasChildren()) {
			el.style.display = "none";
			this.updateExpandIcon();
			this.updateIcon();
		}
	}

	return oChild;
};

WebFXTreeTableAbstractNode._onTimeoutFocus = function (sId) {
	var jsNode = webFXTreeTableHandler.all[sId];
	jsNode.focus();
};

_p.getId = function () {
	return this.id;
};

_p.getTree = function () {
	throw new Error("getTree called on Abstract Node");
};

_p.getDepth = function () {
	throw new Error("getDepth called on Abstract Node");
};

_p.getCreated = function () {
	var t = this.getTree();
	return t && t.rendered;
};

_p.getParent = function () {
	return this.parentNode;
};

_p.contains = function (oDescendant) {
	if (oDescendant == null) return false;
	if (oDescendant == this) return true;
	var p = oDescendant.parentNode;
	return this.contains(p);
};

_p.getChildren = _p.getChildNodes = function () {
	return this.childNodes;
};

_p.getFirstChild = function () {
	return this.childNodes[0];
};

_p.getLastChild = function () {
	return this.childNodes[this.childNodes.length - 1];
};

_p.getPreviousSibling = function () {
	return this.previousSibling;
	//var p = this.parentNode;
	//if (p == null) return null;
	//var cs = p.childNodes;
	//return cs[arrayHelper.indexOf(cs, this) - 1]
};

_p.getNextSibling = function () {
	return this.nextSibling;
	//var p = this.parentNode;
	//if (p == null) return null;
	//var cs = p.childNodes;
	//return cs[arrayHelper.indexOf(cs, this) + 1]
};

_p.hasChildren = function () {
	return this.childNodes.length > 0;
};

_p.isLastSibling = function () {
	return this.nextSibling == null;
	//return this.parentNode && this == this.parentNode.getLastChild();
};

_p.findChildByText = function (s, n) {
	if (!n) {
		n = 0;
	}
	var isRe = s instanceof RegExp;
	for (var i = 0; i < this.childNodes.length; i++) {
		if (isRe && s.test(this.childNodes[i].getText()) ||
			this.childNodes[i].getText() == s) {
			if (n == 0) {
				return this.childNodes[i];
			}
			n--;
		}
	}
	return null;
};

_p.findNodeByText = function (s, n) {
	if (!n) {
		n = 0;
	}
	var isRe = s instanceof RegExp;
	if (isRe && s.test(this.getText()) || this.getText() == s) {
		if (n == 0) {
			return this.childNodes[i];
		}
		n--;
	}

	var res;
	for (var i = 0; i < this.childNodes.length; i++) {
		res = this.childNodes[i].findNodeByText(s, n);
		if (res) {
			return res;
		}
	}
	return null;
};

/* end tree model */

_p.setId = function (sId) {
	var el = this.getElement();
	webFXTreeTableHandler.removeNode(this);
	this.id = sId;
	if (el) {
		el.id = sId;
	}
	webFXTreeTableHandler.addNode(this);
};

_p.isSelected = function () {
	return this._selected;
};

_p.select = function () {
	this._setSelected(true);
};

_p.deselect = function () {
	this._setSelected(false);
};

_p._setSelected = function (b) {
	var t = this.getTree();
	if (!t) return;
	if (this._selected != b) {
		this._selected = b;

		var wasFocused = false;	// used to keep focus state
		var si = t.getSelected();
		if (b && si != null && si != this) {
			var oldFireChange = t._fireChange;
			wasFocused = si._focused;
			t._fireChange = false;
			si._setSelected(false);
			t._fireChange = oldFireChange;
		}

		var el = this.getRowElement();
		if (el) {
			el.className = this.getRowClassName();
		}
		if (b) {
			this._setTabIndex(t.tabIndex);
			t._selectedItem = this;
			t._fireOnChange();
			t.setSelected(this);
			if (wasFocused) {
				this.focus();
			}
		} else {
			this._setTabIndex(-1);
		}

		if (t.getBehavior() != "classic") {
			this.updateIcon();
		}
	}
};


_p.getExpanded = function () {
	return this.open;
};

_p.setExpanded = function (b) {
	var ce;
	this.open = b;
	var t = this.getTree();
	if(b && t.isCloseSameLevel()){
		var pnode = this.parentNode;
		if(pnode){
			var slibings = pnode.childNodes;
			for(var i=0; i<slibings.length; i++) {
				if(slibings[i]==this)
					continue;
				if(slibings[i].open)
					slibings[i].setExpanded(false);
			}
		}
	}
	if (this.hasChildren()) {
		var si = t ? t.getSelected() : null;
		if (!b && this.contains(si)) {
			this.select();
		}

		var el = this.getElement();
		if (el) {
			ce = this.getChildrenElement();
			if (ce) {
				ce.style.display = b ? "block" : "none";
			}
			var eie = this.getExpandIconElement();
			if (eie) {
				eie.src = this.getExpandIconSrc();
			}
		}

		if (webFXTreeTableConfig.usePersistence) {
			webFXTreeTableHandler.persistenceManager.setExpanded(this, b);
		}
	} else {
		ce = this.getChildrenElement();
		if (ce)
			ce.style.display = "none";
	}
	if (t && t.getBehavior() == "classic") {
		this.updateIcon();
	}
};

_p.toggle = function () {
	this.setExpanded(!this.getExpanded());
};

_p.expand = function () {
	this.setExpanded(true);
};

_p.collapse = function () {
	this.setExpanded(false);
};

_p.collapseChildren = function () {
	var cs = this.childNodes;
	for (var i = 0; i < cs.length; i++) {
		cs[i].collapseAll();
	}
};

_p.collapseAll = function () {
	this.collapseChildren();
	this.collapse();
};

_p.expandChildren = function () {
	var cs = this.childNodes;
	for (var i = 0; i < cs.length; i++) {
		cs[i].expandAll();
	}
};

_p.expandAll = function () {
	this.expandChildren();
	this.expand();
};

_p.reveal = function () {
	var p = this.getParent();
	if (p) {
		p.setExpanded(true);
		p.reveal();
	}
};

_p.openPath = function (sPath, bSelect, bFocus) {
	if (sPath == "") {
		if (bSelect) {
			this.select();
		}
		if (bFocus) {
			window.setTimeout("WebFXTreeTableAbstractNode._onTimeoutFocus(\"" + this.id + "\")", 10);
		}
		return;
	}

	var parts = sPath.split("/");
	var remainingPath = parts.slice(1).join("/");
	var t = this.getTree();
	if (sPath.charAt(0) == "/") {
		if (t) {
			t.openPath(remainingPath, bSelect, bFocus);
		} else {
			throw "Invalid path";
		}
	} else {
		// open
		this.setExpanded(true);
		parts = sPath.split("/");
		var ti = this.findChildByText(parts[0]);
		if (!ti) {
			throw "Could not find child node with text \"" + parts[0] + "\"";
		}
		ti.openPath(remainingPath, bSelect, bFocus);
	}
};

_p.focus = function () {
	var el = this.getLabelElement();
	if (el) {
		try{
			el.focus();
		}catch(e){
		}
	}
};

_p.getFocused = function () {
	return this._focused;
};

_p._setTabIndex = function (i) {
	var a = this.getLabelElement();
	if (a) {
		a.setAttribute("tabindex", i);
	}
};


// HTML generation

_p.toHtml = function () {
	var sb = [];
	var cs = this.childNodes;
	var l = cs.length;
	for (var y = 0; y < l; y++) {
		sb[y] = cs[y].toHtml();
	}

	var t = this.getTree();
	var hideLines = !t.getShowLines() || t == this.parentNode && !t.getShowRootLines();

	var childrenHtml = "<div class=\"webfx-tree-children-nolines tree-table" + "\" style=\"" +
		this.getLineStyle() +
		(this.getExpanded() && this.hasChildren() ? "" : "display:none;") +
		"\">" +
		sb.join("") +
		"</div>";
	
	var result = null;
	if(t == this){
		result = "<table cellpadding='0' cellspacing='0' class='webfx-tree-item  tree-table' rootTable='true' varName='" + this.varName +
			"'>" + 
			this.getRowHtml() +
			"<tr><td colspan='100' align='left'>" +
			childrenHtml +
			"</td></tr>" +
			"</table>";

		var columns = t.columns;
		var width = t.width;
		for(var i=0; i<columns.length; i++) {
			if(columns[i].display==true){
				width += columns[i].width;
			}else{
			}
		}
		result = "<div style='text-align:left;width:"+width+"px;'>" + result + "</div>";
//		alert(result);
	}else{
		result = "<table style='table-layout:fixed;' cellpadding='0' cellspacing='0' class='webfx-tree-item  tree-table' rowId='" + this.id + 
			"' onclick='return webFXTreeTableHandler.handleTableEvent(event)' " +
			"varName='"+t.varName+"'>" +
			this.getRowHtml() +
			"<tr><td colspan='100' align='left'>" +
			childrenHtml +
			"</td></tr>" +
			"</table>";
	}
	return result;
};

_p.getIndentHtml = function(level){
	var indent = Math.max(0, (this.getDepth() - 1) * this.indentWidth);
	var h = "<span style='padding-left:" + indent + "px;'></span>";
	return h;
}

_p.getRowHtml = function () {
	var t = this.getTree();
	var isRoot = (this == t);
	var indent = 0;//Math.max(0, (this.getDepth() - 1) * this.indentWidth);
	var width = t.width - indent;
	
	var result = "<tr class='tree-table-row' style='height:19px;' rowId='"+this.getId()+"'>";
	if(isRoot){
		result += "<th nowrap class=\"tree-table-row-tree " + this.getRowClassName() + "\" style=\"text-align:left;width:"+width+"px;\">" +
//			this.getIndentHtml() +
//			this.getExpandIconHtml() +
			this.getIconHtml() +
			this.getLabelHtml() +
			"</th>";
		for(var i=0; i<this.columns.length; i++) {
			var column = this.columns[i];
			result += "<th class='tree-table-row-data' style='width:"+column.width+"px;'>";
			result += column.title;
			result += "</th>"
		}
	}else{
		result += "<td nowrap class=\"tree-table-row-tree " + this.getRowClassName() + "\" style=\"text-align:left;width:"+width+"px;\">" +
			this.getIndentHtml() +
			this.getExpandIconHtml() +
			this.getIconHtml() +
			this.getLabelHtml() +
			"</td>";
		for(var i=0; i<this.values.length; i++) {
			var column = this.getTree().columns[i];
			result += "<td class='tree-table-row-data' style='width:"+column.width+"px;text-align:"+column.align+";' colIndex='"+i+"'>";
			result += this.values[i]==null ? '&nbsp;' : this.values[i];
			result += "</td>"
		}
	}
	result += "</tr>"
	return result;
};

_p.getRowClassName = function () {
	return "webfx-tree-row" + (this.isSelected() ? " selected" : "") +
		(this.action ? "" : " no-action");
};

_p.getLabelHtml = function () {
	var toolTip = this.getToolTip();
	var target = this.getTarget();
	return "<a href=\"" + webFXTreeTableHandler.textToHtml(this._getHref()) +
		"\" class=\"webfx-tree-item-label\" tabindex=\"-1\"" +
		(toolTip ? " title=\"" + webFXTreeTableHandler.textToHtml(toolTip) + "\"" : "") +
		(target ? " target=\"" + target + "\"" : "") +
		" onfocus=\"webFXTreeTableHandler.handleEvent(event)\"" +
		" onblur=\"webFXTreeTableHandler.handleEvent(event)\">" +
		this.getHtml() + "</a>";
};

_p._getHref = function () {
	if (typeof this.action == "string")
		return this.action;
	else
		return "#";
};

_p.getEventHandlersHtml = function () {
	return "";
};

_p.getIconHtml = function () {
	// here we are not using textToHtml since the file names rarerly contains
	// HTML...
	return "<img class=\"webfx-tree-icon\" src=\"" + this.getIconSrc() + "\">";
};

_p.getIconSrc = function () {
	throw new Error("getIconSrc called on Abstract Node");
};

_p.getExpandIconHtml = function () {
	// here we are not using textToHtml since the file names rarerly contains
	// HTML...
	return "<a onmousedown='return webFXTreeTableHandler.handleEvent(event)'>"+
		"<img class=\"webfx-tree-expand-icon\" src=\"" +
		this.getExpandIconSrc() + "\"></a>";
};


_p.getExpandIconSrc = function () {
	var src;
	var t = this.getTree();
	var hideLines = !t.getShowLines() || t == this.parentNode && !t.getShowRootLines();

	if (this.hasChildren()) {
		var bits = 0;
		/*
			Bitmap used to determine which icon to use
			1  Plus
			2  Minus
			4  T Line
			8  L Line
		*/

		if (t && t.getShowExpandIcons()) {
			if (this.getExpanded()) {
				bits = 2;
			} else {
				bits = 1;
			}
		}

		if (t && !hideLines) {
			if (this.isLastSibling()) {
				bits += 4;
			} else {
				bits += 8;
			}
		}

		switch (bits) {
			case 1:
				return webFXTreeTableConfig.plusIcon;
			case 2:
				return webFXTreeTableConfig.minusIcon;
			case 4:
				return webFXTreeTableConfig.lIcon;
			case 5:
				return webFXTreeTableConfig.lPlusIcon;
			case 6:
				return webFXTreeTableConfig.lMinusIcon;
			case 8:
				return webFXTreeTableConfig.tIcon;
			case 9:
				return webFXTreeTableConfig.tPlusIcon;
			case 10:
				return webFXTreeTableConfig.tMinusIcon;
			default:	// 0
				return webFXTreeTableConfig.blankIcon;
		}
	} else {
		if (t && hideLines) {
			return webFXTreeTableConfig.blankIcon;
		} else if (this.isLastSibling()) {
			return webFXTreeTableConfig.lIcon;
		} else {
			return webFXTreeTableConfig.tIcon;
		}
	}
};

_p.getLineStyle = function () {
	return "background-position:" + this.getLineStyle2() + ";";
};

_p.getLineStyle2 = function () {
	return (this.isLastSibling() ? "-100" : (this.getDepth() - 1) * this.indentWidth) + "px 0";
};

// End HTML generation

// DOM
// this returns the div for the tree node
_p.getElement = function () {
	var e = document.getElementById(this.id);
//	if(e!=null)
//		alert("getElement\n" + e.tagName);
	return e;
};

// the row is the div that is used to draw the node without the children
_p.getRowElement = function () {
	var el = this.getElement();
	if (!el) return null;
	var e = el.rows[0];
	return e;//el.firstChild;
};

// plus/minus image
_p.getExpandIconElement = function () {
	var el = this.getRowElement();
	if (!el) return null;
	var e = el.cells[0].getElementsByTagName("IMG")[0];
	return e;//el.firstChild;
};

_p.getIconElement = function () {
	var el = this.getRowElement();
	if (!el) return null;
	var e = el.cells[0].getElementsByTagName("IMG")[1];
	return e;
};

// anchor element
_p.getLabelElement = function () {
	var el = this.getRowElement();
	if (!el) return null;
	var e = el.cells[0].lastChild;
	return e;
};

// the div containing the children
_p.getChildrenElement = function () {
	var el = this.getElement();
	if (!el) return null;
	return el.getElementsByTagName("DIV")[0];//el.lastChild;
};


// IE uses about:blank if not attached to document and this can cause Win2k3
// to fail
if (webFXTreeTableHandler.ie) {
	_p.create = function () {
		var dummy = document.createElement("div");
		dummy.style.display = "none";
		document.body.appendChild(dummy);
		dummy.innerHTML = this.toHtml();
		var res = dummy.removeChild(dummy.firstChild);
		document.body.removeChild(dummy);
		return res;
	};
} else {
	_p.create = function () {
		var dummy = document.createElement("div");
		dummy.innerHTML = this.toHtml();
		return dummy.removeChild(dummy.firstChild);
	};
}

// Getters and setters for some common fields

_p.setIcon = function (s) {
	this.icon = s;
	if (this.getCreated()) {
		this.updateIcon();
	}
};

_p.getIcon = function () {
	return this.icon;
};

_p.setOpenIcon = function (s) {
	this.openIcon = s;
	if (this.getCreated()) {
		this.updateIcon();
	}
};

_p.getOpenIcon = function () {
	return this.openIcon;
};

_p.setText = function (s) {
	this.setHtml(webFXTreeTableHandler.textToHtml(s));
};

_p.getText = function () {
	return webFXTreeTableHandler.htmlToText(this.getHtml());
};

_p.setHtml = function (s) {
	this.text = s;
	var el = this.getLabelElement();
	if (el) {
		el.innerHTML = s;
	}
};

_p.getHtml = function () {
	return this.text;
};

_p.setTarget = function (s) {
	this.target = s;
};

_p.getTarget = function () {
	return this.target;
};

_p.setToolTip = function (s) {
	this.toolTip = s;
	var el = this.getLabelElement();
	if (el) {
		el.title = s;
	}
};

_p.getToolTip = function () {
	return this.toolTip;
};

_p.setAction = function (oAction) {
	this.action = oAction;
	var el = this.getLabelElement();
	if (el) {
		el.href = this._getHref();
	}
	el = this.getRowElement();
	if (el) {
		el.className = this.getRowClassName();
	}
};

_p.getAction = function () {
	return this.action;
};

// update methods

_p.update = function () {
	var t = this.getTree();
	if (t.suspendRedraw) return;
	var el = this.getElement();
	if (!el || !el.parentNode) return;
	var newEl = this.create();
	el.parentNode.replaceChild(newEl, el);
	//this.setTabIndex(this.tabIndex); // in case root had the tab index
	var si = t.getSelected();
	if (si && si.getFocused()) {
		si.focus();
	}
};

_p.updateExpandIcon = function () {
	var t = this.getTree();
	if (t.suspendRedraw) return;
	var img = this.getExpandIconElement();
	img.src = this.getExpandIconSrc();
	var cel = this.getChildrenElement();
	cel.style.backgroundPosition = this.getLineStyle2();
};

_p.updateIcon = function () {
	var t = this.getTree();
	if (t.suspendRedraw) return;
	var img = this.getIconElement();
	img.src = this.getIconSrc();
};

// End DOM

_p._callSuspended = function (f) {
	var t = this.getTree();
	var sr = t.getSuspendRedraw();
	t.setSuspendRedraw(true);
	f.call(this);
	t.setSuspendRedraw(sr);
};

// Event handlers

_p._onmousedown = function (e) {
	var el = e.target || e.srcElement;
	// expand icon
	if (/webfx-tree-expand-icon/.test(el.className) && this.hasChildren()) {
		this.toggle();
		if (false && webFXTreeTableHandler.ie) {
			window.setTimeout("WebFXTreeTableAbstractNode._onTimeoutFocus(\"" + this.id + "\")", 10);
		}
		return false;
	}

	this.select();
	if (/*!/webfx-tree-item-label/.test(el.className) && */!webFXTreeTableHandler.opera)	{ // opera cancels the click if focus is called
		
		// in case we are not clicking on the label
		if (webFXTreeTableHandler.ie) {
			window.setTimeout("WebFXTreeTableAbstractNode._onTimeoutFocus(\"" + this.id + "\")", 10);
		} else {
			this.focus();
		}
	}
	var rowEl = this.getRowElement();
	if (rowEl) {
		rowEl.className = this.getRowClassName();
	}

	return false;
};

_p._onclick = function (e) {
	var el = e.target || e.srcElement;
	// expand icon
	if (/webfx-tree-expand-icon/.test(el.className) && this.hasChildren()) {
		return false;
	}
	
	if(this.action == null)
		return false;
	//alert(typeof this + "\n" + typeof this.action + "\n" + this.action);
	if (typeof this.action == "function" || this.action.indexOf('()')>0 ||  this.action.charAt(0) == 'j' && this.action.charAt(1)=='a' && this.action.charAt(2)=='v' && this.action.charAt(3)=='a' ) {
		var action2 = this.action.substr(11,this.action.length);
		try{
			eval(action2);
		}catch(e){
			e.description;
		}
	} else if (typeof this.action == "string") {
		//alert("string");
		window.open(this.action, this.target || "_self");
	}
	return false;
};


_p._ondblclick = function (e) {
	var el = e.target || e.srcElement;
	// expand icon
	if (/webfx-tree-expand-icon/.test(el.className) && this.hasChildren()) {
		return;
	}

	this.toggle();
};

_p._onfocus = function (e) {
	this.select();
	this._focused = true;
};

_p._onblur = function (e) {
	this._focused = false;
};

_p._onkeydown = function (e) {
	var n;
	var rv = true;
	switch (e.keyCode) {
		case 39:	// RIGHT
			if (e.altKey) {
				rv = true;
				break;
			}
			if (this.hasChildren()) {
				if (!this.getExpanded()) {
					this.setExpanded(true);
				} else {
					this.getFirstChild().focus();
				}
			}
			rv = false;
			break;
		case 37:	// LEFT
			if (e.altKey) {
				rv = true;
				break;
			}
			if (this.hasChildren() && this.getExpanded()) {
				this.setExpanded(false);
			} else {
				var p = this.getParent();
				var t = this.getTree();
				// don't go to root if hidden
				if (p && (t.showRootNode || p != t)) {
					p.focus();
				}
			}
			rv = false;
			break;

		case 40:	// DOWN
			n = this.getNextShownNode();
			if (n) {
				n.focus();
			}
			rv = false;
			break;
		case 38:	// UP
			n = this.getPreviousShownNode()
			if (n) {
				n.focus();
			}
			rv = false;
			break;
	}

	if (!rv && e.preventDefault) {
		e.preventDefault();
	}
	e.returnValue = rv;
	return rv;
};

_p._onkeypress = function (e) {
	if (!e.altKey && e.keyCode >= 37 && e.keyCode <= 40) {
		if (e.preventDefault) {
			e.preventDefault();
		}
		e.returnValue = false;
		return false;
	}
};

// End event handlers

_p.dispose = function () {
	if (this.disposed) return;
	for (var i = this.childNodes.length - 1; i >= 0; i--) {
		this.childNodes[i].dispose();
	}
	this.tree = null;
	this.parentNode = null;
	this.childNodes = null;
	this.disposed = true;
};

// Some methods that are usable when navigating the tree using the arrows
_p.getLastShownDescendant = function () {
	if (!this.getExpanded() || !this.hasChildren()) {
		return this;
	}
	// we know there is at least 1 child
	return this.getLastChild().getLastShownDescendant();
};

_p.getNextShownNode = function () {
	if (this.hasChildren() && this.getExpanded()) {
		return this.getFirstChild();
	} else {
		var p = this;
		var next;
		while (p != null) {
			next = p.getNextSibling();
			if (next != null) {
				return next;
			}
			p = p.getParent();
		}
		return null;
	}
};

_p.getPreviousShownNode = function () {
	var ps = this.getPreviousSibling();
	if (ps != null) {
		return ps.getLastShownDescendant();
	}
	var p = this.getParent();
	var t = this.getTree();
	if (!t.showRootNode && p == t) {
		return null;
	}
	return p;
};







///////////////////////////////////////////////////////////////////////////////
// WebFXTreeTable
///////////////////////////////////////////////////////////////////////////////

function WebFXTreeTable(sText, oAction, sBehavior, sIcon, sOpenIcon) {
	WebFXTreeTableAbstractNode.call(this, sText, oAction);
	if (sIcon) this.icon = sIcon;
	if (sOpenIcon) this.openIcon = sOpenIcon;
	if (sBehavior) this.behavior = sBehavior;
	
	this.closeSameLevel = false;
	
	this.varName = 'treetable1';
	this.editDivBox = null;
	
	this.selectedRow = null;
	this.selectedCell = null;
	
	this.title = "Tree";
	this.width = 250;
	this.columns = [];
	this.level = 0;
	this.isRoot = true;
}

_p = WebFXTreeTable.prototype = new WebFXTreeTableAbstractNode;
_p.indentWidth = 19;
_p.open = true;
_p._selectedItem = null;
_p._fireChange = true;
_p.rendered = false;
_p.suspendRedraw = false;
_p.showLines = false;
_p.showExpandIcons = true;
_p.showRootNode = true;
_p.showRootLines = false;

_p.getTree = function () {
	return this;
};

_p.initEditDivBox = function(){
	this.editDivBox = document.createElement("DIV"); 
	this.editDivBox.id = varName + "_DIV"; 
	this.editDivBox.style.wordWrap = "break-word";
//	this.nowDivEditBox.style.backgroundColor = "white";
	this.editDivBox.style.position = "absolute"; 
	this.editDivBox.style.width = "100px";
	this.editDivBox.style.Height = "100px";
	this.editDivBox.style.display = "none";
	this.editDivBox.innerHTML = "";
	this.editDivBox .className="selectionbackground";
	document.body.appendChild(this.editDivBox);
}

_p.setSelectedRow = function(row){
	if(this.selectedRow == row)return;
	webFXTreeTableHandler.AC(this.selectedRow,'trBgcolor','trBgcolorCur');
	this.selectedRow = row;
	webFXTreeTableHandler.AC(this.selectedRow,'trBgcolorCur','trBgcolor');
}

_p.setSelectedCell = function(cell){
	if(this.selectedCell == cell)return;
	webFXTreeTableHandler.DC(this.selectedCell,'tdBgcolorCur');
	if(cell.className.indexOf("tree-table-row-tree")>=0){
		this.selectedCell = null;
	}else{
		this.selectedCell = cell;
		webFXTreeTableHandler.AC(this.selectedCell,'tdBgcolorCur');
	}
}

_p.setVarName = function(name){
	this.varName = name;
}

//
_p.setCloseSameLevel = function(bool){
	this.closeSameLevel = (bool ? true : false);
}

_p.isCloseSameLevel = function(){
	return ((this.closeSameLevel===null || this.closeSameLevel===true) ? true : false);
}

_p.getDepth = function () {
	return 0;
};

_p.getCreated = function () {
	return this.rendered;
};


/* end tree model */

_p.getExpanded = function () {
	return !this.showRootNode || WebFXTreeTableAbstractNode.prototype.getExpanded.call(this);
};

_p.setExpanded = function (b) {
	if (!this.showRootNode) {
		this.open = b;
	} else {
		WebFXTreeTableAbstractNode.prototype.setExpanded.call(this, b);
	}
};

_p.getExpandIconHtml = function () {
	return "";
};

// we don't have an expand icon here
_p.getIconElement = function () {
	var el = this.getRowElement();
	if (!el) return null;
	return el.firstChild;
};

// no expand icon for root element
_p.getExpandIconElement = function (oDoc) {
	return null;
};

_p.updateExpandIcon = function () {
	// no expand icon
};

_p.getRowClassName = function () {
	return WebFXTreeTableAbstractNode.prototype.getRowClassName.call(this) +
		(this.showRootNode ? "" : " webfx-tree-hide-root");
};


// if classic then the openIcon is used for expanded, otherwise openIcon is used
// for selected

_p.getIconSrc = function () {
	var behavior = this.getTree() ? this.getTree().getBehavior() : webFXTreeTableConfig.defaultBehavior;
	var open = behavior == "classic" && this.getExpanded() ||
			   behavior != "classic" && this.isSelected();
	if (open && this.openIcon) {
		return this.openIcon;
	}
	if (!open && this.icon) {
		return this.icon;
	}
	// fall back on default icons
	return open ? webFXTreeTableConfig.openRootIcon : webFXTreeTableConfig.rootIcon;
};

_p.getEventHandlersHtml = function () {
	return " onmousedown=\"return webFXTreeTableHandler.handleEvent(event)\" ";
//	return " onclick=\"return webFXTreeTableHandler.handleEvent(event)\" "
//		+ "onmousedown=\"return webFXTreeTableHandler.handleEvent(event)\" "
//		+ "ondblclick=\"return webFXTreeTableHandler.handleEvent(event)\" "
//		+ "onkeydown=\"return webFXTreeTableHandler.handleEvent(event)\" "
//		+ "onkeypress=\"return webFXTreeTableHandler.handleEvent(event)\"";
};

_p.setSelected = function (o) {
	if (this._selectedItem != o && o) {
		o._setSelected(true);
	}
};

_p._fireOnChange = function () {
	if (this._fireChange && typeof this.onchange == "function") {
		this.onchange();
	}
};

_p.getSelected = function () {
	return this._selectedItem;
};

_p.tabIndex = "";

_p.setTabIndex = function (i) {
	var n = this._selectedItem || (this.showRootNode ? this : this.firstChild);
	this.tabIndex = i;
	if (n) {
		n._setTabIndex(i);
	}	
};

_p.getTabIndex = function () {
	return this.tabIndex;
};

_p.setBehavior = function (s) {
	this.behavior = s;
};

_p.getBehavior = function () {
	return this.behavior || webFXTreeTableConfig.defaultBehavior;
};

_p.setShowLines = function (b) {
	if (this.showLines != b) {
		this.showLines = b;
		if (this.rendered) {
			this.update();
		}
	}
};

_p.getShowLines = function () {
	return this.showLines;
};

_p.setShowRootLines = function (b) {
	if (this.showRootLines != b) {
		this.showRootLines = b;
		if (this.rendered) {
			this.update();
		}
	}
};

_p.getShowRootLines = function () {
	return this.showRootLines;
};

_p.setShowExpandIcons = function (b) {
	if (this.showExpandIcons != b) {
		this.showExpandIcons = b;
		if (this.rendered) {
			this.getTree().update();
		}
	}
};

_p.getShowExpandIcons = function () {
	return this.showExpandIcons;
};

_p.setShowRootNode = function (b) {
	if (this.showRootNode != b) {
		this.showRootNode = b;
		if (this.rendered) {
			this.getTree().update();
		}
	}
};

_p.getShowRoootNode = function () {
	return this.showRootNode;
};

_p.onchange = function () {};

_p.create = function () {
	var el = WebFXTreeTableAbstractNode.prototype.create.call(this);
	this.setTabIndex(this.tabIndex);
	this.rendered = true;
	return el;
};

_p.write = function () {
	document.write(this.toHtml());
	this.setTabIndex(this.tabIndex);
	this.rendered = true;
};

_p.setSuspendRedraw = function (b) {
	this.suspendRedraw = b;
};

_p.getSuspendRedraw = function () {
	return this.suspendRedraw;
};



///////////////////////////////////////////////////////////////////////////////
// WebFXTreeTableItem
///////////////////////////////////////////////////////////////////////////////

function WebFXTreeTableItem(sText, oAction, eParent, sIcon, sOpenIcon) {
	WebFXTreeTableAbstractNode.call(this, sText, oAction);
	if (sIcon) this.icon = sIcon;
	if (sOpenIcon) this.openIcon = sOpenIcon;
	if (eParent) eParent.add(this);
}

_p = WebFXTreeTableItem.prototype = new WebFXTreeTableAbstractNode;
_p.tree = null;

/* tree model */
_p.setValues = function(vs){
	this.values = vs;
}

_p.getDepth = function () {
	if (this.depth != null) {
		return this.depth;
	}
	if (this.parentNode) {
		var pd = this.parentNode.getDepth();
		return this.depth = (pd != null ? pd + 1 : null);
	}
	return null;
};

_p.getTree = function () {
	if (this.tree) {
		return this.tree;
	}
	if (this.parentNode) {
		return this.tree = this.parentNode.getTree();
	}
	return null;
};

_p.getCreated = function () {
	var t = this.getTree();
	return t && t.getCreated();
};

// if classic then the openIcon is used for expanded, otherwise openIcon is used
// for selected
_p.getIconSrc = function () {
	var behavior = this.getTree() ? this.getTree().getBehavior() : webFXTreeTableConfig.defaultBehavior;
	var open = behavior == "classic" && this.getExpanded() ||
	           behavior != "classic" && this.isSelected();
	if (open && this.openIcon) {
		return this.openIcon;
	}
	if (!open && this.icon) {
		return this.icon;
	}

	// fall back on default icons
	if (this.hasChildren()) {
		return open ? webFXTreeTableConfig.openFolderIcon : webFXTreeTableConfig.folderIcon;
	}
	return webFXTreeTableConfig.fileIcon;
};

/* end tree model */




if (window.attachEvent) {
	window.attachEvent("onunload", function () {
		for (var id in webFXTreeTableHandler.all)
			webFXTreeTableHandler.all[id].dispose();
	});
}
