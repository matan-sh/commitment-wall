/* delete data from the input value */
function deleteData()
{
	document.getElementById("firstName").value = "";
	document.getElementById("lastName").value = "";
	document.getElementById("mail").value = "";
	document.getElementById("dateOfBirth").value = "";
	document.getElementById("country").value = "";
	document.getElementById("mailApproval").checked = false;
	document.getElementById("checMsg").style.display = "none";
	document.getElementById("errorMsg").style.display = "none";
}

/* Sending the user's personal information to snapshot page */
function send_data(lan){
				 
	var aprov = document.getElementById("mailApproval").checked;
	
	// validate the 'first name' variable.
	var firstName = document.getElementById("firstName").value;
	firstName = deleteUnnecessarySpaces(firstName);
	document.getElementById("firstName").value = firstName;
	firstName = firstName.replace(/ /g, "&");
	
	// validate the 'last name' variable.
	var lastName = document.getElementById("lastName").value;
	lastName = deleteUnnecessarySpaces(lastName);
	document.getElementById("lastName").value = lastName;
	lastName = lastName.replace(/ /g, "&");
	
	// validate the 'email' variable.
	var mail = document.getElementById("mail").value;
	mail = deleteUnnecessarySpaces(mail);
	document.getElementById("mail").value = mail;
	mail = mail.replace(/ /g, "&");
	
	// validate the 'Birthdate' variable.
	var date = document.getElementById("dateOfBirth").value;
	date = deleteUnnecessarySpaces(date);
	document.getElementById("dateOfBirth").value = date;
	date = date.replace(/ /g, "&");
	
	// validate the 'country' variable.
	var country = document.getElementById("country").value;
	country = deleteUnnecessarySpaces(country);
	document.getElementById("country").value = country;
	country = country.replace(/ /g, "&");
	
	var emptyStr = "";
	
	if(firstName === emptyStr || lastName === emptyStr || mail === emptyStr){
		document.getElementById("errorMsg").style.display = "block";
	
		if(!aprov)
			document.getElementById("checMsg").style.display = "block";
		else
			document.getElementById("checMsg").style.display = "none";
	}
	else {
		
		if(!aprov){
			document.getElementById("checMsg").style.display = "block";
			if(firstName === emptyStr || lastName === emptyStr || mail === emptyStr)
				document.getElementById("errorMsg").style.display = "block";
			else
				document.getElementById("errorMsg").style.display = "none";
		}
		else {
			
			/* 
			*	valuse description:
			* 	fn = first name, ln = last name, em = email,
			*	data = birthdate, co = country.
			*	language: He = Hebrew, En = English, Ar = Arabic.
			*/
			if(lan === "Hebrew")
				var url = "snapshot.html?lan=He?fn="+firstName+"?ln="+lastName+"?em="+mail;
			else if(lan === "English")
				var url = "snapshot.html?lan=En?fn="+firstName+"?ln="+lastName+"?em="+mail;
			else if(lan === "Arabic")
				var url = "snapshot.html?lan=Ar?fn="+firstName+"?ln="+lastName+"?em="+mail;
			
			if(date !== "")
				url += "?date="+date;
			else
				url += "?date=none";
			
			if(country !== "")
				url += "?co="+country;
			else
				url += "?co=none";
			window.open(url, "_self");
		}
	}
}