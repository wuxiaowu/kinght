/*----------------------------------------------------------------------------\
|                        XLoadTree 2 PRE RELEASE                              |
|                                                                             |
| This is a pre release and may not be redistributed.                         |
| Watch http://webfx.eae.net for the final version                            |
|                                                                             |
|-----------------------------------------------------------------------------|
|                   Created by Erik Arvidsson & Emil A Eklund                 |
|                  (http://webfx.eae.net/contact.html#erik)                   |
|                  (http://webfx.eae.net/contact.html#emil)                   |
|                      For WebFX (http://webfx.eae.net/)                      |
|-----------------------------------------------------------------------------|
| A tree menu system for IE 5.5+, Mozilla 1.4+, Opera 7.5+                    |
|-----------------------------------------------------------------------------|
|         Copyright (c) 1999 - 2005 Erik Arvidsson & Emil A Eklund            |
|-----------------------------------------------------------------------------|
| This software is provided "as is", without warranty of any kind, express or |
| implied, including  but not limited  to the warranties of  merchantability, |
| fitness for a particular purpose and noninfringement. In no event shall the |
| authors or  copyright  holders be  liable for any claim,  damages or  other |
| liability, whether  in an  action of  contract, tort  or otherwise, arising |
| from,  out of  or in  connection with  the software or  the  use  or  other |
| dealings in the software.                                                   |
| - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - |
| This  software is  available under the  three different licenses  mentioned |
| below.  To use this software you must chose, and qualify, for one of those. |
| - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - |
| The WebFX Non-Commercial License          http://webfx.eae.net/license.html |
| Permits  anyone the right to use the  software in a  non-commercial context |
| free of charge.                                                             |
| - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - |
| The WebFX Commercial license           http://webfx.eae.net/commercial.html |
| Permits the  license holder the right to use  the software in a  commercial |
| context. Such license must be specifically obtained, however it's valid for |
| any number of  implementations of the licensed software.                    |
| - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - |
| GPL - The GNU General Public License    http://www.gnu.org/licenses/gpl.txt |
| Permits anyone the right to use and modify the software without limitations |
| as long as proper  credits are given  and the original  and modified source |
| code are included. Requires  that the final product, software derivate from |
| the original  source or any  software  utilizing a GPL  component, such  as |
| this, is also licensed under the GPL license.                               |
|-----------------------------------------------------------------------------|
| 2004-02-21 | Pre release distributed to a few selected tester               |
| 2005-06-06 | Removed dependency on XML Extras                               |
|-----------------------------------------------------------------------------|
| Dependencies: xtree2.js Supplies the tree control                           |
|-----------------------------------------------------------------------------|
| Created 2003-??-?? | All changes are in the log above. | Updated 2004-06-06 |
\----------------------------------------------------------------------------*/


webFXTreeTableConfig.loadingText = "Loading...";



function WebFXLoadTreeTable(sText, sXmlSrc, oAction, sBehavior, sIcon, sOpenIcon) {

	WebFXTreeTable.call(this, sText, oAction, sBehavior, sIcon, sOpenIcon);

	// setup default property values
	this.src = sXmlSrc;
	this.loading = !sXmlSrc;
	this.loaded = !sXmlSrc;
	this.errorText = "";

	if (this.src ) {
		/// add loading Item
		this._loadingItem = WebFXLoadTreeTable.createLoadingItem();
		this.add(this._loadingItem);

		if (this.getExpanded()) {
			WebFXLoadTreeTable.loadXmlDocument(this);
		}
	}
}

WebFXLoadTreeTable.createLoadingItem = function () {
	return new WebFXTreeTableItem(webFXTreeTableConfig.loadingText, null, null,
							 webFXTreeTableConfig.loadingIcon);
};

_p = WebFXLoadTreeTable.prototype = new WebFXTreeTable;

_p.setExpanded = function (b) {
	WebFXTreeTable.prototype.setExpanded.call(this, b);

	if (this.src && b) {
		if (!this.loaded && !this.loading) {
			// load
			WebFXLoadTreeTable.loadXmlDocument(this);
		}
	}
};

function WebFXLoadTreeTableItem(sText, sXmlSrc, oAction, eParent, sIcon, sOpenIcon) {
	WebFXTreeTableItem.call(this, sText, oAction, eParent, sIcon, sOpenIcon);

// setup default property values
	this.src = sXmlSrc;
	this.loading = !sXmlSrc;
	this.loaded = !sXmlSrc;
	this.errorText = "";
	this.leaf = false;

	if (this.src) {
		/// add loading Item
		this._loadingItem = WebFXLoadTreeTable.createLoadingItem();
		this.add(this._loadingItem);

		if (this.getExpanded()) {
			WebFXLoadTreeTable.loadXmlDocument(this);
		}
	}
}

_p = WebFXLoadTreeTableItem.prototype = new WebFXTreeTableItem;


_p.isLeaf = function() {
    return this.leaf;
}

_p.setLeaf = function(b){
    this.leaf = (b ? true : false);
}

_p.getExpandIconSrc = function () {
	var src;
	var t = this.getTree();
	var hideLines = !t.getShowLines() || t == this.parentNode && !t.getShowRootLines();

	if (this.hasChildren() && !this.isLeaf()) {
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
	
	if (this.isLeaf()){
		return webFXTreeTableConfig.fileIcon;
	}
	return webFXTreeTableConfig.folderIcon;
	
	
	// fall back on default icons
	if (this.hasChildren()) {
		return open ? webFXTreeTableConfig.folderIcon : webFXTreeTableConfig.folderIcon;
	}
	return webFXTreeTableConfig.fileIcon;
	
};

_p.setExpanded = function (b) {
	WebFXTreeTableItem.prototype.setExpanded.call(this, b);

	if (this.src && b) {
		if (!this.loaded && !this.loading) {
			// load
			WebFXLoadTreeTable.loadXmlDocument(this);
		}
	}
};

// reloads the src file if already loaded
WebFXLoadTreeTable.prototype.reload =
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

		this._loadingItem = WebFXLoadTreeTable.createLoadingItem();
		this.add(this._loadingItem);

		if (expanded) {
			this.setExpanded(true);
		}

		t.setSuspendRedraw(sr);
		this.update();
	} else if (this.open && !this.loading) {
		WebFXLoadTreeTable.loadXmlDocument(this);
	}
};



WebFXLoadTreeTable.prototype.setSrc =
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
		this._loadingItem = WebFXLoadTreeTable.createLoadingItem();
		this.add(this._loadingItem);
	}

	this.setExpanded(expanded);
};

WebFXLoadTreeTable.prototype.getSrc =
_p.getSrc = function () {
	return this.src;
};

WebFXLoadTreeTable.prototype.dispose = function () {
	WebFXTreeTable.prototype.dispose.call(this);
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
	WebFXTreeTableItem.prototype.dispose.call(this);
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
WebFXLoadTreeTable.prototype.openPath =
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
			window.setTimeout("WebFXTreeTableAbstractNode._onTimeoutFocus(\"" + this.getId() + "\")", 10);
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


// Opera has some serious attribute problems. We need to use getAttribute
// for certain attributes
WebFXLoadTreeTable._attrs = ["text", "src", "action", "id", "target", "isLeaf"];

WebFXLoadTreeTable.createItemFromElement = function (oNode) {
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
	for (i = 0; i < WebFXLoadTreeTable._attrs.length; i++) {
		name = WebFXLoadTreeTable._attrs[i];
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
	
	//if(jsAttrs['isLeaf']=='true'){
	//   jsAttrs.src = null;
	//}
	
	var jsNode = new WebFXLoadTreeTableItem(jsAttrs.html || "", jsAttrs.src, action,
									   null, jsAttrs.icon, jsAttrs.openIcon);
	if (jsAttrs.text) {
		jsNode.setText(jsAttrs.text);
	}

	if (jsAttrs.target) {
		jsNode.target = jsAttrs.target;
	}
	if (jsAttrs.id) {
		jsNode.setId(jsAttrs.id);
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
	jsNode.setLeaf(isLeaf);
	
	if(isLeaf){
		if(jsNode._loadingItem)
			jsNode._loadingItem.remove();
		jsNode.loaded = true;
		jsNode.loading = false;
	}

	// go through childNodes
	var cs = oNode.childNodes;
	l = cs.length;
	for (i = 0; i < l; i++) {
		if (!isLeaf && cs[i].tagName == "tree") {
			jsNode.add(WebFXLoadTreeTable.createItemFromElement(cs[i]));
		}else if(cs[i].tagName == "infos"){
			WebFXLoadTreeTable.loadNodeInfo(jsNode, cs[i].childNodes);
		}
		
	}

	return jsNode;
};

WebFXLoadTreeTable.loadNodeInfo = function(jsNode, infos){
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

WebFXLoadTreeTable.loadXmlDocument = function (jsNode) {
	if (jsNode.loading || jsNode.loaded) {
		return;
	}
	jsNode.loading = true;
	var id = jsNode.getId();
	jsNode._xmlHttp = window.XMLHttpRequest ? new XMLHttpRequest : new window.ActiveXObject("Microsoft.XmlHttp");
	jsNode._xmlHttp.open("GET", jsNode.src, true);	// async
	jsNode._xmlHttp.onreadystatechange = new Function("WebFXLoadTreeTable._onload(\"" + id + "\")");

	// call in new thread to allow ui to update
	window.setTimeout("WebFXLoadTreeTable._ontimeout(\"" + id + "\")", 10);
};

WebFXLoadTreeTable._onload = function (sId) {

	var jsNode = webFXTreeTableHandler.all[sId];
	if (jsNode._xmlHttp.readyState == 4) {
		WebFXLoadTreeTable.documentLoaded(jsNode);
		webFXLoadTreeTableQueue.remove(jsNode);
		if (jsNode._xmlHttp.dispose)
			jsNode._xmlHttp.dispose();
		jsNode._xmlHttp = null;
	}
};

WebFXLoadTreeTable._ontimeout = function (sId) {
	var jsNode = webFXTreeTableHandler.all[sId];
	webFXLoadTreeTableQueue.add(jsNode);
};



// Inserts an xml document as a subtree to the provided node
WebFXLoadTreeTable.documentLoaded = function (jsNode) {
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
		
			jsNode.errorText = "Error loading " + jsNode.src + " (" + jsNode._xmlHttp.status + ": " + jsNode._xmlHttp.statusText + ")";
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
				jsNode.add(WebFXLoadTreeTable.createItemFromElement(cs[i]));
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
		jsNode._loadingItem.action = WebFXLoadTreeTable._reloadParent;
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
		if (typeof jsNode.onload == "function") {
			jsNode.onload();
		}
	}
};

WebFXLoadTreeTable._reloadParent = function () {
	this.getParent().reload();
};







var webFXLoadTreeTableQueue = {
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
		var jsNode = webFXTreeTableHandler.all[id];
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
