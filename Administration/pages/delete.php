<?php
	$index = $_POST["index"];
	$id = $_POST["id"];
	if($index == 0) {
		//deleteCommitment($id);
		deleteFromDB($id, "commitments");
	} 
	else if($index == 8) {
		deleteFromDB($id, "admin");
	}
	else {
		//deleteVisitor($id);
		deleteFromDB($id, "visitors");
	}
	
/*
function deleteCommitment($id) {
	$connect = mysqli_connect("localhost", "root", "", "commitment_wall");
	mysqli_query($connect, "SET NAMES UTF8");
	$sql = "DELETE FROM commitments WHERE id = '".$id."'";
	if(mysqli_query($connect, $sql))
	{
		  echo 'Commitment Deleted';
	}
}


function deleteVisitor($id) {
	$connect = mysqli_connect("localhost", "root", "", "commitment_wall");
	mysqli_query($connect, "SET NAMES UTF8");
	$sql = "DELETE FROM visitors WHERE id='".$id."'";
	if(mysqli_query($connect, $sql))
	{
		  echo 'Visitor Deleted';
	}
}*/

function deleteFromDB($id, $str) {
	$connect = mysqli_connect("localhost", "root", "", "commitment_wall");
	mysqli_query($connect, "SET NAMES UTF8");
	$sql = "DELETE FROM ".$str." WHERE id='".$id."'";
	if(mysqli_query($connect, $sql))
	{
		  echo $str.' Deleted';
	}
}
 ?>