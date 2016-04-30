<?php
	
$index = $_POST["index"];
switch($index) {
	case 0: {
		showCommitmentsTable();
		break;
	}
	case 1: {
		break;
	}
	case 2: {
		showVisitorsTable();
		break;
	}
	case 3: {
		showPersonTable();
		break;
	}
	case 4: {
		break;
	}
}
	

function showCommitmentsTable() {
	$connect = mysqli_connect("localhost", "root", "", "commitment_wall");
	mysqli_query($connect, "SET NAMES UTF8");
	$output = '';
	$sql = "SELECT * FROM commitments ORDER BY id DESC";
	$result = mysqli_query($connect, $sql);
	$output .= '
		<div class="table-responsive">
			<table class="table table-bordered table-hover" id="tableWidth" >
				<thead>
				<tr>
					<th id="idAndDeleteColumn">Id</th>
					<th id="commitmentColumn">Hebrew</th>
					<th id="commitmentColumn">English</th>
					<th id="commitmentColumn">Arabic</th>
					<th id="idAndDeleteColumn">Delete</th>
				</tr>
				</thead>';
	if(mysqli_num_rows($result) > 0)
	{
		while($row = mysqli_fetch_array($result))
		{
			$output .= '
				<tbody>
					<tr>
						<td id="idAndDeleteColumn">'.$row["id"].'</td>
						<td class="Hebrew" data-id1="'.$row["id"].'" contenteditable>'.$row["Hebrew"].'</td>
						<td class="English" data-id2="'.$row["id"].'" contenteditable>'.$row["English"].'</td>
						<td class="Arabic" data-id3="'.$row["id"].'" contenteditable>'.$row["Arabic"].'</td>
						<td id="idAndDeleteColumn"><button type="button" name="delete_btn" data-id4="'.$row["id"].'" class="btn btn-xs btn-danger btn_delete">X</button></td>
					</tr>';
		}
	  $output .= '
					<tr>
						<td></td>
						<td id="Hebrew" contenteditable></td>
						<td id="English" contenteditable></td>
						<td id="Arabic" contenteditable></td>
						<td id="idAndDeleteColumn"><button type="button" name="btn_add" id="btn_add" class="btn btn-xs btn-success">Add</button></td>
					</tr>
				</tbody>';
	}
	else
	{
		$output .= '
			<tbody>
				<tr>
						<td></td>
						<td id="Hebrew" contenteditable></td>
						<td id="English" contenteditable></td>
						<td id="Arabic" contenteditable></td>
						<td id="idAndDeleteColumn"><button type="button" name="btn_add" id="btn_add" class="btn btn-xs btn-success">Add</button></td>
				</tr>
				<tr>
					<td colspan="4">Data not Found</td>
				</tr>
			</tbody>';
	}
	$output .= '</table>
					</div>';
	echo $output;
}

/* DELETE - No need */
function showPersonTable() {
	$connect = mysqli_connect("localhost", "root", "", "checks");
	mysqli_query($connect, "SET NAMES UTF8");
	$output = '';
	$sql = "SELECT * FROM person ORDER BY id DESC";
	$result = mysqli_query($connect, $sql);
	$output .= '
		<div class="table-responsive ">
			<table class="table table-bordered table-hover" id="tableWidth">
				<thead>
				<tr>
					<th id="idAndDeleteColumn">Id</th>
					<th style="width:40%">First Name</th>
					<th style="width:40%">Last Name</th>
					<th id="idAndDeleteColumn">Delete</th>
				</tr>
				</thead>';
	if(mysqli_num_rows($result) > 0)
	{
		while($row = mysqli_fetch_array($result))
		{
			$output .= '
				<tbody>
					<tr>
						<td id="idAndDeleteColumn">'.$row["id"].'</td>
						<td class="first_name" data-id1="'.$row["id"].'" contenteditable>'.$row["first_name"].'</td>
						<td class="last_name" data-id2="'.$row["id"].'" contenteditable>'.$row["last_name"].'</td>
						<td id="idAndDeleteColumn"><button type="button" name="delete_btn" data-id3="'.$row["id"].'" class="btn btn-xs btn-danger btn_delete">X</button></td>
					</tr>';
		}
	  $output .= '
				 <tr>
						<td></td>
						<td id="first_name" contenteditable></td>
						<td id="last_name" contenteditable></td>
						<td id="idAndDeleteColumn"><button type="button" name="btn_add" id="btn_add" class="btn btn-xs btn-success">Add</button></td>
				 </tr>
			</tbody>';
	}
	else
	{
		$output .= '
			<tbody>
				<tr>
					<td></td>
					<td id="first_name" contenteditable></td>
					<td id="last_name" contenteditable></td>
					<td id="idAndDeleteColumn"><button type="button" name="btn_add" id="btn_add" class="btn btn-xs btn-success">Add</button></td>
				</tr>
				<tr>
					<td colspan="4">Data not Found</td>
				</tr>
			</tbody>';
	}
	$output .= '</table>
					</div>';
	echo $output;				
}
/* EDN DELETE - No need */



function showVisitorsTable() {
	$connect = mysqli_connect("localhost", "root", "", "commitment_wall");
	mysqli_query($connect, "SET NAMES UTF8");
	$output = '';
	$sql = "SELECT * FROM visitors ORDER BY id DESC";
	$result = mysqli_query($connect, $sql);
	$output .= '
		<div class="table-responsive ">
			<table class="table table-bordered table-hover" id="tableWidth" style="word-wrap:break-word;">
				<thead>
				<tr>
					<th id="idAndDeleteColumn">Id</th>
					<th id="visitorsColumn" >Language</th>
					<th id="visitorsColumn" >First Name</th>
					<th id="visitorsColumn" >Last Name</th>
					<th id="visitorsEmailColumn" >Email</th>
					<th id="visitorsColumn" >Birthdate</th>
					<th id="visitorsColumn" >Country</th>
					<th id="visitorsColumn" >Picture</th>
					<th id="idAndDeleteColumn">Delete</th>
				</tr>
				</thead>';
	if(mysqli_num_rows($result) > 0)
	{
		while($row = mysqli_fetch_array($result))
		{
			$output .= '
				<tbody>
					<tr>
						<td id="idAndDeleteColumn">'.$row["id"].'</td>
						<td class="language" 	data-id1="'.$row["id"].'" >'.$row["language"].'</td>
						<td class="first_name" 	data-id2="'.$row["id"].'" >'.$row["first_name"].'</td>
						<td class="last_name" 	data-id3="'.$row["id"].'" >'.$row["last_name"].'</td>
						<td class="email" 		data-id4="'.$row["id"].'" >'.$row["email"].'</td>
						<td class="birthdate" 	data-id5="'.$row["id"].'" >'.$row["birthdate"].'</td>
						<td class="country" 		data-id6="'.$row["id"].'" >'.$row["country"].'</td>
						<td class="pictureURL"><img data-id7="'.$row["id"].'" src="'.$row["pictureURL"].'" alt="pic.." style="width:80px;height:60px;"></td>
						<td id="idAndDeleteColumn"><button type="button" name="delete_btn" data-id8="'.$row["id"].'" class="btn btn-xs btn-danger btn_delete">X</button></td>
					</tr>';
		}
	  $output .= '
				</tbody>';
	}
	else
	{
		$output .= '
			<tbody>
				<tr>
					<td colspan="4">Data not Found</td>
				</tr>
			</tbody>';
	}
	$output .= '</table>
					</div>';
	echo $output;				
}

?>