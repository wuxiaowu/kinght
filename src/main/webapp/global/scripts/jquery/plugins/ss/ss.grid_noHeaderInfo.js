(function($){
	$.ss = $.ss || {};
	
	$.fn.ssgridSelectAll = function(flag){
		$selectAllCheckbox = $('thead > tr > th input.select-all-checkbox', this).get(0).checked = flag;
		//this.ssgridTriggerSelect(true);
	};
	
	$.fn.ssgridTriggerSelect = function(flag){
		$('tbody > tr > td input[type=checkbox]', this).each(function(){
			this.checked = flag;
		});
	};
	
	$.ss.addInitialize = function(){
		if($('#layout-data').length > 0 && $('#layout-data table:not(.repart)').length==1){
			
			if($.browser.msie){
			//	$('#layout-data').append('<div id="data-inside"></div>');
			//	$('#layout-data table').appendTo('#data-inside');
			//	$('#data-inside').appendTo('#layout-data fieldset');
				$('#layout-data').css({overflowX:"hidden", overflowY:"hidden"});
				$('#layout-content').css({overflowX:"hidden", overflowY:"hidden"});
				$('#layout-data thead > tr').addClass('fixhead');
				$('#layout-data thead > tr > th').addClass('single-file-fixhead');
				
			}
		   if( $.browser.mozilla){
				$('#layout-data').after('<div id="scroll-div"><div id="inside-div"></div></div>');
				$('#layout-content').css({overflowX:"hidden", overflowY:"hidden"});
			}
		}
	};
	
	$.ss.fixhead = function(height,contentWidth,layoutDataWidth){
		var $layoutData = $('#layout-data');
		if($('#layout-data table:not(.repart)').length==1){
			if($.browser.msie){
				var $dataInside=$('#data-inside');
				var dataHeight=height;
				if($dataInside.parent().is('fieldset')){
					dataHeight=parseInt(height)-24;
				}
				$dataInside.width((parseInt(layoutDataWidth)-10) + 'px');
				if($layoutData.parent().is('#control-area')) {
					$dataInside.width($('#layout-sidebar').outerWidth()-8+ 'px');
					$('#layout-content').css({overflowX:"auto", overflowY:"auto"});
				}
				$dataInside.height(dataHeight-4+ 'px');
			}
					
			if($.browser.mozilla){
				layoutDataWidth = contentWidth - 20;
				$('#layout-data tbody').attr('id','tbody');					
				var tbody = document.getElementById("tbody");
				$('#layout-data tbody').css({overflowX:"hidden",overflowY:"hidden"});
				if($('#layout-data table').parent().is('fieldset')){
					var spilthheight=60;
				}
				else spilthheight=44;
				if($('#layout-data thead > tr').length==2) spilthheight=70;
				if($('#layout-data thead > tr').length==3) spilthheight=94;
				var tHeight=0;
				var tbodyHeight=height-spilthheight,tbodyTr=0;
				$('tbody tr').each(function(){
					if($(this).is(':visible')){tHeight+=$(this).height();tbodyTr++};
				});
				
				if(tHeight < tbodyHeight){
					if($('tbody > tr > td').css('white-space')=='nowrap')$('#layout-data tbody').height(tbodyTr*25);
					if($('tbody > tr > td').css('white-space')=='normal')$('#layout-data tbody').height(tHeight);
				}
				else $('#layout-data tbody').height(tbodyHeight);
				$('#data-inside').height(height+2+ 'px');
				$layoutData.css({ overflowX: "auto", overflowY: "hidden" });
				
				var $insideDiv = $('#inside-div');
				$insideDiv.height(tbody.scrollHeight+spilthheight);
				var $scrollDiv = $('#scroll-div');
				$scrollDiv.height(height);
				$scrollDiv.css('top','$("#layout-data tbody").offsetTop');
				$scrollDiv.css('left','$("#layout-data tbody").offsetLeft');
				$scrollDiv.css({overflowX:"hidden", overflowY:"auto"});
				
				$scrollDiv.scroll(function(){
				  tbody.scrollTop = $scrollDiv.scrollTop();
				});
			}
		}
		return layoutDataWidth;
	};

	
	$.fn.ssgridAppend = function(tr){
		//TODO
	};
	
	$.fn.ssgridSelected = function(){
		return this.find('tbody > tr.selected');
	};
	
	$.fn.ssgridChecked = function(){
		return this.find('tbody > tr > td input:checked').parent().parent();
	};
	
	$.fn.ssgridReSpripe = function(args){
		$.ss.grid.cleanSpripe(this);
		
		this.removeAttr('grid').find('td.serial-number').each(function(index){
			$(this).html(index+1);
		});
	
		args.columnResize = false;
		args.showHeaderInfo = false;
		return this.ssgrid(args);
	};
	$.fn.check = function($table) {
		return this.each(function() {
		if(this.checked==true) $('thead > tr > th input.select-all-checkbox',$table).get(0).checked = false;
		this.checked = !this.checked;
		});
	};
	
	$.fn.ssgrid = function(args){	
		var options = {
			selectAction: false,
			multiSelected: true,
			columnResize: true,
			showHeaderInfo: false,
			isSpripeRows: true,
			spripeRows: 1
		};
		args == null ? {} : args;
		$.extend(options, args);
		
		if(this.attr('grid') == 'true') return this;
		
		this.attr('grid', 'true');
		
		return this.each(function() {
			var tableEl = this;
			var $table = $(this);
			var ShiftStartRow="";
			var oTable=$('tbody > tr').parent().get(0);
			if(options.isSpripeRows)$.ss.grid.spripe(tableEl, options.spripeRows);
			
			if(options.selectAction && options.spripeRows == 1){
					
				$('tbody > tr', tableEl).hover(function(){
					$(this).addClass('hover');
				}, function(){
					$(this).removeClass('hover');
				});

				if(options.multiSelected){
					$('tbody > tr', tableEl).click(function(e){
						if(e.ctrlKey){
							tableEl.selectOne(this);
						}else if(e.shiftKey){
							if(ShiftStartRow!=""){
								var StartIndex=ShiftStartRow;
								tableEl.selectMany(StartIndex, this);
							}
						}else{
							$(this).parent().find('tr.selected').removeClass('selected');
							tableEl.selectOne(this);
							ShiftStartRow=this;
						}
					});
				}else{
					$('tbody > tr', tableEl).click(function(){
						$(this).parent().find('tr.selected').removeClass('selected');
						tableEl.selectOne(this);
					});
				}
			}
			
			
			tableEl.selectOne = function(el){
				$(el).toggleClass('selected');
				var m=0,wholeCheckked;
				if($('tbody :checkbox', tableEl).length>0) wholeCheckked=$('tbody :checkbox', tableEl).length;
				$('tbody :checkbox', tableEl).each(function(){
					if(this.checked == true) m++;
				});
				if((m==wholeCheckked) && $('thead > tr > th input.select-all-checkbox', $table).length>0) $table.ssgridSelectAll(true); 
				if((m!=wholeCheckked) && $('thead > tr > th input.select-all-checkbox', $table).length>0) $table.ssgridSelectAll(false); 
				if($('thead :checkbox',$table).length>0 && $('thead > tr > th input.select-all-checkbox',$table).get(0).checked ==true){
					 $('tbody > tr',$table).addClass('selected');
				}
				$(el).focus();
		
			};
			
			tableEl.selectMany = function(fromEl, toEl){
				if(fromEl.rowIndex < toEl.rowIndex){
					$('tbody :checkbox', tableEl).each(function(){
						this.checked = false;
					});
					$(this).parent().find('tr.selected').removeClass('selected');
					for(var i=fromEl.rowIndex-1;i<toEl.rowIndex;i++){
						if($('thead > tr').length==1) tableEl.selectOne(oTable.rows[i]);
						if($('thead > tr').length==2) tableEl.selectOne(oTable.rows[i-1]);
						if($('thead > tr').length==3) tableEl.selectOne(oTable.rows[i-2]);
					}

				}else{
					$('tbody :checkbox', tableEl).each(function(){
						this.checked = false;
					});
					$(this).parent().find('tr.selected').removeClass('selected');
					for(var i=toEl.rowIndex-1;i<fromEl.rowIndex;i++){
						if($('thead > tr').length==1) tableEl.selectOne(oTable.rows[i]);
						if($('thead > tr').length==2) tableEl.selectOne(oTable.rows[i-1]);
						if($('thead > tr').length==3) tableEl.selectOne(oTable.rows[i-2]);
					}			
				}
			};
			
			$('thead > tr > th input.select-all-checkbox', tableEl).click(function(){
				var checked = this.checked;
				if(checked)$('tbody > tr',$table).addClass('selected');
				else $('tbody > tr',$table).removeClass('selected');
				$table.ssgridTriggerSelect(checked);
			});
			
			if($('thead > tr > th :checkbox', tableEl).length==2){
				if($.ss.isIe6()){$('th.select-all').css('width',65)}
				$('thead > tr > th :checkbox', tableEl).hover(function(){var alertText=0;
					if($(this).is('.select-all-checkbox')) 	alertText='本页全选'	;	
					if($(this).is('.select-all-page')) 	alertText='跨页全选'	;	
					var alertLeft=$(this).offset().left+20,alertTop=$(this).offset().top+16;
					$('<div id="tool-tip"></div>').appendTo('body').css({'left': alertLeft,'top':alertTop}).text(alertText); 
				}, function(){
					$('#tool-tip').remove();
				});
			}
			
			if(options.columnResize && $.ui && $.ui.mouseInteraction){
				var $splitLine = $('<div class="split-line"></div>').height($table.height() + 'px');
				$('body').after($splitLine);
				$('thead > tr > th:not(.select-all)', $table).each(function(){
					$('<div class="resize"></div>').prependTo($(this)).each(function(){
						var mouseInteraction = new $.ui.mouseInteraction(this, {
							nonDestructive: true,
							_start: function(helper, pos, cursorAt, mouseObject, e){
								$(helper).parent().parent().css('cursor', 'col-resize');
								
								mouseInteraction.posX = e.clientX;
								mouseInteraction.width = $(helper).parent().width();
								
								$splitLine.css('left',  e.clientX).css('top', $table.offset().top).show();
							},
							_drag: function(helper, pos, cursorAt, mouseObject, e){
								var newWidth = mouseInteraction.width + e.clientX - mouseInteraction.posX;
								if(newWidth < parseInt($(helper).parent().css('min-width'))) return;
								
								$splitLine.css('left',  e.clientX);
							},
							_beforeStop: function(helper, pos, cursorAt, mouseObject, e){
								var newWidth = mouseInteraction.width + e.clientX - mouseInteraction.posX;
								var minWidth = parseInt($(helper).parent().css('min-width'));
								if(newWidth < minWidth) newWidth = minWidth;
								
								$(helper).parent().width(newWidth + 'px');
							},
							_stop: function(helper, pos, cursorAt, mouseObject, e){
								$splitLine.hide();
								$(helper).parent().parent().css('cursor', 'default');
								mouseInteraction.posX = null;
								mouseInteraction.width = null;
							}
						});
					});
				});
			}
			
			if(options.showHeaderInfo){
				var $enter = $('<div class="enter collapse"></div>');
				var $firstTh = $('thead > tr:first-child > th:first-child', $table);
				$firstTh.css({'padding-left': '0', 'padding-right': '0'});
				$enter.prependTo($firstTh).toggle(function(){
					$enter.removeClass('collapse');
					$enter.addClass('expand');
					$('tbody > tr > td', tableEl).css('white-space', 'normal');
					$(window).trigger('resize');
				}, function(){
					$enter.removeClass('expand');
					$enter.addClass('collapse');
					$('tbody > tr > td', tableEl).css('white-space', 'nowrap');
					$(window).trigger('resize');
				});
				if($('thead > tr').length==3 &&$.browser.msie) $('.enter').css({float:'none',position:'absolute',left:1});
				$('thead > tr > th').each(function(){
					if($(this).attr('rowspan')==2) $(this).addClass('double-rows ');
					if($(this).attr('rowspan')==3) $(this).addClass('three-rows ');
					if(($(this).attr('colspan')>=2)&& $.browser.msie) $(this).css('border-bottom',0);
				});
			}
			
			$(window).unload(function(){
				tableEl.lastSelectedRow = null;
			});
		});
	};
	
	$.ss.grid = {
		spripe: function(tableEl, rowCount){
			if(rowCount ==1){
				$('tbody > tr:odd', tableEl).addClass('odd');
				$('tbody > tr:even', tableEl).addClass('even');
			}else{
				var even = true, i = 0;
				$('tbody > tr', tableEl).each(function(){
					if(even)$(this).addClass('even');
					else $(this).addClass('odd');
					i++;
					if(i == rowCount){
						i = 0;
						even = !even;
					}
				});
			}
		},
		cleanSpripe: function(tableEl){
			$('tbody > tr', tableEl).removeClass('odd even selected');
		}
	};

})(jQuery);