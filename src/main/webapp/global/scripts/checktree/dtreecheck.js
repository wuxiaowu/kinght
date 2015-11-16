
// Node object
function Node(id, pid, name, url, check, open, title, icon, iconOpen, target) {
	this.id = id;
	this.pid = pid;
	this.name = name;
	this.url = url;
	this.title = title;
	this.target = target;
	this.icon = icon;
	this.iconOpen = iconOpen;
	this.checked = check || false;
	this.parent = null;
	this.children = [];
	this.checkbox = null;
	this._io = open || false;		//
	this._is = false;
	this._ls = false;
	this._hc = false;
	this._ai = 0;
	this._p;
//	this._co = false;				//
};

// Tree object
function dTree(objName,checktype, container, callback, checkboxName, onlyLeaf) {
	this.config = {
		ancestor			: true,		//this.config.ancestor
		target				: null,
		folderLinks			: false,	//
		useSelection		: false,		//
		useCookies			: false,
		useLines			: true,		//
		useIcons			: true,		//
		useStatusText		: false,	
		closeSameLevel		: false,	//
		inOrder				: false
	};
	this.basepath = '';//'../global/scripts/checktree/'
	this._icon = {
		root				: 'img/base.gif',
		folder				: 'img/folder.gif',
		folderOpen			: 'img/folderopen.gif',
		node				: 'img/page.gif',
		empty				: 'img/empty.gif',
		line				: 'img/line.gif',
		join				: 'img/join.gif',
		joinBottom			: 'img/joinbottom.gif',
		plus				: 'img/plus.gif',
		plusBottom			: 'img/plusbottom.gif',
		minus				: 'img/minus.gif',
		minusBottom			: 'img/minusbottom.gif',
		nlPlus				: 'img/nolines_plus.gif',
		nlMinus				: 'img/nolines_minus.gif'
	};
	this.icon = {
	}
	
	this.rootId = '-1';

	this.checkboxName = (checkboxName ? checkboxName : "ids");
	this.onlyLeaf = (onlyLeaf===null || onlyLeaf===true) ? true : false; 
	if(typeof container != 'object')		////
		this.container = document.getElementById(container);
	else
		this.container = container;
	this.obj = objName;				//
	this.aNodes = [];				//
	this.aIndent = [];
	this.root = new Node(this.rootId);
	this.selectedNode = null;
	this.selectedFound = false;
	this.completed = false;
	this.callback = callback;
	this.autocorrect = true;		//
	this.objtype = checktype;		//
	this.inited = false;			//
	
	this.selected = null;
	this.selectedId = null;
	this.setBaseIconPath = function(path){
		this.basepath = path;
		for(var i in this._icon){
			this.icon[i] = this.basepath + this._icon[i];
		}
	}
	this.setBaseIconPath(this.basepath);
};

dTree.prototype.getRootId = function(){
//	alert();
	return this.aNodes[0].children[0].id; 
}

dTree.prototype.setRelative = function(bool){
	this.config.ancestor = (bool ? true : false);
}

// 
dTree.prototype.add = function(id, pid, name, url, checked, open, title, icon, iconOpen, target) {
	var node = new Node(id, pid, name, url, checked, open, title, icon, iconOpen, target);
	if(this.objtype && pid != this.rootId){
		var pNode = this.getNode(pid);
		if(pNode != null){
			node.parent = pNode;
			pNode.children[pNode.children.length]=node;
		}
	}
	this.aNodes[this.aNodes.length] = node;
};


//
dTree.prototype.getNode = function(nodeId){
	for(var i=0; i<this.aNodes.length; i++){
		var node = this.aNodes[i];
		if(node.id == nodeId){
			return node;
		}
	}
	return null;
};

dTree.prototype.check = function(nodeId, chk){
	var node = this.getNode(nodeId);
	if(node == null)return;
	if(this.inited == false)
		this.initCheckbox();
	if(chk.indeterminate)
		this.checkNode(node, true);
	else{
		this.checkNode(node, chk.checked);
	}
	if(!this.config.ancestor)return;
	this.changeParentState(node);
	if(this.callback != null){
		try{
			if(typeof this.callback != "function")
				eval(" " + this.callback + "('"+nodeId+"',"+chk.checked+")");
			else
				this.callback(nodeId, chk.checked);
		}catch(e){}
	}
};

dTree.prototype.checkById = function (id, check){
	var node = this.getNode(id);
//	alert(node.checkbox.checked);
	if(node && node.checkbox){
		node.checkbox.checked = check;
		if(!this.config.ancestor)return;
		this.changeParentState(node);
	}
}

//
dTree.prototype.checkNode = function(node, check){
	var chk = node.checkbox;
	if(chk == null){
		return;
	}
	chk.indeterminate = false;
	chk.checked = check || false;
	if(!this.config.ancestor)return;
	for(var i=0; i<node.children.length; i++){
		this.checkNode(node.children[i], check);
	}
};

//
dTree.prototype.changeAncestorState = function(node){
	if(!node)return;
	var pnode = node.parent;
	if(pnode != null && pnode.id != this.rootId){
		var state = this.getState(pnode);
		var chk = pnode.checkbox;
		if(chk != null){
			switch(state){
				case -1:
				case 0:
					chk.indeterminate = false;
					chk.checked = false;
					break;
				case 1:
					chk.indeterminate = true;
					chk.checked = false;
					break;
				case 2:
					chk.indeterminate = false;
					chk.checked = true;
					break;
			}
		}
	}
	if(pnode!=null && pnode.parent!=null && pnode.parent.id!=this.rootId)
		this.changeAncestorState(pnode);
};

//
dTree.prototype.changeParentState = function(node){
	if(!node)return;
	var pnode = node.parent;
	if(pnode != null && pnode.id != this.rootId){
		var chk = pnode.checkbox;
		if(chk != null){
			var state = this.getState(pnode);
			var _state = getCheckboxState(chk);
			if(state === _state){
				return;
			}
			switch(state){
				case -1:
				case 0:
					chk.indeterminate = false;
					chk.checked = false;
					break;
				case 1:
					chk.indeterminate = true;
					chk.checked = false;
					break;
				case 2:
					chk.indeterminate = false;
					chk.checked = true;
					break;
			}
		}
	}
	if(pnode.parent != null && pnode.parent.id != this.rootId)
		this.changeParentState(pnode);
};

//
dTree.prototype.getState = function(node){
	var state = -1;
	for(var i=0; i<node.children.length; i++){
		var cnode = node.children[i];
		var chk = cnode.checkbox;
		if(chk == null)
			continue;
		if(chk.indeterminate)return 1;
		if(chk.checked){
			if(state == -1)
				state = 2;
			else if(state == 0)
				return 1;
		}else{
			if(state == -1)
				state = 0;
			else if(state == 2)
				return 1;
		}
	}
	return state;
};


dTree.prototype.initCheckbox = function(){
	var chks = this.container.getElementsByTagName("INPUT");
	for(var i=0; i<chks.length; i++){
		var chk = chks[i];
		if(chk.type=='checkbox'){// && chk.name==this.checkboxName
			var id = chk.value;
			var node = this.getNode(id);
			if(node != null)
				node.checkbox = chk;
		}
	}
	this.inited = true;
}

dTree.prototype.showTree = function(){
	this.container.innerHTML = this.toString();
	this.initCheckbox();
	if(!this.config.ancestor){
		return;
	}
	if(this.autocorrect){
		for(var i=0; i<this.aNodes.length; i++){
			var node = this.aNodes[i];
			if(this.isPureLeaf(node)){
				this.changeAncestorState(node);
			}
		}
	}
}

dTree.prototype.isPureLeaf = function(node){
	if(node.children.length != 0)
		return false;
	var pnode = node.parent;
	if(pnode != null && pnode.id != this.rootId){
		var brothers = pnode.children;
		for(var i=0; i<brothers.length; i++){
			if(brothers[i].children.length != 0)
				return false;
		}
	}
	return true;
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Open/close all nodes
dTree.prototype.openAll = function() {
	this.oAll(true);
};

dTree.prototype.closeAll = function() {
	this.oAll(false);
};

// Outputs the tree to the page
dTree.prototype.toString = function() {
	var str = '<div class="dtree">\n';
	str += this.addNode(this.root);
	str += '</div>';
	if (!this.selectedFound) this.selectedNode = null;
	this.completed = true;
	return str;
};

// Creates the tree structure
dTree.prototype.addNode = function(pNode) {
	var str = '';
	var n=0;
	if (this.config.inOrder) n = pNode._ai;
	for (n; n<this.aNodes.length; n++) {
		if (this.aNodes[n].pid == pNode.id) {
			var cn = this.aNodes[n];
			cn._p = pNode;
			cn._ai = n;
			this.setCS(cn);
			if (!cn.target && this.config.target) cn.target = this.config.target;
			if (cn._hc && !cn._io && this.config.useCookies) cn._io = this.isOpen(cn.id);
			if (!this.config.folderLinks && cn._hc) cn.url = null;
			if (this.config.useSelection && cn.id == this.selectedNode && !this.selectedFound) {
					cn._is = true;
					this.selectedNode = n;
					this.selectedFound = true;
			}
			str += this.node(cn, n);
			if (cn._ls) break;
		}
	}
	return str;
};

// Creates the node icon, url and text
dTree.prototype.node = function(node, nodeId) {//nodeId --> index
	var onodeid = node.id;
	var str = '<div class="dTreeNode">' + this.indent(node, nodeId);
	if (this.config.useIcons) {
		if (!node.icon) node.icon = (this.root.id == node.pid) ? this.icon.root : ((node._hc) ? this.icon.folder : this.icon.node);
		if (!node.iconOpen) node.iconOpen = (node._hc) ? this.icon.folderOpen : this.icon.node;
		if (this.root.id == node.pid) {
			node.icon = this.icon.root;
			node.iconOpen = this.icon.root;
		}
		
		if (this.objtype==1 && node.pid!=-1){
			var chkName = this.checkboxName;
			if(this.onlyLeaf && (node.children!=null && node.children.length!=0))
				chkName = "dtree-chk-no-submit";
			if(node.checked)
				str += '<input style="width:15px;height:15px;" name="'+chkName+'" type="checkbox" value="' + node.id + '" onfocus="this.blur()" onclick="onCheck(\'' + this.obj + '\', this)" checked/>';
			else
				str += '<input style="width:15px;height:15px;" name="'+chkName+'" type="checkbox" value="' + node.id + '" onfocus="this.blur()" onclick="onCheck(\'' + this.obj + '\', this)"/>';
		}
		
		str += '<img id="i' + this.obj + nodeId + '" src="' + ((node._io) ? node.iconOpen : node.icon) + '" alt="" />';
	}

//	if (node.url) {
//		str += '<a id="s' + this.obj + nodeId + '" class="' + ((this.config.useSelection) ? ((node._is ? 'nodeSel' : 'node')) : 'node') + '" href="' + node.url + '"';
//		if (node.title) str += ' title="' + node.title + '"';
//		if (node.target) str += ' target="' + node.target + '"';
//		if (this.config.useStatusText) str += ' onmouseover="window.status=\'' + node.name + '\';return true;" onmouseout="window.status=\'\';return true;" ';
//		if (this.config.useSelection && ((node._hc && this.config.folderLinks) || !node._hc))
//			str += ' onclick="javascript:' + this.obj + '.s(' + nodeId + ');"';
//		str += '>';
//	}
//	else if ((!this.config.folderLinks || !node.url) && node._hc && node.pid != this.root.id)
//		str += '<a href="javascript:' + this.obj + '.o(' + nodeId + ');" class="node">';
//	else
//		str += '<a href="javascript:void(0);" class="node">';
	if(node.id != onodeid)
		alert(99);
	str += '<a href="javascript:void(0);" onclick="' + this.obj + '.select(this,\'' + node.id + '\')" onselectstart="return false;">';
	str += node.name;
	str += "</a>"
//	if (node.url || ((!this.config.folderLinks || !node.url) && node._hc))
//		str += '</a>';
	str += '</div>';
	if (node._hc) {
		str += '<div id="d' + this.obj + nodeId + '" class="clip" style="display:' + ((this.root.id == node.pid || node._io) ? 'block' : 'none') + ';">';
		str += this.addNode(node);
		str += '</div>';
	}

	this.aIndent.pop();
	return str;
};

dTree.prototype.select = function(link, nodeId){
	if(this.selected)
		this.selected.className = "nonSelected";
	this.selected = link;
	this.selected.className = "selected";
	this.selectedId = nodeId;
}


// Adds the empty and line icons	//??
dTree.prototype.indent = function(node, nodeId) {

	var str = '';
	if (this.root.id != node.pid) {
		for (var n=0; n<this.aIndent.length; n++)
			str += '<img border="0" src="' + ( (this.aIndent[n] == 1 && this.config.useLines) ? this.icon.line : this.icon.empty ) + '" alt="" />';
		(node._ls) ? this.aIndent.push(0) : this.aIndent.push(1);
		if (node._hc) {
			str += '<a onfocus="this.blur()" href="javascript: ' + this.obj + '.o(' + nodeId + ');"><img border="0" id="j' + this.obj + nodeId + '" src="';
			if (!this.config.useLines) str += (node._io) ? this.icon.nlMinus : this.icon.nlPlus;
			else str += ( (node._io) ? ((node._ls && this.config.useLines) ? this.icon.minusBottom : this.icon.minus) : ((node._ls && this.config.useLines) ? this.icon.plusBottom : this.icon.plus ) );
			str += '" alt="" /></a>';
		} else str += '<img src="' + ( (this.config.useLines) ? ((node._ls) ? this.icon.joinBottom : this.icon.join ) : this.icon.empty) + '" alt="" />';
	}
	return str;
};


// Checks if a node has any children and if it is the last sibling

dTree.prototype.setCS = function(node) {

	var lastId;
	for (var n=0; n<this.aNodes.length; n++) {
		if (this.aNodes[n].pid == node.id) node._hc = true;
		if (this.aNodes[n].pid == node.pid) lastId = this.aNodes[n].id;
	}
	if (lastId==node.id) node._ls = true;
};


// Returns the selected node
dTree.prototype.getSelected = function() {
	var id = this.selectedId;
	if(id){
		return this.getNode(id);
	}
	return null;
};

// Highlights the selected node
dTree.prototype.s = function(id) {

	if (!this.config.useSelection) return;
	var cn = this.aNodes[id];
	if (cn._hc && !this.config.folderLinks) return;
	if (this.selectedNode != id) {
		if (this.selectedNode || this.selectedNode==0) {
			eOld = document.getElementById("s" + this.obj + this.selectedNode);
			eOld.className = "node";
		}
		eNew = document.getElementById("s" + this.obj + id);
		eNew.className = "nodeSel";
		this.selectedNode = id;
		if (this.config.useCookies) this.setCookie('cs' + this.obj, cn.id);
	}
};

// Toggle Open or close
dTree.prototype.o = function(id) {
	var cn = this.aNodes[id];
	this.nodeStatus(!cn._io, id, cn._ls);
	cn._io = !cn._io;
	if (this.config.closeSameLevel) this.closeLevel(cn);
	if (this.config.useCookies) this.updateCookie();
};



// ??????????
dTree.prototype.oAll = function(status) {
	for (var n=0; n<this.aNodes.length; n++) {
		if (this.aNodes[n]._hc && this.aNodes[n].pid != this.root.id) {
			this.nodeStatus(status, n, this.aNodes[n]._ls)
			this.aNodes[n]._io = status;
		}
	}
	if (this.config.useCookies) this.updateCookie();
};

// Opens the tree to a specific node
dTree.prototype.openTo = function(nId, bSelect, bFirst) {
	if (!bFirst) {
		for (var n=0; n<this.aNodes.length; n++) {
			if (this.aNodes[n].id == nId) {
				nId=n;
				break;
			}
		}
	}

	var cn=this.aNodes[nId];
	if (cn.pid==this.root.id || !cn._p) return;
	cn._io = true;
	cn._is = bSelect;
	if (this.completed && cn._hc) this.nodeStatus(true, cn._ai, cn._ls);
	if (this.completed && bSelect) this.s(cn._ai);
	else if (bSelect) this._sn=cn._ai;
	this.openTo(cn._p._ai, false, true);
};



// Closes all nodes on the same level as certain node
dTree.prototype.closeLevel = function(node) {
	for (var n=0; n<this.aNodes.length; n++) {
		if (this.aNodes[n].pid == node.pid && this.aNodes[n].id != node.id && this.aNodes[n]._hc) {
			this.nodeStatus(false, n, this.aNodes[n]._ls);
			this.aNodes[n]._io = false;
			this.closeAllChildren(this.aNodes[n]);
		}
	}
}

// Closes all children of a node
dTree.prototype.closeAllChildren = function(node) {
	for (var n=0; n<this.aNodes.length; n++) {
		if (this.aNodes[n].pid == node.id && this.aNodes[n]._hc) {
			if (this.aNodes[n]._io) this.nodeStatus(false, n, this.aNodes[n]._ls);
			this.aNodes[n]._io = false;
			this.closeAllChildren(this.aNodes[n]);		
		}
	}
}

// Change the status of a node(open or closed)
dTree.prototype.nodeStatus = function(status, id, bottom) {
	eDiv	= document.getElementById('d' + this.obj + id);
	eJoin	= document.getElementById('j' + this.obj + id);
	if (this.config.useIcons) {
		eIcon	= document.getElementById('i' + this.obj + id);
		eIcon.src = (status) ? this.aNodes[id].iconOpen : this.aNodes[id].icon;
	}
	eJoin.src = (this.config.useLines)?
	((status)?((bottom)?this.icon.minusBottom:this.icon.minus):((bottom)?this.icon.plusBottom:this.icon.plus)):
	((status)?this.icon.nlMinus:this.icon.nlPlus);
	eDiv.style.display = (status) ? 'block': 'none';
};

// [Cookie] Clears a cookie
dTree.prototype.clearCookie = function() {
	var now = new Date();
	var yesterday = new Date(now.getTime() - 1000 * 60 * 60 * 24);
	this.setCookie('co'+this.obj, 'cookieValue', yesterday);
	this.setCookie('cs'+this.obj, 'cookieValue', yesterday);
};


// [Cookie] Sets value in a cookie
dTree.prototype.setCookie = function(cookieName, cookieValue, expires, path, domain, secure) {
	document.cookie =
		escape(cookieName) + '=' + escape(cookieValue)
		+ (expires ? '; expires=' + expires.toGMTString() : '')
		+ (path ? '; path=' + path : '')
		+ (domain ? '; domain=' + domain : '')
		+ (secure ? '; secure' : '');
};


// [Cookie] Gets a value from a cookie
dTree.prototype.getCookie = function(cookieName) {
	var cookieValue = '';
	var posName = document.cookie.indexOf(escape(cookieName) + '=');
	if (posName != -1) {
		var posValue = posName + (escape(cookieName) + '=').length;
		var endPos = document.cookie.indexOf(';', posValue);
		if (endPos != -1) cookieValue = unescape(document.cookie.substring(posValue, endPos));
		else cookieValue = unescape(document.cookie.substring(posValue));
	}
	return (cookieValue);
};


// [Cookie] Returns ids of open nodes as a string
dTree.prototype.updateCookie = function() {
	var str = '';
	for (var n=0; n<this.aNodes.length; n++) {
		if (this.aNodes[n]._io && this.aNodes[n].pid != this.root.id) {
			if (str) str += '.';
			str += this.aNodes[n].id;
		}
	}
	this.setCookie('co' + this.obj, str);
};



// [Cookie] Checks if a node id is in a cookie
dTree.prototype.isOpen = function(id) {
	var aOpen = this.getCookie('co' + this.obj).split('.');
	for (var n=0; n<aOpen.length; n++)
		if (aOpen[n] == id) return true;
	return false;
};

dTree.prototype.getAllChecked = function(){
	var chks = this.container.getElementsByTagName("INPUT");
	var result = [];
	for(var i=0; i<chks.length; i++) {
		if(chks[i].checked)
			result[result.length] = chks[i].value;
	}
	return result;
}

dTree.prototype.getAllChecked2 = function(onlyLeaf){
	var chks = this.container.getElementsByTagName("INPUT");
	var result = [];
	for(var i=0; i<chks.length; i++) {
		if(!chks[i].checked)
			continue;
		if(onlyLeaf && chks[i].name!=this.checkboxName)
			continue;
		var id = chks[i].value;
		var name = this.getNode(id).name;
		result[result.length] = {
			id : id,
			name : name
		};
	}
	return result;
}

dTree.prototype.setChecked = function(arr){
	var chks = this.container.getElementsByTagName("INPUT");
	for(var i=0; i<chks.length; i++) {
		var chk = chks[i];
		var id = chk.value;
		if(arr.indexOf(id)>=0){
			chk.checked = true;
			this.check(chk.value, chk);
		}
	}
}

// If Push and pop is not implemented by the browser
if (!Array.prototype.push) {
	Array.prototype.push = function array_push() {
		for(var i=0;i<arguments.length;i++)
			this[this.length]=arguments[i];
		return this.length;
	}
};

if (!Array.prototype.pop) {
	Array.prototype.pop = function array_pop() {
		lastElement = this[this.length-1];
		this.length = Math.max(this.length-1,0);
		return lastElement;
	}
};

if(!Array.prototype.indexOf){
	Array.prototype.indexOf = function(_item){
		for(var i=0; i<this.length; i++) {
			if(this[i] == _item){
				return i;
			}
		}
		return -1;
	}
}

function onCheck(objName, objCheckbox){
	var tree = eval(" " + objName);
	tree.check(objCheckbox.value, objCheckbox);
}

function getCheckboxState(chk){
	if(chk == null)
		return 0;
	if(chk.indeterminate)return 1;
	if(chk.checked)return 2;
	return 0;
}

dTree.prototype.getCheckeds = function(){
	var chks = this.container.getElementsByTagName("INPUT");
	var result = [];
	for(var i=0; i<chks.length; i++) {
		if(chks[i].checked||chks[i].indeterminate)
			result[result.length] = chks[i].value;
	}
	return result;
}

//*/