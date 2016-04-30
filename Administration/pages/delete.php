<?php
	$index = $_POST["index"];
		
	switch($index) {
		case 0: {
			deleteCommitment();
			break;
		}
		case 1: {
			break;
		}
		case 2: {
			break;
		}
		case 3: {
			deletePerson();
			break;
		}
		case 4: {
			break;
		}
	}

	function deletePerson() {
		$connect = mysqli_connect("localhost", "root", "", "checks");
		mysqli_query($connect, "SET NAMES UTF8");
		$sql = "DELETE FROM person WHERE id = '".$_POST["id"]."'";
		if(mysqli_query($connect, $sql))
		{
			  echo 'Data Deleted';
		}
	}
	
	function deleteCommitment() {
		$connect = mysqli_connect("localhost", "root", "", "commitment_wall");
		mysqli_query($connect, "SET NAMES UTF8");
		$sql = "DELETE FROM commitments WHERE id = '".$_POST["id"]."'";
		if(mysqli_query($connect, $sql))
		{
			  echo 'Data Deleted';
		}
	}
 ?>