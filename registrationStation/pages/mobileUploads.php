<?php

	$lan = $_POST["language"];
	if($lan == "He")
		$lan = "Hebrew";
	else if($lan == "En")
		$lan = "English";
	else if($lan == "Ar")
		$lan = "Arabic";
	
	if($lan == "English")
		header("Location: ../templates/thanksPageEN.html");
	else if($lan == "Arabic")
		header("Location: ../templates/thanksPageAR.html");
	else
		header("Location: ../templates/thanksPage.html");


	$fName = $_POST["firstName"];
	$lName = $_POST["lastName"];
	$mail = $_POST["email"];
	$date = $_POST["date"];
	$country = $_POST["country"];
	
	
	$month = date("m");
	$year = date("Y");
		
	$target_dir = '../uploads/'.$month.'.'.$year.'/';
	// If the folder does not exist, create it.
	if(is_dir($target_dir) === false )
		mkdir($target_dir);
	
	$filename = strtotime("now").'.jpg';
	$target_file = $target_dir . $filename;
	$uploadOk = 1;
	$imageFileType = pathinfo($target_file,PATHINFO_EXTENSION);

	// Check if image file is a actual image or fake image
	if(isset($_POST["submit"])) {
		// Check if selected file
		if($_FILES["fileToUpload"]["tmp_name"] == null){
			echo "add file before submitting";
			return;
		}
		 $check = getimagesize($_FILES["fileToUpload"]["tmp_name"]);
		 if($check !== false) {
			  echo "File is an image - " . $check["mime"] . ".";
			  $uploadOk = 1;
		 } else {
			  echo "File is not an image.";
			  $uploadOk = 0;
		 }
	}
	// Check if file already exists
	if (file_exists($target_file)) {
		 echo "Sorry, file already exists.";
		 $uploadOk = 0;
	}
	// Check file size
/*
	if ($_FILES["fileToUpload"]["size"] > 500000) {
		 echo "Sorry, your file is too large.";
		 $uploadOk = 0;
	}
*/
	// Allow certain file formats
	if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg"
	&& $imageFileType != "gif" ) {
		 echo "Sorry, only JPG, JPEG, PNG & GIF files are allowed.";
		 $uploadOk = 0;
	}
	// Check if $uploadOk is set to 0 by an error
	if ($uploadOk == 0) {
		 echo "Sorry, your file was not uploaded.";
	// if everything is ok, try to upload file
	} else {
		 if (move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], $target_file)) {
			  echo "The file ". basename( $_FILES["fileToUpload"]["name"]). " has been uploaded.";
		 } else {
			  echo "Sorry, there was an error uploading your file.";
		 }
	}

	$file_loc = "../../CommitmentWall/uploads/".$month.".".$year."/".$filename;
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

exit;
?>