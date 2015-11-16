//设置焦点至第一个可编辑域
function SetFocus(objTable){
  if (objTable.tagName.toUpperCase() != "TABLE".toUpperCase())
	  {
		  return;
	  }
   for (var iRow = 1; iRow < objTable.rows.length; iRow++)
	{
	   var checkName="checkbox"+(iRow-1);
	   if(document.all(checkName).checked){
	       getFirstTextArea(objTable.rows[iRow]).focus();
	       getFirstTextArea(objTable.rows[iRow]).select();
	       return;
	   }
	 }
}
//返回某行第一个可编辑域
function getFirstTextArea(objTR){
    var objs = objTR.all;
	for (var i=0; i < objs.length; i++)
	{
		if ((objs[i].tagName.toUpperCase() == "INPUT")||(objs[i].tagName.toUpperCase() == "SELECT"))
		  if(objs[i].type=="text")
		    return objs[i];
	 }
}
//切换行的只读状态
function setRowReadOnly(objTR,bReadOnly){
var objs = objTR.all;
	for (var i=0; i < objs.length; i++)
	{
		if ((objs[i].tagName.toUpperCase() == "INPUT")||(objs[i].tagName.toUpperCase() == "SELECT"))
		{ if(objs[i].type=="text"){
		    if(bReadOnly)
		       objs[i].className="textinput_readonly";
			else
			   objs[i].className="textinput_edit";
			objs[i].readOnly = bReadOnly;
			 }
		  else if(objs[i].type!="checkbox")
			   objs[i].disabled=bReadOnly; 
		 if(bReadOnly)
		       objs[i].blur();
		}
	}
}
//切换表的只读状态
function setTableReadOnly(objTable,bReadOnly)
{
	if (objTable.tagName.toUpperCase() != "TABLE".toUpperCase())
	{
		return;
	}
	for (var iRow = 1; iRow < objTable.rows.length; iRow++)
	{
	   var checkName=objTable.id+"_checkbox"+(iRow-1);
	   if(!bReadOnly){
	     if(document.all(checkName).checked)
		    setRowReadOnly(objTable.rows[iRow], bReadOnly);}
	   else
		   setRowReadOnly(objTable.rows[iRow], bReadOnly); 
	}
}