<?php
	$index = $_POST["index"];
	
	$first_name = $_POST["first_name"];
	$last_name = $_POST["last_name"];
	$pass = $_POST["pass"];
	$permission = $_POST["permission"];
	
	
	
	if($index == 0) {
		insertToCommitmentsTable();
	}
	else if($index == 9){
		insertToAdminTable();
	}
	

function insertToCommitmentsTable() {
	$hebrew = $_POST["Hebrew"];
	$english = $_POST["English"];
	$arabic = $_POST["Arabic"];
	$connect = mysqli_connect("localhost", "root", "", "commitment_wall");
	mysqli_query($connect, "SET NAMES UTF8");
	$sql = "INSERT INTO commitments(Hebrew, English, Arabic) VALUES('".$hebrew."', '".$english."', '".$arabic."')";
	if(mysqli_query($connect, $sql))
	{
		echo 'Data Inserted';
	}
}



function insertToAdminTable() {
	$first_name = $_POST["first_name"];
	$last_name = $_POST["last_name"];
	$extension = generateRandomString(35);
	//$pass = $_POST["pass"];
	$pass = hash("sha512" , $_POST["pass"] . $extension  , false);
	$permission = $_POST["permission"];
	
	$connect = mysqli_connect("localhost", "root", "", "commitment_wall");
	mysqli_query($connect, "SET NAMES UTF8");
	
	//$sql = "INSERT INTO commitments(Hebrew, English, Arabic) VALUES('".$hebrew."', '".$english."', '".$arabic."')";
	$sql = "INSERT INTO admin(id, first_name, last_name, extension, password, permission) VALUES (
			null,'".$first_name."','".$last_name."','".$extension."','".$pass."','".$permission."')";
	if(mysqli_query($connect, $sql))
	{
		echo 'Data Inserted';
	}
}


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