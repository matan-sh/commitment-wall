<?php
	/* Determines which language to show the page */
	$language = $_POST["language"];
	
	if($language == "English")
		$direction = "ltr";
	else
		$direction = "rtl";
		
	
	/* connect to the DataBase and set as UTF8 */
	$connect = mysqli_connect("localhost", "root", "", "commitment_wall") or die(errorCase($language));
	mysqli_query($connect, "SET NAMES UTF8");
	
	
	$output = '';
	
	/* set the query string and send the query to DB */
	$sql = "SELECT id, ".$language." FROM commitments ORDER BY id DESC";
	$result = mysqli_query($connect, $sql);
	
	if($result == false){
		die(errorCase($language));
	}else {
		$numOfRows = mysqli_num_rows($result);
	}
	$output .= '
		<div class="table-responsive">
			<table class="table table-bordered" id="tableWidth" >';
	
	
	if($numOfRows > 0)
	{
		while($row = mysqli_fetch_array($result))
		{
			$output .= '
				<tbody>
					<tr>
						<td class="'.$language.'" data-id1="'.$row["id"].'" style="direction:'.$direction.'";>
							<li >' .$row[$language].'</li>
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
					<td colspan="4">Data not Found. try to refresh the page </td>
				</tr>
			</tbody>';
	}
	$output .= '</table>
					</div>';
	echo $output;
	
	/* in connection problem show message in the table */
	function errorCase($lan) {
		$error_msg = "";
		if($lan == "Hebrew"){
			$error_msg = "לא נמצאו נתונים.";
		} 
		else if($lan == "English") {
			$error_msg = "Data not Found.";
		} 
		else if($lan == "Arabic") {
			$error_msg = "لم يتم العثور على بيانات.";
		}
		else {
			$error_msg = "Data not Found.";
		}
	
		$output = '
			<div class="table-responsive">
				<table class="table table-bordered" id="tableWidth" >
					<tbody>
						<tr>
							<td colspan="4">'.$error_msg.'</td>
						</tr>
					</tbody>
				</table>
			</div>';
		echo $output;
	}
?>

