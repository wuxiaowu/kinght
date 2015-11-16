/*
Dynamic Tabs 1.0.1
Copyright (c) 2005 Rob Allen (rob at akrabat dot com)

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without restriction,
including without limitation the rights to use, copy, modify, merge,
publish, distribute, sublicense, and/or sell copies of the Software,
and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
DEALINGS IN THE SOFTWARE.

*/


function getChildElementsByClassName(parentElement, className)
{
	var i, childElements, pattern, result;
	result = new Array();
	pattern = new RegExp("\\b"+className+"\\b");


	childElements = parentElement.getElementsByTagName('*');
	for(i = 0; i < childElements.length; i++)
	{
		if(childElements[i].className.search(pattern) != -1)
		{
			result[result.length] = childElements[i];
		}
	}
	return result;
}


function BuildTabs(containerName)
{
	var i, tabContainer, tabContents, tabHeading, title, tabElement;
	var divElement, ulElement, liElement, tabLink, linkText;

	var tbl, tbody, tr, td, text, img;
	var theDoc = document;


	// assume that if document.getElementById exists, then this will work...
	if(! eval('document.getElementById') ) return;

	tabContainer = document.getElementById(containerName);
	if(tabContainer == null)
		return;

	tabContents = getChildElementsByClassName(tabContainer, 'tab-content');
	if(tabContents.length == 0)
		return;

	divElement = document.createElement("div");
  	divElement.className = 'tab-header'
	ulElement = document.createElement("ul");
  	ulElement.className = 'tab-list'

	tabContainer.insertBefore(divElement, tabContents[0]);
	divElement.appendChild(ulElement);

	for(i = 0 ; i < tabContents.length; i++)
	{
		tabHeading = getChildElementsByClassName(tabContents[i], 'tab');
		title = tabHeading[0].childNodes[0].nodeValue;


		// create the tabs as an unsigned list
		liElement = document.createElement("li");
		tabLink = document.createElement("a");
		linkText = document.createTextNode(title);

		// seting tab background image
		tbl = theDoc.createElement("TABLE");
		tbl.cellSpacing = 0;
		tbl.cellPadding = 0;
		tbody = theDoc.createElement("TBODY");
		tbl.appendChild(tbody);
		tr = theDoc.createElement("TR");
		tbody.appendChild(tr);
		td = theDoc.createElement("TD");
		td.width = 4;
		tr.appendChild(td);
		img = theDoc.createElement("IMG");
		img.src = getContextPath()+"global/images/list/tab_left.gif";
		img.width = 4;
		img.height = 23;
		td.appendChild(img);
		td = theDoc.createElement("TD");



		tr.appendChild(td);
		td.background = getContextPath()+"global/images/list/tab_bg.gif";
		td.appendChild(linkText);
		td = theDoc.createElement("TD");
		td.width = 4;
		tr.appendChild(td);
		img = theDoc.createElement("IMG");
		img.src = getContextPath()+"global/images/list/tab_right.gif";
		img.width = 4;
		img.height = 23;
		td.appendChild(img);

		tbl.className = "tab-table";

		tabLink.className = "tab-item";

		tabLink.setAttribute("href","javascript://");
		tabLink.setAttribute( "title", tabHeading[0].getAttribute("title"));
		tabLink.onclick = new Function ("ActivateTab('" + containerName + "', " + i + ")");


		ulElement.appendChild(liElement);
		liElement.appendChild(tabLink);
		tabLink.appendChild(tbl);

		// remove the H1
		tabContents[i].removeChild


		//alert(thisTab);

	}
}

function ActivateTab(containerName, activeTabIndex)
{
	var i, tabContainer, tabContents, td;

	tabContainer = document.getElementById(containerName);
	if(tabContainer == null)
		return;

	tabContents = getChildElementsByClassName(tabContainer, 'tab-content');
	if(tabContents.length > 0)
	{
		for(i = 0; i < tabContents.length; i++)
		{
			//tabContents[i].className = "tab-content";
			tabContents[i].style.display = "none";
		}

		tabContents[activeTabIndex].style.display = "block";


    	tabList = document.getElementById(containerName + '-list');
		tabs = getChildElementsByClassName(tabContainer, 'tab-item');
		if(tabs.length > 0)
		{
			for(i = 0; i < tabs.length; i++)
			{
				td = tabs[i].getElementsByTagName("td");
				td[0].childNodes[0].src = getContextPath()+"global/images/list/tab_left.gif";
				



				td[1].background = getContextPath()+"global/images/list/tab_bg.gif";
				td[2].childNodes[0].src = getContextPath()+"global/images/list/tab_right.gif";
				tabs[i].className = "tab-item";
			}

			td = tabs[activeTabIndex].getElementsByTagName("td");
			td[0].childNodes[0].src = getContextPath()+"global/images/list/tab_left_selected.gif";



			td[1].background = getContextPath()+"global/images/list/tab_bg_selected.gif";
			td[2].childNodes[0].src = getContextPath()+"global/images/list/tab_right_selected.gif";
			tabs[activeTabIndex].className = "tab-item tab-active";
			tabs[activeTabIndex].blur();
		}
	}
}
BuildTabs('tab-container');
ActivateTab('tab-container', 0);
