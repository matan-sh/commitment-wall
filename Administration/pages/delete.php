<?php
	$index = $_POST["index"];
	$id = $_POST["id"];
	$ADMIN_TABLE = "admin";
	$COMMITMENTS_TABLE = "commitments";
	$VISITORS_TABLE = "visitors";
	
	$COMMITMENTS_INDEX = 0;
	$ADMIN_INDEX = 8;
	
	if($index == $COMMITMENTS_INDEX) {
		deleteFromDB($id, $COMMITMENTS_TABLE, false);
	} 
	else if($index == $ADMIN_INDEX) {
		deleteFromDB($id, $ADMIN_TABLE, false);
	}
	else {
		deleteFromDB($id, $VISITORS_TABLE, true);
	}
	
	
/* 
 * Arguments:
 * $id			- the index of the row to delete from the database.
 * $table_name	- the name of the table in the database.
 * $isVisitor	- boolean flag true = visitors table and false = another table.
*/
function deleteFromDB($id, $table_name, $isVisitor) {
	/* connect to the DataBase and set as UTF8 */
	$connect = mysqli_connect("localhost", "root", "", "commitment_wall");
	mysqli_query($connect, "SET NAMES UTF8");
	
	/* In the case of visitors table - Delete the image from the server */
	if($isVisitor){
		$select_img = "SELECT pictureURL FROM visitors WHERE id='".$id."'";
		$result = mysqli_query($connect, $select_img);
		$img_url = mysqli_fetch_array($result);
		unlink($img_url["pictureURL"]); //delete the picture from the server
	}
	
	/* Delete the deta from the database */
	$sql = "DELETE FROM ".$table_name." WHERE id='".$id."'";
	if(mysqli_query($connect, $sql))
	{
		  echo $table_name.' Deleted';
	}
}
?>