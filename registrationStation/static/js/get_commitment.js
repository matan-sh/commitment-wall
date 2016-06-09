function get_commitments(language) {
	$.ajax({
		url:'../pages/get_commitmentsList.php',
		method:"POST",
		data:{language:language},
		dataType:"text",
		success:function(data){
			$('#commitmentsList').html(data);
		}
	});

}
	
	