(function($){
	$(function(){
		$(window).bind('resize', function(){
			var width = $(window).innerWidth();
			var $layoutSidebar = $('#layout-sidebar:visible');
			if($layoutSidebar.length == 1){
				width = width - $layoutSidebar.outerWidth()-10;
			};
			$('#layout-content').width(width-6 + 'px');
		}).trigger('resize');
	});
})(jQuery);