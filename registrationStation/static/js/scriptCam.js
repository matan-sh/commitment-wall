var counter = 1;
var maxTry = 3;
var languageURL;
var language;
var firstName;
var lastName;
var email;
var date;
var country;

var btn_txt_try;
var btn_txt_snapshot;
var content_txt;

getVars();

$(function(){
	webcam.set_api_url(setUrl());
	webcam.set_swf_url('../static/webcam/webcam.swf');
	webcam.set_quality(90);
	webcam.set_shutter_sound(true,'../static/webcam/shutter.mp3');
	
	$('#camera').html(webcam.get_html(600, 400));
	webcam.set_stealth(true);
});

// capture the the picture 
function snapshot()
{	
	var btn = document.getElementById("savePic");

	if(counter < maxTry) 
	{
		if(document.getElementById("snapshot").name == "snapshot")
		{
			document.getElementById("snapshot").innerHTML = btn_txt_try;
			document.getElementById("num_of_attempts").innerHTML = maxTry - (counter);
			document.getElementById("snapshot").name = "tryAgain";
			// capture the image
			webcam.freeze();
			btn.disabled = false;
		} else {
			counter++;
			webcam.reset();
			document.getElementById("snapshot").innerHTML = btn_txt_snapshot;
			document.getElementById("snapshot").name = "snapshot";
			btn.disabled = true;
		}	
	} else {
		webcam.freeze();
		btn.disabled = false;
		document.getElementById("num_of_attempts").innerHTML = maxTry - counter;
		document.getElementById("snapshot").disabled = true;
	}
}	

//save the pic and return to index.html
function savePic(){
	webcam.upload();
	
	if (typeof(Storage) !== "undefined") {
    	if(languageURL == "En")
			localStorage.language = "English";
		else if(languageURL == "Ar")
			localStorage.language = "Arabic";
		else
			localStorage.language = "Hebrew";
		localStorage.firstName = firstName;
		localStorage.lastName = lastName;
		localStorage.email = email;
	}
	setTimeout(getTimeOut, 1000);
};
function getTimeOut(){
	if(languageURL == "En")
		redirect('../templates/thanksPageEN.html');
	else if(languageURL == "Ar")
		redirect('../templates/thanksPageAR.html');
	else
		redirect('../templates/thanksPage.html');
}



/* get variables from URL */
function getVars(){
	var url = parent.document.URL.substring(parent.document.URL.indexOf('?')+1, parent.document.URL.length);	
	url = decodeURIComponent(url);
	url = url.replace(/&/g, " ");
	
	languageURL = url.substring(url.indexOf('=')+1, url.indexOf('?'));
	url = url.substring(url.indexOf('?')+1 , url.length);
	firstName = url.substring(url.indexOf('=')+1, url.indexOf('?'));
	url = url.substring(url.indexOf('?')+1 , url.length);
	lastName = url.substring(url.indexOf('=')+1, url.indexOf('?'));
	url = url.substring(url.indexOf('?')+1 , url.length);
	email = url.substring(url.indexOf('=')+1, url.indexOf('?'));
	url = url.substring(url.indexOf('?')+1 , url.length);
	date = url.substring(url.indexOf('=')+1, url.indexOf('?'));
	url = url.substring(url.indexOf('?')+1 , url.length);
	country = url.substring(url.indexOf('=')+1, url.length);
}


function setUrl(){
	var url = "../pages/uploads.php?lan="+languageURL+"&fn="+firstName+"&ln="+lastName+"&em="+email+
			"&date="+date+"&co="+country;
	return url;
}



function set_page_txt(){	
	var headline_txt = 0;
	var btn_txt_takePic = 1;
	var btn_txt_tryAgain = 2;
	var btn_txt_savePic = 3;
	var page = 2;
	$.ajax({
		url:'../pages/get_text.php',
		method:"GET",
		data:{page:page},
		dataType:"text",
		success:function(data){
			data = JSON.parse(data);
			
			if(languageURL == "En"){
				$('#txt').html(data[headline_txt].english);
				btn_txt_try = data[btn_txt_tryAgain].english;
				btn_txt_snapshot = data[btn_txt_takePic].english;
				$('#savePic').html(data[btn_txt_savePic].english);
			}
			else if(languageURL == "Ar"){
				$('#txt').html(data[headline_txt].arabic);
				btn_txt_try = data[btn_txt_tryAgain].arabic;
				btn_txt_snapshot = data[btn_txt_takePic].arabic;
				$('#savePic').html(data[btn_txt_savePic].arabic);
			}
			else{				
				$('#txt').html(data[headline_txt].hebrew);
				btn_txt_try = data[btn_txt_tryAgain].hebrew;
				btn_txt_snapshot = data[btn_txt_takePic].hebrew;
				$('#savePic').html(data[btn_txt_savePic].hebrew);
			}
			
			document.getElementById("snapshot").innerHTML = btn_txt_snapshot;
		}
	});	
}