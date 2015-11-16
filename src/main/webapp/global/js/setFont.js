
//======================by dgc==========================
//====窗口大小改变时树DIV宽度随着改变===============
window.attachEvent('onload',setActiveDivWidth)
function setActiveDivWidth(){
if(!window.activeDiv){return;}
activeDiv.style.width=0;
activeDiv.style.width=activeDiv.parentNode.offsetWidth-2;
}



/*********************************************************
 * 
 * 切换页面CSS样式
 *
 * Dai.G.C 2007-1-16
 *********************************************************/
window.attachEvent('onload',setFontTypeCss);

function setFontTypeCss()
{
	var fontType=getFontCookie();
	if(!fontType){
		setFontCookie("SMALL");
		fontType="SMALL";
	}
	setCssType(window,fontType);
}

function setCssType(win,styleType)
{
	var styles=win.document.styleSheets;
	for(var i=0;i<styles.length;i++)
	{
		var linkHref=styles[i].href;
		if(styleType=="SMALL"&&/bigfont/.test(linkHref))
		{
			var newLink=linkHref.replace("big","small");
			styles[i].href=newLink;
		}
		else if(styleType=="BIG"&&/smallfont/.test(linkHref))
		{
		    var newLink=linkHref.replace("small","big");
			styles[i].href=newLink;
		}
	}
}

function alterCssType(win,styleType)
{
    setCssType(win,styleType);
	
	var iframes=win.frames;
	for(var i=0;i<iframes.length;i++)
	{
	   alterCssType(iframes[i],styleType);
	}
}


function getFontCookie()
{
	return getCookie("FontType");
}

function setFontCookie(type)
{
  setCookie("FontType",type,getExpires(10*365),"/");
}

//***********读写cookie函数*********************************************************
    function getCookie(name)
    {
        var arg = name + "=";
        var alen = arg.length;
        var clen = document.cookie.length;
        var i = 0;
        while(i < clen)
        {
            var j = i + alen;
            if (document.cookie.substring(i, j) == arg)
            {
                return getCookieVal(j);
            }
            i = document.cookie.indexOf(" ", i) + 1;
            if(i == 0) break;
        }
        return;
    }
	
	function getCookieVal(offset)
    {
        var endstr = document.cookie.indexOf(";", offset);
        if(endstr == -1)
        {
            endstr = document.cookie.length;
        }
        return unescape(document.cookie.substring(offset, endstr));
    }
	
    function setCookie(name, value, expires, path, domain, secure)
    {
	    var cookie= name + "=" + escape(value) +
            ((expires) ? "; expires=" + expires : "") +
            ((path) ? "; path=" + path : "") +
            ((domain) ? "; domain=" + domain : "") +
            ((secure) ? "; secure" : "");
			
		document.cookie=cookie;
    }
	
    function getExpires(days)
    {
        var expDate = new Date();
        if(typeof(days) == "number")
        {
            expDate.setTime(expDate.getTime() + days*24*60*60*1000);
            return expDate.toGMTString();
        }
    }
//******************************************************************************