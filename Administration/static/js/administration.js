

/* set the index positon 'true' and resets all the rest to 'false' */
function resetList(item){
	var i;
	var numOfElements = 5;
	//hiddenTexts(item);
	if(item == -1) {
		document.getElementById('hiddenText').innerHTML = " בחר נתונים להציג ולאחר מכן לחץ על \"להוראות לחץ כאן..\" ";
		document.getElementById('tableWidth').innerHTML = "";
		document.getElementById('inputDL0').checked = true;
		for(i=1; i<numOfElements; i++) {
			document.getElementById('inputDL' + i).checked = false;
		}
	}
	else {
		for(i=0; i<numOfElements; i++) {
			if(i != item) {
				document.getElementById('inputDL' + i).checked = false;
			}
		}
	}
}




var COMMITMENT_TABLE_TXT = 
				"בטבלה זאת מופיעות ההתחייבויות עליהם חותמים המבקרים, כאשר בכל שורה מופיעה התחייבות אחת הכתובה בשלוש שפות." + 
				'<br/><br/>' + " 1. על מנת להכניס התחייבות חדשה עליך למלא את שלושת השדות בשורה התחתונה (עברית, אנגלית וערבית)" +
				" ולאחר מכן ללחוץ על הכפתור הירוק." + '<br/>' +
				" 2. על מנת למחוק התחייבות עליך ללחוץ על כפתור ה-\"X\" שנמצא משמאל להתחייבות המבוקשת. " + '<br/>' +
				" 3. על מנת לערוך התחייבות מסויימת, פשוט לחץ על ההתחייבות בטבלה ושנה אותה לפי הצורך. " + '<br/><br/>' +
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
			document.getElementById('hiddenText').innerHTML = "Number 1";
			
			break;
		}
		case 2: {
			document.getElementById('hiddenText').innerHTML = ALL_VISITORS_TABLE;
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
		case -1: {
			document.getElementById('hiddenText').innerHTML = "";
			break;
		}
	}
}