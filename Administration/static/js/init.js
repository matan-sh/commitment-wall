 
$(document).ready(function(){
	/* constant values */
	var EMPTY_TXT = -2;
	var TXT_NOT_CHANGED = -1;
	var SELECT_COMMITMENT = 0;
	var SELECT_ALL_ADMINS = 1;
	var SELECT_ALL_VISITORS = 2;
	
	var index = -1;
	var isTxtAppears = false;
	
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
	
	
	function fetch_data(index) {
		hiddenTexts(index);
		$.ajax({
			url:"../pages/select.php",
			method:"POST",
			data:{index:index},
         dataType:"text",
         success:function(data){
				$('#live_data').html(data);
			}
		});
	}
	
	var j=0;
	for(j=0; j<5; j++) {
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
		var numOfItems = 5;
		
		$("#hiddenText").slideUp();
		isTxtAppears = false;
		
		/* Checking what option is selected from the list. */
		for(var i=0; i<numOfItems; i++) {
			if($('#inputDL' + i)[0].checked)
				index = i; /* index = selected option. */
		}
		fetch_data(index);
	});
	
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
					fetch_data(index);
				}
			})
		}
		else if(index == 3) {
			var first_name = $('#first_name').text();
			var last_name = $('#last_name').text();
			if(first_name == '') {
				alert("Enter First Name");
				return false;
			}
			if(last_name == '') {
				alert("Enter Last Name");
				return false;
			}
			$.ajax({
				url:"../pages/insert.php",
				method:"POST",
				data:{first_name:first_name, last_name:last_name, index:index},
				dataType:"text",
				success:function(data) {
					alert(data);
					fetch_data(index);
				}
			})
		}
	});
	
	function edit_data(id, text, column_name) {
		$.ajax({
			url:"../pages/edit.php",
         method:"POST",
         data:{id:id, text:text, column_name:column_name, index:index},
         dataType:"text",
			success:function(data){
				/* if the 'text' not empy and changed, change also in the database */
				if(data != TXT_NOT_CHANGED && data != EMPTY_TXT)
					alert(data);
				/* if 'text' is empty Do not change anything and reload table again */
				if(data == EMPTY_TXT)
					fetch_data(index);
				}
		});			
	}
	
	/*	Commitments table. */
	$(document).on('blur', '.Hebrew', function(){
		var id = $(this).data("id1");
		var commitment = $(this).text();
		edit_data(id, commitment, "Hebrew");
	});	
	$(document).on('blur', '.English', function(){
		var id = $(this).data("id2");
		var commitment = $(this).text();
		edit_data(id, commitment, "English");
	});
	$(document).on('blur', '.Arabic', function(){
		var id = $(this).data("id3");
		var commitment = $(this).text();
		edit_data(id, commitment, "Arabic");
	});
	
	/*	person table. */
	$(document).on('blur', '.first_name', function(){
		var id = $(this).data("id1");
		var first_name = $(this).text();
		edit_data(id, first_name, "first_name");
	});
	$(document).on('blur', '.last_name', function(){
		var id = $(this).data("id2");
		var last_name = $(this).text();
		edit_data(id,last_name, "last_name");
	});
	
	
	$(document).on('click', '.btn_delete', function(){
		if(index == 3) {
			var id=$(this).data("id3");
		}
		if (index == SELECT_COMMITMENT){
			var id=$(this).data("id4");
		}
		if(confirm('Are you sure you want to delete item number "' + id + '"')) {
			$.ajax({
				url:"../pages/delete.php",
				method:"POST",
            data:{id:id, index:index},
            dataType:"text",
            success:function(data){
					alert(data);
               fetch_data(index);
				}
			});
		}
	});
	
});