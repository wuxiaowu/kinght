var browserVersion = parseInt(navigator.appVersion);

var isNetscape = navigator.appName.indexOf("Netscape") != -1;

var isIE = navigator.appName.indexOf("Microsoft") != -1;

var agent = navigator.userAgent.toLowerCase();

var isWindows = agent.indexOf("win") != -1;

var isMac = agent.indexOf("mac") != -1;

var isUnix = agent.indexOf("X11") != -1;

//var baseUrl = "/";


function disableEnterKey(event) {
	if (!event) event = window.event;
	var element = event.srcElement ? event.srcElement : event.target;

	if (event.keyCode == 13 &&
		element.type != "submit" &&
		element.type != "textarea" &&
		element.type != "reset") {

		if (window.event) {
			event.cancelBubble = true;
			event.returnValue = false;
		} else {
			event.stopPropagation();
			event.preventDefault();
		}

		return false;
	}
}


function validate(theForm,formBeanClassName,callback){
	var filter="file,submit,reset,image,button,textarea,select-multi,fieldset,";

	 var parameters  = {};
	 var submitButtons = [];
     for (var i = 0; i <theForm.elements.length; i++) {
        var e = theForm.elements[i];
        if (e.type=='submit' && e.disabled!='true'){
        	e.disabled = true;
        	submitButtons[submitButtons.length] = e;
        }
        if ((e.type=="radio" || e.type=="checkbox") && !e.checked){
        	continue;
        }else{
    		if(parameters[e.name])
    		{
				if(parameters[e.name].indexOf("{") == -1)
				{
					parameters[e.name] = "{" + parameters[e.name] +"}";
				}
				parameters[e.name] = "{" + parameters[e.name].substring(1,parameters[e.name].length-1) + "," + e.value +"}";

    		}
    		else
    		{
    			parameters[e.name]= e.value;
    		}
	 	}
	 }
	 
   	 FormValidateAjax.validateForm(formBeanClassName, parameters, {
			callback:function(reply) {
			   if (reply!=null) {
			   		
			   		if (!callback){
			   			callback = showError;
			   		}
			        callback(reply);
			        
			        for(var i=0;i<submitButtons.length;i++){
			   			submitButtons[i].disabled = false;
			   		}
			   } else {
			        theForm.submit();  
			   }
			}
	 });

     return false;
}

function showError(errors){
		
   	var errorstr="";
	for (i in errors){
		 errorstr +=errors[i]+"<br>" ;
	}
	spAlert(errorstr);
}


function getSingleCheckedValue(formname,checkname)
{
	var form = document.forms(formname);
	if(!form)
	{
		spAlert("error,form is null");
		return;
	}

	var checkboxs =form.elements(checkname);
	var checkvalue ;
	var checkcount = 0;
	if(checkboxs)
	{
		if("undefined" ==typeof(checkboxs.length))
		{
			if (checkboxs.checked)
			{
				return checkboxs.value;
			}

		}
		for(i=0;i<checkboxs.length;i++)
		{
			if(checkboxs[i].checked)
			{

				if(checkcount>0)
				{
                   return false;
				 }

 				checkvalue = checkboxs[i].value;
 				checkcount = checkcount + 1 ;

			}
		}
       return checkvalue;

	}
}

//return string like ID1,ID2,ID3
function getMultiCheckedValue(formname,checkname)
{
	var form = document.forms[formname];
	if(!form){
		spAlert("error,form is null");
		return;
	}

	var checkboxs =form.elements(checkname);
	var checkvalue ="" ;
	var checkcount = 0;
	if(checkboxs)
	{
		if(typeof(checkboxs.length)!="undefined")
		{
			for(i=0;i<checkboxs.length;i++)
			{
				if(checkboxs[i].checked)
				{


	 				checkvalue += checkboxs[i].value + "," ;
	 				checkcount = checkcount + 1 ;

				}
			}
		}
		else
		{
			if(checkboxs.checked)

			{
				checkvalue = checkboxs.value;
				return checkvalue;
			}
		}
	 return checkvalue.substring(0,checkvalue.lastIndexOf(","));

	}
}


function disable(form){
	var elements = form.elements;
	for (var i=0;i<elements.length;i++){
		var element = elements[i];
		if(element.type == "text"){
			element.readOnly = true;
		}
		if (/*element.type!="submit" && */element.type!="hidden" && element.type!="text" && element.type!=undefined){
			element.disabled = true;
		}
	}
}

function spAlert(ttext){
	var url = getContextPath()+"global/alert.jsp";
	var args = {
		text : ttext
	};
	try{
		var result = window.showModalDialog(url, args, "dialogWidth=400px;dialogHeight=220px;help=no;center=yes;status=no;scroll=no");
		if(result && result.flag){
			return true;
		}
		return false;
	}catch(e){
		alert(ttext);
		return false;
	}
}

function spConfirm(text, btnText1, btnText2){
	var url = getContextPath()+"global/confirm.jsp"
	var args = {
		text : text
	}
	if(btnText1)args.button1Text = btnText1;
	if(btnText2)args.button2Text = btnText2;
	try{
		var result = window.showModalDialog(url, args, "dialogWidth=400px;dialogHeight=220px;help=no;center=yes;status=no;scroll=no");
		if(result && result.flag){
			return true;
		}
		return false;
	}catch(e){
		return confirm(text, btnText1, btnText2);
	}
}

function spError(ttext,trace){
	var url = getContextPath()+"global/error.jsp";
	var args = {
		text : ttext,
		stackTrace: trace 
	};
	try{
		var result = window.showModalDialog(url, args, "dialogWidth=550px;dialogHeight=420px;help=no;center=yes;status=no;scroll=no");
		if(result && result.flag){
			return true;
		}
		return false;
	}catch(e){
		alert(ttext);
		return false;
	}
}

function getTreeNodeById(tree,id){
	var root = tree.getTree();
	if(root != null){
		var node= getNodeById(root, id);
		return node;
	 }
}

function getNodeById(node ,id){
	if(node.getId() == id){
		return node;
	}
	if(node.hasChildren()){
		var children = node.getChildren();
		for(var i = 0; i < children.length; i++){
			var nodex = getNodeById(children[i],id);
			if(nodex != null)
				return nodex;
		}
	}
  	return null;
}


var loadingMessage='';

function showLoadingMessage(msg){
	if (msg){
		loadingMessage = msg;  
	}else{
		loadingMessage = "数据处理中...";
	}
}

function hideLoadingMessage(){
	loadingMessage = '';
}


function useLoadingMessage(){
	
	DWREngine.setPreHook(function() {
	    if (top.MenuTree){
			var disabledZone = top.MenuTree.document.getElementById('disabledZone');
			if (!disabledZone) {
				disabledZone = top.MenuTree.document.createElement('div');
				top.MenuTree.document.body.appendChild(disabledZone);
				disabledZone.setAttribute('id', 'disabledZone');
				disabledZone.style.position = "absolute";
				disabledZone.style.zIndex = "90000";
				disabledZone.style.top = "0px";
				disabledZone.style.left = "0px";
				disabledZone.style.width = "1024px";
				disabledZone.style.height = "768px";
				disabledZone.onclick=function(ev){
					ev = ev || event;
					ev.cancelBubble = true;
					return false;
				};
				disabledZone.onselectstart = function(){
					window.event.cancelBubble = true;
					return false;
				}
				disabledZone.style.background = "#eeeeee";
				if (loadingMessage!=''){
					disabledZone.style.filter="alpha(opacity=70)";
				}else{
					disabledZone.style.filter="alpha(opacity=1)";
				}
			}else{
				disabledZone.style.visibility = 'visible';
			}
	    }
		
		if (top.Workflow){
			var disabledZone = top.Workflow.document.getElementById('disabledZone');
			if (!disabledZone) {
				disabledZone = top.Workflow.document.createElement('div');
				top.Workflow.document.body.appendChild(disabledZone);
				disabledZone.setAttribute('id', 'disabledZone');
				disabledZone.style.position = "absolute";
				disabledZone.style.zIndex = "90000";
				disabledZone.style.top = "0px";
				disabledZone.style.left = "0px";
				disabledZone.style.width = "1024px";
				disabledZone.style.height = "768px";
				disabledZone.onclick=function(ev){
					ev = ev || event;
					if (ev){
						ev.cancelBubble = true;
					}
					return false;
				};
				disabledZone.onselectstart = function(){
					if (window.event){
						window.event.cancelBubble = true;
					}
					return false;
				}
				disabledZone.style.background = "#eeeeee";
				if (loadingMessage!=''){
					disabledZone.style.filter="alpha(opacity=70)";
				}else{
					disabledZone.style.filter="alpha(opacity=1)";
				}
				
				if (loadingMessage!=''){
					var loadingZone = top.Workflow.document.createElement('div');
					loadingZone.setAttribute('id','loading');
					disabledZone.appendChild(loadingZone);
					
					var messageZone = top.Workflow.document.createElement('div');
					messageZone.setAttribute('id', 'messageZone');
					messageZone.setAttribute('class',"loading-indicator");
					loadingZone.appendChild(messageZone);
					var text = top.Workflow.document.createTextNode(loadingMessage);
					messageZone.appendChild(text);
				}
			}
			else {
				disabledZone.style.visibility = 'visible';
			}
		}		
	});

	DWREngine.setPostHook(function() {
	    hideLoadingMessage();
	    if (top.MenuTree){
	        
			var disabledZone = top.MenuTree.document.getElementById('disabledZone');
			if (disabledZone){
				disabledZone.style.visibility = 'hidden';
			}
		}
	    
	    if (top.Workflow){
			var disabledZone = top.Workflow.document.getElementById('disabledZone');
			if (disabledZone){
				disabledZone.style.visibility = 'hidden';	
			}
		}
	});
	
}


function DWR_init() {
  if (DWRUtil!=null){
  	useLoadingMessage();
  	DWREngine.setErrorHandler(showAjaxError); 
  }
}

function showAjaxError(msg, ex) {
	if (ex!=null){
		if (ex.stackTraceMessage==null){
			spAlert(msg);
		}else{
			spError(msg,ex.stackTraceMessage);
		}
    }else{
        spAlert(msg);
    }
}


function isUndefined(value){
	if (value =='undefined' || value ==null || value=='null'){
		return true;
	}
	return false;
}

//??????Cookie???????????????
function GetCookieVal(offset){
	var endstr = document.cookie.indexOf (";", offset);
	if (endstr == -1)
	endstr = document.cookie.length;
	return unescape(document.cookie.substring(offset, endstr));
}

//??????Cookie???
function SetCookie(name, value){
	var expdate = new Date();
	var argv = SetCookie.arguments;
	var argc = SetCookie.arguments.length;
	var expires = (argc > 2) ? argv[2] : null;
	var path = (argc > 3) ? argv[3] : null;
	var domain = (argc > 4) ? argv[4] : null;
	var secure = (argc > 5) ? argv[5] : false;
	if(expires!=null) expdate.setTime(expdate.getTime() + ( expires * 1000 ));
		document.cookie = name + "=" + escape (value) +((expires == null) ? "" : ("; expires="+ expdate.toGMTString()))
		+((path == null) ? "" : ("; path=" + path)) +((domain == null) ? "" : ("; domain=" + domain))
		+((secure == true) ? "; secure" : "");
}
//??????Cookie
function DelCookie(name){
	var exp = new Date();
	exp.setTime (exp.getTime() - 1);
	var cval = GetCookie (name);
	document.cookie = name + "=" + cval + "; expires="+ exp.toGMTString();
}
//??????Cookie????????????
function GetCookie(name){
	var arg = name + "=";
	var alen = arg.length;
	var clen = document.cookie.length;
	var i = 0;
	while (i < clen){
	var j = i + alen;
	if (document.cookie.substring(i, j) == arg)
		return GetCookieVal (j);
	i = document.cookie.indexOf(" ", i) + 1;
	if (i == 0) break;
	}
	return null;
}
function checkStatus(){
	//ff不支持该属性
	if (!document.readyState){
		return true;    
	}
	if (document.readyState!="complete" ){
		return false;    
	}
	if (window.frames){
		for (i = 0 ; i < window.frames.length ; i++ ){
			var win = window.frames[i];
			var state = win.document ? win.document.readyState : "";
			if(state!="complete" ){
                return false;
             }
   		}
   }
   return true;
}

function toExport(url){
	var n = "_exportIFrame_";
	var f = top.document.getElementById(n);
	if(!f){
		f = top.document.createElement("IFRAME");
		f.style.width = '0px';
		f.style.height = '0px';
		top.document.body.appendChild(f);
	}
	if(url){
		f.document.location = url;
	}else{
		return n;
	}
}

//?????????????????????
/**
 * showGuage({
 *    calssName:  xxx
 *    fmismdlCode: '10-BUS'
 *    callback:  function(taskId){
 *    	   alert(taskId);
 *    }
 *    params:  [{key1:abc},{key2:efg}]
 * });
 */
function showGuage(className,fmismdlCode,params,callback) {
	var url = getContextPath()+"global/task1.jsp?className="+className+"&fmismdlCode="+fmismdlCode;
    
	for (var i = 0; i < params.length; i++) {
	   var kv = params[i].split(":");
	   var k = kv[0];
	   var v = kv[1];
	   url = url + "&"+k+"="+v;
	}
	
	var re = window.showModalDialog(url,self,"dialogWidth:520px;dialogHeight:250px;center:yes;help:no;scroll:no;status:no;resizable:no");
    if (typeof callback == 'function' ){
    	callback(re);
    }
    return re;
}
//???????????????????????????url
function getCommunicationUrl(hostAddress,contextPath){
var Address;
if (hostAddress){
	Address = hostAddress.replace(/http:\/\//g,"");
}
var index = Address.indexOf("/");
var tempAddress = hostAddress.substring(0,7+index);
var serviceurl = tempAddress+contextPath+"/communicationServlet";
return serviceurl;

}


function Params() {
	
}


function convertRecordsToJson(records) {
	if (records.length ==0) {
    	return '';
    }
    var record;
    
    var jsonData = "[";
    
    for(var i = 0; i < records.length; i++) {
    	record = records[i];
        jsonData += Ext.util.JSON.encode(record.data) + ","; 
    }                                          
    jsonData = jsonData.substring(0,jsonData.length-1) + "]";
          
    return jsonData;
}

function convertRecordDatasToJson(recordDatas) {
	if (recordDatas.length ==0) {
    	return '';
    }
    var recordData;
    
    var jsonData = "[";
    
    for(var i = 0; i < recordDatas.length; i++) {
    	recordData = recordDatas[i];
        jsonData += Ext.util.JSON.encode(recordData) + ","; 
    }                                          
    jsonData = jsonData.substring(0,jsonData.length-1) + "]";
          
    return jsonData;
}

function convertRecordsToJsonForSynch(records) {
	if (records.length ==0) {
    	return '';
    }
    var record;
    
    var jsonData = "[";
    
    for(var i = 0; i < records.length; i++) {
    	record = records[i];
        jsonData += encodeURIComponent(Ext.util.JSON.encode(record.data)) + ","; 
    }                                          
    jsonData = jsonData.substring(0,jsonData.length-1) + "]";
          
    return jsonData;
}

function convertRecordDatasToJsonForSynch(recordDatas) {
	if (recordDatas.length ==0) {
    	return '';
    }
    var recordData;
    
    var jsonData = "[";
    
    for(var i = 0; i < recordDatas.length; i++) {
    	recordData = recordDatas[i];
        jsonData += encodeURIComponent(Ext.util.JSON.encode(recordData)) + ","; 
    }                                          
    jsonData = jsonData.substring(0,jsonData.length-1) + "]";
          
    return jsonData;
}

//通过iframeId取得frame中的window对象
function getContentWindowByIframeId(iframeId){
	if(document.getElementById(iframeId)){
		return document.getElementById(iframeId).contentWindow;
	}
}

//通过iframeId判断iframe中的页面的document是否ready
function iFrameIsReady(iframeId){
    if(document.getElementById(iframeId)){
        if( document.getElementById(iframeId).document ){//IE
            return document.getElementById(iframeId).document.readyState == "complete";
        }else{//FF
            return document.getElementById(iframeId).contentWindow.document.readyState == "complete";
        }
	}
}