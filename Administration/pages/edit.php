<?php  
	$index = $_POST["index"];
	
	switch($index) {
		case 0: {
			//editCommitmentsTable();
			editTable("commitments");
			break;
		}
		case 1: {
			break;
		}
		case 2: {
			break;
		}
		case 3: {
			break;
		}
		case 8: {
			//editAdminTable();
			editTable("admin");
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

	if(mysqli_query($connect, $sqlUpdate))
	{
		echo 0;
	}
}


function editAdminTable() {
	$connect = mysqli_connect("localhost", "root", "", "commitment_wall");
	mysqli_query($connect, "SET NAMES UTF8");
	$id = $_POST["id"];
	$text = $_POST["text"];
	$column_name = $_POST["column_name"];  
	$sqlUpdate = "UPDATE admin SET ".$column_name."='".$text."' WHERE id='".$id."';";

	if(mysqli_query($connect, $sqlUpdate))
	{
		echo 0;
	}
}

function editTable($table) {
	$connect = mysqli_connect("localhost", "root", "", "commitment_wall");
	mysqli_query($connect, "SET NAMES UTF8");
	$id = $_POST["id"];
	$text = $_POST["text"];
	$column_name = $_POST["column_name"];  
	$sqlUpdate = "UPDATE ".$table." SET ".$column_name."='".$text."' WHERE id='".$id."';";

	if(mysqli_query($connect, $sqlUpdate))
	{
		echo 0;
	}
}
?>  