webFXTreeConfig.loadingText = "Loading...";
//checked=-1表示disabled
function WebFXLoadCheckTree(sText, sXmlSrc, oAction, sBehavior, sIcon, sOpenIcon, checkboxName, checked) {

	WebFXTree.call(this, sText, oAction, sBehavior, sIcon, sOpenIcon);

	// setup default property values
	this.src = sXmlSrc;
	this.loading = !sXmlSrc;
	this.loaded = !sXmlSrc;
	this.errorText = "";
	
	this.config = {
		useCheckbox : true
		,ancestor : true
		,semiSelect : true
		,onlyLeaf : false
		,rootCheckbox : true
		,callback : null
		,use3State : true
	};
	this.checkbox = null;
	this.checked = this.config.rootCheckbox ? (typeof(checked)=='undefined' ? -2 : checked) : -1;
	this.checkboxName = (checkboxName ? checkboxName : "ids");
	this.stateChanged = false;
	
	this.checkboxName2 = "unsubmit_chk";

	if (this.src ) {
		/// add loading Item
		this._loadingItem = WebFXLoadCheckTree.createLoadingItem();
		this.add(this._loadingItem);

		if (this.getExpanded()) {
			WebFXLoadCheckTree.loadXmlDocument(this);
		}
	}
}

WebFXLoadCheckTree.createLoadingItem = function () {
	return new WebFXTreeItem(webFXTreeConfig.loadingText, null, null,
							 webFXTreeConfig.loadingIcon);
};

_p = WebFXLoadCheckTree.prototype = new WebFXTree;

_p.setCallback = function(fn){
//	alert(fn);
	this.config.callback = fn;
}

_p.setExpanded = function (b) {
	WebFXTree.prototype.setExpanded.call(this, b);

	if (this.src && b) {
		if (!this.loaded && !this.loading) {
			// load
			WebFXLoadCheckTree.loadXmlDocument(this);
		}
	}
};

_p.setRelative = function(b){
	this.config.ancestor = (b ? true : false);
}
_p.enableRelative = function(b){
	this.config.ancestor = (b ? true : false);
}

/**
 * a : 是否包括半选
 * b : (无效)
 * c : 只取叶子节点
 * */
_p.getAllChecked = function(a, b, c){
	//b : 父节点(不)选中, 不遍历子节点(未实现)
	var alll = [];
	var cs = this.childNodes;
	if(typeof c=='undefined')
		c = false;
	if(c==true)
		a = false;
	if(cs!=null && cs.length>0){
		for(var i=0; i<cs.length; i++) {
			var child = cs[i];
			child.getAllChecked(alll, a, b, c);
		}
	}
	return alll;
}

/**取树上的所有叶子节点(含未展开的非末级节点)*/
_p.getAllTreeLeafChecked = function(semi){
	var ar = [];
	var cs = this.childNodes;
	if(cs==null || cs.length<=0)
		return ar;
	semi = semi ? true : false;
	for(var i=0; i<cs.length; i++){
		var child = cs[i];
		child.getAllTreeLeafChecked(ar, semi);
	}
	return ar;
}

/**所有未展开的半选节点*/
_p.getAllUnExpandedSemiChecked = function(){
	var ar = [];
	var cs = this.childNodes;
	if(cs==null || cs.length<=0)
		return ar;
	for(var i=0; i<cs.length; i++){
		var child = cs[i];
		child.getAllUnExpandedSemiChecked(ar);
	}
	return ar;
}

/**所有选中的分支节点*/
_p.getAllCheckedBranch = function(){
	var ar = [];
	var cs = this.childNodes;
	if(cs==null || cs.length<=0)
		return ar;
	for(var i=0; i<cs.length; i++){
		var child = cs[i];
		child.getAllCheckedBranch(ar);
	}
	return ar;
}


function WebFXLoadCheckTreeItem(sText, sXmlSrc, oAction, eParent, sIcon, sOpenIcon, checked) {
	WebFXTreeItem.call(this, sText, oAction, eParent, sIcon, sOpenIcon);

// setup default property values
	this.src = sXmlSrc;
	this.loading = !sXmlSrc;
	this.loaded = !sXmlSrc;
	this.errorText = "";
	
	this.checked = (typeof(checked)=='undefined' ? -2 : checked);
	this.checkbox = null;
	this.stateChanged = false;
//	this.code 
	this.originalChecked = -3;
	this.hidden = null;

	if (this.src) {
		/// add loading Item
		this._loadingItem = WebFXLoadCheckTree.createLoadingItem();
		this.add(this._loadingItem);

		if (this.getExpanded()) {
			WebFXLoadCheckTree.loadXmlDocument(this);
		}
	}
}

_p = WebFXLoadCheckTreeItem.prototype = new WebFXTreeItem;


_p.getAllTreeLeafChecked = function(ar, semi){
	if(this.checked==1){
		if(this.isLeaf || !this.loaded){
			ar[ar.length] = this.id;
			return;
		}
	}else if(semi && this.checked==2){
		if(this.isLeaf || !this.loaded){
			ar[ar.length] = this.id;
			return;
		}
	}
	var cs = this.childNodes;
	if(cs==null || cs.length<=0)
		return;
	for(var i=0; i<cs.length; i++){
		var child = cs[i];
		if(child.getAllTreeLeafChecked)
			child.getAllTreeLeafChecked(ar, semi);
	}
}

_p.getAllUnExpandedSemiChecked = function(ar){
	if(this.checked != 2)
		return;
	if(!this.loaded){
		ar[ar.length] = this.id;
		return;
	}
	var cs = this.childNodes;
	if(cs==null || cs.length<=0)
		return;
	for(var i=0; i<cs.length; i++){
		var child = cs[i];
		if(child.getAllUnExpandedSemiChecked)
			child.getAllUnExpandedSemiChecked(ar);
	}
}

_p.getAllCheckedBranch = function(ar){
	if(this.checked == 1){
		ar[ar.length] = this.id;
		return;
	}else if(this.checked != 2){
		return;
	}
	if(!this.loaded){
		return;
	}
	var cs = this.childNodes;
	if(cs==null || cs.length<=0)
		return;
	for(var i=0; i<cs.length; i++){
		var child = cs[i];
		if(child.getAllCheckedBranch)
			child.getAllCheckedBranch(ar);
	}
}

/**
 * ar : 结果
 * a  : 含半选
 * b  : 父节点选中, 不遍历子节点(无效)
 * c  : 只要叶子节点
 * */
_p.getAllChecked = function(ar, a, b, c){
	if(this.checked==1){
		if(!c || c==true && this.isLeaf==true)
			ar[ar.length] = this.id;
	}else if(this.checked==2 && a==true){
		ar[ar.length] = this.id;
	}
	var cs = this.childNodes;
	if(cs!=null && cs.length>0){
		for(var i=0; i<cs.length; i++) {
			var child = cs[i];
			if(child.getAllChecked)
				child.getAllChecked(ar, a, b, c);
		}
	}
	return;
/*	
	var c = (this.getTree().config.ancestor==true);		//上下级是否有关系
	if(this.checked==0){
		if(c)return;			//上下级关联, 上级不选, 子级不可能选中
	}else if(this.checked==1){
		ar[ar.length] = this.id;
		if(c && b){
			return;
		}
	}else if(this.checked==2 && a==true){
		//半选
		if(a)
			ar[ar.length] = this.id;
	}else{
		return;
	}
	if(this.childNodes!=null && this.childNodes.length>0){
		for(var i=0; i<this.childNodes.length; i++) {
			this.childNodes[i].getAllChecked(ar, a, b);
		}
	}
*/
}

_p.setOriginalChecked = function(checked){
	if(checked<=2 && checked>=0 && this.originalChecked==-3)
		this.originalChecked = checked;
}

_p.setExpanded = function (b) {
	WebFXTreeItem.prototype.setExpanded.call(this, b);

	if (this.src && b) {
		if (!this.loaded && !this.loading) {
			// load
			WebFXLoadCheckTree.loadXmlDocument(this);
		}
	}
};

// reloads the src file if already loaded
WebFXLoadCheckTree.prototype.reload =
_p.reload = function () {
	// if loading do nothing
	if (this.loaded) {
		var t = this.getTree();
		var expanded = this.getExpanded();
		var sr = t.getSuspendRedraw();
		t.setSuspendRedraw(true);

		// remove
		while (this.childNodes.length > 0) {
			this.remove(this.childNodes[this.childNodes.length - 1]);
		}

		this.loaded = false;

		this._loadingItem = WebFXLoadCheckTree.createLoadingItem();
		this.add(this._loadingItem);

//		this.alertNode("reload");
		if (expanded) {
			this.checked = -2;
//			this.stateChanged = false;
			this.setExpanded(true);
		}

		t.setSuspendRedraw(sr);
		this.update();
		if(!expanded && this.checked==2){
			this.setCheckedState(2);
		}
//		this.alertNode("after reload")
	} else if (this.open && !this.loading) {
		WebFXLoadCheckTree.loadXmlDocument(this);
	}
};



WebFXLoadCheckTree.prototype.setSrc =
_p.setSrc = function (sSrc) {
	var oldSrc = this.src;
	if (sSrc == oldSrc) return;

	var expanded = this.getExpanded();

	// remove all
	this._callSuspended(function () {
		// remove
		while (this.childNodes.length > 0)
			this.remove(this.childNodes[this.childNodes.length - 1]);
	});
	this.update();

	this.loaded = false;
	this.loading = false;
	if (this._loadingItem) {
		this._loadingItem.dispose();
		this._loadingItem = null;
	}
	this.src = sSrc;

	if (sSrc) {
		this._loadingItem = WebFXLoadCheckTree.createLoadingItem();
		this.add(this._loadingItem);
	}

	this.setExpanded(expanded);
};

WebFXLoadCheckTree.prototype.getSrc =
_p.getSrc = function () {
	return this.src;
};

WebFXLoadCheckTree.prototype.dispose = function () {
	WebFXTree.prototype.dispose.call(this);
	if (this._xmlHttp)
	{
		if (this._xmlHttp.dispose) {
			this._xmlHttp.dispose();
		}
		try {
			this._xmlHttp.onreadystatechange = null;
			this._xmlHttp.abort();
		} catch (ex) {}
		this._xmlHttp = null;
	}
};

_p.dispose = function () {
	WebFXTreeItem.prototype.dispose.call(this);
	if (this._xmlHttp) {
		if (this._xmlHttp.dispose) {
			this._xmlHttp.dispose();
		}
		try {
			this._xmlHttp.onreadystatechange = null;
			this._xmlHttp.abort();
		} catch (ex) {}
		this._xmlHttp = null;
	}
};


// The path is divided by '/' and the item is identified by the text
WebFXLoadCheckTree.prototype.openPath =
_p.openPath = function (sPath, bSelect, bFocus) {
	// remove any old pending paths to open
	delete this._pathToOpen;
	//delete this._pathToOpenById;
	this._selectPathOnLoad = bSelect;
	this._focusPathOnLoad = bFocus;

	if (sPath == "") {
		if (bSelect) {
			this.select();
		}
		if (bFocus) {
			window.setTimeout("WebFXTreeAbstractNode._onTimeoutFocus(\"" + this.getId() + "\")", 10);
		}
		return;
	}

	var parts = sPath.split("/");
	var remainingPath = parts.slice(1).join("/");

	if (sPath.charAt(0) == "/") {
		this.getTree().openPath(remainingPath, bSelect, bFocus);
	} else {
		// open
		this.setExpanded(true);
		if (this.loaded) {
			parts = sPath.split("/");
			var ti = this.findChildByText(parts[0]);
			if (!ti) {
				throw "Could not find child node with text \"" + parts[0] + "\"";
			}

			ti.openPath(remainingPath, bSelect, bFocus);
		} else {
			this._pathToOpen = sPath;
		}
	}
};

WebFXLoadCheckTree._attrs = ["text", "src", "action", "id", "target", "isLeaf", "checked", "value"];

WebFXLoadCheckTree.createItemFromElement = function (oNode) {
	var jsAttrs = {};
	var domAttrs = oNode.attributes;
	var i, l;

	l = domAttrs.length;
	for (i = 0; i < l; i++) {
		if (domAttrs[i] == null) {
			continue;
		}
		jsAttrs[domAttrs[i].nodeName] = domAttrs[i].nodeValue;
	}

	var name, val;
	for (i = 0; i < WebFXLoadCheckTree._attrs.length; i++) {
		name = WebFXLoadCheckTree._attrs[i];
		value = oNode.getAttribute(name);
		if (value) {
			jsAttrs[name] = value;
		}
	}

	var action;
	if (jsAttrs.onaction) {
		action = new Function(jsAttrs.onaction);
	} else if (jsAttrs.action) {
		action = jsAttrs.action;
	}
	
	var jsNode = new WebFXLoadCheckTreeItem(jsAttrs.html || "", jsAttrs.src, action,
									   null, jsAttrs.icon, jsAttrs.openIcon, jsAttrs.checked);
	if (jsAttrs.text) {
		jsNode.setText(jsAttrs.text);
	}
	jsNode.setOriginalChecked(jsAttrs.checked);
	if (jsAttrs.target) {
		jsNode.target = jsAttrs.target;
	}
	if (jsAttrs.id) {
		jsNode.setId(jsAttrs.id);
	}
	if(jsAttrs.value){
		jsNode.value = value;
	}
	if (jsAttrs.toolTip) {
		jsNode.toolTip = jsAttrs.toolTip;
	}
	if (jsAttrs.expanded) {
		jsNode.setExpanded(jsAttrs.expanded != "false");
	}
	if (jsAttrs.onload) {
		jsNode.onload = new Function(jsAttrs.onload);
	}
	if (jsAttrs.onerror) {
		jsNode.onerror = new Function(jsAttrs.onerror);
	}
	
	jsNode.attributes = jsAttrs;

	var isLeaf = (jsAttrs['isLeaf']=="true");
	if(isLeaf){
		jsNode.isLeaf = true;
		if(jsNode._loadingItem)
			jsNode._loadingItem.remove();
//		jsNode.src = null;
//		jsNode.setExpanded(jsNode,true);
//		return jsNode;
	}

	// go through childNodes
	var cs = oNode.childNodes;
	l = cs.length;
	for (i = 0; i < l; i++) {
		if (!isLeaf && cs[i].tagName == "tree") {
			jsNode.add(WebFXLoadCheckTree.createItemFromElement(cs[i]));
		}else if(cs[i].tagName == "infos"){
			WebFXLoadCheckTree.loadNodeInfo(jsNode, cs[i].childNodes);
		}
		
	}

	return jsNode;
};

WebFXLoadCheckTree.loadNodeInfo = function(jsNode, infos){
	var l = infos.length;
	for(var i=0; i<l; i++) {
		var info = infos[i];
		if(info.tagName != "info")
			continue;
		var key = info.getAttribute("key");
		if(key==null || key=="")
			continue;
		var value = info.getAttribute("value");
		var type = info.getAttribute("type");
		if(type == "number"){
			value = Number(value);
		}else if(type == "boolean"){
			value = ("true" == value);
		}
//		alert(key + "=" + value + "(" + type);
		jsNode.addInfo(key, value);
	}
}

WebFXLoadCheckTree.loadXmlDocument = function (jsNode) {
	if (jsNode.loading || jsNode.loaded) {
		return;
	}
	jsNode.loading = true;
	var id = jsNode.getId();
	jsNode._xmlHttp = window.XMLHttpRequest ? new XMLHttpRequest : new window.ActiveXObject("Microsoft.XmlHttp");
	jsNode._xmlHttp.open("GET", jsNode.src, true);	// async
	jsNode._xmlHttp.onreadystatechange = new Function("WebFXLoadCheckTree._onload(\"" + id + "\")");

	// call in new thread to allow ui to update
	window.setTimeout("WebFXLoadCheckTree._ontimeout(\"" + id + "\")", 10);
};

WebFXLoadCheckTree._onload = function (sId) {

	var jsNode = webFXTreeHandler.all[sId];
	if (jsNode._xmlHttp.readyState == 4) {
		WebFXLoadCheckTree.documentLoaded(jsNode);
		WebFXLoadCheckTreeQueue.remove(jsNode);
		if (jsNode._xmlHttp.dispose)
			jsNode._xmlHttp.dispose();
		jsNode._xmlHttp = null;
	}
};

WebFXLoadCheckTree._ontimeout = function (sId) {
	var jsNode = webFXTreeHandler.all[sId];
	WebFXLoadCheckTreeQueue.add(jsNode);
};



// Inserts an xml document as a subtree to the provided node
WebFXLoadCheckTree.documentLoaded = function (jsNode) {
	if (jsNode.loaded) {
		return;
	}

	jsNode.errorText = "";
	jsNode.loaded = true;
	jsNode.loading = false;

	var t = jsNode.getTree();
	var oldSuspend = t.getSuspendRedraw();
	t.setSuspendRedraw(true);

	var doc = jsNode._xmlHttp.responseXML;
	
	// check that the load of the xml file went well
	if(!doc || doc.parserError && doc.parseError.errorCode != 0 || !doc.documentElement) {
		if (!doc || doc.parseError.errorCode == 0) {
			try{
				jsNode.errorText = "Error loading " + jsNode.src + " (" + jsNode._xmlHttp.status + ": " + jsNode._xmlHttp.statusText + ")";
			}catch(e){};
		} else {
			jsNode.errorText = "Error loading " + jsNode.src + " (" + doc.parseError.reason + ")";
		}
	} else {
	
		// there is one extra level of tree elements
		var root = doc.documentElement;

		// loop through all tree children
		var count = 0;
		var cs = root.childNodes;
		var l = cs.length;
		for (var i = 0; i < l; i++) {
			if (cs[i].tagName == "tree") {
				jsNode.add(WebFXLoadCheckTree.createItemFromElement(cs[i]));
				count++;
			}
		}

		// if no children we got an error
		//if (count == 0) {
		//	jsNode.errorText = "Error loading " + jsNode.src + " (???)";
		//}
	}

	if (jsNode.errorText != "") {
		jsNode._loadingItem.icon = "images/exclamation.16.gif";
		jsNode._loadingItem.text = jsNode.errorText;
		jsNode._loadingItem.action = WebFXLoadCheckTree._reloadParent;
		jsNode._loadingItem.toolTip = "Click to reload";

		t.setSuspendRedraw(oldSuspend);

		jsNode._loadingItem.update();

		if (typeof jsNode.onerror == "function") {
			jsNode.onerror();
		}
	} else {
		// remove dummy
		if (jsNode._loadingItem != null) {
			jsNode.remove(jsNode._loadingItem);
		}

		if (jsNode._pathToOpen) {
			jsNode.openPath(jsNode._pathToOpen, jsNode._selectPathOnLoad, jsNode._focusPathOnLoad);
		}

		t.setSuspendRedraw(oldSuspend);
		jsNode.update();
		
		
		for(var i=0; i<jsNode.childNodes.length; i++) {
			var node = jsNode.childNodes[i];
			if(node.checked == 2){
				node.setCheckedState(2);
			}
		}
		if(jsNode.checked == 2){
			jsNode.setCheckedState(2);	
		}else if(jsNode.checked==-2){
//			jsNode.alertNode("document");
			var state = jsNode.getStateByChildren();
			jsNode.setCheckedState(state);
			jsNode.changeAncestorState();
		}
		if (typeof jsNode.onload == "function") {
			jsNode.onload();
		}

//		jsNode.alertNode("-------------------------------\n");
	}
};

WebFXLoadCheckTree._reloadParent = function () {
	this.getParent().reload();
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
WebFXTreeAbstractNode.prototype.getRowHtml = function () {
	var t = this.getTree();
	return "<div class=\"" + this.getRowClassName() + "\" style=\"padding-left:" +
		Math.max(0, (this.getDepth() - 1) * this.indentWidth) + "px\">" +
		this.getExpandIconHtml() +
		//"<span class=\"webfx-tree-icon-and-label\">" +
		this.getIconHtml() +
		(this.getCheckboxHtml ? this.getCheckboxHtml() : "") +
		"<span style=\"margin-left:-3px\">" +
		this.getLabelHtml() +
		"</span>" + 
		//"</span>" +
		"</div>";
};

WebFXTreeAbstractNode.prototype.saveCheckedState = function(){
	if(this.hidden==null)
		return ;
	this.hidden.value = String(this.originalChecked===null ? -3 : this.originalChecked) + "#" + this.checked;
//	if(!this.jText){
//		this.jText = this.getText();
//	}
//	this.setText(this.jText + "(" + this.hidden.value + ")");
}

WebFXTreeAbstractNode.prototype.add = function (oChild, oBefore) {
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
	
//	this.alertNode(oChild.getText() + "["+oChild.checked);
	
	if((this instanceof WebFXLoadCheckTree || this instanceof WebFXLoadCheckTreeItem) && this.getTree() && this.getTree().config.ancestor){
		if(this.stateChanged && this.checked!=-2 && (this.getCheckedState()==0 || this.checked == 1)){
//			this.alertNode("add22");
			oChild.checked = this.checked;
			oChild.stateChanged = true;
		}
//		if(this.checked==2){
//			this.alertNode("add");
//			oChild.alertNode("add");
//			this.checked = -2;
//		}
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

//	if(oChild.checked == 2){
//		alert(oChild.checked + "\n" + oChild.checkbox)
//		oChild.setCheckedState(oChild.checked);
//	}
	return oChild;
};

/**@param checkState
 * 	0	不选中
 * 	1	选中
 * 	2	半选中*/
WebFXTreeAbstractNode.prototype.setCheckedState = function(checkState){
	if(!this.isChieckTreeNode())return ;
	if(this.getCheckbox()==null){
		this.checked = checkState;
		return ;
	}
	if(this.checked == -1) return;//-1表示disabled
	var chk = this.getCheckbox();
	var root = this.getTree();
	var config = this.getTree().config;
	if(!config.use3State){
		this.checked = checkState ? 1 : 0;
		chk.checked = (checkState ? true : false);
		chk.indeterminate = false;
//		this.alertNode("not use 2 state");
	}else{
		if(checkState==0 || checkState==1){
			chk.checked = checkState ? true : false;
			chk.indeterminate = false;
//			if(checkState)
//				chk.style.border = "1px solid red";
//			else chk.style.border = "0px";
		}else if(checkState == 2){
			chk.indeterminate = true;
			if(this.getConfig().semiSelect){
				chk.checked = true;
//				chk.style.border = "1px dashed black";
			}
		}
		this.checked = checkState;
	}
	this.saveCheckedState();
}

WebFXTreeAbstractNode.prototype.getCheckedState = function(){
	if(!this.isChieckTreeNode())return -1;
	var chk = this.getCheckbox();
	if(chk==null){
//		alert(this.getText() + "\n" + this.id);
		return this.checked;
	}
	var c = -1;
	if(chk.indeterminate)
		c = 2;
	else
		c = (chk.checked ? 1 : 0);
	this.checked = c;
//	this.alertNode();
//	alert("getCheckedState:\n"+this.getText() + "\n" + this.checked)
	return c;
}

WebFXTreeAbstractNode.prototype.getConfig =function() {
	if(!this.isChieckTreeNode())return null;
	return this.getTree().config;
}

WebFXTreeAbstractNode.prototype.getCheckboxHtml = function(){
	if(this instanceof WebFXLoadCheckTree || this instanceof WebFXLoadCheckTreeItem){
		var root = this.getTree();
		if(this==root && root.config.useCheckbox && root.config.rootCheckbox || this!=root && root.config.useCheckbox){
			var chkName = this.checkboxName2?this.checkboxName2:root.checkboxName;
			var html = '<input onclick="return webFXTreeHandler.handleCheckboxEvent(event);" style="width:15px;height:15px;" id="UESEU_Checkbox'+this.id+'" name="'+chkName+'" value="'+(this.value || this.id)+'" type="checkbox" value="' + this.id +
			 '"  '+((this.checked==1 || this.checked==2&&root.config.semiSelect) ? 'checked' :'')+
			 '   '+((this.checked==-1) ? 'disabled' :'')+
			 '/>';
			var hvalue = String(this.originalChecked) + "#" + this.checked;
			html += '<input type="hidden" id="UESEU_Hidden'+this.id+'" name="CheckedState_' + this.id + '" value="'+hvalue+'">';
			return html;
		}
		return "";
	}
	return "";
}


WebFXTreeAbstractNode.prototype.isChieckTreeNode = function (){
	return this instanceof WebFXLoadCheckTree || this instanceof WebFXLoadCheckTreeItem;
}
WebFXTreeAbstractNode.prototype.getCheckbox = function(){
	if(this.checkbox && this.checkbox.offsetWidth){return this.checkbox;}
	if(!this.isChieckTreeNode()){alert("getCheckbox: not check tree node");return null;}
//	if(!this.rendered) {alert(this.rendered);return null;}
	var chk = document.getElementById("UESEU_Checkbox" + this.id);
	var hid = document.getElementById("UESEU_Hidden" + this.id);
	this.hidden = hid;
	this.checkbox = chk;
//	alert("getCheckbox:"+this.id);
	return this.checkbox;
}

WebFXTreeAbstractNode.prototype.alertNode = function(msg){
	var r = this.getText() + "(" + this.id + ")\n";
	var chk = this.getCheckbox();
	r += "\nchecked :" + this.checked;
	if(chk != null){
		r += "\ncheckbox:(" + chk.id + ")";
		r += "\n\tchecked :" + chk.checked;
		r += "\n\tindeterminate :" + chk.indeterminate;
	}
	var p = this.getParent();
	if(p != null){
		r += "\nparent:";
		r += "\n\tid :" + p.id;
		r += "\n\ttext :" + p.getText();
		r += "\n\tchecked :" + p.checked;
	}
	if(msg)
		r = msg + "\n" + r;
	alert(r);
}
/**
 * 使节点及其所有的子孙节点的选中状态与当前节点的选中状态一样
 * */
WebFXTreeAbstractNode.prototype.changeChildrenState = function(){
	if(!this.loaded)return ;
	var state = this.checked;
	for(var i=0; i<this.childNodes.length; i++) {
		var cnode = this.childNodes[i];
		cnode._changeChildrenState(state);
	}
}

WebFXTreeAbstractNode.prototype._changeChildrenState = function(state){
	if(!this.isChieckTreeNode())return ;
//	if(!this.getTree().config.ancestor)	return ;
	if(this.getCheckbox() == null)return ;
//	alert("changeChildrenState:" + state);
	this.setCheckedState(state);
	this.stateChanged = true;
	if(!this.loaded)return;
	if(this.childNodes.length==0)return ;
//	alert("changeChildrenState\n" + this.toHtml());
	var children = this.childNodes;
	for(var i=0; i<children.length; i++) {
		var child = children[i];
		var ostate = child.getCheckedState();
		if(ostate>=0 && ostate!=state)
			child._changeChildrenState(state);
	}
}
/**
 * 改变祖先节点的选中状态
 * */
WebFXTreeAbstractNode.prototype.changeAncestorState = function(){
//	alert("changeAncestorState");
//	if(!this.isChieckTreeNode())return ;
	var p = this.getParent();
	if(!p || p.getCheckbox()==null) return;
	var slibing = p.childNodes;
	var ostate = p.getCheckedState();
	var nstate = p.getStateByChildren();
//	alert(p.getText() + "\nchangeAncestorState\no: " + ostate + "\nn: " + nstate);
	if(ostate==nstate || nstate==-1)
		return;
	p.setCheckedState(nstate);
	p.changeAncestorState();
}

WebFXTreeAbstractNode.prototype.getStateByChildren=function(){
	var children = this.childNodes;
	var state = -1;
	for(var i=0; i<children.length; i++) {
		var cstate = children[i].getCheckedState();
		if(cstate == -1)continue;
		if(state == -1){
			state = cstate;
			continue;
		}
		if(state==0 && cstate==1 || state==1 && cstate==0 || cstate==2)
			return 2;
	}
	return state;
}

WebFXTreeAbstractNode.prototype.invokeCallback = function(){
	var root = this.getTree();
	if(typeof root.config.callback == 'function'){
		try{
			return root.config.callback(this.getId(), this.getText(), this.checked);
		}catch(e){
			alert(e.description);
		}
	}else if(typeof root.config.callback == 'string'){
		try{
			return eval(root.config.callback + "('" + this.getId() + "','" + this.getText() + "'," + this.checked + ")");
		}catch(e){
			alert(e.description);
		}
	}
}

webFXTreeHandler.handleCheckboxEvent = function(e){
	e = e ? e : window.event;
	var el = e.srcElement || e.target;
	if(el==null || el.type!='checkbox'){
		return false;
	}
	var id = el.id.substring(14);
	var node = webFXTreeHandler.all[id];
	if(node==null)
		return false;
//	alert(el.id + ":" + el.checked);
//	node.checkbox = el;

	var changeAncestor = true;
	var changeChildren = true; 
	if(!node.getConfig().ancestor){
		changeAncestor = false;
		changeChildren = false;
	}
	try{
		var result = node.invokeCallback();
		if(result==="false"){
			e.returnValue = false;
			return false;
		}else{
			if(result === "changeParent"){
//				node.getConfig().ancestor = false;
//				changeChildren = false;
//				changeAncestor = true;
			}else if(result === "changeChildren"){
				changeAncestor = false;
				changeChildren = true;
			}
		}
	}catch(e){
		
	}
	node.checked = (el.checked ? 1 : 0);
	node.getCheckbox();
	node.saveCheckedState();
	e.cancelBubble = true;
/*
	if(node.getConfig().ancestor){
		node.stateChanged = true;
		if(changeChildren)
			node.changeChildrenState();
		if(changeAncestor)
			node.changeAncestorState();
	}
*/
	node.stateChanged = true;
	if(changeChildren)
		node.changeChildrenState();
	if(changeAncestor)
		node.changeAncestorState();
	return true;
}


var WebFXLoadCheckTreeQueue = {
	_nodes: [],
	_ie: /msie/i.test(navigator.userAgent),
	_opera: /opera/i.test(navigator.userAgent),

	add: function (jsNode) {
		if (this._ie || this._opera) {
			this._nodes.push(jsNode);
			if (this._nodes.length == 1) {
				this._send();
			}
		} else {
			jsNode._xmlHttp.send(null);
		}
	},

	remove: function (jsNode) {
		if (this._ie || this._opera) {
			arrayHelper.remove(this._nodes, jsNode);
			if (this._nodes.length > 0) {
				this._send();
			}
		}
	},

	// IE only
	_send:	function () {
		var id = this._nodes[0].getId();
		var jsNode = webFXTreeHandler.all[id];
		if (!jsNode) {
			return;
		}
		// if no _xmlHttp then remove it
		if (!jsNode._xmlHttp) {
			this.remove(jsNode);
		} else {
			jsNode._xmlHttp.send(null);
		}
	}
};
