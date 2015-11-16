/**
 * @name jquery-autocomplete-1.0.0.js
 * @author flymz / fly_mz@126.com
 * @version 1.0.0
 * @update at 2008-01-11
 */
(function($){
    var auto = {};
    auto.minSearchLength = 4;//search by lastest keywords
    everyResultHeight = 20; //every li height
    auto.showResultsLenght = 10; //show results size in div
    auto.divHeight = (parseInt(auto.showResultsLenght) * parseInt(everyResultHeight)) + 'px';
    autocomplete = function(inputId, array, divId){
		var input='#'+inputId;
		var $divId = '#' + divId;
        //check the focus is in input 
        isActiveElement = function(obj){
            return obj == document.activeElement;
        }
        //if the focus is not in input ,make the div hidden
        hideResults = function(){
        
            if (!isActiveElement(input)) {
                setTimeout(function(){
                    $($divId).hide()
                }, 500);
            }
        }
        //make the div hidden now
        hideResultsNow = function(){
            $($divId).hide()
        }
        //show the div
        showResults = function(){
            $(input)[0].focus();
			//positionDiv();
            setTimeout(function(){
                $($divId).show()
            }, 500);
        }
        //set the div position,first get the input's position of x and y
        findPos = function(obj){
            var curleft = obj.offsetLeft || 0;
            var curtop = obj.offsetTop || 0;
            while (obj = obj.offsetParent) {
                curleft += obj.offsetLeft
                curtop += obj.offsetTop
            }
            return {
                x: curleft,
                y: curtop
            };
        }
        
        positionDiv = function(){
			var inputs=document.getElementById(inputId);
            var pos = findPos(inputs);
            $($divId).css('left', pos.x + 'px');
            $($divId).css('top',  pos.y+inputs.offsetHeight + 'px');
        }
        //set div height where the results is change
        divHeight = function(resultsLength){
            if (resultsLength < auto.showResultsLenght) {
                $($divId).css('height', (everyResultHeight * resultsLength) + 'px');
            }
            else {
                $($divId).css('height', auto.divHeight);
            }
        }
        //add class for selected line of li 
        divIsSelectedClass = function(isSelected, li, background){
            if (isSelected) {
                $(li).css('background', background);
                $(li).css('color', '#fff');
                $(li).css('cursor', 'pointer');
                $(li).attr('id', 'selected');
            }
            else {
                $(li).css('background', background);
                $(li).css('color', '#000');
                $(li).removeAttr('id');
            }
        }
        //move selected li
        moveSelected = function(val){
            $($divId).children().each(function(){
                if ($(this).attr('id') == 'selected') {
                    // $('body').append('<br><font color=red>good</font>');  
                }
            });
        }
        {
            //when the page onload,do these
            $(input).parent().append('<div id=\"' + divId + '\"></div>');
			$($divId).addClass('ac_results');
            $($divId).css('width', $(input).css('width'));
            $($divId).css('height', auto.divHeight);
            hideResultsNow();
        }
        //fill div content by keywords which in input
        auto.input = function(input){
            $($divId).html('');
            var resultsLength = 0;
            for (var i = 0; i < array.length; i++) {
                var inputval = $.trim($(input).val());
                var everval = array[i];
                if (inputval.length <= auto.minSearchLength) {
                    if (inputval.equals('')) 
                        hideResultsNow();
                    everval = array[i].substring(array[i].length - auto.minSearchLength);
                }
                if (everval.indexOf(inputval) == 0 && inputval != '') {
                    showResults();
                    $($divId).append('<li>' + array[i] + '</li>');
                    $($divId).children('li').css('height', everyResultHeight);
                    $($divId).children('li').css('line-height', '20px');
                    resultsLength++;
                }
            }
            if (resultsLength > 0) {
                divHeight(resultsLength);
            }
            else {
                hideResultsNow();
            }
        };
        
        //input event
        $(input).keyup(function(e){
            auto.input(this);
        }).click(function(){
            auto.input(this);
        }).blur(function(){
            hideResults();
        }).keydown(function(e){
            var keyCode = e.keyCode;
            switch (keyCode) {
                case 38: // up
                    e.preventDefault();
                    moveSelected(-1);
                    break;
                case 40: // down
                    e.preventDefault();
                    moveSelected(1);
                    break;
                //			case 9:  // tab
                //			case 13: // return
                //				if( selectCurrent() ){
                //					// make sure to blur off the current field
                //					$input.get(0).blur();
                //					e.preventDefault();
                //				}
                //				break;
            }
        });
        //div event
        $($divId).mouseover(function(){
            //li event,set show class and where click li fill selected value into input
            $(this).children('li').mouseover(function(){
                divIsSelectedClass(true, $(this), '#3162C5');
            }).mouseout(function(){
                divIsSelectedClass(false, $(this), '');
            }).click(function(){
                $(input).val($(this).html());
                hideResultsNow();
            });
        }).scroll(function(){//when scrolling the scroll or div ,do it
            showResults();
        });
    }
    String.prototype.equals = function(val){
        if (this == val) {
            return true;
        }
        else {
            return false;
        }
    }
    String.prototype.subpx = function(){
        if (this.indexOf('px') != -1) {
            return this.replace('px', '');
        }
        else {
            return this;
        }
    }
})(jQuery);
