function getPowerValue(base,power){
	return Math.pow(base,power);
}

function formatNum(num, scale){
	if(isNaN(num)) {
    	num = "0";
    }

    sign = (num == (num = Math.abs(num)));
    
    if(scale == 0){
    	return Math.floor(num);
    }else{
    	var powerValue = getPowerValue(10,scale);

    	var splitValues = (num+"").split(".");
    	var intPart = splitValues[0];
        var centPart = parseFloat("0."+(splitValues[1]?splitValues[1]:"0"));
        centPart = Math.round(centPart*powerValue)/powerValue;
        var centPartSplit = (centPart+"").split(".");
        centPart = (centPartSplit[1])?centPartSplit[1]:"";
        if(centPart.length <= scale) {
        	var bal = scale-centPart.length;
        	for(var i=0;i<bal;i++)
        		centPart+="0";
        }else{
        	centPart = centPart.substring(0,scale);
        }
        if(centPartSplit[0]=="1")
	    	intPart = (parseInt(intPart)+1)+"";
        for (var i = 0; i < Math.floor((intPart.length-(1+i))/3); i++) {
	    	intPart = intPart.substring(0,intPart.length-(4*i+3))+','+intPart.substring(intPart.length-(4*i+3));
	    }
		return (((sign)?'':'-') + intPart + '.' + centPart);
    }
}

function formatCurrency(num, accuracy) {
    return formatNum(num, accuracy);
}

function formatRate(num,scale){
    return formatNum(Math.round(num*10000)/100, scale);
}
