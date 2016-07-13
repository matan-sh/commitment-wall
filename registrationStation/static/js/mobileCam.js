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


function getPic(input) {
	if (input.files && input.files[0]) {
		var reader = new FileReader();
		reader.onload = function (e) {

			document.getElementById("language").value = languageURL;
			document.getElementById("firstName").value = firstName;
			document.getElementById("lastName").value = lastName;
			document.getElementById("email").value = email;
			document.getElementById("date").value = date;
			document.getElementById("country").value = country;
			document.getElementById("submit").disabled = false;
			document.getElementById("camera").style.display = "block";
			$('#camera')
				.attr('src', e.target.result)
				.width(600)
				.height(400);
		};
		reader.readAsDataURL(input.files[0]);
	}
}