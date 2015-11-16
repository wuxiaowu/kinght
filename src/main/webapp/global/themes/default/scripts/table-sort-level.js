(function($){
	$(function(){
		$('table.sort-datas').ssgrid({selectAction: true, isSpripeRows: false});
		var $shrink = $('<div class="shrink"/>'),$spread = $('<div class="spread"/>');
		var column;
		if($('thead :checkbox').length>0) {column=2;
			$('tr.sort-level > td > :checkbox').click(function(){
				if($(this).parents('.especially').is('.especially')==false){										   
					var checked = this.checked;											   
					var $next = $(this).parent().parent().next();
					$('tbody tr').each(function(){
						if(!$next.hasClass('sort-level')&&!$next.hasClass('empty')){
						if($next.length==0) return;
						if($next.find(':checkbox').length>0)$next.find(':checkbox').get(0).checked=checked;
						$next = $next.next();
						}
					});
				}
			});
		}
		else column=1;
		$('tr.sort-level > td:nth-child('+(column)+')').prepend($spread);
		$('tr.sort-level > td:nth-child('+(column)+')').toggle(function(){
			$(this).find('.spread').removeClass('spread').addClass('shrink');												
			var $next = $(this).parent().next();
			$('tbody tr').each(function(){
				if(!$next.hasClass('sort-level')&&!$next.hasClass('empty')){
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
				if(!$next.hasClass('sort-level')&&!$next.hasClass('empty')){
				if($next.length==0) return;
				$next.show();
				$next = $next.next();
				}
			});
			$(window).trigger('resize');
		}).trigger('click');
	});
})(jQuery);
