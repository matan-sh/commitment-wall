/* redirect the page to another URL */
function redirect(urlLink)
{
	window.open(urlLink, "_self");
}


var x = document.getElementById("demo");
var url;
function checkLocation(u)
{
	url = u;
	if (navigator.geolocation) {
		//navigator.geolocation.getCurrentPosition(showPosition);
		navigator.geolocation.getCurrentPosition(showPosition, showError);
	} else {
		x.innerHTML = "Geolocation is not supported by this browser.";
	}
}
function showPosition(position) 
{
	// the center point of a circle
	var mx = 31.744495; 	//latitude
	var my = 35.166088;	//Longitude
	var radius = 0.0033;
	// visitor position
	var x1 = position.coords.latitude;
	var y1 = position.coords.longitude;
	var result = Math.sqrt(Math.pow(mx-x1, 2) + Math.pow(my-y1, 2));

	/* if(radius >= result) */
	if(true) {
		redirect(url);
	}
	else {
		redirect("/commitmentWall/templates/locationError.html");
	}
}

function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            alert("User denied the request for Geolocation.");
            break;
        case error.POSITION_UNAVAILABLE:
            alert("Location information is unavailable.");
            break;
        case error.TIMEOUT:
            alert("The request to get user location timed out.");
            break;
        case error.UNKNOWN_ERROR:
            alert("An unknown error occurred.");
            break;
    }
}