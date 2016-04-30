<?php
	$index = $_POST["index"];
	
	switch($index) {
		case 0: {
			insertToCommitmentsTable();
			break;
		}
		case 1: {
			break;
		}
		case 2: {
			break;
		}
		case 3: {
			insertToPersonTable();
			break;
		}
		case 4: {
			break;
		}
	}
	
	function insertToPersonTable() {
		$connect = mysqli_connect("localhost", "root", "", "checks");
		mysqli_query($connect, "SET NAMES UTF8");
		$sql = "INSERT INTO person(first_name, last_name) VALUES('".$_POST["first_name"]."', '".$_POST["last_name"]."')";
		if(mysqli_query($connect, $sql))
		{
			echo 'Data Inserted';
		}
	}
	
		function insertToCommitmentsTable() {
		$connect = mysqli_connect("localhost", "root", "", "commitment_wall");
		mysqli_query($connect, "SET NAMES UTF8");
		$sql = "INSERT INTO commitments(Hebrew, English, Arabic) VALUES('".$_POST["Hebrew"]."', '".$_POST["English"]."', '".$_POST["Arabic"]."')";
		if(mysqli_query($connect, $sql))
		{
			echo 'Data Inserted';
		}
	}
?>  