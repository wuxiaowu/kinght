(function($){
	$(function(){
		if($('#tasks-tab').length>0){
			$('#tasks-tab').tabs({
				iframe: true,
				onShow: reHeightIframe,
				onInit: reHeightIframe
			});
			$(window).bind('resize', reHeightIframe).trigger('resize');
			function reHeightIframe(){
				var $content = $('#layout-content');
				var height = $content.innerHeight() - $('ul.tabs-nav', $content).outerHeight()-1 ;
				var width=$content.innerWidth()-2;
				var $iframe = $('div.tabs-container > iframe');
				if($iframe.length > 0){
					$iframe.height(height + 'px');
					$iframe.width(width + 'px');
				}
			};
		}
	});
})(jQuery);