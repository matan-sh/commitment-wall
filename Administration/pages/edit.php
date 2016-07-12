<?php  
	$index = $_POST["index"];
	$ADMIN_TABLE = "admin";
	$COMMITMENTS_TABLE = "commitments"
	switch($index) {
		case 0: {
			editTable($COMMITMENTS_TABLE);
			break;
		}
		case 8: {
			editTable($ADMIN_TABLE);
			break;
		}
	}

		
/* 
 * Argument:
 * $table - the name of the table in the database.
 *
 * Variables:
 * id 			- The index of the row to edit in the database.
 * text			- New text replaces the existing text in the database.
 * column_name - The name of the column to edit.
*/
function editTable($table) {
	/* connect to the DataBase and set as UTF8 */
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