/*--------------------------------------------------|
| dTree 2.05 | www.destroydrop.com/javascript/tree/ |
|---------------------------------------------------|
| Copyright (c) 2002-2003 Geir Landr?                                                                              |
|                                                                                                                                            |
| This script can be used freely as long as all                                                                          |
| copyright messages are intact.                                                                                             |
|                                                                                                                                            |
|--------------------------------------------------*/
// Node object
function Node(id, pid, name, nodeValue, url,event,title, target, icon, iconOpen, open) {
	this.id = id;
	this.pid = pid;
	this.name = name;
	this.nodeValue = nodeValue;   //wly20060417 ??NodeValue??????????
	this.url = url;
	this.event =event;
	this.title = title;
	this.target = target;
	this.icon = icon;
	this.iconOpen = iconOpen;
	this._io = open || false;
	this._is = false;
	this._ls = false;
	this._hc = false;
	this._ai = 0;
	this._p;
};

// Tree object
//add  one  parameter  for  image  path
function dTree(objName,imgPath) {
	this.config = {
		target					: null,
		folderLinks			: true,
		useSelection		: false,
		useCookies			: false,
		useLines				: true,
		//add 1.1 by yjg , 2005-11-7
		useCheckboxes				: true,	//??????????????
		checkLeaves				: true,	//????????????????
		checkOn				: true,			//????????????????
		//add 1.1 end
		useIcons				: false,
		useStatusText		: false,
		closeSameLevel	: false,
		inOrder					: true
	}
	this.icon = {
	//modified by yc for using parameter "imgPath "
		//root				: '../images/dtree/base.gif',
		root				: imgPath+'/base.gif',
		//folder			: '../images/dtree/folder.gif',
		folder			: imgPath+'/folder.gif',
		//folderOpen	: '../images/dtree/folderopen.gif',
		folderOpen	: imgPath+'/folderopen.gif',
		//node				: '../images/dtree/page.gif',
		node				: imgPath+'/page.gif',
		//add by yc
		//nodesel        : 'images/dtree/nodesel.gif',
		//add end
		nodesel        : imgPath+'/nodesel.gif',
		//empty				: '../images/dtree/empty.gif',
		empty			: imgPath+'/empty.gif',
		//line				: '../images/dtree/line.gif',
		line				: imgPath+'/line.gif',
		//join				: '../images/dtree/join.gif',
		join				: imgPath+'/join.gif',
		//joinBottom	: '../images/dtree/joinbottom.gif',
		joinBottom	: imgPath+'/joinbottom.gif',
		//plus				: '../images/dtree/plus.gif',
		plus				: imgPath+'/plus.gif',
		//plusBottom	: '../images/dtree/plusbottom.gif',
		plusBottom	: imgPath+'/plusbottom.gif',
		//minus				: '../images/dtree/minus.gif',
		minus			: imgPath+'/minus.gif',
		//minusBottom	: '../images/dtree/minusbottom.gif',
		minusBottom	: imgPath+'/minusbottom.gif',
		//nlPlus			: '../images/dtree/nolines_plus.gif',
		nlPlus			:  imgPath+'/nolines_plus.gif',
		//nlMinus			: '../images/dtree/nolines_minus.gif'
		nlMinus			: imgPath+'/nolines_minus.gif'
	};
	this.obj = objName;
	this.aNodes = [];
	this.aIndent = [];
	this.root = new Node(-1);
	this.selectedNode = null;
	this.selectedFound = false;
	this.completed = false;
};

// Adds a new node to the node array
//
dTree.prototype.add = function(id, pid, name, nodeValue, url,event,title, target, icon, iconOpen, open) {
	this.aNodes[this.aNodes.length] = new Node(id, pid, name, nodeValue, url,event,title, target, icon, iconOpen, open);
};

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
	if (document.getElementById) {
		if (this.config.useCookies) this.selectedNode = this.getSelected();
		str += this.addNode(this.root);
	} else str += 'Browser not supported.';
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
dTree.prototype.node = function(node, nodeId) {
	var str = '<div class="dTreeNode">' + this.indent(node, nodeId);
	//add 1.1 by yc,2006-8-15
	var strEvent = '';
	//add 1.1 by yjg,2005-11-7
	if (this.config.useCheckboxes) {
		str += '<input type="checkbox" id="c' + this.obj + nodeId + '" value="' + node.nodeValue + '" name="chkUnit" ';
		if (this.config.checkOn) 
			str+='  ';
		if (this.config.checkLeaves) {
			str += ' onclick="javascript: ' + this.obj + '.checkNode(' + nodeId + ');"';
		}
		str += '>';
		
	}
	//add end
		
	if (this.config.useIcons) {
		//modified  by yc for adding img for leafnode selected
		if (!node.icon) node.icon = (this.root.id == node.pid) ? this.icon.root : ((node._hc) ? this.icon.folder : ((node._is) ? this.icon.nodesel:this.icon.node));
	   //modified end
		if (!node.iconOpen) node.iconOpen = (node._hc) ? this.icon.folderOpen : this.icon.node;
		if (this.root.id == node.pid) {
			node.icon = this.icon.root;
			node.iconOpen = this.icon.root;
		}
		str += '<img id="i' + this.obj + nodeId + '" src="' + ((node._io) ? node.iconOpen : node.icon) + '" alt="" />';
	}
	if (node.url) {
		str += '<a id="s' + this.obj + nodeId + '" class="' + ((this.config.useSelection) ? ((node._is ? 'nodeSel' : 'node')) : 'node') + '" href="' + node.url + '"';
		if (node.title) str += ' title="' + node.title + '"';
		if (node.target) str += ' target="' + node.target + '"';
		if (this.config.useStatusText) str += ' onmouseover="window.status=\'' + node.name + '\';return true;" onmouseout="window.status=\'\';return true;" ';
		//modified  by yc for adding event
		if (node.event) {
		   strEvent = node.event;
		   str+= ' onclick="javascript: ' +strEvent+';';}
		if (this.config.useSelection && ((node._hc && this.config.folderLinks) || !node._hc)){
			if(node.event)
				str+=this.obj + '.s(' + nodeId + ');"'
			else
			    str += ' onclick="javascript: ' + this.obj + '.s(' + nodeId + ');"';
		}
		else
		   str+='"';
		//modified end
		str += '>';
	}
	else if ((!this.config.folderLinks || !node.url) && node._hc && node.pid != this.root.id)
		str += '<a href="javascript: ' + this.obj + '.o(' + nodeId + ');" class="node">';
	str += node.name;
	if (node.url || ((!this.config.folderLinks || !node.url) && node._hc)) str += '</a>';
	str += '</div>';
	if (node._hc) {
		str += '<div id="d' + this.obj + nodeId + '" class="clip" style="display:' + ((this.root.id == node.pid || node._io) ? 'block' : 'none') + ';">';
		str += this.addNode(node);
		str += '</div>';
	}
	this.aIndent.pop();
	return str;
};

// Adds the empty and line icons
dTree.prototype.indent = function(node, nodeId) {
	var str = '';
	if (this.root.id != node.pid) {
		for (var n=0; n<this.aIndent.length; n++)
			str += '<img src="' + ( (this.aIndent[n] == 1 && this.config.useLines) ? this.icon.line : this.icon.empty ) + '" alt="" />';
		(node._ls) ? this.aIndent.push(0) : this.aIndent.push(1);
		if (node._hc) {
			str += '<a href="javascript: ' + this.obj + '.o(' + nodeId + ');"><img id="j' + this.obj + nodeId + '" src="';
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
	var sn = this.getCookie('cs' + this.obj);
	return (sn) ? sn : null;
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
			//add by yc for change node's img that not selected
			eOldImg=document.getElementById("i" + this.obj + this.selectedNode);
		    eOldImg.src=this.icon.node;
			//add end
			
		}
		
		eNew = document.getElementById("s" + this.obj + id);
		eNew.className = "nodeSel";
		//add by yc for change node's img that  selected
		eNewImg=document.getElementById("i" + this.obj + id);
		eNewImg.src=this.icon.nodesel;
		//add end
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

// Open or close all nodes
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

// find the correspondent array index in aNodes for the given id
dTree.prototype.findId = function(nId) {
	var id = -1;
  for (var n=0; n<this.aNodes.length; n++) {
		if (this.aNodes[n].id == nId) {
			id=n;
			break;
		}
	}

	return id;
};

// ????????????????
// 2005-11-7,yjg,1.1  
dTree.prototype.checkAllChildren = function(id) {
	if (!this.config.checkLeaves) return;
	var cn = this.aNodes[id];
	//alert(id);
	//alert("c" + this.obj+cn.pid);
	//pParent = document.getElementById("c" + this.obj+cn.pid);
	//pParent.checked = true;
	eParent=document.getElementById("c" + this.obj + id);
	//alert("c" + this.obj + id);
	for (var n=0; n<this.aNodes.length; n++) {
		if (this.aNodes[n].pid == cn.id) {
			eChild = document.getElementById("c" + this.obj + n);
			//if (eParent.checked==true) alert(this.aNodes[n].pid+":"+n+" "+eChild.id+" "+eChild.value);
			eChild.checked = eParent.checked;
			this.checkAllChildren(n);		
		}
	}
};
// ????????????????
// 2005-12-7,zhul,1.1 
dTree.prototype.checkAllParent = function(id) {
	if(!this.config.checkLeaves) return;
	var cn = this.aNodes[id];
	var i=0,j=0,k = 0;
	while (document.getElementById("c" + this.obj + i) != null)
	{
       eNode=document.getElementById("c" + this.obj + i);
	   if (eNode.value == cn.pid)
       {
		   k = i;
		   Node = document.getElementById("c" + this.obj + i);
		   for(var n=0 ;n< this.aNodes.length; n++)
		   {
		     if (this.aNodes[n].pid == cn.pid)
		     {
                eChild = document.getElementById("c" + this.obj + n);
				if (eChild.checked)
				{
					Node.checked = true;
					//alert("checkAllParent:"+this.aNodes[n].pid);
					j++;
					break;
				}
				else if (j==0 )
				{
					Node.checked = false;
				}
					
		     }
		   }
		   break;
       }
	   i++;
	   
	}
	if (k == 0)
	{
		return;
	}
    this.checkAllParent(k);
};
dTree.prototype.checkNode = function(id) {
  this.checkAllChildren(id);
  this.checkAllParent(id);
};
// ????????????
// 2005-12-15,zhul,1.1 
dTree.prototype.autoSelect = function(id){
    var cnp;
	var m,n = 0;
	for(m = 0 ; m < this.aNodes.length;m++)
	{
	    if ( this.aNodes[m].id == id)
	    {
		  cnp = this.aNodes[m]; 
		  break;
	    }
	}
	for(var n=0 ;n< this.aNodes.length; n++)
    {
	     if (this.aNodes[n].id == cnp.pid && n != 0){
		  this.openNode(n);
		  break;
	     }
	}
		this.s(m);
}
dTree.prototype.openNode = function(id) {
	var cn = this.aNodes[id];
	this.nodeStatus(true, id, cn._ls);
	if (this.config.closeSameLevel) this.closeLevel(cn);
	if (this.config.useCookies) this.updateCookie();
};
