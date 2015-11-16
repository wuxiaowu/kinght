(function($){
	$(function(){
		$('#ok-button').focus();
		$(window.document).keydown(function(event){
			if(event.keyCode==13) $.ss.iframeDialogClose();
		});
	});
})(jQuery);
