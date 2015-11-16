(function($){
	$(function(){
		$('table.sort-datas').ssgrid({selectAction: true, isSpripeRows: false});
		var $shrink = $('<div class="shrink"/>'),$spread = $('<div class="spread"/>');
		$('tr.sort-level > td:nth-child(2)').prepend($spread);
		$('tr.sort-level > td:nth-child(2)').toggle(function(){
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
				if(!$next.hasClass('sort-level')){
				if($next.length==0) return;
				$next.show();
				$next = $next.next();
				}
			});
			$(window).trigger('resize');
		});
	});
})(jQuery);
