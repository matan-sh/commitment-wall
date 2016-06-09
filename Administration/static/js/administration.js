/* set the index positon 'true' and resets all the rest to 'false' */
function resetList(item){
	
	/* constant - represents the location of the input field */
	var NUM_OF_ELEMENTS = 10;
	var EMAIL = 2;
	var VISITOR_ID = 3;
	var AGE = 4;
	var LAN_SELECTED = 5;
	
	/* variable - represents the input field*/
	var languages_selected 	= document.getElementById('languages_selected');
	var visitor_id 	= document.getElementById('visitor_id');
	var email	 		= document.getElementById('email');
	var ageFrom 		= document.getElementById('ageFrom');
	var ageTo 			= document.getElementById('ageTo');
	
	var i;
	if(item == -1) {
		document.getElementById('excel_btn').style.display = "none";
		document.getElementById('hiddenText').innerHTML = " בחר נתונים להציג ולאחר מכן לחץ על \"להוראות לחץ כאן..\" ";
		document.getElementById('inputDL0').checked = true;
		languages_selected.value = "Hebrew";
		languages_selected.disabled = true;
		visitor_id.value = null;
		visitor_id.disabled = true;
		email.value = null;
		email.disabled = true;
		ageFrom.value = null;
		ageFrom.disabled = true;
		ageTo.value = null;
		ageTo.disabled = true;
		
		document.getElementById('hiddenText').style.display = "none";
		
		for(i=1; i<NUM_OF_ELEMENTS; i++) {
			document.getElementById('inputDL' + i).checked = false;
		}
		
		if(document.getElementById('tableWidth') !== null)
			document.getElementById('tableWidth').innerHTML = "";
	}
	else {
		for(i=0; i<NUM_OF_ELEMENTS; i++) {
			if(i != item) {
				document.getElementById('inputDL' + i).checked = false;
			}
		}
		switch(item){
			case 2:
				setDisabledInput("email");
				break;
			case 3:
				setDisabledInput("visitor_id");
				break;
			case 4:
				setDisabledInput("ageFrom");
				break;
			case 5:
				setDisabledInput("languages_selected");
				break;
			case 6:
				setDisabledInput("country_selected");
				break;
			default:
				setDisabledInput("disable all");
		}
	}
}

/* disable all the input field Except from 'name' */
function setDisabledInput(name){
		
	document.getElementById('languages_selected').disabled = true;
	document.getElementById('languages_selected').value = "Hebrew";
	document.getElementById('visitor_id').value = null;
	document.getElementById('visitor_id').disabled = true;
	document.getElementById('email').value = null;
	document.getElementById('email').disabled = true;
	document.getElementById('ageFrom').value = null;
	document.getElementById('ageFrom').disabled = true;
	document.getElementById('ageTo').value = null;
	document.getElementById('ageTo').disabled = true;
	document.getElementById('country_selected').value = "israel";
	document.getElementById('country_selected').disabled = true;
	
	
	if(name != "disable all"){
		/* make input field 'name' able */
		document.getElementById(name).disabled = false;
		if(name == "ageFrom") 	//make input field 'ageTo' able if name = "ageFrom"
			document.getElementById('ageTo').disabled = false;
	}
}




var COMMITMENT_TABLE_TXT = 
				"בטבלה זאת מופיעות ההתחייבויות עליהם חותמים המבקרים, כאשר בכל שורה מופיעה התחייבות אחת הכתובה בשלוש שפות." + 
				'<br/><br/>' + " 1. על מנת להכניס התחייבות חדשה עליך למלא את שלושת השדות בשורה התחתונה (עברית, אנגלית וערבית)" +
				" ולאחר מכן ללחוץ על הכפתור הירוק." + '<br/>' +
				" 2. על מנת למחוק התחייבות עליך ללחוץ על כפתור ה-\"X\" שנמצא משמאל להתחייבות המבוקשת. " + '<br/><br/>' +
				'<b>' + " הערה:" + '</b>' +" הכנס את ההתחייבויות כנדרש. התחייבות בעברית בעמודה Hebrew," +
				" את ההתחייבות באנגלית בעמודה English ואת ההתחייבות בערבית בעמודה Arabic."; 

var ALL_VISITORS_TABLE = "בטבלה זאת מופיעים כל המבקרים שחתמו על העצומה." + '<br/><br/>' +
									"על מנת למחוק מבקר מהטבלה, עליך ללחוץ על כפתור ה- \"X\" שנמצא משמאל למבקר." + '<br/><br/>' +
					'<b>' + " הערה חשובה:" + '</b>' +" לאחר שמבקר נמחק מהרשימה, לא יהיה ניתן לשחזרו."; 
									
									
function hiddenTexts(index) {
	switch(index) {
		case 0: {
			document.getElementById('hiddenText').innerHTML = COMMITMENT_TABLE_TXT;
			break;
		}
		case 1: {
			document.getElementById('hiddenText').innerHTML = ALL_VISITORS_TABLE;
			break;
		}
		case 2: {
			document.getElementById('hiddenText').innerHTML = "Number 2";
			break;
		}
		case 3: {
			document.getElementById('hiddenText').innerHTML = "Number 3";
			break;
		}
		case 4: {
			document.getElementById('hiddenText').innerHTML = "Number 4";
			break;
		}
		case 5: {
			document.getElementById('hiddenText').innerHTML = "Number 5";
			break;
		}
		case 6: {
			document.getElementById('hiddenText').innerHTML = "Number 6";
			break;
		}
		case 7: {
			document.getElementById('hiddenText').innerHTML = "Number 7";
			break;
		}
		case 8: {
			document.getElementById('hiddenText').innerHTML = "Number 8";
			break;
		}
		case 9: {
			document.getElementById('hiddenText').innerHTML = "Number 9";
			break;
		}
		case -1: {
			document.getElementById('hiddenText').innerHTML = "";
			break;
		}
	}
}


var tableToExcel = (function() {
	var uri = 'data:application/vnd.ms-excel;base64,',
	template = 	'<html xmlns:o="urn:schemas-microsoft-com:office:office" '+
					'xmlns:x="urn:schemas-microsoft-com:office:excel" '+ 
					'xmlns="http://www.w3.org/TR/REC-html40">'+
					'<head>'+
						'<meta http-equiv="content-type" content="application/vnd.ms-excel; charset=UTF-8">'+
						'<!--[if gte mso 9]><xml>'+
							'<x:ExcelWorkbook>'+
								'<x:ExcelWorksheets>'+
									'<x:ExcelWorksheet>'+
										'<x:Name>{worksheet}</x:Name>'+
										'<x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions>'+
									'</x:ExcelWorksheet>'+
								'</x:ExcelWorksheets>'+
							'</x:ExcelWorkbook>'+
						'</xml><![endif]-->'+
					'</head>'+
						'<body>'+
							'<table>{table}</table>'+
						'</body>'+
					'</html>',
	base64 = function(s) { return window.btoa(unescape(encodeURIComponent(s))) },
	format = function(s, c) {
		return s.replace(/{(\w+)}/g, function(m, p) { return c[p]; }) 
	}
	return function(table, name) {
		if (!table.nodeType)
			table = document.getElementById(table)
		var ctx = {worksheet: name || 'Worksheet', table: table.innerHTML}
		window.location.href = uri + base64(format(template, ctx))
  }
})();

