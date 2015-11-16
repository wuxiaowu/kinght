(function($){
	$.ss = $.ss || {};

	$.ss.iframeDialog = function(url, o){
		var options = {
			resize: false,
			width: 760,
			height: 400
		};
		o == null ? {} : o;
		$.extend(options, o);
		
		$(document).find('.ui-dialog ').remove();
		
		var $dialog = $('<iframe frameborder="0"></iframe>').attr('src', url).appendTo($('body')).dialog(options).prev().find('.ui-dialog-titlebar-close').click(function(){
			jQuery.ui.unboundResize();
			jQuery.ui.unboundRevert();
			$(document).find('.ui-dialog,.mode').remove();
			try{
				if($(parent.document).find('body').hasClass('x-border-layout-ct')){
					jQuery.ui.unboundDialogMain();
					$(parent.document).find('.main-mode').remove();
				}
				if($(parent.document).find('.tab-flag').length == 1){
					$(parent.document).find('.tasks-tab-mode').remove();
					if($(parent.parent.document).find('.main-mode').length>1){
						$(parent.parent.document).find('.main-mode').remove();
						$(parent.parent.document).find('body').append('<div id="main-mode" class="main-mode"/>');
						jQuery.ui.dialogTabMain();
					}
					else $(parent.parent.document).find('.main-mode').remove();
					jQuery.ui.unboundDialogTabMain();
				}
			}catch(e){}
		});
	};
	
	$.ss.iframeDialogClose = function(){
		parent.jQuery.ui.unboundResize();
		parent.jQuery.ui.unboundRevert();
		// if invoked in iframe
		if(window.parent != window){
			try{
				if($(parent.parent.document).find('.tab-flag').length == 1){
					$(parent.parent.document).find('.tasks-tab-mode').remove();
					if($(parent.parent.parent.document).find('.main-mode').length>1){
						$(parent.parent.parent.document).find('.main-mode').remove();
						$(parent.parent.parent.document).find('body').append('<div id="main-mode" class="main-mode"/>');
						parent.jQuery.ui.dialogTabMain();
					}
					else $(parent.parent.parent.document).find('.main-mode').remove();
					parent.jQuery.ui.unboundDialogTabMain();
				}
				if($(parent.parent.document).find('body').hasClass('x-border-layout-ct')){
					parent.jQuery.ui.unboundDialogMain();
					$(parent.parent.document).find('.main-mode').remove();
				}
			}catch(e){}
			$(parent.document).find('.ui-dialog,.mode').remove();
			
		}
	};
	
})(jQuery);