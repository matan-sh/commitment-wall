<?php

	$lan = $_POST["language"];
	$fName = $_POST["firstname"];
	$lName = $_POST["lastname"];
	$mail = $_POST["mail"];
	$date = $_POST["date"];
	$country = $_POST["country"];
	$pic = $_POST["pictureURL"];
	
	/* connect to the DataBase and set as UTF8 */
	$connect = mysqli_connect("localhost", "root", "", "commitment_wall") or die("ERROR - connection DB");
	mysqli_query($connect, "SET NAMES UTF8");
	
	// insert the data of the visitor into the database
	$query = "INSERT INTO visitors (`id`,`language`,`first_name`,`last_name`,`email`,`birthdate`, 
			`country`,`pictureURL`) VALUES (null,'" .$lan. "','" .$fName. "','" .$lName. "','" .$mail. 
			"','" .$date. "','" .$country. "','" .$pic. "')";
	mysqli_query($connect, $query) or die("ERROR - query");
	echo "success";

?>

