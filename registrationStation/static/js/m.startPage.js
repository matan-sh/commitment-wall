var language = "";
var headline = 0;
var the_text = 1;
var button_text = 2;
function check_language() {
	
	/* get the language of the page from the URL */
	var url = parent.document.URL.substring(parent.document.URL.indexOf('?')+1, parent.document.URL.length);	
	url = decodeURIComponent(url);
	var language = url.substring(url.indexOf('=')+1, url.length);
	
	if(language == "En")
		document.getElementById("div_direction").style.direction = "ltr";
	
	get_text(language);
}




function get_text(language) {
	var page = 3;
	$.ajax({
		url:'../pages/get_text.php',
		method:"GET",
		data:{page:page},
		dataType:"text",
		success:function(data){
			data = JSON.parse(data);
			
			if(language == "Ar") {
				$('#headline').html(data[headline].arabic);
				$('#text').html(data[the_text].arabic);
				$('#button_text').html(data[button_text].arabic);
			}
			else if(language == "En") {
				$('#headline').html(data[headline].english);
				$('#text').html(data[the_text].english);
				$('#button_text').html(data[button_text].english);
			}
			else { 			
				$('#headline').html(data[headline].hebrew);
				$('#text').html(data[the_text].hebrew);
				$('#button_text').html(data[button_text].hebrew);
			}
		}
	});
}