<?php 
	$language = $_POST['languageURL'];
	$firstName = $_POST['firstName'];
	$lastName = $_POST['lastName'];
	$email = $_POST['email'];
	
/* connect to the DataBase and set as UTF8 */
	$connect = mysqli_connect("localhost", "root", "", "commitment_wall") or die("Error");
	mysqli_query($connect, "SET NAMES UTF8");
	
		
	/* set the query string and send the query to DB */
	
	$sql = 'SELECT pictureURL FROM visitors WHERE first_name="'.$firstName.'" AND last_name="'.$lastName.'" AND email="'.$email.'";';
	$result = mysqli_query($connect, $sql)or die('could not do query');
	$imageURL = "";
	$get_pic_flag = false;
	if($row = mysqli_fetch_array($result)) {
		$imageURL = $row[0];
		$get_pic_flag = true;
   }
	if(!$get_pic_flag)
		return;
	
	$imageURL;

    
    
    $subject = "Thank you for visit in the aquarium";
    $message = "Hello ".$firstName. " " .$lastName. "\n\n" .  "Thank you for visit in the aquarium \n\n\n\n " . $imageURL;;

    $headers = "From: dont_reply@com";

    mail($email,$subject,$message,$headers);
    echo "Mail Sent. Thank you " . $first_name . ", we will contact you shortly.";

?>