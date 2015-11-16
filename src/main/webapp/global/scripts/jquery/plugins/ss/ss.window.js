(function($){
	$.ss = $.ss || {};
	
	$.ss.window = {
		open: function(args){
			var options = {
				windowNamePrefix: 'popup'
			};
			args == null ? {} : args;
			$.extend(options, args);
			
			if(!options.windowName) options.windowName = options.windowNamePrefix + Math.round(Math.random()*10000);
			window.open(options.url, options.windowName);
		}
	};
	
})(jQuery);