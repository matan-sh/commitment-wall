var headline = 0;
var the_text = 1;
var button_text = 2;

function get_text() {
	var page = 3;
	$.ajax({
		url:'../pages/get_text.php',
		method:"GET",
		data:{page:page},
		dataType:"text",
		success:function(data){
			data = JSON.parse(data);
			
			$('#hebrew_headline').html(data[headline].hebrew);
			$('#hebrew_text').html(data[the_text].hebrew);
			$('#hebrew_button_text').html(data[button_text].hebrew);
			
			$('#english_headline').html(data[headline].english);
			$('#english_text').html(data[the_text].english);
			$('#english_button_text').html(data[button_text].english);
			
			$('#arabic_headline').html(data[headline].arabic);
			$('#arabic_text').html(data[the_text].arabic);
			$('#arabic_button_text').html(data[button_text].arabic);
		}
	});
}
	
	