
var counter = 0;
var max_id = 0;
var first_time = true;
var url = "../pages/get_counter.php";
	
$(document).ready(function(){
	
	setInterval(function(){
		var hr = new XMLHttpRequest();
		hr.open("GET", url, true);
		hr.setRequestHeader("Content-type", "application/json");
		hr.onreadystatechange = function() {
			if(hr.readyState == 4 && hr.status == 200) {
				//counter = JSON.parse(hr.responseText);
				max_id = JSON.parse(hr.responseText);
				if(counter < max_id){
					document.getElementById("visitorsCount").innerHTML = max_id;
					if(!first_time)
						addImg(counter);
					else
						first_time = false;
					counter = max_id;
				}
			}
		}
		hr.send(null);
	},1000);
});