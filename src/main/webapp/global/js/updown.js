if(!getContextPath)
{
	alert("please import contextPath.jsp...");

}
var contextPath = getContextPath();

function upMouseOver(img){
  img.src=contextPath +"global/images/img_2updown2.gif";
}


function upMouseOut(img){
  img.src=contextPath +"global/images/img_2updown.gif";
}


function upClick(img,ID){
	var textID = getobj(ID);
	if(textID.disabled)
	return;
  img.src=contextPath +"global/images/img_2updown4.gif";
  if(!isNaN(parseInt(textID.value)))
    textID.value=parseInt(textID.value)+1;
  else
    textID.value='';
}
function getobj(ID)
{
	if (document.getElementById(ID))
	{
		return document.getElementById(ID);
	}
	else if(document.forms(0).elements(ID))
	{
		return document.forms(0).elements(ID);
	}
	else
	{
		return ;
	}
}

function downMouseOver(img){
  img.src=contextPath +"global/images/img_2updown3.gif";
}


function downMouseOut(img){
  img.src=contextPath +"global/images/img_2updown1.gif";
}


function downClick(img,ID){
	var textID = getobj(ID);
	if(textID.disabled)
	return;
  img.src=contextPath +"global/images/img_2updown5.gif";
  if(!isNaN(parseInt(textID.value)))
    textID.value=parseInt(textID.value)-1;
  else
    textID.value='';
}