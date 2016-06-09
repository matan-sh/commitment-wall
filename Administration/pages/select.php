<?php
	
$index = $_POST["index"];
$language = $_POST["lan"];
$age_from = $_POST["age_from"];
$age_to = $_POST["age_to"];
$visitor_id = $_POST["id"];
$email = $_POST["mail"];
$permission = $_POST["permission"];

$ADMIN_PERMISSION = "admin";

switch($index) {
	case 0: {
		show_all_commitments($permission);
		break;
	}
	case 1: {
		show_all_visitors($permission);
		break;
	}
	case 2: {
		visitors_sorted_by_mail($email, $permission);
		break;
	}
	case 3: {
		visitors_sorted_by_id($visitor_id, $permission);
		break;
	}
	case 4: {
		visitors_sorted_by_age($age_from, $age_to, $permission);
		break;
	}
	case 5: {
		visitors_sorted_by_language($language, $permission);
		break;
	}
	case 6: {
		//SELECT_BY_COUNTRY
		break;
	}
	case 7: {
		//SELECT_ALL_REGISTRATION_STATIONS_TXT
		show_all_text($permission);
		break;
	}
	case 8: {
		show_all_managers($permission);
		break;
	}
	case 9: {
		//ADD 
		break;
	}
}
	
/* this function return all the commitments from the Database and shows them in a dynamic table */
function show_all_commitments($permission) {
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
						<th id="commitmentColumn">Arabic</th>';
					if($permission == "admin")
						$output .= '<th id="idAndDeleteColumn">Edit</th>
										<th id="idAndDeleteColumn">Delete</th>';
				$output .= '
					</tr>
				</thead>';
	if(mysqli_num_rows($result) > 0)
	{	
		while($row = mysqli_fetch_array($result))
		{
			/* add row with data to the table every loop */
			$output .= '
				<tbody>
					<tr>
						<td id="idAndDeleteColumn">'.$row["id"].'</td>
						<td class="Hebrew" data-id1="'.$row["id"].'">'.$row["Hebrew"].'</td>
						<td class="English" data-id2="'.$row["id"].'">'.$row["English"].'</td>
						<td class="Arabic" data-id3="'.$row["id"].'">'.$row["Arabic"].'</td>';
						if($permission == "admin")
							$output .= '<td id="idAndDeleteColumn">
												<button type="button" id="btn_edit'.$row["id"].'" name="edit_btn" data-id4="'.$row["id"].'" class="btn btn-sm btn-success btn_edit">Edit</button>
											</td>
											<td id="idAndDeleteColumn">
												<button type="button" name="delete_btn" data-id5="'.$row["id"].'" class="btn btn-danger btn-sm btn_delete">X</button>
											</td>';
					$output .= '</tr>';
		}
		/* add empty row to the table - to insert new data to the table */
		if($permission == "admin"){
			$output .= '
					<tr>
						<td></td>
						<td id="Hebrew" contenteditable></td>
						<td id="English" contenteditable></td>
						<td id="Arabic" contenteditable></td>
						<td id="idAndDeleteColumn" colspan="2">
							<button type="button" name="btn_add" id="btn_add" class="btn btn-success">Add</button>
						</td>
					</tr>';
		}
		$output .= '</tbody>';
	}
	else
	{
		$output .= '
			<tbody>
				<tr>
						<td></td>
						<td id="Hebrew" contenteditable></td>
						<td id="English" contenteditable></td>
						<td id="Arabic" contenteditable></td>';
		if($permission == "admin")
			$output .= '<td id="idAndDeleteColumn"><button type="button" name="btn_add" id="btn_add" class="btn btn-success">Add</button></td>';
		$output .= '
				</tr>
				<tr>
					<td colspan="5">Data not Found</td>
				</tr>
			</tbody>';
	}
	$output .= '</table>
					</div>';
	echo $output;
}

/* this function return all the visitors from the Database and shows them in a dynamic table */
function show_all_visitors($permission) {
	$connect = mysqli_connect("localhost", "root", "", "commitment_wall");
	mysqli_query($connect, "SET NAMES UTF8");
	$output = '';
	$sql = "SELECT * FROM visitors ORDER BY id DESC";
	$result = mysqli_query($connect, $sql);
	$output = getTableString($permission);
	
	if(mysqli_num_rows($result) > 0) {
		while($row = mysqli_fetch_array($result)) {
			$output .= getTableDataString($permission, $row);
		}
	}
	else {
		$output .= getEmptyDataString();
	}
	$output .= '</table>
					</div>';
	echo $output;				
}


/* this function return the visitors from the Database that sign in with the language '$lan'
 * and shows them in a dynamic table */
function visitors_sorted_by_language($lan, $permission){
	$connect = mysqli_connect("localhost", "root", "", "commitment_wall");
	mysqli_query($connect, "SET NAMES UTF8");
	$output = '';
	$sql = "SELECT * FROM visitors WHERE language='".$lan."' ORDER BY id DESC";
	$result = mysqli_query($connect, $sql);
	$output = getTableString($permission);

	if(mysqli_num_rows($result) > 0) {
		while($row = mysqli_fetch_array($result)) {
			$output .= getTableDataString($permission, $row);
		}
	}
	else {
		$output .= getEmptyDataString();
	}
	$output .= '</table>
					</div>';
	echo $output;				
}


/* this function return the visitors from the Database that their age is between '$age_from' to '$age_to'
 * and shows them in a dynamic table */
function visitors_sorted_by_age($age_from, $age_to, $permission){
	$flag = true;
	$connect = mysqli_connect("localhost", "root", "", "commitment_wall");
	mysqli_query($connect, "SET NAMES UTF8");
	$sql = 'SELECT * FROM visitors WHERE birthdate!="none" ORDER BY id DESC';
	$result = mysqli_query($connect, $sql);
	$output = getTableString($permission);

	if(mysqli_num_rows($result) > 0) {
		while($row = mysqli_fetch_array($result)) {
			$real_age = substr($row["birthdate"],6);
			
			if($age_from <= $real_age && $real_age <= $age_to) {
				$flag = false;
				$output .= getTableDataString($permission, $row);
			}
		}
	}
	
	if($flag){
		$output .= getEmptyDataString();
	}
	$output .= '</table>
					</div>';
	echo $output;
}

/* this function return the visitors from the Database that their email is '$email'
 * and shows them in a dynamic table */
function visitors_sorted_by_mail($email, $permission){
	$flag = true;
	$connect = mysqli_connect("localhost", "root", "", "commitment_wall");
	mysqli_query($connect, "SET NAMES UTF8");
	$sql = 'SELECT * FROM visitors WHERE email="'.$email.'"ORDER BY id DESC;';
	$result = mysqli_query($connect, $sql);
	$output = getTableString($permission);
	if(mysqli_num_rows($result) > 0) {
		while($row = mysqli_fetch_array($result)) {
			$output .= getTableDataString($permission, $row);
		}
	} 
	else {
		$output .= getEmptyDataString();
	}
	$output .= '</table>
					</div>';
	echo $output;
}


/* this function return the visitor from the Database that their id is '$visitor_id'
 * and shows them in a dynamic table */
function visitors_sorted_by_id($visitor_id, $permission){
	$flag = true;
	$connect = mysqli_connect("localhost", "root", "", "commitment_wall");
	mysqli_query($connect, "SET NAMES UTF8");
	$sql = 'SELECT * FROM visitors WHERE id="'.$visitor_id.'"ORDER BY id DESC;';
	$result = mysqli_query($connect, $sql);
	$output = getTableString($permission);
	if(mysqli_num_rows($result) > 0)	{
		while($row = mysqli_fetch_array($result)) {
			$output .= getTableDataString($permission, $row);
		}
	}
	else {
		$output .= getEmptyDataString();
	}
	$output .= '</table>
					</div>';
	echo $output;
}


function show_all_managers($permission) {	
	$connect = mysqli_connect("localhost", "root", "", "commitment_wall");
	mysqli_query($connect, "SET NAMES UTF8");
	$output = '';
	
	$sql = "SELECT id, first_name, last_name, permission FROM admin";
	$result = mysqli_query($connect, $sql);
	$output = '<div class="table-responsive ">
			<table class="table table-bordered table-hover" id="tableWidth" style="word-wrap:break-word;">
				<thead>
					<tr>
						<th id="idAndDeleteColumn">Id</th>
						<th id="commitmentColumn" >First Name</th>
						<th id="commitmentColumn" >Last Name</th>
						<th id="commitmentColumn" >Permission</th>';
		if($permission == "admin")
			$output .=	'
						<th id="idAndDeleteColumn">Edit</th>
						<th id="idAndDeleteColumn">Delete</th>';
		$output .=	'</tr>
				</thead>';
	
	if(mysqli_num_rows($result) > 0) {
		while($row = mysqli_fetch_array($result)) {
			$output .= '<tbody>
					<tr>
						<td id="idAndDeleteColumn">'.$row["id"].'</td>
						<td class="first_name" id="first_name'.$row["id"].'"	data-id1="'.$row["id"].'" >'.$row["first_name"].'</td>
						<td class="last_name" 	data-id2="'.$row["id"].'" >'.$row["last_name"].'</td>
						<td class="permission" 	data-id3="'.$row["id"].'" >'.$row["permission"].'</td>';
		if($permission == "admin")
			$output .= '<td id="idAndDeleteColumn">
								<button type="button" id="btn_edit'.$row["id"].'" name="edit_btn" data-id4="'.$row["id"].'" class="btn btn-success btn_edit">Edit</button>
							</td>
							<td id="idAndDeleteColumn">	
								<button type="button" name="delete_btn" data-id5="'.$row["id"].'" class="btn btn-danger btn_delete">X</button>
							</td>';
		$output .= '
					</tr>
				</tbody>';
		}
	}
	else {
		$output .= getEmptyDataString();
	}
	$output .= '</table>
					</div>';
	echo $output;
}




function show_all_text($permission) {	
	$connect = mysqli_connect("localhost", "root", "", "commitment_wall");
	mysqli_query($connect, "SET NAMES UTF8");
	$output = '';
	
	$sql = "SELECT id, descripsion, hebrew, english, arabic FROM text";
	$result = mysqli_query($connect, $sql);
	$output = '<div class="table-responsive ">
			<table class="table table-bordered table-hover" id="tableWidth" style="word-wrap:break-word;">
				<thead>
					<tr>
						<th id="idAndDeleteColumn">Id</th>
						<th id="textColumn" >Descripsion</th>
						<th id="textColumn" >Hebrew</th>
						<th id="textColumn" >english</th>
						<th id="textColumn" >arabic</th>';
		if($permission == "admin")
			$output .=	'
						<th id="idAndDeleteColumn">Edit</th>';
		$output .=	'</tr>
				</thead>';
	
	if(mysqli_num_rows($result) > 0) {
		while($row = mysqli_fetch_array($result)) {
			$output .= '<tbody>
					<tr>
						<td id="idAndDeleteColumn">'.$row["id"].'</td>
						<td class="" 	data-id1="'.$row["id"].'" >'.$row["descripsion"].'</td>
						<td class="" 	data-id2="'.$row["id"].'" >'.$row["hebrew"].'</td>
						<td class="" 	data-id3="'.$row["id"].'" >'.$row["english"].'</td>
						<td class="" 	data-id4="'.$row["id"].'" >'.$row["arabic"].'</td>';
		if($permission == "admin")
			$output .= '<td id="idAndDeleteColumn">
								<button type="button" id="btn_edit'.$row["id"].'" name="edit_btn" data-id4="'.$row["id"].'" class="btn btn-success btn_edit">Edit</button>
							</td>';
		$output .= '
					</tr>
				</tbody>';
		}
	}
	else {
		$output .= '<tbody>
							<tr>
								<td colspan="6" style="text-align:center" >אין נתונים להציג</td>
							</tr>
						</tbody>';
	}
	$output .= '</table>
					</div>';
	echo $output;
}





/* return the string that initialize the dynamic table (headlines of any colom) */
function getTableString($permission){
	$str = 
		'<div class="table-responsive ">
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
						<th id="visitorsColumn" style="display:none">Picture URL</th>';
		if($permission == "admin")
			$str .=	'<th id="idAndDeleteColumn">Delete</th>';
		$str .=	'</tr>
				</thead>';
	return $str;
}

/* return the string with all the data (rows) of dynamic table */
function getTableDataString($permission, $row){
	$str = '
				<tbody>
					<tr>
						<td id="idAndDeleteColumn">'.$row["id"].'</td>
						<td class="language" 	data-id1="'.$row["id"].'" >'.$row["language"].'</td>
						<td class="first_name" 	data-id2="'.$row["id"].'" >'.$row["first_name"].'</td>
						<td class="last_name" 	data-id3="'.$row["id"].'" >'.$row["last_name"].'</td>
						<td class="email" 		data-id4="'.$row["id"].'" >'.$row["email"].'</td>
						<td class="birthdate" 	data-id5="'.$row["id"].'" >'.$row["birthdate"].'</td>
						<td class="country" 		data-id6="'.$row["id"].'" >'.$row["country"].'</td>
						<td class="picture"><img data-id7="'.$row["id"].'" src="'.$row["pictureURL"].'" alt="pic.." style="height:60px;"></td>
						<td class="pictureURL"  data-id8="'.$row["id"].'" style="display:none">'.$row["pictureURL"].'</td>';
		if($permission == "admin")
			$str .= '<td id="idAndDeleteColumn">
								<button type="button" name="delete_btn" data-id9="'.$row["id"].'" class="btn btn-danger btn_delete">X</button>
						</td>';
		$str .= '
					</tr>
				</tbody>';
	return $str;
}

/* return the string with one empty row - data not found */
function getEmptyDataString(){
	$str = '
			<tbody>
				<tr>
					<td colspan="10" style="text-align:center" >אין נתונים להציג</td>
				</tr>
			</tbody>';
	return $str;
}

?>