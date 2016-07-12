
function checkUser(){
	var EMPTY_JSON = 2;
	
	var first_name 	= document.getElementById('first_name');
	var last_name 		= document.getElementById('last_name');
	var pass	 			= document.getElementById('password');
	var error_msg 		= document.getElementById('error_msg');
	error_msg.innerHTML = "<br/>";
	
	first_name.value = deleteUnnecessarySpaces(first_name.value);
	last_name.value = deleteUnnecessarySpaces(last_name.value);
	
	if(first_name.value == "" || last_name.value == "" || pass.value == "") {
		error_msg.innerHTML = "חובה למלא שם פרטי, שם משפחה וסיסמה!";
		return;
	}	
	else
		error_msg.innerHTML = "<br/>";
		
	var xhttp;
	if (window.XMLHttpRequest) {
		// code for modern browsers
		xhttp = new XMLHttpRequest();
	} else {
		// code for IE6, IE5
		xhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	xhttp.onreadystatechange = function() {
		if (xhttp.readyState == 4 && xhttp.status == 404) {
			error_msg.innerHTML = "sjsdfsdfsdjsdf";
			return;
		}
		else if (xhttp.readyState == 4 && xhttp.status == 200) {
			if(xhttp.responseText.length <= EMPTY_JSON){
				error_msg.innerHTML = "המשתמש לא קיים במערכת, נסה שוב";
				return;
			}
			
			var data = JSON.parse(xhttp.responseText);
			var f_name = data.first_name;
			var l_name = data.last_name;
			var permission = data.permission;
			
			/* check if the browser have a 'sessionStorage' */
			if(typeof(Storage) !== "undefined") {
				/* the user is connected and have access to the administration.html page */
				sessionStorage.uesr = f_name + " " + l_name;
				sessionStorage.permission = permission;
				window.open("administration.html", "_self");
			} else {
				/* browser does not have a 'sessionStorage' so you can't connect to the administration page */
				error_msg.innerHTML = "שגיאה, הדפדפן שלך לא תומך באתר זה";
			}
		}
	};

	xhttp.open("POST", "../pages/userCheck.php", true);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.send("first_name="+first_name.value+"&last_name="+last_name.value+"&pass="+pass.value);
}



/*
*	check for places with multi spaces and delete them,
*	for example change this - "  abc   def"  to this - "abc def" 
*/
function deleteUnnecessarySpaces(str) {
	var txt = str;
	var start = 0;
	var end = txt.length;

	//Looking for spaces at the beginning of a string
	for(var i=0; i<end && txt.charAt(i) === " "; i++){
		start++;
	}
	//Looking for spaces at the end of a string
	for(var i=txt.length-1; i>=0 && txt.charAt(i) === " "; i--){
		end--;
	}
	
	if(start<end)
		txt = txt.substring(start, end);
	else //Empty word
		txt = "";
	
	for(var i=1; i<txt.length-1; i++)
		while(txt.charAt(i) == txt.charAt(i+1) && txt.charAt(i) == " ")
			txt = txt.replace("  ", " ");
	
	return txt;
}