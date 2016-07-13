<?php 
	
	$lan = $_GET["lan"];
	if($lan == "He")
		$lan = "Hebrew";
	else if($lan == "En")
		$lan = "English";
	else if($lan == "Ar")
		$lan = "Arabic";
	
	$fName = $_GET["fn"];
	$lName = $_GET["ln"];
	$mail = $_GET["em"];
	$date = $_GET["date"];
	$country = $_GET["co"];
	
	/*
	* m -> Numeric representation of a month, with leading zeros 01 through 12
	* Y -> A full numeric representation of a year, 4 digits 
	*/
	$month = date("m");
	$year = date("Y");
	
	$folder = '../uploads/'.$month.'.'.$year.'/';
	// If the folder does not exist, create it.
	if(is_dir($folder) === false )
		mkdir($folder);

	$filename = strtotime("now").'.jpg';
	$input_con = file_get_contents("php://input");
	$file_path = $folder.$filename;
	$file_loc = "../../CommitmentWall/uploads/".$month.".".$year."/".$filename;
	file_put_contents($file_path, $input_con);
	
	/* connect to the DataBase and set as UTF8 */
	$connect = mysqli_connect("localhost", "root", "", "commitment_wall") or die("ERROR - connection DB");
	mysqli_query($connect, "SET NAMES UTF8");
	
	// insert the data of the visitor into the database
	$query = "INSERT INTO visitors
		(`id`,`language`,`first_name`,`last_name`,`email`,`birthdate`,`country`,`pictureURL`) 
		VALUES 
		(null,'".$lan."','".$fName."','".$lName."','".$mail."','".$date."','".$country."','".$file_loc."')";
	//$query = "UPDATE visitors SET pictureURL='" .$file_path. "' WHERE id='" .$id. "' AND pictureURL='empty';";
	mysqli_query($connect, $query) or die("ERROR - update query");

?>