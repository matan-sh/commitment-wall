<?php
	header("Content-Type: application/json");
	
	$page = $_GET["page"];
	
	/* connect to the DataBase and set as UTF8 */
	$connect = mysqli_connect("localhost", "root", "", "commitment_wall") or die(errorCase($language));
	mysqli_query($connect, "SET NAMES UTF8");
	
		
	/* set the query string and send the query to DB */
	if($page == 3)
		$sql = "SELECT `id`, `descripsion`, `hebrew`, `english`, `arabic` FROM `text` WHERE id<=3";
	if($page == 2)
		$sql = "SELECT `id`, `descripsion`, `hebrew`, `english`, `arabic` FROM `text` WHERE id>3 AND id<=7";
	$result = mysqli_query($connect, $sql)or die('could not do query');
	$output = '';	
	
   $jsonData = '[ ';
	
	while ($row = mysqli_fetch_array($result)) {
		$jsonData .=	'{
			"id": "'.$row['id'].'",
			"descripsion": "'.$row['descripsion'].'",
			"hebrew": "'.$row['hebrew'].'",
			"english": "'.$row['english'].'",
			"arabic": "'.$row['arabic'].'"
			},';
   }
   $jsonData = chop($jsonData, ",");	// delete the last comma ',' on the Json string
   $jsonData .= ' ]';						// close the Json string.
   echo $jsonData;
?>

