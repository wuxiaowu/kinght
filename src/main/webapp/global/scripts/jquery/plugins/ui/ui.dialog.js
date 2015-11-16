(function($)
{
	//If the UI scope is not availalable, add it
	$.ui = $.ui || {};

	$.fn.dialog = function(o) {
		return this.each(function() {
			if (!$(this).is(".ui-dialog")) new $.ui.dialog(this, o);
		});
	}
	$.fn.dialogOpen = function() {
		return this.each(function() {
			var contentEl;
			if ($(this).parents(".ui-dialog").length) contentEl = this;
			if (!contentEl && $(this).is(".ui-dialog")) contentEl = $('.ui-dialog-content', this)[0];
			$.ui.dialogOpen(contentEl)
		});
	}
	$.fn.dialogClose = function() {
		return this.each(function() {
			var contentEl;
			if ($(this).parents(".ui-dialog").length) contentEl = this;
			if (!contentEl && $(this).is(".ui-dialog")) contentEl = $('.ui-dialog-content', this)[0];
			$.ui.dialogClose(contentEl);
		});
	}

	$.ui.dialog = function(el, o) {
		
		var options = {
			width: 300,
			height: 200,
			position: 'center',
			buttons: [],
			modal: false,
			drag: true,
			resize: true,
			mode:true,
			fix:true,
			auto:false,
			button:true,
			shadow: false // It's quite slow
		};
		var o = o || {}; $.extend(options, o); //Extend and copy options
		this.element = el; var self = this; //Do bindings
		$.data(this.element, "ui-dialog", this);

		var uiDialogContent = $(el).addClass('ui-dialog-content')
			.css({width: options.width, height: options.height - 29})	//add by maomao
			.wrap(document.createElement('div'))
			.wrap(document.createElement('div'));
		var uiDialogContainer = uiDialogContent.parent().addClass('ui-dialog-container').css({position: 'relative'});
		var uiDialog = uiDialogContainer.parent()
			.addClass('ui-dialog').addClass(uiDialogContent.attr('className'))
			.css({position: 'absolute', width: options.width, height: options.height});
    
        if (options.modal == false && options.resize == true) {
		    uiDialog.append("<div class='ui-resizable-n ui-resizable-handle'></div>")
                .append("<div class='ui-resizable-s ui-resizable-handle'></div>")
                .append("<div class='ui-resizable-e ui-resizable-handle'></div>")
                .append("<div class='ui-resizable-w ui-resizable-handle'></div>")
                .append("<div class='ui-resizable-ne ui-resizable-handle'></div>")
                .append("<div class='ui-resizable-se ui-resizable-handle'></div>")
                .append("<div class='ui-resizable-sw ui-resizable-handle'></div>")
                .append("<div class='ui-resizable-nw ui-resizable-handle'></div>");
      
		    uiDialog.resizable();
		}
	
		var dialogAuto=function(){
			if($('.ui-dialog').length==1){
				$.ui.unboundRevert();
				uiDialog.css({top: 0, left: 0});
				$('.ui-dialog').width($(window).innerWidth()-3);
				$('.ui-dialog').height($(window).innerHeight()-4);
				var $iframe = $('iframe.ui-dialog-content');
				if($iframe.length == 1){
					$iframe.width($(window).innerWidth()-3);
					$iframe.height($(window).innerHeight()-33);
				}
			}
			$('#ui-dialog-titlebar-button').removeAttr('class').addClass('ui-dialog-titlebar-revert');
			$('.ui-dialog-titlebar-revert').hover(function(){
				$(this).removeClass('ui-dialog-titlebar-maximize-hover');									   
				$(this).addClass('ui-dialog-titlebar-revert-hover');
			},function(){
				$(this).removeClass('ui-dialog-titlebar-revert-hover');
			});
			$(window).bind('resize', dialogAuto);
		}
		
		$.ui.dialogAuto = dialogAuto;
	
		var dialogRevert=function(){
			if($('.ui-dialog').length==1){
				$.ui.unboundResize();
				var revertWidth=($(window).width()/ 2)-(options.width/2);
				var	revertHeight=($(window).height()/ 2)-(options.height/2);
				uiDialog.css({top:revertHeight,left:revertWidth,width: options.width, height: options.height});
				uiDialogContent.css({width: options.width, height: options.height - 29});
			}
			$('#ui-dialog-titlebar-button').removeAttr('class').addClass('ui-dialog-titlebar-maximize');
			$('.ui-dialog-titlebar-maximize').hover(function(){
				$(this).removeClass('ui-dialog-titlebar-revert-hover')										 
				$(this).addClass('ui-dialog-titlebar-maximize-hover');
			},function(){
				$(this).removeClass('ui-dialog-titlebar-maximize-hover');
			});
			$(window).bind('resize', dialogRevert);
		}
		
		$.ui.dialogRevert=dialogRevert;
		
		var dialogMain=function(){
			var $layoutSidebar=$(parent.document).find('#layout-sidebar');
			var $mainMode=$(parent.document).find('#main-mode');
			var $westPanel=$(parent.document).find('#west-panel');
			if($layoutSidebar.length==1){
				var layoutSidebarHeight = $layoutSidebar.outerHeight()+1;
				$mainMode.css('height',layoutSidebarHeight);
				if($layoutSidebar.is(':hidden')) $mainMode.css('width',8);
			}
			
			if($westPanel.length==1){
				var $westPanelWidth=$westPanel.width()+5;
				if($westPanel.is(':hidden')) $mainMode.css('width',28);
				else $mainMode.css('width',$westPanelWidth);
				
			}
			$(window).bind('resize', dialogMain);
		}

		$.ui.dialogMain=dialogMain;
		
		var dialogTabMain=function(){
			var $layoutSidebar=$(parent.parent.document).find('#layout-sidebar');
			var $mainMode=$(parent.parent.document).find('#main-mode');
			var $westPanel=$(parent.parent.document).find('#west-panel');
			
			if($layoutSidebar.length==1){
				var layoutSidebarHeight = $layoutSidebar.outerHeight()+1;
				$mainMode.css('height',layoutSidebarHeight);
				if($layoutSidebar.is(':hidden')) $mainMode.css('width',8);
			}
			
			if($westPanel.length==1){
				var $westPanelWidth=$westPanel.width()+5;
				if($westPanel.is(':hidden')) $mainMode.css('width',28);
				else $mainMode.css('width',$westPanelWidth);
				
			}
			$(window).bind('resize', dialogTabMain);
		}
		
		$.ui.dialogTabMain=dialogTabMain;		

		if (options.mode == true) {
			$('.ui-dialog').before('<div id="mode" class="mode"/>');
			if($.ss.isIe6()) $('.ui-dialog').prepend('<iframe class="repair-select" frameborder="0" src="about:blank"></iframe> ')
			try{
				if($(parent.document).find('body').hasClass('x-border-layout-ct')){
					$(parent.document).find('body').append('<div id="main-mode" class="main-mode"/>');dialogMain();
				}
				if(window.parent != window){
					if($(parent.document).find('.tab-flag').length == 1){
						if(($(parent.document).find('#tasks-tab-mode').length==0)&&($(parent.document).find('#mode').length==0)){
							$(parent.document).find('#layout-wrap').after('<div id="tasks-tab-mode" class="tasks-tab-mode"/>');
						}
						if($(parent.parent.document).find('body').hasClass('x-border-layout-ct')){
							$(parent.parent.document).find('body').append('<div id="main-mode" class="main-mode"/>');
							dialogTabMain();
						}
						var breadcrumbHeight = 0, $breadcrumb = $(parent.document).find('#layout-breadcrumb');
						if($breadcrumb.length == 1) breadcrumbHeight = 28;
						var toolbarHeight = 0, $toolbar = $(parent.document).find('#layout-toolbar');
						if($toolbar.length == 1) toolbarHeight = 42;
						var tabsNavHeight=41;
						if($.browser.mozilla) tabsNavHeight=37;
						if($toolbar.length==0 || $breadcrumb.length == 0) tabsNavHeight=38;
						if(($toolbar.length==0 || $breadcrumb.length == 0) &&($.browser.mozilla))tabsNavHeight=35;
						$(parent.document).find('#tasks-tab-mode').css('height',breadcrumbHeight+toolbarHeight+tabsNavHeight)
					}
				}
			}catch(e){}
		}
		if(options.auto == true)$(window).bind('resize', dialogAuto).trigger('resize');
		else if($(window).trigger('resize')) $(window).bind('resize', dialogRevert);
		
		
		
		uiDialogContainer.prepend('<div class="ui-dialog-titlebar"></div>');
		var uiDialogTitlebar = $('.ui-dialog-titlebar', uiDialogContainer);
		var title = (options.title) ? options.title : (uiDialogContent.attr('title')) ? uiDialogContent.attr('title') : '';
		uiDialogTitlebar.append('<span class="ui-dialog-title">' + title + '</span>');
		if (options.button == true){
			uiDialogTitlebar.append('<div class="ui-dialog-titlebar-close"></div>');
			$('.ui-dialog-titlebar-close').before('<div id="ui-dialog-titlebar-button" class="ui-dialog-titlebar-maximize"></div>');
			$('.ui-dialog-titlebar-close', uiDialogTitlebar)
				.hover(function() { $(this).addClass('ui-dialog-titlebar-close-hover'); }, 
					   function() { $(this).removeClass('ui-dialog-titlebar-close-hover'); })
				.mousedown(function(ev) {
					ev.stopPropagation();
				})
				.click(function() {
					self.close();
				});
				
				$('.ui-dialog-titlebar-maximize').hover(function(){
				  $(this).addClass('ui-dialog-titlebar-maximize-hover');
				},function(){
				  $(this).removeClass('ui-dialog-titlebar-maximize-hover');
				});
		}
		var l = 0;
		$.each(options.buttons, function() { l = 1; return false; });
        if (l == 1) {
		    uiDialog.append('<div class="ui-dialog-buttonpane"></div>');
		    var uiDialogButtonPane = $('.ui-dialog-buttonpane', uiDialog);
		    $.each(options.buttons, function(name, value) {
		    	var btn = $(document.createElement('button')).text(name).click(value);
		    	uiDialogButtonPane.append(btn);
		    });
		}
        
        if (options.modal == false && options.drag == true) {
		    //uiDialog.draggable({ handle: '.ui-dialog-titlebar' });
			uiDialog.jqDrag('.ui-dialog-titlebar')
        }
        
		if (options.fix == true) {	
			$('.ui-dialog-titlebar').dblclick(function(){
				currentSize=uiDialog.css('width');
				num=parseFloat(currentSize,10);
				if(num==options.width) dialogAuto();
				else dialogRevert();
			 });
			
			$('#ui-dialog-titlebar-button').click(function(){
				currentSize=uiDialog.css('width');
				num=parseFloat(currentSize,10);
				if(num==options.width) dialogAuto();
				else dialogRevert();
			});
			
		}
		
		this.open = function() {
			var wnd = $(window), top = 0, left = 0;
			switch (options.position) {
				case 'center':
					top = (wnd.height() / 2) - (uiDialog.height() / 2);
					left = (wnd.width() / 2) - (uiDialog.width() / 2);
					break;
				case 'left':
				    top = (wnd.height() / 2) - (uiDialog.height() / 2);
				    left = 0;
				    break;
				case 'top':
    			    top = 0;
					left = (wnd.width() / 2) - (uiDialog.width() / 2);
					break;
			}
			uiDialog.css({top: top, left: left});
			uiDialog.appendTo('body').show();
		};

		this.close = function() {
			uiDialog.hide();
		};

		uiDialog.show();
		this.open();
        if (options.shadow && $.fn.shadow != undefined) {
            uiDialog.shadow();
        }
	}

	$.ui.dialogOpen = function(el) {
		$.data(el, "ui-dialog").open();
	}

	$.ui.dialogClose = function(el) {
		$.data(el, "ui-dialog").close();
	}
	
	$.ui.unboundResize = function() {
		$(window).unbind("resize", $.ui.dialogAuto);
	}

	$.ui.unboundRevert = function() {
		$(window).unbind("resize", $.ui.dialogRevert);
	}
	
	$.ui.unboundDialogMain = function() {
		$(window).unbind("resize", $.ui.dialogMain);
	}
	
	$.ui.unboundDialogTabMain = function() {
		$(window).unbind("resize", $.ui.dialogTabMain);
	}

})(jQuery);
