<?php
	
	$index = $_POST["index"];

	$connect = mysqli_connect("localhost", "root", "", "commitment_wall");
	mysqli_query($connect, "SET NAMES UTF8");
	$output = '';
	$sql = "SELECT id, pictureURL FROM visitors WHERE id>'".$index."';";
	$result = mysqli_query($connect, $sql);
	
	if(mysqli_num_rows($result) > 0)
	{
		while($row = mysqli_fetch_array($result))
		{
			$output .= '<li class="id'.$row['id'].'" data-thumb="'.$row['pictureURL'].'"></li>';
		}
	}
	echo $output;				
?>