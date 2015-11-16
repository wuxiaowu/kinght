(function($){
	$.ss = $.ss || {};
	
	$.ss.isIe6 = function(){
		return $.browser.msie && $.browser.version == '6.0';
	};
	
	$.ss.append = function($from, $to){
		if($.browser.msie){
			$from.each(function(){
				$to.append(this.outerHTML);
			});
		}else{
			$to.append($from.clone());	//TODO firefox3 will not allow this. 
									// and code inside an iframe from the same domain as its parent *can* manipulate the DOM in the parent, 
									// and vice versa.
									// What you can't do is move or copy DOM nodes between them.
		}
	};
	
	$.ss.after = function($from, $to){
		if($.browser.msie){
			$from.each(function(){
				$to.after(this.outerHTML);
			});
		}else{
			$to.after($from.clone());	//TODO firefox3 will not allow this. 
									// and code inside an iframe from the same domain as its parent *can* manipulate the DOM in the parent, 
									// and vice versa.
									// What you can't do is move or copy DOM nodes between them.
		}
	};
	
	$.ss.ssGetFileName = function($input){
		var inputName = $input.attr('name');
		var index = inputName.indexOf('(');
		return inputName.slice(0, index);
	};
	
	$.fn.ssReSetFileName = function(filename){
		this.each(function(index){
			$(this).attr('name', filename + '(' + index +')');
		});
	};
	
	$.fn.ssFirst = function(){
		return this.length==0 ? this : $(this.get(0));
	};
	
})(jQuery);