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
}

//同步加载
WebFXLoadTree.loadXmlDocumentSync = function (jsNode) {
	if (jsNode.loading || jsNode.loaded) {
		return;
	}
	jsNode.loading = true;
	var id = jsNode.getId();
	jsNode._xmlHttp = window.XMLHttpRequest ? new XMLHttpRequest : new window.ActiveXObject("Microsoft.XmlHttp");
	jsNode._xmlHttp.open("GET", jsNode.src, false);
	jsNode._xmlHttp.onreadystatechange = new Function("WebFXLoadTree._onload(\"" + id + "\")");

	webFXLoadTreeQueue.add(jsNode);
};

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

WebFXTree.prototype.showSearchDialog = function(){
	if(!this.isSupportSearch || this.dialogPath==null)
		return;
	var args = {};
	args.queryString = this.searchBean.queryString;
	args.infoName = this.searchBean.infoName;
	args.found = (this.searchBean.current != null);
	args.tree = this;
	//alert(args.queryString + "\n2" + args.infoName + "\n3" + args.found);
	var ret = window.showModalDialog(this.dialogPath, args, 'dialogWidth=360px;dialogHeight=220px;center:yes;status:no;scroll:no;help:no;');
	return;
	if(ret==null || ret.flag!=true)
		return;
	
	var node = null;
	var queryString  = ret.queryString;
	var infoName = ret.infoName;
	var next = ret.next;
	if(next==true && queryString==this.searchBean.queryString && infoName==this.searchBean.infoName){
//		alert("next one!\n" + queryString + "\n" + infoName);
		node = this.findNext();
	}else{
//		alert("find first one!\n" + queryString + "\n" + infoName);
		this.searchBean.queryString = queryString;
		this.searchBean.infoName = infoName;
		node = this.search(queryString, infoName);
	}
	this.searchBean.current = node;
	if(node!=null){
		node.show();
	}else{
		try{
			spAlert('没有找到!');
		}catch(e){
			alert("没有找到!");
		}
	}
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
WebFXTree.prototype.search = function(queryString, info, from, root, flag){
	if(!this.isSupportSearch)
		return;
//	alert();
	this.searchBean.root = root;
	if(from==null){
		from = this;
	}
	this.searchBean.current = from;
	this.searchBean.queryString = queryString;
	if(typeof(info) != 'undefined')
		this.setSearchInfoName(info);
	if(typeof(flag) != 'undefined')
		this.setMatchFlag(flag);
//	alert(queryString);
	var ret = this.searchIterate(from);
	this.searchBean.current = ret;
	return ret;
}
WebFXTree.prototype.findNext = function(){
	if(!this.isSupportSearch || this.searchBean.current==null || this.searchBean.queryString==null)
		return;
	var node = this.searchBean.current.getNextNode();
	var ret = this.searchIterate(node);
	this.searchBean.current = ret;
	return ret;
}

WebFXTree.prototype.searchIterate = function(node){
	if(node==null)return null;
//	alert(node.getText());
	if(node.isMatch()){
		return node;
	}
	node = node.getNextNode();
	return this.searchIterate(node);
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
	try{
		WebFXLoadTree.loadXmlDocumentSync(this);
	}catch(e){
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