
function onPaginatorJumpPage(strUrl) {
	var pageNumObj = document.getElementById('jumpToPageNum');
	var pageNum = parseInt(pageNumObj.value);
	
	if (pageNum == null || isNaN(pageNum)) {
		alert('跳转页输入不正确！');
		pageNumObj.value = '';
		return;
	}
	
	if (pageNum != '' && pageNum !='0') {
		var len = new String(strUrl).indexOf('pageNumber');
		var strloc = '';
   
		if(len == -1) {
			var flag = new String(strUrl).indexOf('?');
			if(flag==-1) {
				strloc = strUrl+'?pageNumber='+pageNum;
			}
			else {
				strloc = strUrl+'&pageNumber='+pageNum;
			}
		}
		else {
			var ht = 'pageNumber='+pageNum;
			var a = /pageNumber=([0-9]+)/;
			strloc = new String(strUrl).replace(a, ht);
		}
		document.location = strloc;
	}
}
