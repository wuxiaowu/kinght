		(function($){
			$(function(){
				$(window).resize(function(){
				var chooseHeight = $(window).height();
				var chooseWidth = $(window).width();
				var personDialogHeight=$('#person-dialog').height();
				if(personDialogHeight>400) {$('#info-content').height(300);
					personDialogHeight=400;
				}
				
				$('#person-dialog').css({top: (chooseHeight-personDialogHeight)/2-20, left: (chooseWidth-500)/2 });
				}).trigger('resize');
			});
		})(jQuery);
