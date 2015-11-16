var verify = {};

(function($){
	String.prototype.trim = function(){
	    return $.trim(this);
	}
	verify.required = function(){
		var result = true;
		$('label.required').each(function(){
			var $input = $(this).next();
			if($input.val().trim() == ''){
				result = false;
				$input.addClass('required');
			}else{
				$input.removeClass('required');
			}
		});
		return result;
	};
	
	verify.all = function(){
		return this.required();
	}
})(jQuery);