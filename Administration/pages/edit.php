<?php  
	$index = $_POST["index"];
	
	switch($index) {
		case 0: {
			editCommitmentsTable();
			break;
		}
		case 1: {
			break;
		}
		case 2: {
			break;
		}
		case 3: {
			editPersonTable();
			break;
		}
		case 4: {
			break;
		}
	}
	
	function editCommitmentsTable() {
		$connect = mysqli_connect("localhost", "root", "", "commitment_wall");
		mysqli_query($connect, "SET NAMES UTF8");
		$id = $_POST["id"];
		$text = $_POST["text"];
		$column_name = $_POST["column_name"];  
		$sqlUpdate = "UPDATE commitments SET ".$column_name."='".$text."' WHERE id='".$id."';";
		
		if($text == "") {
			echo -2;
			return;
		}
		$sqlGetValue = "SELECT `".$column_name."` FROM `commitments` WHERE id=" .$id;
		$result = mysqli_query($connect, $sqlGetValue) or die('could not do query');
		$row = mysqli_fetch_array($result);
		$origenalVal = $row[0];
		
		if( $origenalVal == $text){
			echo -1;
			return;
		}

		if(mysqli_query($connect, $sqlUpdate))
		{
			echo $column_name. ' Updated To "' .$text. '" from "' .$origenalVal. '"';
		}
	}
	
	
	function editPersonTable() {
		$connect = mysqli_connect("localhost", "root", "", "checks");
		mysqli_query($connect, "SET NAMES UTF8");
		$id = $_POST["id"];
		$text = $_POST["text"];
		$column_name = $_POST["column_name"];
		$sqlUpdate = "UPDATE person SET ".$column_name."='".$text."' WHERE id='".$id."';";
	
	
		if($text == "") {
			echo -2;
			return;
		}
		$sqlGetValue = "SELECT `".$column_name."` FROM `person` WHERE id=" .$id;
		$result = mysqli_query($connect, $sqlGetValue) or die('could not do query');
		$row = mysqli_fetch_array($result);
		$origenalVal = $row[0];
		
		
		if( $origenalVal == $text){
			echo -1;
			return;
		}

		if(mysqli_query($connect, $sqlUpdate))
		{
			echo $column_name. ' Updated To "' .$text. '" from "' .$origenalVal. '"';
		}
	}
?>  