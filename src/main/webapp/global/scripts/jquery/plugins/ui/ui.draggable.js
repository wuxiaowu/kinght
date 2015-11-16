/*
 * jqDnR - Minimalistic Drag'n'Resize for jQuery.
 *
 * Copyright (c) 2007 Brice Burgess <bhb@iceburg.net>, http://www.iceburg.net
 * Licensed under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * $Version: 2007.08.19 +r2
 */
(function($){
$.fn.jqDrag=function(h){return i(this,h,'d');};
$.jqDnR1={dnr:{},e:0,
drag:function(v){var dragLeft=M.X+v.pageX-M.pX,dragTop=M.Y+v.pageY-M.pY,dialogWidth=$('.ui-dialog').width(),dialogHeight=$('.ui-dialog').height(),windowWidth=$(window).innerWidth(),windowHeight=$(window).innerHeight();
 if(dragTop<0)dragTop=0;
 if(dragTop>windowHeight-dialogHeight) dragTop=windowHeight-dialogHeight;
 if(dragLeft<0){var plus=Math.abs(dragLeft);if(plus >dialogWidth-60) dragLeft=0-(dialogWidth-60);}
 if(dragLeft>windowWidth-dialogWidth) dragLeft=windowWidth-dialogWidth;
 try{if(window.parent != window){ var parentDialog=$(parent.document).find('.ui-dialog').width();var parentDialogh=$(parent.document).find('.ui-dialog').height();if(dragLeft>parentDialog-dialogWidth) dragLeft=parentDialog-dialogWidth;if(dragTop>parentDialogh-dialogHeight-30) dragTop=parentDialogh-dialogHeight-30;}
 }catch(e){}
 if(M.k == 'd')E.css({left:dragLeft,top:dragTop});
 else E.css({width:Math.max(v.pageX-M.pX+M.W,0),height:Math.max(v.pageY-M.pY+M.H,0)});
  return false;},
stop:function(){$().unbind('mousemove',J.drag).unbind('mouseup',J.stop);}
};
var J=$.jqDnR1,M=J.dnr,E=J.e,
i=function(e,h,k){return e.each(function(){h=(h)?$(h,e):e;
 h.bind('mousedown',{e:e,k:k},function(v){var d=v.data,p={};E=d.e;
 // attempt utilization of dimensions plugin to fix IE issues
 if(E.css('position') != 'relative'){try{E.position(p);}catch(e){}}
 M={X:p.left||f('left')||0,Y:p.top||f('top')||0,W:f('width')||E[0].scrollWidth||0,H:f('height')||E[0].scrollHeight||0,pX:v.pageX,pY:v.pageY,k:d.k};
 $().mousemove($.jqDnR1.drag).mouseup($.jqDnR1.stop);
 $('iframe').contents().find('body').mouseup($.jqDnR1.stop);  
 return false;
 });
});},
f=function(k){return parseInt(E.css(k))||false;};
})(jQuery);