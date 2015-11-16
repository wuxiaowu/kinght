function isEmpty(str)
{
	var empty = Trim(str);
	if (empty==null || empty==""){
		return true;
	}else{
		return false;
	}
}

function Trim(str){
	for( var i=0; i<str.length && str.charAt(i)==" "; i++ ) ;
	for( var j=str.length; j>0 && str.charAt(j-1)==" "; j-- ) ;
	if( i>j ) return("");
	str = str.substring(i,j);
	return str;
}

function OnlyNumber(event){
	if ((event.keyCode<48 || event.keyCode>57) && event.keyCode!=16 && event.keyCode!=17 && event.keyCode!=18 && event.keyCode!=32 && event.keyCode!=46 && event.keyCode!=37 && event.keyCode!=39 && event.keyCode!=8 && event.keyCode!=9 && event.keyCode!=13  && (event.keyCode<96 || event.keyCode>105)){
		alert('����������!');
		return false;
	}else{
		return true;
	}
}

function isEmail(str)
{
	var email = Trim(str);
	if (email==null || email==""){
		alert("����Ϊ��!");
		return false;
	}

	var pos = email.indexOf('@',1);
	if (pos==-1 || pos==email.length-1){
		alert("���ǺϷ���E-mail��ַ!");
		return false;
	}else{
		var pos1 = email.indexOf('@',pos+1);
		var pos2 = email.indexOf('.',pos+2);
		if (pos1!=-1 || pos2==-1 || email.charAt(pos+1)=="." || email.charAt(email.length-1)=="."){
			alert("���ǺϷ���E-mail��ַ!");
			return false;
		}
	}
	return true;
}

function inputVerify(inputStr){
	var str = "'=";
	for (var i=0;i<inputStr.length;i++)	{
		var s = inputStr.substring(i,i+1);
		var pos = str.indexOf(s);
		if (pos != -1)
			return s;
	}
	return "";
}

function isNumber(s) {
	var str = Trim(s);
	var len = str.length;
	var souNum = "0123456789";
	for (var i=0;i<str.length;i++) {
		if (souNum.indexOf(str.charAt(i)) == -1) {
			return "����������!";
		}
	}
	return "";
}
function isIDCardNumber(s) {
	var str = Trim(s);
	var len = str.length;
	if (len!=15 && len!=18) {
		return "���֤����λ���!";
	}
	var souNum = "0123456789";
	if (len == 15) {			
		for (var i=0;i<str.length;i++) {
			if (souNum.indexOf(str.charAt(i)) == -1) {
				return "���ǺϷ������֤����!";
			}
		}
	} else if (len == 18) {
		for (var i=0;i<str.length-1;i++) {
			if (souNum.indexOf(str.charAt(i)) == -1) {
				return "���ǺϷ������֤����!";
			}
		}
	}
	return "";
}

function numberOfDays() {  //ȡ��ÿ�������ж�ƽ������
	var CurrentDate=new Date();
	var CYear=CurrentDate.getFullYear();
	var CMonth=CurrentDate.getMonth();
	var CDay=CurrentDate.getDay();
	
  	var numDays=new Array(31,28,31,30,31,30,31,31,30,31,30,31);
  	n=numDays[CMonth];
  	if(CMonth==1 && CYear%4==0) ++n;
  	return n;
}

//只能输入正整数,---新增 2011年5月27日
function numberCheck(number){
	var myreg = /^[1-9]*[0-9]$/;
	if(!myreg.test(number)){
		return false;
	}
	return true;
}
