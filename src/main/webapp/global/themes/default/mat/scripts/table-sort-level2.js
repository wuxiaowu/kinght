(function($){
	$(function(){
		$('table.sort-datas').ssgrid({selectAction: true, isSpripeRows: false});
		var $shrink = $('<div class="shrink"/>'),$spread = $('<div class="spread"/>');
		$('tr.sort-level > td:first-child').prepend($spread);
		$('tr.sort-level-2 > td:first-child').prepend($spread);
		$('tr.sort-level > td:first-child').toggle(function(){
			$(this).find('.spread').removeClass('spread').addClass('shrink');												
			var $next = $(this).parent().next();
			$('tbody tr').each(function(){
				if(!$next.hasClass('sort-level')){
				if($next.length==0) return;
				$next.hide();
				$next = $next.next();
				}
			});
			$(window).trigger('resize');
		}, function(){
			$(this).find('.shrink').removeClass('shrink').addClass('spread');			
			var $next = $(this).parent().next();
			$('tbody tr').each(function(){
				if(!$next.hasClass('sort-level')&&$next.hasClass('sort-level-2')){
				if($next.length==0) return;
				$next.show();				
				}
				$next = $next.next();
			});
			$(window).trigger('resize');
		}).trigger('click');
		
		$('tr.sort-level-2 > td:first-child').toggle(function(){
			$(this).find('.spread').removeClass('spread').addClass('shrink');												
			var $next = $(this).parent().next();
			$('tbody tr').each(function(){
				if(!$next.hasClass('sort-level')&&!$next.hasClass('sort-level-2')){
				if($next.length==0) return;
				$next.hide();
				$next = $next.next();
				}
			});
			$(window).trigger('resize');
		}, function(){
			$(this).find('.shrink').removeClass('shrink').addClass('spread');			
			var $next = $(this).parent().next();
			$('tbody tr').each(function(){
				if(!$next.hasClass('sort-level')&&!$next.hasClass('sort-level-2')){
				if($next.length==0) return;
				$next.show();
				$next = $next.next();
				}
			});
			$(window).trigger('resize');
		}).trigger('click');
	});
})(jQuery);
