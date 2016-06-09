<?php

	$db = mysqli_connect('localhost', 'root', '', 'commitment_wall') or die('could not connect to database');
	
	mysqli_query($db, "SET NAMES UTF8"); 
	
	
	// query what is the max id in the table 'visitors'
	$countQuery = "SELECT MAX(id) AS maxid FROM `visitors`;";
	$count = mysqli_query($db, $countQuery) or die('could not count the database');
	$rowCount = mysqli_fetch_array($count);
	echo $rowCount["maxid"];
?>