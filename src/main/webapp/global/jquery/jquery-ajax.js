$.ajaxSetup({
	cache: false,
	dataType: "json"
});

function ajaxJSON(){
 var url = arguments[0];
 var data = arguments[1];
 var success = arguments[2];
 if(arguments[3]){
 	if(typeof(arguments[3]) == "string"){
 		var type = arguments[3];
 	}else if(typeof(arguments[3]) == "function"){
 		var error = arguments[3];
 	}
 }
 if(arguments[4]){
 	var type = arguments[4];
 }
 
 var options = new Object();
 options.url = host + url;
 options.data = data;
 options.success = success;
 if(error){
 	options.error = error;
 }
 if(type){
 	options.type = type;
 }else{
 	options.type = "GET";
 }
 $.ajax(options);
}