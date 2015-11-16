(function($){
	$(function(){
		$('body').click(function(){
			if($(window.parent.document).find('#layout-sidebar').length==1 && $.browser.msie)
			$(window.parent.document).find('#layout-sidebar').css('z-index',0);
			$(window.parent.document).find('#layout-toolbar .sumbmenu').hide();
			if($(window.parent.parent.document).find('#layout-sidebar').length==1 && $.browser.msie)
			$(window.parent.parent.document).find('#layout-sidebar').css('z-index',0);
			$(window.parent.parent.document).find('#layout-toolbar .sumbmenu').hide();
		});
	});
})(jQuery);
