<%@page language="java" contentType="text/html; charset=UTF-8"%>
<html>
<head>
<script language="JavaScript" type="text/javascript" src="termlib.js"></script>
<META http-equiv=Content-Type content="text/html; charset=UTF-8">

<jsp:include page="/global/head.jsp"/>

<script src="<%=request.getContextPath()%>/dwr/interface/TerminalAjax.js"></script>
<script src="<%=request.getContextPath()%>/dwr/global/scripts/engine.js"></script>
<script src="<%=request.getContextPath()%>/dwr/global/scripts/util.js"></script>



<style type="text/css">
body,p,a,td {
	font-family: courier,fixed,swiss,sans-serif;
	font-size: 12px;
	color: #cccccc;
}
.lh15 {
	line-height: 15px;
}

.term {
	font-family: "Courier New",courier,fixed,monospace;
	font-size: 12px;
	color: white;
	background: none;
	letter-spacing: 1px;
}
.term .termReverse {
	color: #232e45;
	background: #95a9d5;
}

a,a:link,a:visited {
	text-decoration: none;
	color: #77dd11;
}
a:hover {
	text-decoration: underline;
	color: #77dd11;
}
a:active {
	text-decoration: underline;
	color: #eeeeee;
}

a.termopen,a.termopen:link,a.termopen:visited {
	text-decoration: none;
	color: #77dd11;
	background: none;
}
a.termopen:hover {
	text-decoration: none;
	color: #222222;
	background: #77dd11;
}
a.termopen:active {
	text-decoration: none;
	color: #222222;
	background: #eeeeee;
}

table.inventory td {
	padding-bottom: 20px !important;
}

pre,tt {
	font-family: courier,fixed,monospace;
	color: #ccffaa;
	font-size: 12px;
	line-height: 15px;
}

li {
	line-height: 15px;
	margin-bottom: 8px !important;
}

.dimmed,.dimmed *,.dimmed * * {
	background-color: #222222 !important;
	color: #333333 !important;
}

@media print {
	body { background-color: #ffffff; }
	body,p,a,td,li,tt {
		color: #000000;
	}
	pre,.prop {
		color: #000000;
	}
	h1 {
		color: #000000;
	}
	a,a:link,a:visited {
		color: #000000;
	}
	a:hover {
		color: #000000;
	}
	a:active {
		color: #000000;
	}
	table.inventory {
		display: none;
	}
}

</style>
<head>

<body>
<div id="termDiv" style="position:absolute; visibility: hidden; z-index:1;"></div>
<script type="text/javascript">
<!--

// *** text wrap sample ***
// mass:werk, N.Landsteiner 2007


/*
   define a new style for bold
   style-code:        16,
   mark up:           'b',
   HTML-opening part: '<b>'
   HTML-closing part: '<\/b>'
   
   use method TermGlobals.assignStyle( <style-code>, <markup>, <HTMLopen>, <HTMLclose> )
   <style-code> must be a power of 2 between 0 and 256 (<style-code> = 2^n, 0 <= n <= 7)
*/

TermGlobals.assignStyle( 16, 'b', '<b>', '<\/b>' );

/*
   define a new style for small
   style-code:        32,
   mark up:           'm' (for "miniature", "s" already in use for strike),
   HTML-opening part: '<span style="font-size:10px; letter-spacing:2px;">'
   HTML-closing part: '<\/span>'
*/

TermGlobals.assignStyle( 32, 'm', '<span style="font-size:10px; letter-spacing:2px;">', '<\/span>' );

// custom styles done


var text = [
	' '
];

var help = [
	' **********************',
	' * type "exit" to quit.',
	' **********************'
]

var term;

function termOpen() {
	if ((!term) || (term.closed)) {
		term = new Terminal(
			{
				x: 1,
				y: 1,
				termDiv: 'termDiv',
				bgColor: '#232e45',
				greeting: help.join('%n'),
				handler: termHandler,
				exitHandler: termExitHandler,
				wrapping: true
			}
		);
		term.open();
		
		// dimm UI text
		var mainPane = (document.getElementById)?
			document.getElementById('mainPane') : document.all.mainPane;
		if (mainPane) mainPane.className = 'lh15 dimmed';
	}
}

function termExitHandler() {
	// reset the UI
	var mainPane = (document.getElementById)?
		document.getElementById('mainPane') : document.all.mainPane;
	if (mainPane) mainPane.className = 'lh15';
	window.close();
}

function termHandler() {
	// default handler + exit
	this.newLine();
	if (this.lineBuffer.match(/^\s*exit\s*$/i)) {
		this.close();
		return;
	}
	if (this.lineBuffer.match(/^\s*help\s*$/i)) {
		this.clear();
		this.write(help);
		term.prompt();
	}else if (this.lineBuffer == 'cls'){
		this.clear();
		term.prompt();
	}else if (this.lineBuffer != '') {
		// echo with write for wrapping, but escape any mark-up
		this.newLine();
		this.write('请等待...');
		this.newLine();
		var array = this.lineBuffer.split(' ');
		var cmd = array[0];
		var array2 = [];
		for(var i=0;i<array.length-1;i++){
			array2[i] = array[i+1];	
		} 		
		TerminalAjax.executeCmd(cmd,array2,{
			callback:function(data){
				term.write(data);
				term.newLine();
				term.prompt();
			},
			errorHandler:function(msg,ex){
				term.write(msg);
				term.newLine();
				term.prompt();
			}
		});
	}else{
		term.prompt();
	}
}


// demo hooks

function test(command) {
	if ((!term) || (term.closed)) {
		alert('Please open the terminal first!');
		return;
	}
	TermGlobals.importEachLine( command );
}


termOpen();
//-->
</script>
	
</body>

</html>