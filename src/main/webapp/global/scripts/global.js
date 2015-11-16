var browserVersion = parseInt(navigator.appVersion);

var isNetscape = navigator.appName.indexOf("Netscape") != -1;

var isIE = navigator.appName.indexOf("Microsoft") != -1;

var agent = navigator.userAgent.toLowerCase(  );

var isWindows = agent.indexOf("win") != -1;

var isMac = agent.indexOf("mac") != -1;

var isUnix = agent.indexOf("X11") != -1; 



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
	
	 var	parameters  = {};
	 var	callResult = false;
	 
     for (var i = 0; i <theForm.elements.length; i++) {
        var e = theForm.elements[i];
        parameters[e.name] = e.value;
	 }

	 DWREngine.setAsync(false)
   	 FormValidateAjax.validateForm(formBeanClassName, parameters, {
			callback:function(reply) {
			   if (reply!=null) {
			        callback(reply);
			   } else {
			   		callResult = true;
			        theForm.submit();
			   }
			}
	 });

	 DWREngine.setAsync(true);
	 return false;
}

function showError(errors){
	var params = DWRUtil.getValues(errors);
   	var errorstr="";
	for (i in errors){
		 errorstr +=errors[i]+"\n" ;
	}
	alert(errorstr);
}
	
function appendUrlParam(url, name, value, encodeFlag) {
	if (value == null || value.length == 0) {
		return url;
	}
	
	var		sep;
	var		ret;
	
	if (url.indexOf('?') < 0) {
		sep = '?';
	}
	else {
		sep = '&';
	}
	
	ret = url + sep + name + '=';
	
	if (encodeFlag) {
		ret += encodeURIComponent(value);
	}
	else {
		ret += value;
	}
	return ret;
}

function isEmpty(str) {
	return str == null || str.length == 0;
}

