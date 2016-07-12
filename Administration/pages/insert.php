<?php
	$index = $_POST["index"];
	$COMMITMENTS_TABLE = 0;
	$ADMIN_TABLE = 9;
	$NUM_OF_CHARACTERS = 35;

	if($index == $COMMITMENTS_TABLE){
		/*
		 * commitments table: 
		 * get the commitment in three languages (Hebrew, English and Arabic).
		 * set the SQL string to insert the commitment into the database.
		 */
		$hebrew = $_POST["Hebrew"];
		$english = $_POST["English"];
		$arabic = $_POST["Arabic"];
		$sql = "INSERT INTO commitments(Hebrew, English, Arabic) VALUES('".$hebrew."', '".$english."', '".$arabic."')";
	}
	else if($index == $ADMIN_TABLE){
		/*
		 * admin table:
		 * get the manager's information (full name, password and permission).
		 * set a random string, chaining the random string to the password string for extra security.
		 * set the SQL string to insert the manager into the database.
		 */
		$first_name = $_POST["first_name"];
		$last_name = $_POST["last_name"];
		$extension = generateRandomString($NUM_OF_CHARACTERS);
		$pass = hash("sha512" , $_POST["pass"] . $extension  , false);
		$permission = $_POST["permission"];
		$sql = "INSERT INTO admin(id, first_name, last_name, extension, password, permission) VALUES (
				null,'".$first_name."','".$last_name."','".$extension."','".$pass."','".$permission."')";
	}

	/* connect to the DataBase and set as UTF8 */
	$connect = mysqli_connect("localhost", "root", "", "commitment_wall") or die('could not connect to DataBase');
	mysqli_query($connect, "SET NAMES UTF8");

	if(mysqli_query($connect, $sql))
	{
		echo 'Data Inserted';
	}


	
/*
 * The method creates a random string that contains the following characters 0-9, a-z and A-Z.
 * 
 * Argument:
 * $length - The length of the random string (how many chars).
 * note: if not defined length, the length is 10.
*/
function generateRandomString($length = 10) {
    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $charactersLength = strlen($characters);
    $randomString = '';
    for ($i = 0; $i < $length; $i++) {
        $randomString .= $characters[rand(0, $charactersLength - 1)];
    }
    return $randomString;
}
?>