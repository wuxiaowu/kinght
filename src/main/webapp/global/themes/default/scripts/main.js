(function($){
	$(function(){
		$('#layout-wrap #layout-content, #layout-wrap #layout-breadcrumb, #layout-wrap #layout-toolbar, #layout-wrap #layout-sidebar, #layout-wrap #layout-footer').removeClass('default-border');
		
		
		$('#nav-accordion')
			.Accordion({animated: false})
			.before('<div id="nav-header"><div class="header-left"></div><div class="header-center"></div><div class="header-right"></div></div>')
			.after('<div id="nav-footer"><div class="footer-left"></div><div class="footer-center"></div><div class="footer-right"></div></div>');
		
		$('#layout-wrap').append('<div id="split-pane"></div>');
		
		resizeSidebar();
		
		var $layoutSidebar = $('#layout-sidebar');
		$('#split-pane').toggle(function(){
			$layoutSidebar.hide();
			$(this).addClass('right');
			resizeSidebar();
		}, function(){
			$(this).removeClass('right');
			$layoutSidebar.show();
			resizeSidebar();
		}).hover(function(){
			$(this).addClass('hover');
		}, function(){
			$(this).removeClass('hover');
		});
		
		$(window).bind('resize', function(){
			var layoutSidebarHeight = $('#layout-sidebar').innerHeight();
			$('#nav-accordion > dd').height(layoutSidebarHeight - 5*25 + 13 + 'px');
			$('#nav-accordion > dd > div').height(layoutSidebarHeight - 5*25 + 13 + 'px');	//fix for ie6 bug
			
		}).trigger('resize');
		
	});
	
	var resizeSidebar = function(){
		var $layoutSidebar = $('#layout-sidebar');
		var left = 2;
		if($.ss.isIe6()) left=4;
		if($layoutSidebar.is(':visible'))left+=$layoutSidebar.width();
		if($layoutSidebar.is(':hidden')) left=0;
		$('#split-pane').css('left', left + 'px')
		
	};
})(jQuery);