 
$( window ).load(function() {
	
	/* 
	 * if the user has a access to this page - continue load the page.
	 * if not - go to the 'index.html' page.
	 */
	if(typeof(Storage) !== "undefined") {
		if (!sessionStorage.uesr){
			window.open("index.html", "_self");
		}else {
			permission = sessionStorage.permission;
			if(permission == "admin")
				document.getElementById('add_manager').style.display = "block";
			else
				document.getElementById('add_manager').style.display = "none";
		}
	} else {
		window.open("index.html", "_self");
	}
});
 

$(document).ready(function(){
	/* constant values */
	var NUM_OF_SELECTION_OPTIONS = 10;
	var ADMIN_PERMISSION = "admin";
	var REGULAR_USER_PERMISSION = "user";
	var EDIT_BTN_ID_TXT = "btn_edit";
	var TO_START_EDIT = "Edit";
	var TO_STOP_EDIT = "Done";
	
	var SELECT_COMMITMENT = 0;
	var SELECT_ALL_VISITORS = 1;
	var SELECT_VISITOR_BY_MAIL = 2;
	var SELECR_VISITOR_BY_ID = 3;
	var SELECT_BY_AGE = 4;
	var SELECT_BY_LANGUAGE = 5;
	var SELECT_BY_COUNTRY = 6;
	var SELECT_ALL_REGISTRATION_STATIONS_TXT = 7;
	var SELECT_ALL_MANAGERS = 8;
	var ADD_MANAGERS = 9;
	
	/* Global values */
	var index = -1;
	var lan = "";
	var age_from = 0;
	var age_to = 0;
	var mail = "";
	var id = 0;
	var isTxtAppears = false;
	var permission;
	
	document.getElementById('excel_btn').style.display = "none";
	
	$("#freeText").click(function(){
		if(isTxtAppears) {
			$("#hiddenText").slideUp();
			isTxtAppears = false;
		}
		else {
			$("#hiddenText").slideDown();
			isTxtAppears = true;
		}
	});
	
	
	/* fetch data from the database and show in the web page */
	function fetch_data(index, lan, age_from, age_to, mail, id, permission) {
		hiddenTexts(index);
		$.ajax({
			url:"../pages/select.php",
			method:"POST",
			data:{index:index, lan:lan, age_from:age_from, age_to:age_to, mail:mail, id:id, permission:permission},
         dataType:"text",
         success:function(data){
				$('#live_data').html(data);
			}
		});
	}

	
	for(var j=0; j<NUM_OF_SELECTION_OPTIONS; j++) {
		init(j);
	}
	
	function init(j) {
		$("#inputDL" + j).click(function(){
			$("#hiddenText").slideUp();
			isTxtAppears = false;
			resetList(j);
		});
	}
	
	
	/*  */
	$(document).on('click', '#showData_btn', function(){
		
		$("#hiddenText").slideUp();
		isTxtAppears = false;
		
		
		/* Checking what option is selected from the list. */
		for(var i=0; i<NUM_OF_SELECTION_OPTIONS; i++) {
			if($('#inputDL' + i)[0].checked)
				index = i; /* index = selected option. */
		}
		
		if(index == SELECT_BY_LANGUAGE){
			lan = document.getElementById('languages_selected').value;
		}
		else if(index == SELECT_BY_AGE){
			age_from = document.getElementById('ageFrom').value;
			age_to = document.getElementById('ageTo').value;
			if(age_from == 0 || age_to == 0){
				//ERROR Massage - 'fill in the age_from and age_to box'
				alert("ERROR - fill in the 'age from' and 'age to' box");
				return;
			}
			if(age_from > age_to){
				alert("ERROR - 'age from' need to be small then 'age to'");
				return;
			}
		}
		else if(index == SELECT_VISITOR_BY_MAIL) {
			mail = document.getElementById('email').value;
			if(mail == "" || mail == null){
				//ERROR Massage - 'fill in the email box'
				alert("ERROR - fill in the email box");
				return;
			}
		}
		else if(index == SELECR_VISITOR_BY_ID) {
			id = document.getElementById('visitor_id').value;
			if(id == "" || id == null){
				//ERROR Massage - 'fill in the id box'
				alert("ERROR - fill in the id box");
				return;
			}
		}
		else if(index == ADD_MANAGERS){
			hiddenTexts(index);
			addManager();
			return;
		}
		document.getElementById('excel_btn').style.display = "block";
		fetch_data(index, lan, age_from, age_to, mail, id, sessionStorage.permission);
	});	
	
	
	
	/*
	 *	add new row (new commitment or new admin) to the Database.
	 */
	$(document).on('click', '#btn_add', function(){
		if(index == SELECT_COMMITMENT) {
			var Hebrew = $('#Hebrew').text();
			var English = $('#English').text();
			var Arabic = $('#Arabic').text();
			if(Hebrew == '')
			{
				alert("Enter commitment in Hebrew ");
				return false;
			}
			if(English == '')
			{
				alert("Enter commitment in English");
				return false;
			}
			if(Arabic == '')
			{
				alert("Enter commitment in Arabic");
				return false;
			}
			$.ajax({
				url:"../pages/insert.php",
				method:"POST",
				data:{Hebrew:Hebrew, English:English, Arabic:Arabic, index:index},
				dataType:"text",
				success:function(data)
				{
					alert(data);
					fetch_data(index, lan, age_from, age_to, mail, id, sessionStorage.permission);
				}
			})
		}
		else if(index == ADD_MANAGERS) {
			//first_name,last_name,password,confirm_password,permission_selected
			var first_name = document.getElementById('first_name');
			first_name.value = deleteUnnecessarySpaces(first_name.value);
			var last_name = document.getElementById('last_name');
			last_name.value = deleteUnnecessarySpaces(last_name.value);
			var pass = document.getElementById('password');
			var confirm_pass = document.getElementById('confirm_password');
			var permission = document.getElementById('permission_selected');
			var error_msg_txt = "";
			var error_msg_div = document.getElementById('error_msg');
			error_msg_div.innerHTML = "";
			
			/* if first name or last name is empty string show error message */
			if(first_name.value == "" || last_name.value == ""){
				error_msg_txt = "<b><u>שגיאה</u>:</b> חובה למלא את כל השדות. <br/><br/>";
				error_msg_div.innerHTML = error_msg_txt;
				return;
			}
			
			/* check if the passwords equals */
			if(pass.value != confirm_pass.value){
				error_msg_txt = "הכנס סיסמאות דומות.";
			}
			/* check if the password is legal */
			if( !(checkPassword(pass.value)) ){
				if(error_msg_txt == "")
					error_msg_txt = "סיסמה לא חוקית, הכנס סיסמה הכוללת רק את התווים 0-9, a-z ,A-Z.";
				else
					error_msg_txt += "<br/> סיסמה לא חוקית, הכנס סיסמה הכוללת רק את התווים 0-9, a-z ,A-Z.";
			}
			
			if(error_msg_txt != ""){
				error_msg_txt = "<b><u>שגיאה</u>:</b><br/> " + error_msg_txt;
				error_msg_div.innerHTML = error_msg_txt;
				return;
			}
			
			$.ajax({
				url:"../pages/insert.php",
				method:"POST",
				data:{first_name:first_name.value, last_name:last_name.value, index:index, pass:pass.value, permission:permission.value},
				dataType:"text",
				success:function(data) {
					alert(data);
					document.getElementById('inputDL'+index).checked = false;
					index = SELECT_ALL_MANAGERS;
					document.getElementById('inputDL'+index).checked = true;
					fetch_data(index, lan, age_from, age_to, mail, id, sessionStorage.permission);
				}
			})
		}		
	});
	
	
	/*	
	 * Save the new data in the Database. 
	 */
	function edit_data(id, text, column_name) {
		$.ajax({
			url:"../pages/edit.php",
         method:"POST",
         data:{id:id, text:text, column_name:column_name, index:index},
         dataType:"text",
			success:function(data){
				if(data != 0)
					alert("Error - Try again to edit")
			}
		});			
	}
	
	
	/*	
	 * edit the Hebrew Commitments cells in the table. 
	 */
	$(document).on('click', '.Hebrew', function(){
		var id = $(this).data("id1");
		var old_commitment = $(this).text();
		var col_name = "Hebrew";
		var edit_btn = document.getElementById( EDIT_BTN_ID_TXT + id);
		if(edit_btn.innerHTML == TO_STOP_EDIT){
			var commitment = prompt("Please enter commitment in Hebrew", old_commitment);
			if(commitment != null ){
				commitment = deleteUnnecessarySpaces(commitment);
				if(old_commitment != commitment && commitment != "" ){
					edit_data(id, commitment, col_name);
					$(this).text(commitment);
				}
			}
		}
	});
	
	
	/*	
	 * edit the English Commitments cells in the table. 
	 */
	$(document).on('click', '.English', function(){
		var id = $(this).data("id2");
		var old_commitment = $(this).text();
		var col_name = "English";
		var edit_btn = document.getElementById( EDIT_BTN_ID_TXT + id);
		if(edit_btn.innerHTML == TO_STOP_EDIT){
			var commitment = prompt("Please enter commitment in English", old_commitment);
			if(commitment != null ){	
				commitment = deleteUnnecessarySpaces(commitment);
				if(old_commitment != commitment && commitment != ""){
					edit_data(id, commitment, col_name);
					$(this).text(commitment);
				}
			}
		}
	});
	
	
	/*
	 * edit the Arabic Commitments cells in the table. 
	 */
	$(document).on('click', '.Arabic', function(){
		var id = $(this).data("id3");
		var old_commitment = $(this).text();
		var col_name = "Arabic";
		var edit_btn = document.getElementById( EDIT_BTN_ID_TXT + id);
		if(edit_btn.innerHTML == TO_STOP_EDIT){
			var commitment = prompt("Please enter commitment in Arabic", old_commitment);
			if(commitment != null ){
				commitment = deleteUnnecessarySpaces(commitment);
				if(old_commitment != commitment && commitment != "" ){
					edit_data(id, commitment, col_name);
					$(this).text(commitment);
				}
			}
		}
	});
	
	
	/*	
	 * edit the first name cells in the table. 
	 */
	$(document).on('click', '.first_name', function(){		
		var id = $(this).data("id1");
		var old_name = $(this).text();
		var col_name = "first_name";
		var edit_btn = document.getElementById( EDIT_BTN_ID_TXT + id);
		if(edit_btn != null){
			if(edit_btn.innerHTML == TO_STOP_EDIT){
				var name = prompt("Please enter first name", old_name);
				if(name != null ){
					name = deleteUnnecessarySpaces(name);
					if(old_name != name && name != "" ){
						edit_data(id, name, col_name);
						$(this).text(name);
					}
				}
			}
		}
	});
	
	/*	
	 * edit the last name cells in the table. 
	 */
	$(document).on('click', '.last_name', function(){		
		var id = $(this).data("id2");
		var old_name = $(this).text();
		var col_name = "last_name";
		var edit_btn = document.getElementById( EDIT_BTN_ID_TXT + id);
		if(edit_btn != null){
			if(edit_btn.innerHTML == TO_STOP_EDIT){
				var name = prompt("Please enter last name" , old_name);
				if(name != null ){
					name = deleteUnnecessarySpaces(name);
					if(old_name != name && name != "" ){
						edit_data(id, name, col_name);
						$(this).text(name);
					}
				}
			}
		}
	});
	
	
	/*	
	 * edit the permission cell in the table. 
	 */
	$(document).on('click', '.permission', function(){		
		var id = $(this).data("id3");
		var old_name = $(this).text();
		var col_name = "permission";
		var edit_btn = document.getElementById( EDIT_BTN_ID_TXT + id);
		if(edit_btn != null) {
			if(edit_btn.innerHTML == TO_STOP_EDIT){
				var permission;
				if (confirm("to make this user as admin press 'OK', otherwise press 'cancel'") == true) {
					permission = "admin";
				} else {
					permission = "user";
				}
				
				if(permission != null ){
					edit_data(id, permission, col_name);
					$(this).text(permission);
				}
			}
		}
	});

	
	/*
	 *	press on 'edit_btn' to enable edit the data in the row,
	 * another press make the edit unable.
	 */
	$(document).on('click', '.' + EDIT_BTN_ID_TXT, function(){
		
		if (index == SELECT_COMMITMENT){
			var id=$(this).data("id4");
			var item = "commitment";
		}
		else if(index == SELECT_ALL_MANAGERS){
			var id=$(this).data("id4");
			var item = "manager";
		}
		var edit_btn = document.getElementById( EDIT_BTN_ID_TXT + id);

		if(edit_btn.innerHTML == TO_START_EDIT){
			document.getElementById( EDIT_BTN_ID_TXT + id).innerHTML = TO_STOP_EDIT;
		}
		else if(edit_btn.innerHTML == TO_STOP_EDIT) {
			document.getElementById( EDIT_BTN_ID_TXT + id).innerHTML = TO_START_EDIT;
		}
	});
	
	
	/* 
	 * press on 'btn_delete' to delete item (row) from the table.
	 */
	$(document).on('click', '.btn_delete', function(){
		
		if (index == SELECT_COMMITMENT){
			var id=$(this).data("id5");
			var item = "commitment";
		}
		else if(index == SELECT_ALL_MANAGERS){
			var id=$(this).data("id5");
			var item = "manager";
		}
		else if(SELECT_ALL_VISITORS <=index && index <= SELECT_BY_COUNTRY){
			var id=$(this).data("id9");
			var item = "visitor";
		}

		if(confirm('Are you sure you want to delete '+item+' number "' + id + '"')) {
			$.ajax({
				url:"../pages/delete.php",
				method:"POST",
            data:{id:id, index:index},
            dataType:"text",
            success:function(data){
					alert(data);
               fetch_data(index, lan, age_from, age_to, mail, id, sessionStorage.permission);
				}
			});
		}
	});
});



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


/*
 * if all the characters in the password string is legal return 'true', 
 * otherwise return 'false'.
 */
function checkPassword(pass_to_check) {
	var CHAR_NOT_LEGAL = -1;
	if(pass_to_check.length == 0)
		return false;
	
	/* All the characters that can be in password string (0-9, a-z, A-Z) */
	var characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
	
	for(var i=0; i<pass_to_check.length; i++)
		if(characters.indexOf(pass_to_check.charAt(i)) == CHAR_NOT_LEGAL)
			return false;

	return true;
}



/*
 * Planting html code for table with option to add new manager.
 */
function addManager(){
	var str = 	'<div class="table-responsive ">' +
						'<div id="error_msg"></div>'+	
						'<table class="table table-bordered" id="tableWidth" style="word-wrap:break-word;">' +
							'<thead><tr>' +
								'<th id="commitmentColumn" >First Name</th>' 		+
								'<th id="commitmentColumn" >Last Name</th>' 			+
								'<th id="commitmentColumn" >create password</th>'	+
								'<th id="commitmentColumn" >confirm password</th>'	+
								'<th id="commitmentColumn" >Permission</th>'			+
								'<th id="idAndDeleteColumn">Add</th>'					+
							'</tr></thead>'+
							'<tbody><tr>' 	+
								'<td data-id1="1" >	'+
								'	<input id="first_name" type="text" placeholder="First Name" style="border:none">		'+
								'</td>'	+
								'<td data-id2="2" >	'+
								'	<input id="last_name" type="text" placeholder="Last Name" style="border:none">'+
								'</td>'	+
								'<td data-id2="3" >	'+
								'	<input id="password" type="password" placeholder="password" style="border:none">	'+
								'</td>'	+
								'<td 	data-id2="4" >	'+
								'	<input id="confirm_password" type="password" placeholder="confirm password" style="border:none">	'+
								'</td>'	+
								'<td data-id3="5" >	'+
								'	<select id="permission_selected"><option value="uesr">user</option><option value="admin">admin</option></select>'+
								'</td>'	+
								'<td id="idAndDeleteColumn">'	+
								'	<button type="button" name="btn_add" id="btn_add" class="btn btn-success">Add</button>' +
								'</td>'		+
							'</tr>'+
							
							'<tr>' 	+
								'<td colspan="6">'+
								'	הנחיות:'+ "<br/>" +
								'	- חובה למלא את כל השדות.' + "<br/>" +
								'	- הסיסמה כוללת את התווים באים בלבד: 0-9, a-z, A-Z.' + "<br/>" +
								'	- הרשאות:' + "<br/>" +
								'		&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1. user: משתמש רגיל, יכול לראות את התכנים המופיעים בדף זה.' + "<br/>" +
								'		&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2. admin: בנוסף להרשאת ה-user ניתן גם לערוך תכנים המופיעים בדך זה.' + "<br/>" +
								'</td>'+
							'</tr></tbody>'+
							
						'</table>'			+
					'</div>';
	$('#live_data').html(str);
}




