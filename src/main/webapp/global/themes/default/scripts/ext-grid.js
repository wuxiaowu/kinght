(function($){
	$(function(){
			var setParameter;
			if($('#layout-content .x-grid-panel').length>0) {$('#layout-content').css('overflow','hidden');
				setParameter=$('#layout-content');
			}
			if($('#control-area .x-grid-panel').length>0) {$('#control-area').css('overflow','hidden');
				setParameter=$('#layout-sidebar');
			}
			
			var setSize = function(){
			var $prev = $('#table').prev();
			var prevHeight = 0;
			while($prev.length>0){
				prevHeight += $prev.outerHeight();
				$prev = $prev.prev();
			}
			 mygrid.setHeight(setParameter.height()-prevHeight-3);
			 mygrid.setWidth(setParameter.width());
			};
			
			var moreSetSize = function(){
			var $prev = $('#table').prev();
			var prevHeight = 0;
			while($prev.length>0){
				prevHeight += $prev.outerHeight();
				$prev = $prev.prev();
			}
			 mygrid.setHeight($('#layout-content').height()-prevHeight-3);
			 mygrid.setWidth($('#layout-content').width());
			 sidebarmygrid.setHeight($('#layout-sidebar').height()-3);
			 sidebarmygrid.setWidth($('#layout-sidebar').width());
			};
			
			if($('.x-grid-panel').length<2) setSize();
			else  moreSetSize();
			
			$(window).resize(function(){
				if($('.x-grid-panel').length<2) setSize();
				else moreSetSize();
			});
	});
})(jQuery);
