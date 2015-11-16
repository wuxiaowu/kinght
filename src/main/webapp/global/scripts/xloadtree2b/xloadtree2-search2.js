function SearchBean(){
	/**只在此分支下查找*/
	this.root = null;
	/**从这个节点开始查找*/
	this.from = null;
	/**当前找到的节点*/
	this.current = null;
	/**匹配字符串*/
	this.queryString = null;
	/**匹配模式
	 *  0 - 任意匹配	.*query.*
	 *  1 - 匹配头部	^query.*
	 * 	2 - 匹配尾部	query$
	 *  3 - 匹配全部 ^query$
	 * */
	this.matchFlag = 0;
	/**匹配内容
	 *  null - 匹配名称(text)
	 * */
	this.infoName = null;
	this.notifyCallback = null;
	this.laterCallback = null;
	this.searching = false;
	this.searchDistance = 0;
}
//同步加载
WebFXLoadTree.loadXmlDocumentSyncForSearch = function (jsNode) {
	if (jsNode.loading || jsNode.loaded) {
		return true;
	}
	jsNode.loading = true;
	var id = jsNode.getId();
	jsNode._xmlHttp = window.XMLHttpRequest ? new XMLHttpRequest : new window.ActiveXObject("Microsoft.XmlHttp");
	jsNode._xmlHttp.open("GET", jsNode.src, true);
	jsNode._xmlHttp.onreadystatechange = new Function("WebFXTree._onload_search(\"" + id + "\")");
	webFXLoadTreeQueue.add(jsNode);
	return false;
};

WebFXTree._onload_search = function (sId) {

	var jsNode = webFXTreeHandler.all[sId];
	if (jsNode._xmlHttp.readyState == 4) {
		WebFXLoadTree.documentLoaded(jsNode);
		webFXLoadTreeQueue.remove(jsNode);
		if (jsNode._xmlHttp.dispose)
			jsNode._xmlHttp.dispose();
		jsNode._xmlHttp = null;
		
		var root = jsNode.getTree();
		var nextNode = jsNode.getNextNode();
		root.searchIterate(nextNode);
	}
};
WebFXTree.prototype.__searchLater = function(sId){
	var jsNode = webFXTreeHandler.all[sId];
	var nextNode = jsNode.getNextNode();
	this.searchIterate(nextNode);
}

WebFXTree._searchLater = function(sId){
//	alert("later:" + sId);
	var jsNode = webFXTreeHandler.all[sId];
	var root = jsNode.getTree();
	var nextNode = jsNode.getNextNode();
	root.searchIterate(nextNode);
}

WebFXTree.prototype.isSupportSearch = false;
WebFXTree.prototype.searchBean = new SearchBean();

WebFXTree.prototype.setSupportSearch = function(b){
	if(b){
		this.isSupportSearch = true;
		this.searchBean = new SearchBean();
	}else{
		this.isSupportSearch = false;
		this.searchBean = null;
	}
}

WebFXTree.prototype.setDialogPath = function(path){
	if(!this.isSupportSearch)
		return;
	this.dialogPath = path;
}

WebFXTree.prototype.searchDialog = null;

WebFXTree.prototype.showSearchDialog = function(callback){
	if(!this.isSupportSearch || this.dialogPath==null)
		return;
	
	if ( this.searchDialog!=null ){
		if (this.searchDialog.closed==false){
			if (this.searchDialog.onCancel ){
				try{ 
					this.searchDialog.onCancel();
				}catch(e){
				}
			}
		}
	}
	var args = {};
	args.queryString = this.searchBean.queryString;
	args.infoName = this.searchBean.infoName;
	args.found = (this.searchBean.current != null);
	args.tree = this;
	args.callback = callback;
	this.searchBean.searching = false;
	this.searchBean.current = null;
	//alert(args.queryString + "\n2" + args.infoName + "\n3" + args.found);
	window.searchArgs = args;
//	window.open(this.dialogPath, "search", "width=360px,height=220px,left=275px,top=100px",true);
//	window.showModalDialog(this.dialogPath, args, 'dialogWidth=360px;dialogHeight=220px;center:yes;status:no;scroll:no;help:no;');
	this.searchDialog =  window.showModelessDialog(this.dialogPath, args, 'dialogWidth=360px;dialogHeight=220px;center:yes;status:no;scroll:no;help:no;');
}

WebFXTree.prototype.stopSearch = function(){
	this.stopingSearch = true;
}

WebFXTree.prototype.setMatchFlag = function(a){
//	alert("setMatchFlag");
	if(!this.isSupportSearch)
		return;
	if(typeof(a)=='undefined' || a<0 || a>3)
		a = 0;
	this.searchBean.matchFlag = a;
}
WebFXTree.prototype.setSearchInfoName = function(inf){
	if(!this.isSupportSearch)
		return;
	this.searchBean.infoName = inf;
}
WebFXTree.prototype.search = function(queryString, info, notifyCallback, from, root, flag){
	if(!this.isSupportSearch)
		return;
	if(this.searchBean.searching==true)
		return;
	this.searchBean.searching = true;
	this.searchBean.root = root;
	if(from==null){
		from = this;
	}
	this.searchBean.current = from;
	this.stopingSearch = false;
	this.searchBean.queryString = queryString;
	this.searchBean.notifyCallback = notifyCallback;
	if(typeof(info) != 'undefined')
		this.setSearchInfoName(info);
	if(typeof(flag) != 'undefined')
		this.setMatchFlag(flag);
//	alert(queryString);
	this.searchIterate(from);
}
WebFXTree.prototype.findNext = function(notifyCallback){
	if(!this.isSupportSearch || this.searchBean.current==null || this.searchBean.queryString==null)
		return;
	if(this.searchBean.searching==true)
		return;
	this.stopingSearch = false;
	this.searchBean.searching = true;
	this.searchBean.notifyCallback = notifyCallback;
	var node = null;
	try{
		node = this.searchBean.current.getNextNode();
		this.waiting = false;
	}catch(e){
		this.waiting = true;
		return;
	}
	this.searchIterate(node);
}

WebFXTree.prototype.searchIterate = function(node){
	if(this.stopingSearch==true){
		this.searchBean.searching = false;
		this.waiting = false;
		this.searchBean.searchDistance = 0;
		this.stopingSearch = false;
		return;
	}
		
	if(node==null){
		this.searchBean.current = null;
		this.searchBean.searching = false;
		this.waiting = false;
		this.searchBean.searchDistance = 0;
		this.searchBean.notifyCallback(null);
		return;
	}
	
	if(node.isMatch()){
		this.searchBean.current = node;
		this.searchBean.searching = false;
		this.waiting = false;
		this.searchBean.searchDistance = 0;
		this.searchBean.notifyCallback(node);
		return;
	}
	if(this.searchBean.searchDistance>250){
		this.searchBean.searchDistance = 0;
		//alert("settimeout");
		window.setTimeout("WebFXTree._searchLater(\""+node.getId()+"\")",1);
		return;
	}
	try{
		node = node.getNextNode();
		this.waiting = false;
		this.searchBean.searchDistance++;
	}catch(e){
		this.searchBean.searchDistance = 0;
		this.waiting = true;
		return;
	}
	this.searchIterate(node);
}
WebFXTreeAbstractNode.prototype.isMatch = function(){
	var tree = this.getTree();
//	alert("isMatch-1");
	if(!tree.isSupportSearch || tree.searchBean.queryString==null)
		return false;
	var root = tree.searchBean.root==null ? this.getTree() : tree.searchBean.root;
	if(!root.isAncestorOf(this))
		return false;
	var str = null;
	if(tree.searchBean.infoName != null){
		str= this.getInfo(tree.searchBean.infoName);
	}else{
		str = this.getText();
	}
	//alert(tree.searchBean.infoName + "\n" + str);
	if(str == null)
		return false;
	var index = str.indexOf(tree.searchBean.queryString);
	if(index == -1)
		return false;

	var flag = tree.searchBean.matchFlag;
	switch(flag){
		case 0://match
			return true; 
		case 1://match begin
			if(index==0)
				return true;
			break;
		case 2://match end
			if(index == str.length - tree.searchBean.queryString.length)
				return true;
			break;
		case 3://match whole
			if(str.length == tree.searchBean.queryString.length)
				return true;
			break;
	}
	return false;
}

function show(node){
	var p = node.getParent();
	if(p!=null){
		p.expand();
		show(p);
	}
	node.focus();
}

WebFXTreeAbstractNode.prototype.show = function(){
	var p = this.getParent();
	if(p!=null){
		p.expand();
		p.show();
	}
	this.focus();
}
// 得到下一个结点
WebFXTreeAbstractNode.prototype.getNextNode = function(){
	var tree = this.getTree();
	if(!tree.isSupportSearch)
		return false;
	var root = tree.searchBean.root;
	var ready = true;
	try{
		ready = WebFXLoadTree.loadXmlDocumentSyncForSearch(this);
	}catch(e){
	}
	if(!ready){
		throw new Error("loading ...");
		return null;
	}
	if (this.hasChildren()) {
		return this.getFirstChild();
	}else{
		var p = this;
		var next;
		while (p != null) {
			next = p.getNextSibling();
			if (next != null) {
				return next;
			}
			p = p.getParent();
			if(root!=null && !root.isAncestorOf(this))
				return null;
		}
		return null;
	}
}

WebFXTreeAbstractNode.prototype.isAncestorOf = function(node){
	while(node!=this && node!=null){
		node = node.getParent();
	}
	if(node == this)
		return true;
	return false;
}





//// 是否已找到
//WebFXTree.prototype.searched = false;
//// 上次找到的结点
//WebFXTree.prototype.last_search_node = null;
//// 查找结点
//WebFXTree.search2 = function(node, search_text){
//	if(node==null){
//		WebFXTree.last_active_tree.show_nothing('find nothing.');
//		return;
//	}
//	if(node.getTree().searched) return;
//	
//	//匹配
//	if(node.match(search_text)) return;
//	
//	WebFXTree.search2(node.getNextNode(), search_text);
//}
//
//
//
//WebFXTreeAbstractNode.prototype.match = function(search_text){
//	re = new RegExp(search_text);
//	for(i in this.info){
//		if(re.test(this.getInfo(i))){
//			this.getTree().searched = true;
//			this.getTree().last_search_node = this;
//			this.show();
//			return true;
//		}
//	}
//	
//	return false;
//}
//
//
//WebFXTree.prototype.show_nothing = function(str){
//	$('<div class="quick-alert">'+str+'</div>')
//		.insertBefore($('#'+this.getTree().getId()))
//		.fadeIn('slow')
//		.animate({opacity:1.0}, 2000)
//		.fadeOut('slow', function(){
//			$(this).remove();
//		});
//}

// 加载结点数据
//WebFXTreeAbstractNode.prototype.load_tree_node_data = function(){
//	WebFXLoadTree.loadXmlDocumentSync(this);
//}