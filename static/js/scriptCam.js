var counter = 0;
var maxTry = 3;

$(function(){
	webcam.set_api_url('../pages/uploads.php');
	webcam.set_swf_url('../static/webcam/webcam.swf');
	webcam.set_quality(90);
	webcam.set_shutter_sound(true,'../static/webcam/shutter.mp3');
	
	$('#camera').html(webcam.get_html(600, 400));
	webcam.set_stealth(true);
	
	setInterval(function(){
		$('#uploads').load('../pages/get_uploads.php');
	},1000);
});

// capture the the picture 
function snapshot()
{	
	var btm = document.getElementById("savePic");


	if(counter < maxTry) 
	{
		if(document.getElementById("snapshot").name == "snapshot")
		{
			document.getElementById("snapshot").innerHTML = "נסה שוב";
			document.getElementById("snapshot").name = "tryAgain";
			// capture the image
			webcam.freeze();
			btm.disabled = false;
		} else {
			counter++;
			webcam.reset();
			document.getElementById("snapshot").innerHTML = "צלם תמונה";
			document.getElementById("snapshot").name = "snapshot";
			btm.disabled = true;
		}	
	} else {
		webcam.freeze();
		btm.disabled = false;
		document.getElementById("snapshot").disabled = true;
	}
}	

//save the pic and return to index.html
function savePic(){	

	webcam.upload();
	redirect('../templates/index.html');
};
