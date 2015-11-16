(function($){
	$.ss == null ? {} : $.ss;
	
	$.fn.sscenter = function(){
		return this.each(function() {
			var el = $(this);
			var win = $(window);
			
			win.bind('resize', function(){
				var left = (win.width() - el.width())/2;
				if(left < 0) left = 0;
				
				var top = (win.height() - el.height())/2;
				if(top < 0) top = 0;
				
				el.css('position', 'absolute').css('left', left + 'px').css('top', top + 'px');
			}).trigger('resize');
		});
	};
})(jQuery);