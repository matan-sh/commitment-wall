<?php

	$connect = mysqli_connect("localhost", "root", "", "commitment_wall");
	mysqli_query($connect, "SET NAMES UTF8");
	$output = '';
	
	//$select = "SELECT id, pictureURL FROM visitors WHERE pictureURL!='empty' ORDER BY id DESC LIMIT 107";
	$select = "SELECT id, pictureURL FROM visitors WHERE pictureURL!='empty' ORDER BY id DESC LIMIT 104";
	$result = mysqli_query($connect, $select) or die('could not do query');
	
	if(mysqli_num_rows($result) > 0)
	{
		while($row = mysqli_fetch_array($result))
		{
			$output .= '<li class="id'.$row['id'].'" data-thumb="'.$row['pictureURL'].'"></li>';
		}
	}
	echo $output;				
?>