/* redirect the page to another URL */
function redirect(urlLink)
{
	window.open(urlLink, "_self");
}


/*
function checkLocation(latitude, longitude)
{
	var x = document.getElementById("demo");
	function getLocation() {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(showPosition);
		} else {
			x.innerHTML = "Geolocation is not supported by this browser.";
		}
	}
	function showPosition(position) {
		
		x.innerHTML = "Latitude: " + position.coords.latitude + 
		"<br>Longitude: " + position.coords.longitude; 
			
		if(latitude>31 && latitude<32)
			window.open("/commitmentWall/templates/commitment.html", "_self"); 
		else
			window.open("https://www.google.co.il/", "_self");
	}
} 
*/





var x = document.getElementById("demo");
var url;
function checkLocation(u)
{
	url = u;
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(showPosition);
	} else {
		x.innerHTML = "Geolocation is not supported by this browser.";
	}
}


function showPosition(position) 
{
	alert("Latitude: " + position.coords.latitude + "\n" +
	"Longitude: " + position.coords.longitude);

	/* position.coords.latitude>31 && position.coords.latitude<32 */
	if(position.coords.latitude>31 && position.coords.latitude<32)
	{
		redirect(url);
	}
	else {
		redirect("/commitmentWall/templates/locationError.html");
	}
}