<?php
	header("Content-Type: application/json");
	
	$first_name = $_POST["first_name"];
	$last_name = $_POST["last_name"];
	$pass = $_POST["pass"];
	
	/* connect to the DataBase and set as UTF8 */
	$connect = mysqli_connect("localhost", "root", "", "commitment_wall") or die('could not connect to DataBase');
	mysqli_query($connect, "SET NAMES UTF8");
	
	$sql = 'SELECT * FROM admin WHERE first_name="'.$first_name.'" AND last_name="'.$last_name.'";';
	$result = mysqli_query($connect, $sql)or die('could not do query');
	$output = '';	
	
   $jsonData = '';

	/*
	 * Check to see if there is a user with first name and last name like those (in the database).
	 * Check also if the passwords are equals.
	 *
	 * Case true:
	 * Return Json string with id, full name and permission.
	 *
	 * Case false:
	 * Return empty Json string.
	 *
	 */
	if(mysqli_num_rows($result) > 0){
		while ($row = mysqli_fetch_array($result))
			if(strcmp($row['first_name'], $first_name) == 0 && strcmp($row['last_name'], $last_name) == 0 )
				if((strcmp($row['password'], hash("sha512" ,$pass.$row['extension'] , false))) == 0)
					$jsonData .=	'{
						"id": "'.$row['id'].'",
						"first_name": "'.$row['first_name'].'",
						"last_name": "'.$row['last_name'].'",
						"permission": "'.$row['permission'].'"
					}';
	}
   echo $jsonData;
?>

