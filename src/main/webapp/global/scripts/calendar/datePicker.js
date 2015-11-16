if (typeof getContextPath!= 'function'){
	getContextPath = function(){
		return '..';
	};
}

DatePicker = function(config){
    config = config || {};
    this.config = config;
}

DatePicker.prototype = { 
		config:  	undefined,
		yearField:	undefined,
		monthField:	undefined,
		dayField:	undefined,
		chooseBtn:  undefined,
		
		render: function(){
			config = this.config;
			container = document.getElementById(config.container);
	
			var valueCt = document.createElement('div');
			valueCt.className = 'dateValue';
			valueCt.style['background-color']='#ffffff';
			container.appendChild(valueCt);
			
			this.yearField = document.createElement('input');
			this.yearField.type = 'text';
			this.yearField.name = 'date_Y';
			this.yearField.maxLength  = '4';
			this.yearField.style['width']='30px';
			this.yearField.style['border']='0px';
			this.yearField.style['backgroundColor'] = 'transparent';
			valueCt.appendChild(this.yearField);
			
			var seperator = document.createTextNode('-');
			valueCt.appendChild(seperator);
			
			this.monthField = document.createElement('input');
			this.monthField.type = 'text';
			this.monthField.name = 'date_M';
			
			this.monthField.maxLength  = '2';
			this.monthField.style['border']='0px';
			this.monthField.style['width']='16px';
			this.monthField.style['backgroundColor'] = 'transparent';
			valueCt.appendChild(this.monthField);
			
			valueCt.appendChild(document.createTextNode('-'));
			
			this.dayField = document.createElement('input');
			this.dayField.type = 'text';
			this.dayField.name = 'date_D';
			
			this.dayField.maxLength  = '2';
			this.dayField.style['border']='0px';
			this.dayField.style['width']='16px';
			this.dayField.style['backgroundColor'] = 'transparent';
			valueCt.appendChild(this.dayField);
			
			this.hiddenField = document.createElement('input');
			this.hiddenField.type = 'hidden';
			this.hiddenField.name = config.name;
			this.hiddenField.id = config.id;
			container.appendChild(this.hiddenField);
			
			
			this.chooseBtn = document.createElement('img');
			this.chooseBtn.id = 'dateBtn-'+config.id;
			var contextPath = getContextPath();
			if (contextPath.charAt(contextPath.length-1)!='/'){
				contextPath = contextPath+'/';
			}
			this.chooseBtn.src=contextPath+"global/images/calendar.gif";

			this.chooseBtn.style['position']='relative';
			this.chooseBtn.style['top']='2px';
			container.appendChild(this.chooseBtn);
			var dp = this;
			if (!config.readOnly){
				this.yearField.onfocus = function(){ dp.onYearFocusText()}; 
				this.monthField.onfocus = function(){ dp.onMonthFocusText()}; 
				this.dayField.onfocus = function(){ dp.onDayFocusText()}; 
				this.yearField.onblur = function(){ 
					dp.checkYear(dp.yearField);
				};
				this.monthField.onblur = function(){ dp.checkMonth(dp.monthField); };
				this.dayField.onblur = function(){ dp.getCurDay(dp.dayField); };
				
				this.yearField.onkeydown = this.monthField.onkeydown = this.dayField.onkeydown = function(event){dp.keyDown(event);};
				this.yearField.onkeyup = this.monthField.onkeyup = this.dayField.onkeyup = function(event){dp.keyUp(event);};
	
				this.hiddenField.onpropertychange = function(){
					dp.saveToText(dp.hiddenField);
					if (typeof dp.config.onChange == 'function' && dp.hiddenField!= null && dp.hiddenField!='undefined'){
						dp.config.onChange(dp.hiddenField);
					}
				};
	
				
				Calendar.setup({
			        inputField     :    this.hiddenField.id,
			        ifFormat       :    "%Y-%m-%d",
			        showsTime      :    false,
			        button         :    this.chooseBtn.id,
			        singleClick    :    false,
		  			electric       :    false,
			        step           :    1
	
			    });	
			    
			    
			}else{
				this.yearField.readOnly = true;
		    	this.monthField.readOnly = true;
		   	 	this.dayField.readOnly = true;
				this.hiddenField.onpropertychange = function(){
					dp.saveToText(dp.hiddenField);
					if (typeof dp.config.onChange == 'function' && dp.hiddenField!= null && dp.hiddenField!='undefined'){
						dp.config.onChange(dp.hiddenField);
					}
				};
			}
		    
		    this.yearField.value = '';
		    this.monthField.value = '';
		    this.dayField.value = '';
		},
	
		onYearFocusText : function(event){
			this.yearField.select();
		},
		
		onMonthFocusText : function(){
			this.monthField.select();
		},
		
		onDayFocusText : function(){
			if (!this.checkDay(this.yearField,this.monthField,this.dayField)){
					this.dayField.value = this.getDays(this.yearField.value,this.monthField.value);
			}
			this.dayField.select();
		},
		
		checkYear : function(obj){
				var d,s;
				d  = new Date();
				if (obj.value === ""){
					obj.value = new String(d.getFullYear());
				}else if (obj.value.length === 1){
					s = new String(d.getFullYear());
					s = s.substr(0,3);
					obj.value = s + obj.value;
				}
				else if (obj.value.length === 2){
					s = new String(d.getFullYear());
					s = s.substr(0,2);
					obj.value = s + obj.value;
				}else if (obj.value.length === 3){
					s = new String(d.getFullYear());
					s = s.substr(0,1);
					obj.value = s + obj.value;
				}
				this.saveToHidden();
		},
		
		checkMonth : function(obj){
		    if (!this.checkDay(this.yearField,this.monthField,this.dayField)){
				this.dayField.value = this.getDays(this.yearField.value,this.monthField.value);
		    }
		    var d,s;
			d = new Date();
			var m;
			if (new Number(obj.value) == 0 || obj.value === ""){
				m = d.getMonth()+1;
			}else{
				m = new Number(this.monthField.value);
			}
			
			if (m >= 10 && m <= 12)
				obj.value = new String(m);
			else if (m<=9)
				obj.value = "0"+new String(m);
			this.saveToHidden();
		},
		
		getCurDay : function(obj){
			var d,s;
			d = new Date();
			if (new Number(obj.value) == 0 || obj.value ===""){
				if (d.getDate() >= 10){
					obj.value = new String(d.getDate());
				}else {
					obj.value = "0"+new String(d.getDate());
				} 
			}else if (obj.value.length === 1){
				obj.value = "0"+obj.value;
			}
			this.saveToHidden();
		},
		
		checkDay : function(obj_Y,obj_M,obj_D){
			var year,month,day,d;
			year = obj_Y.value;
			month = obj_M.value;
			day = obj_D.value;
			maxDay = this.getDays(year,month);
			if (day > maxDay){
				return false;
			}
			return true;
		},
		
		getDays : function(year,month){
			switch (month){
				case "01" : return 31;break;
				case "03" : return 31;break;
				case "04" : return 30;break;
				case "05" : return 31;break;
				case "06" : return 30;break;
				case "07" : return 31;break;
				case "08" : return 31;break;
				case "09" : return 30;break;
				case "10" : return 31;break;
				case "11" : return 30;break;
				case "12" : return 31;break;
				case "02" : {if (this.isLeapYear(year)) return 29; else return 28; };
				default : break;
			}
		},
		
		isLeapYear : function(year) {
			return ((year%4 == 0) && (year%100 != 0)) || (year%400 == 0) ? true : false;
		},
		
		keyDown : function(event){
			var e = event || window.event;
			var obj = e.target || e.srcElement;
			if (e.altKey || e.ctrlKey  || e.shiftKey ){
				e.cancelBubble = true;
				e.returnValue = false;
				return;
			}
			var code = e.keyCode;
			if (code == 8 || code == 9  || (code >= 48 && code <= 57) || (code >= 96 && code <= 105)  || code == 18 || code == 37 || code == 38 || code == 39 || code == 40 ){

			var maxDay = this.getDays(this.yearField.value,this.monthField.value);
			var d = new Date();
			switch (obj.name){
				case "date_Y":
					{
						switch (code){
							case 37:{
								obj.value = (obj.value > 1899)?obj.value :"1899";
								this.dayField.focus();
								this.dayField.select();
								break;
								}//left
							case 39:{
								obj.value = (obj.value > 1899)?obj.value :"1899";
								this.monthField.focus();
								this.monthField.select();
								break;
								}//right;
							case 38:{
								if (new Number(obj.value) > 1899)
									obj.value = new Number(obj.value) - 1;
								break;
							}
							case 40:{
								obj.value = new Number(obj.value) + 1;
								break;
							}
							
						};
						break;
					}
				
				case "date_M":{
						switch (code){
							
							case 37:{
							
								if (obj.value ==""){
									if (d.getMonth()+1 >= 10 && d.getMonth()+1 <= 12)
										obj.value = new String(d.getMonth()+1);
									else if (d.getMonth()+1<=9)
										obj.value = "0"+new String(d.getMonth()+1);
							  }else if (new Number(obj.value) <= 9){
							  	obj.value = "0"+new Number(obj.value);
							  }
								this.yearField.focus();
								this.yearField.select();
								break;
								}//left
							case 39:{
							 if (obj.value ==""){
									if (d.getMonth()+1 >= 10 && d.getMonth()+1 <= 12)
										obj.value = new String(d.getMonth()+1);
									else if (d.getMonth()+1<=9)
										obj.value = "0"+new String(d.getMonth()+1);
							  }else if (new Number(obj.value) <= 9){
							  	obj.value = "0"+new Number(obj.value);
							  }
								this.dayField.focus();
								this.dayField.select();
								break;
								}//right;
							case 38:{
								if (new Number(obj.value) == 1){
									obj.value = 12;
								}else{
									obj.value = (new Number(obj.value) - 1 <=9)?"0"+(new Number(obj.value) - 1):new Number(obj.value) - 1;
							  }
								break;
								}
							case 40:{
								if (new Number(obj.value) == 12){
									obj.value = "01";
							  }else{
									obj.value = (new Number(obj.value) + 1 <=9)?"0"+(new Number(obj.value) + 1):new Number(obj.value) + 1;
							  }
								break;
							}
						};
						break;
				
				}
				
				case "date_D":{
					switch (code){
						
						case 37:{
								if (obj.value === ""){
									if (d.getDay() >= 10){
										obj.value = new String(d.getDay());
									}else {
										obj.value = "0"+new String(d.getDay());
									} 
								}else{ 
									obj.value = (new Number(obj.value) <=9)?"0"+(new Number(obj.value)):new Number(obj.value);
								}
								this.monthField.focus();
								this.monthField.select();
								break;
								}//left
							case 39:{
								if (obj.value === ""){
									if (d.getDay() >= 10){
										obj.value = new String(d.getDay());
									}else {
										obj.value = "0"+new String(d.getDay());
									} 
								}else {
									obj.value = (new Number(obj.value) <=9)?"0"+(new Number(obj.value)):new Number(obj.value);
								}
								this.yearField.focus();
								this.yearField.select();
								break;
								}//right;
						
						case 38:{
							if (new Number(obj.value) == 1){
								obj.value = new Number(maxDay);
							}else{
								obj.value = (new Number(obj.value) - 1 <=9)?"0"+(new Number(obj.value) - 1):new Number(obj.value) - 1;
							}
							break;
							}
						case 40:{
							
							if (new Number(obj.value) - new Number(maxDay)==0){
								obj.value = "01";
							}else{
								obj.value = (new Number(obj.value) + 1 <=9)?"0"+(new Number(obj.value) + 1):new Number(obj.value) + 1;
							}
							break;
						}
					
					}
					
					break;}
				}
			}else{
				  e.cancelBubble = true;
				  e.returnValue = false;
			}
		},
		
		
		keyUp : function(event){
			var e = event || window.event;
			
			if (e.altKey || e.ctrlKey  || e.shiftKey ){
				e.cancelBubble = true;
				e.returnValue = false;
				return;
			}
			var obj = e.target || e.srcElement;
			var code = e.keyCode;
			var maxDay = this.getDays(this.yearField.value,this.monthField.value);
			if (code ==9 || code == 37||code == 38||code == 39||code == 40) return;
			switch (obj.name){
				case "date_Y":
				{
					break;
				}
				case "date_M":
				{
					obj.value = (obj.value > 12)?new String(obj.value).substr(0,1):obj.value;
					break;
				}
				case "date_D":
				{
					obj.value = (obj.value > maxDay)?new String(obj.value).substr(0,1):obj.value;
					break;
				}
			}
		},
		
		saveToText : function(obj){
			
			var value = obj.value;
			var arrayValue = value.split("-");
			if (arrayValue && arrayValue.length==3){
				this.yearField.value = arrayValue[0];
				this.monthField.value = arrayValue[1];
				this.dayField.value = arrayValue[2];
			}else{
				this.yearField.value = '';
				this.monthField.value = '';
				this.dayField.value = '';
			}
		},
		
		saveToHidden : function(){
			var y,m,d;
			var date = new Date();
			if (this.yearField.value!=''){
				y = this.yearField.value;	
			}else{
				y = date.getFullYear();
			}
			if (this.monthField.value!=''){
				m = this.monthField.value;
			}else{
				m = date.getMonth()+1;
				if (m<10){
					m = '0'+m;
				}
			}
			if (this.dayField.value!=''){
				d = this.dayField.value;
			}else{
				d = date.getDate();
				if (d<9){
					d = '0'+d;
				}
			}
			this.hiddenField.value = y+"-"+m +"-"+d;
			//ff浏览器专用
			if(!document.body.onpropertychange){
				this.saveToText(this.hiddenField);
				if (typeof this.config.onChange == 'function' && this.hiddenField){
					this.config.onChange(this.hiddenField);
				}
			}
		},
		
		setValue:	function(v){
			if (v.indexOf('-')==-1 && v.length==8){
				var y = v.substring(0,4);
				var m = v.substring(4,6);
				var d = v.substring(6,8);
				this.hiddenField.value = y +"-"+m+"-"+d;
			}else{
				this.hiddenField.value = v;
			}
		},
		
		getValue:	function(){
			return this.hiddenField.value;
		},
		
		
		bind: function(){
			var dp = this;
			this.yearField.onfocus = function(){ dp.onYearFocusText()}; 
			this.monthField.onfocus = function(){ dp.onMonthFocusText()}; 
			this.dayField.onfocus = function(){ dp.onDayFocusText()}; 
			this.yearField.onblur = function(){ 
				dp.checkYear(dp.yearField);
			};
			this.monthField.onblur = function(){ dp.checkMonth(dp.monthField); };
			this.dayField.onblur = function(){ dp.getCurDay(dp.dayField); };
			
			this.yearField.onkeydown = this.monthField.onkeydown = this.dayField.onkeydown = function(event){dp.keyDown(event);};
			this.yearField.onkeyup = this.monthField.onkeyup = this.dayField.onkeyup = function(event){dp.keyUp(event);};

			this.hiddenField.onpropertychange = function(){
				dp.saveToText(dp.hiddenField);
				if (typeof dp.config.onChange == 'function' && dp.hiddenField!= null && dp.hiddenField!='undefined'){
					dp.config.onChange(dp.hiddenField);
				}
			};
		},
		
		unbind:	function(){
			var dp = this;
			this.yearField.onfocus = null; 
			this.monthField.onfocus = null; 
			this.dayField.onfocus = null; 
			this.yearField.onblur = null;
			this.monthField.onblur = null;
			this.dayField.onblur = null;
			
			this.yearField.onkeydown = this.monthField.onkeydown = this.dayField.onkeydown = null;
			this.yearField.onkeyup = this.monthField.onkeyup = this.dayField.onkeyup = null;

			this.hiddenField.onpropertychange = function(){
				dp.saveToText(dp.hiddenField);
				if (typeof dp.config.onChange == 'function' && dp.hiddenField!= null && dp.hiddenField!='undefined'){
					dp.config.onChange(dp.hiddenField);
				}
			};
		},
		
		setReadOnly: function(flag){
			var dp = this;
			if (!flag){
				this.yearField.readOnly = false;
		    	this.monthField.readOnly = false;
		   	 	this.dayField.readOnly = false;
				this.chooseBtn.disabled = false;
		   	 	this.bind();
			}else{
				this.yearField.readOnly = true;
		    	this.monthField.readOnly = true;
		   	 	this.dayField.readOnly = true;
				this.chooseBtn.disabled = true;
				this.unbind();
			}
			
		}
		
}




